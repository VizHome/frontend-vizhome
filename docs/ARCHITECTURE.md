# Architecture — frontend-vizhome

Choix de design et patterns appliqués dans le frontend Nuxt 4.

## Vue d'ensemble

```
Navigateur
   │
   ├── Pages publiques (/, /pricing, /features…)
   │   └── Layout default (AppNavbar + AppFooter)
   │
   ├── Pages auth (/auth/login, /register…)
   │   └── Layout none + middleware 'guest'
   │
   └── Pages métier (/render, /projects, /gallery)
       └── Layout none + middleware 'auth' + UserNav floating
            │
            └── useApi() → JWT auto → backend Django
                              │
                              └── refresh auto sur 401
```

## Patterns clés

### 1. Composables singletons pour le state global

Pas de Pinia. Chaque composable expose un état partagé via des `ref`
hoistés au niveau du module :

```ts
// composables/useAuth.ts
const tokens = ref<JwtTokens | null>(null)  // ← singleton

export function useAuth() {
  // toutes les instances partagent `tokens`
  return { tokens, login, logout }
}
```

Avantages :
- Pas de boilerplate (pas de store / state / action / getter)
- Type-safety native TypeScript
- Auto-import Nuxt
- Réactivité Vue 3 directe

Inconvénients :
- Pas de devtools dédié (mais Vue DevTools suffit)
- Pas de time travel
- Tests un peu plus verbeux

À cette échelle de projet (1 dev, ~10 composables métier), c'est
largement suffisant. Pinia pourrait être introduit si le projet grossit
ou si plusieurs équipes y travaillent.

### 2. `useApi` — wrapper $fetch authentifié

Pattern centralisé pour tous les appels API :

```ts
export function useApi() {
  const auth = useAuth()
  const config = useRuntimeConfig()

  return async function apiFetch<T>(path: string, options = {}): Promise<T> {
    const headers = new Headers(options.headers)
    if (auth.tokens.value?.access) {
      headers.set('Authorization', `Bearer ${auth.tokens.value.access}`)
    }

    try {
      return await $fetch<T>(path, { ...options, baseURL: config.public.apiUrl, headers })
    } catch (e) {
      if (e?.statusCode === 401 && auth.tokens.value?.refresh) {
        await auth.refreshAccessToken()
        return await $fetch<T>(path, { ...options, baseURL: config.public.apiUrl, headers })
      }
      throw e
    }
  }
}
```

Bénéfices :
- 1 seul endroit pour gérer l'auth header
- Refresh JWT automatique invisible pour l'appelant
- Erreur 401 → logout automatique si refresh échoue

### 3. Pipeline async pour les rendus IA

Les rendus prennent 5-30s. Le frontend délègue au backend Celery et poll
toutes les 2s :

```ts
async function generate() {
  const created = await api<ApiRender>('/renders/', {
    method: 'POST',
    body: { source: 'prompt', output_type: '2d', prompt: prompt.value },
  })

  const finished = await pollUntilTerminal(created.id)
  if (finished.status === 'done') {
    result.value = finished.result_url
  }
}

async function pollUntilTerminal(id) {
  while (true) {
    const r = await api(`/renders/${id}`)
    if (r.is_terminal) return r
    await new Promise(r => setTimeout(r, 2000))
  }
}
```

### 4. Upload presigned MinIO direct browser → MinIO

Les fichiers 3D (jusqu'à plusieurs Go) ne transitent **pas** par Django :

```ts
// 1. Demande URL signée
const presigned = await api('/projects/{id}/models/upload-url', {
  method: 'POST',
  body: { name, file_name, file_size_bytes, content_type },
})

// 2. PUT direct vers MinIO
await fetch(presigned.upload_url, {
  method: 'PUT',
  headers: presigned.headers,
  body: file,
})

// 3. Confirme côté backend → crée l'ImportedModel
await api('/projects/{id}/models/confirm', {
  method: 'POST',
  body: { name, key: presigned.key },
})
```

### 5. Sérialisation/restauration scène Three.js

L'état Three.js complet (caméra, lumières, transforms…) est marshallé
en JSON via `useSceneSerializer` :

```ts
// Capture
const state = serialize()
await projects.saveSceneState(state)

// Restore (page render avec ?project=N)
const project = await openProject(id)
restoreScene(project.scene.data)
await loadProjectModels()           // téléchargement depuis MinIO
restoreModelTransforms(project.scene.data)  // transforms par-dessus
```

Le schéma de `scene.data` est **owned par le frontend** — le backend
stocke en `JSONField` sans validation, ce qui permet d'évoluer librement
sans migrations.

### 6. Middleware de routes

```ts
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }
})

// middleware/guest.ts (inverse)
export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated.value) {
    return navigateTo('/render')
  }
})
```

Application : `definePageMeta({ middleware: 'auth' })` sur les pages
qui requièrent une session.

### 7. Plugin de boot client-only

```ts
// plugins/auth.client.ts
export default defineNuxtPlugin(async () => {
  const auth = useAuth()
  const { fetchMe } = useUser()

  auth.init()  // hydrate les tokens depuis localStorage

  if (auth.isAuthenticated.value) {
    try {
      await fetchMe()  // récupère le profil depuis le backend
    } catch {
      // refresh expiré → useApi a déjà déclenché logout()
    }
  }
})
```

`.client.ts` ⇒ pas exécuté en SSR (pas de localStorage côté serveur).

### 8. Layout admin avec sidebar shadcn-vue

Le panel `/admin/*` utilise le pattern shadcn-vue `SidebarProvider` :

```vue
<!-- layouts/admin.vue -->
<SidebarProvider>
  <AdminSidebar />
  <SidebarInset>
    <header class="sticky top-0 h-14 ...">
      <SidebarTrigger />
      <Breadcrumb>...</Breadcrumb>
      <Actions />  <!-- refresh + theme -->
    </header>
    <main><slot /></main>
  </SidebarInset>
</SidebarProvider>
```

`AdminSidebar.vue` expose 3 groupes :
- **Pilotage** : Dashboard + Analytics
- **Modération** : Users + Renders + Forum (avec badge dynamique `uploads_orphan` si > 10)
- **Système** : Billing + Journal d'audit

Le mode `collapsible="icon"` permet le repli (icônes seules) via `SidebarTrigger`.

### 9. Timeline GitHub-style pour le forum

Les pages `/forum/topic/:id` rendent une **timeline verticale connectée** inspirée
de l'UI GitHub Issues :

```
[avatar]──┬── [Card: topic content]    ← 1er post (avatar + card avec arrow notch)
          │
          ├── [event icon] {Actor} a épinglé ce sujet  ← ForumTimelineEvent (inline)
          │
          ├── [avatar]── [Card: reply content]         ← ForumReplyCard
          │
          └── [avatar]── [Card: composer "Ajouter un commentaire"]
```

Implémentation : un `<ul>` avec une ligne verticale absolue derrière la colonne
avatar (`absolute left-5 top-6 bottom-6 w-px bg-border`). Chaque item est un
`<li>` avec avatar externe (z-10 par-dessus la ligne) + card via classe utilitaire
`.github-arrow-left` (petit triangle CSS pointant vers l'avatar via `::before` +
`::after`). Les badges Auteur / Staff / Toi remplacent les icônes simples pour
l'identité visuelle.

## Choix techniques

### Pourquoi shadcn-vue plutôt qu'un design system pré-fait ?

shadcn-vue n'est pas une lib npm classique — c'est du **code copié dans
ton projet** que tu adaptes librement. Bénéfices :
- 0 vendor lock-in
- Customisation profonde sans surcharge CSS
- TypeScript natif, accessible (radix-vue / reka-ui en dessous)
- Pas de dépendance versionnée à maintenir

### Pourquoi pas de SSR sur les pages métier ?

Les pages `/render`, `/projects`, `/gallery` sont :
- 100% authentifiées (pas de SEO à gagner)
- Très interactives (Three.js, canvas)
- Dépendent du localStorage (tokens JWT)

Le SSR ne servirait à rien. On utilise `definePageMeta({ layout: 'none' })`
+ middleware `auth` qui force l'hydratation client.

Les pages **publiques** (home, pricing, features) bénéficient du SSR
Nuxt par défaut → SEO + first paint rapide.

### Pourquoi Three.js et pas Babylon.js ?

- Plus mature dans l'écosystème JS architectural
- Loaders intégrés pour GLB / OBJ / FBX / STL
- Communauté plus large
- Babylon serait techniquement supérieur sur certains points (physics,
  WebXR, performance) mais Three.js est suffisant pour nos besoins
  actuels

### Pourquoi pas de Pinia ?

Pour cette taille de projet, les composables singletons sont plus
légers et plus naturels en Vue 3 + Nuxt. Pinia ajouterait :
- 1 store par feature à créer
- Actions / getters explicites
- Plus de boilerplate

Si on passe à 50+ composables ou plusieurs équipes, Pinia deviendrait
plus pertinent.

## Communication backend

Tous les endpoints sont sous `/api/v1/`. L'URL backend est configurée
via `runtimeConfig.public.apiUrl` (env `NUXT_PUBLIC_API_URL`).

| Composable | Endpoints utilisés |
|---|---|
| `useAuth` | `/auth/*` |
| `useUser` | `/me`, `/me/preferences`, `/me/sessions` |
| `useBilling` | `/billing/plans`, `/me/subscription/*`, `/me/invoices` |
| `use2fa` | `/me/2fa/*`, `/auth/2fa/verify` |
| `useProjects` | `/projects/*` |
| `useAiRender` | `/renders/*` |
| `useGallery` | `/renders/?status=done` |

## Internationalisation

Module `@nuxtjs/i18n` configuré pour fr / en / es / de. Préférence
sauvegardée côté backend (`UserPreferences.language`) et appliquée au
boot.

```
i18n/
├── fr.json
├── en.json
├── es.json
└── de.json
```

Usage dans les templates : `{{ $t('hello') }}`.

## Accessibilité

Préférences utilisateur synchronisées côté backend (`UserPreferences`) et
appliquées au DOM dans `app.vue` :

```ts
onMounted(() => {
  const prefs = preferences.value
  document.documentElement.dataset.fontSize = prefs.fontSize
  if (prefs.reducedMotion) document.documentElement.classList.add('reduce-motion')
  if (prefs.highContrast) document.documentElement.classList.add('high-contrast')
})
```
