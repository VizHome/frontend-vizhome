# Développement — frontend-vizhome

Workflow quotidien pour développer sur le frontend Nuxt.

## Démarrage

```bash
cp .env.example .env       # adapter NUXT_PUBLIC_API_URL si besoin
npm install
npm run dev                # → http://localhost:3000
```

Le backend doit tourner en parallèle :

```bash
# Dans un autre terminal
cd ../backend-vizhome
docker compose up -d
```

## Scripts npm

| Commande | Action |
|---|---|
| `npm run dev` | Serveur dev avec HMR (port 3000) |
| `npm run build` | Build de production (`.output/`) |
| `npm run preview` | Preview locale de la build prod |
| `npm run generate` | Build statique (`.output/public/`) |
| `npm run lint` | ESLint sur tout le projet |
| `npm run lint:fix` | ESLint avec auto-fix |
| `npm run test` | Tests Vitest |
| `npm run test:ui` | Interface Vitest |
| `npm run test:coverage` | Tests avec couverture |
| `npm run docker:dev` | Démarre le compose dev (HMR via bind-mount) |
| `npm run docker:prod` | Build + démarre le compose prod |

## Workflow : ajouter une page

1. **Créer le fichier** dans `pages/` :
   ```
   pages/mon-feature/index.vue
   ```
   → URL automatique : `/mon-feature`

2. **Définir le layout + middleware** :
   ```vue
   <script setup>
   definePageMeta({
     layout: 'none',           // ou 'default', 'sidebar'
     middleware: 'auth',       // ou 'guest', ou []
   })
   </script>
   ```

3. **Importer les composables auto** (rien à importer en haut) :
   ```vue
   <script setup>
   const auth = useAuth()
   const { user } = useUser()
   </script>
   ```

4. **Composants UI auto-importés** depuis `components/ui/` :
   ```vue
   <Button>Cliquer</Button>
   <Card>...</Card>
   ```

## Workflow : ajouter un composable

```ts
// composables/useFeature.ts
import { ref } from 'vue'

// État partagé (singleton de module)
const data = ref<string | null>(null)
const isLoading = ref(false)

export function useFeature() {
  const api = useApi()

  async function fetch() {
    isLoading.value = true
    try {
      data.value = await api('/feature/')
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, fetch }
}
```

Auto-import : usable directement dans n'importe quel composant comme
`const { data, fetch } = useFeature()`.

## Ajouter un composant shadcn-vue

```bash
npx shadcn-vue@latest add dialog        # exemple
npx shadcn-vue@latest add tooltip
```

Le composant est copié dans `components/ui/<nom>/` — éditable
librement.

## Debug

### Vue DevTools

Chrome / Firefox / Edge extension officielle. Inspecter :
- Composants Vue + state réactif
- Composables (via le tree des composants)
- Pinia (si introduit plus tard)
- Routeur

### Network tab

- Filtre `Fetch/XHR` pour voir les appels backend
- Vérifier l'header `Authorization: Bearer ...`
- Inspecter les 401 → confirmer que `useApi` refresh bien le token

### Console

- Erreurs runtime Vue
- Logs des plugins `.client.ts`
- Warnings de composables (`useApi` log les 401 par exemple)

## Variables d'env

```bash
# .env (non commité)
NUXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NUXT_PUBLIC_DOCS_URL=http://localhost:3001
NUXT_PUBLIC_GOOGLE_CLIENT_ID=
NUXT_PUBLIC_GITHUB_CLIENT_ID=
```

Toutes les variables publiques (utilisables côté client) doivent être
préfixées `NUXT_PUBLIC_*`. Sinon elles ne sont accessibles que côté
serveur (SSR).

Accès dans le code :

```ts
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
```

## ESLint + Prettier

Config dans `eslint.config.mjs`. Lint avant commit (hook lint-staged
configuré dans `.lintstagedrc.mjs`).

```bash
npm run lint           # check
npm run lint:fix       # auto-fix ce qui peut l'être
```

## Tests Vitest

```bash
npm run test                       # mode watch
npm run test --run                 # un seul passage
npm run test composables/useAuth   # cibler un fichier
```

Exemple de test :

```ts
import { describe, it, expect } from 'vitest'
import { useAuth } from '@/composables/useAuth'

describe('useAuth', () => {
  it('initialise sans token', () => {
    const { isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(false)
  })
})
```

## Recharger après changement de `.env`

Le serveur dev Nuxt **ne recharge pas automatiquement** quand `.env`
change. Il faut redémarrer manuellement :

```bash
# Ctrl+C puis :
npm run dev
```

## Inspecter le bundle de production

```bash
npm run build
ls -lah .output/

# Mesurer la taille des chunks
npx nuxt build --analyze
```

## Tester en SSR vs SPA

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,    // SSR activé par défaut (pour pages publiques)
})
```

Les pages métier désactivent le SSR via `definePageMeta` :

```vue
<script setup>
definePageMeta({ layout: 'none' })  // implicit SPA
</script>
```

## Conventions

### Naming

- **Composants Vue** : PascalCase (`UserNav.vue`, `ProjectCard.vue`)
- **Composables** : `useXxx.ts` camelCase
- **Pages** : kebab-case (`reset-password.vue`)
- **Variables** : camelCase
- **Types / Interfaces** : PascalCase

### Structure d'un composant Vue

```vue
<template>
  <!-- HTML d'abord pour lisibilité -->
</template>

<script setup lang="ts">
// 1. Imports
import { ref, computed } from 'vue'

// 2. Composables
const { user } = useUser()

// 3. État local
const isOpen = ref(false)

// 4. Computed
const greeting = computed(() => `Hello ${user.value.name}`)

// 5. Méthodes
async function handleClick() { ... }

// 6. Lifecycle
onMounted(() => { ... })

// 7. definePageMeta (si page)
definePageMeta({ middleware: 'auth' })
</script>

<style scoped>
/* CSS uniquement si nécessaire — Tailwind d'abord */
</style>
```

### TypeScript strict

Activé dans `nuxt.config.ts` :
```ts
typescript: { strict: true, typeCheck: false, shim: false }
```

Toujours typer :
- Les retours de composables
- Les props de composants
- Les responses API (interfaces dédiées)
