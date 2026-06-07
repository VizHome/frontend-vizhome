# Audit de performance — frontend-vizhome

## Introduction

- **Date de l'audit** : 2026-06-07
- **Branche** : `features/multi-lang`
- **Auditeur** : revue statique pré-déploiement (pas de mesure runtime)

### Méthodologie

L'audit est **statique** : on lit le code source, on inspecte le poids brut
des dépendances installées dans `node_modules/`, on identifie les
anti-patterns Web Vitals dans les templates Vue. Aucun build prod n'a été
exécuté, aucun runtime Lighthouse/PSI lancé (environnement Windows local,
pas de Docker pour Chrome headless ici).

### Outils de mesure runtime à brancher plus tard

| Outil | Quand l'utiliser |
|---|---|
| `npm run analyze` (nouveau) | À chaque PR qui touche au bundle (deps, plugins Vite, manualChunks) |
| `lighthouse-ci` GitHub Action | Sur les PR contre `main`, avec budget JSON (`assertions: { interactive: 3000ms }`) |
| `web-vitals` lib + endpoint custom | Pour collecter Core Web Vitals côté browser et les POST vers un endpoint backend `/api/v1/_metrics/web-vitals` |
| Nuxt Devtools `Vite Inspector` | Localement, pour voir les transformations Vue/CSS chunk par chunk |

---

## Section 1 — Bundle size

### 1.1 Mesure des dépendances installées

Tailles brutes sur disque dans `node_modules/<dep>/` (code source + maps +
fichiers types). Ce n'est **pas** la taille du bundle final (Vite tree-shake
massivement) mais ça donne une idée des libs lourdes à surveiller.

| # | Dépendance | Catégorie | Utilisation | Statut tree-shake |
|---|---|---|---|---|
| 1 | `three` (`^0.183.2`) | 3D | composables `useThree*` uniquement | partiel — voir 1.2.a |
| 2 | `lucide-vue-next` (`^0.577.0`) | icônes | 74 fichiers (named imports) | **OK** — named imports ESM |
| 3 | `@tiptap/*` (10+ packages) | éditeur RTF | `components/forum/ForumEditor.vue` uniquement | **non lazy** — voir 1.2.c |
| 4 | `@unovis/vue` + `@unovis/ts` (`^1.6.5`) | charts | 3 composants `components/admin/Admin*Chart.vue` | **non scopé** — voir 1.2.d |
| 5 | `reka-ui` (`^2.9.9`) | UI primitives | shadcn-vue wrappers (partout) | chunk dédié `vendor-ui` (déjà ok) |
| 6 | `highlight.js` (`^11.11.1`) | code coloration | `CodeBlock.vue` + TipTap | **lourd par défaut** — voir 1.2.e |
| 7 | `lowlight` (`^3.3.0`) | adapter highlight.js pour TipTap | forum uniquement | suit `highlight.js` |
| 8 | `isomorphic-dompurify` (`^3.15.0`) | sanitization HTML | `ForumContent.vue` | forum-scoped, ok |
| 9 | `motion-v` (`^2.0.0`) | animations | trouver les utilisateurs (à valider) | **inconnu** — pas d'usage confirmé |
| 10 | `@tanstack/vue-table` (`^8.21.3`) | tables admin | admin uniquement | non scopé |
| 11 | `embla-carousel-vue` (`^8.6.0`) | carousel | composant carousel shadcn | OK si utilisé localement |
| 12 | `@vee-validate/zod` + `vee-validate` + `yup` | validation forms | partout (auth, account) | **bizarre : zod ET yup** voir 1.2.b |

> Pour mesurer précisément la taille effective dans le bundle final,
> lancer `npm run analyze` et ouvrir `analyze-bundle.html`.

### 1.2 Recommandations dep par dep

#### a) `three` — loaders trop nombreux côté `/render`

Le composable `composables/useThreeModels.ts:5-11` importe **6 loaders**
(`GLTFLoader`, `OBJLoader`, `MTLLoader`, `FBXLoader`, `STLLoader`,
`DRACOLoader`) + `TransformControls`. Tous chargés au mount de `/render`.

- Gain potentiel : **~200-400 KB gzip** en dynamic-imports conditionnels
  selon l'extension du fichier importé.
- Action : extraire chaque loader en `import()` dynamique dans
  `_loadFromFile`. Ne charger `DRACOLoader` que si un `.glb` contient
  l'extension Draco (`KHR_draco_mesh_compression`).
- Le bundle `vendor-three` n'est **pas** déclaré dans
  `nuxt.config.ts:109` (cf. `manualChunks`). Ajouter une entrée.

#### b) Doublon validation : `zod` + `yup`

`package.json:57` : `@vee-validate/zod` (`^4.15.1`). `package.json:75` :
`yup` (`^1.7.1`). CLAUDE.md mentionne **uniquement** `vee-validate + yup`.

- **Vérifier** : si plus aucune page n'utilise zod, retirer `@vee-validate/zod`.
- Gain : **~50 KB** (zod core + adapter).

#### c) TipTap — chargé même hors `/forum/*`

`@tiptap/starter-kit` est dans `vite.optimizeDeps.include`
(`nuxt.config.ts:84-95`) et obtient un chunk dédié `vendor-tiptap`
(`nuxt.config.ts:117`). C'est bien mais le chunk est **toujours téléchargé**
si une page importe `ForumEditor.vue` via auto-import (Nuxt 4 ne peut pas
deviner que seul forum/new + forum/topic l'utilisent sans `<Lazy*>`).

- Action : renommer `components/forum/ForumEditor.vue` →
  utiliser via `<LazyForumEditor>` dans les pages forum (auto-prefix `Lazy*`
  fourni par Nuxt). Aucun import statique nulle part ailleurs ne doit
  rester.
- Vérifier : `Grep "ForumEditor"` ne doit matcher que les pages forum.
- Gain : **~150-200 KB gzip** retiré du chunk initial des pages forum
  (le panneau d'édition s'affiche seulement quand l'utilisateur clique sur
  "répondre").

#### d) `@unovis/vue` — scoper aux 3 composants admin

`@unovis/vue` n'est utilisé que dans :
- `components/admin/AdminUsersChart.vue`
- `components/admin/AdminRendersByStatusChart.vue`
- `components/admin/AdminForumActivityChart.vue`
- `components/ui/chart/index.ts` (wrapper shadcn)

- Action : ajouter un `manualChunks` `vendor-charts` regroupant
  `@unovis/vue` + `@unovis/ts`. Utiliser `<LazyAdminUsersChart>` etc.
  dans `pages/admin/analytics.vue` et `pages/admin/index.vue`.
- Gain : **~100 KB gzip** retiré du chunk admin commun, chargé seulement
  sur la page analytics.

#### e) `highlight.js` — importer une seule langue

`assets/css/tailwind.css:5` importe `github-dark.css` (5-10 KB OK).
Mais `lowlight` + `highlight.js` côté JS embarque **193 langages** par
défaut (~600 KB minifié).

- Action : dans la config TipTap de `ForumEditor.vue`, n'enregistrer que
  les langages dont on a vraiment besoin :
  ```ts
  import { createLowlight } from 'lowlight'
  import javascript from 'highlight.js/lib/languages/javascript'
  import typescript from 'highlight.js/lib/languages/typescript'
  import python from 'highlight.js/lib/languages/python'
  const lowlight = createLowlight()
  lowlight.register({ javascript, typescript, python })
  ```
- Gain : **~400-500 KB gzip** sur le chunk forum.

#### f) `lucide-vue-next` — déjà tree-shakable, mais à barrelisé

Les 74 fichiers utilisent des named imports (`import { SparklesIcon }
from 'lucide-vue-next'`). C'est correct, Vite/Rollup tree-shake.
**Aucune action requise**.

Note : `@lucide/vue` (`^1.17.0`) est dans `dependencies` mais **n'est
utilisé nulle part** (0 match). Le retirer.

- Gain : **~10 KB** sur node_modules, 0 sur le bundle (déjà tree-shaked).

### 1.3 Action items prioritaires

| Priorité | Action | Gain estimé (gzip) | Difficulté |
|---|---|---|---|
| P0 | Limiter `highlight.js` à 5 langages dans `ForumEditor.vue` | 400 KB | Faible |
| P0 | `<LazyForumEditor>` + retirer import statique | 150-200 KB | Faible |
| P1 | `<LazyAdmin*Chart>` dans pages admin | 100 KB | Faible |
| P1 | Dynamic-import des loaders Three.js par extension | 200-400 KB | Moyenne |
| P2 | Ajouter chunk `vendor-three` + `vendor-charts` aux `manualChunks` | indirect | Triviale |
| P2 | Retirer `@lucide/vue` (inutilisé) | 0 (déjà tree-shaked) | Triviale |
| P3 | Décider zod vs yup et retirer le perdant | 50 KB | Faible |

---

## Section 2 — Web Vitals statiques (statique grep)

Cible Web Vitals (réf. Google) : **LCP < 2.5s · CLS < 0.1 · INP < 200ms**
sur 4G mobile.

### 2.1 `pages/index.vue`

**LCP candidate** : `<img src="/images/generate/image_generate.png">` ligne 81.

- **Pas de `width` / `height`** → contribue au CLS (le navigateur réserve
  pas la place).
- **Pas de `fetchpriority="high"`** → le browser le télécharge en
  priorité moyenne. Pour un hero LCP, **doit être `fetchpriority="high"`**.
- **Pas de `loading="eager"`** explicite. Par défaut c'est eager pour les
  images above-the-fold, donc OK. Mais `preload` HTTP serait mieux.
- **Avatars** `https://i.pravatar.cc/100?img=N` (lignes 597-602) :
  dépendance à un service tiers externe pour de la décoration → TTFB
  imprévisible, point de défaillance unique. À remplacer par des assets
  locaux ou des placeholders SVG.

**CLS risk** :
- Tous les blocs de `<Avatar>` (lignes 60-64) ont une class `h-8 w-8` qui
  fixe la taille → OK.
- Le hero image `aspect-[4/3]` dans son conteneur (ligne 78) réserve
  l'espace → bon point. Mais `<img>` lui-même n'a pas de `width`/`height`.
  Risque résiduel si l'aspect-ratio CSS ne s'applique pas (Tailwind 4
  inline preflight).

**INP risk** : les handlers de la home sont des `NuxtLink` → pas de
JavaScript bloquant. OK.

**Solutions concrètes** :
```vue
<img
  src="/images/generate/image_generate.png"
  alt="Éditeur 3D VizHome"
  width="800"
  height="600"
  fetchpriority="high"
  loading="eager"
  decoding="async"
  class="object-cover w-full h-full"
/>
```

Plus `useHead` dans `pages/index.vue` :
```ts
useHead({
  link: [
    { rel: 'preload', as: 'image', href: '/images/generate/image_generate.png',
      fetchpriority: 'high' }
  ]
})
```

### 2.2 `pages/features/auto-3d.vue`

7 `<img>` tous sur la même URL `/images/generate/image_generate.png`
(lignes 25, 174, 184, 209, 219, 243, 253).

- Aucun `width`/`height` sur ces 7 balises.
- Aucun `loading="lazy"` sur les images below-the-fold (lignes 174+
  sont dans des `<TabsContent>` souvent invisibles).
- Image hero ligne 25 : LCP candidate, pas de `fetchpriority="high"`.

**Solution** :
```vue
<!-- Hero, ligne 25 -->
<img src="..." width="960" height="540" fetchpriority="high" loading="eager" decoding="async" />

<!-- Tabs (below-the-fold), lignes 174+ -->
<img src="..." width="800" height="450" loading="lazy" decoding="async" />
```

### 2.3 `pages/render/index.vue`

Pas d'image dans le template — juste un `<canvas>`. **LCP probable** :
le canvas Three.js après initialisation (ligne 4). Comme c'est interactif
et lazy (`initThree()` est appelé `onMounted`), le LCP est par nature
tardif (~1-2s sur 4G).

**Risques** :
- `useThreeModels.ts` charge **6 loaders + Three.js** au mount (synchrone
  via `initLoaders()`, ligne 81). C'est ~200 KB gzip de JS au-dessus du
  canvas → INP de la première interaction lourde.
- Pas de skeleton/placeholder pendant `initThreeJS()` → page blanche.

**Solutions** :
- Ajouter `<Suspense>` avec un fallback `<RenderSkeleton />` (canvas
  placeholder avec spinner).
- Dynamic-imports dans `useThreeModels.ts` (cf. section 1.2.a).
- Préfetcher `vendor-three` via `<link rel="modulepreload">` quand
  l'utilisateur arrive sur une page qui mène à `/render`.

### 2.4 Fonts

`assets/css/tailwind.css:7-13` : `@font-face` avec `font-display: swap`.
**OK** — pas de FOIT.

Mais :
- Police custom `PPAgrandir-GrandHeavy.otf` (format `opentype`) → pas le
  format optimal. Préférer `.woff2` (~50% plus léger).
- Pas de `<link rel="preload" as="font" type="font/woff2" crossorigin>` dans
  `nuxt.config.ts` `app.head.link`. Ajouter pour éviter le FOUT sur le H1.

### 2.5 Scripts inline / CSP

Aucun `<script inline>` ni `<script src=` brut dans `pages/`. Nuxt
génère tous les scripts via Rollup. **OK** pour la CSP.

---

## Section 3 — Code splitting actuel

### 3.1 État actuel (`nuxt.config.ts:109-120`)

```ts
manualChunks(id: string): string | undefined {
  if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/'))
    return 'vendor-vue'
  if (id.includes('node_modules/reka-ui/'))
    return 'vendor-ui'
  if (id.includes('node_modules/@tiptap/'))
    return 'vendor-tiptap'
  return undefined
}
```

3 chunks vendor déclarés. Tout le reste va dans des chunks per-route
auto-générés par Nuxt.

### 3.2 Chunks à ajouter (suggestion)

```ts
// vendor-three : tous les fichiers Three.js (core + addons + GLTF/OBJ/FBX)
if (id.includes('node_modules/three/') || id.includes('node_modules/three/examples/'))
  return 'vendor-three'

// vendor-charts : Unovis (charts admin)
if (id.includes('node_modules/@unovis/'))
  return 'vendor-charts'

// vendor-icons : Lucide
if (id.includes('node_modules/lucide-vue-next/'))
  return 'vendor-icons'

// vendor-validation : vee-validate + yup (utilisés sur auth/account)
if (id.includes('node_modules/vee-validate/') ||
    id.includes('node_modules/yup/') ||
    id.includes('node_modules/@vee-validate/'))
  return 'vendor-validation'

// vendor-highlight : highlight.js + lowlight (forum-scoped)
if (id.includes('node_modules/highlight.js/') ||
    id.includes('node_modules/lowlight/'))
  return 'vendor-highlight'

// vendor-tanstack-table : pour les pages admin avec data tables
if (id.includes('node_modules/@tanstack/'))
  return 'vendor-tanstack'
```

### 3.3 Page-level lazy hydration

Pages déjà en `ssr: false` (à conserver) :
- `pages/forum/**` (3 pages — TipTap browser-only)
- `pages/admin/**` (8 pages — sidebar shadcn + state lourd)
- `pages/support/**` (3 pages)
- `pages/account/billing.vue` (Stripe)

Pages **encore à passer en lazy** :
- `pages/render/index.vue` : déjà `layout: 'none'`, mais Three.js est
  chargé au mount. Ajouter `definePageMeta({ ssr: false })` car le
  canvas WebGL est browser-only de toute façon → on évite que Nuxt SSR
  parse les composables Three.js.
- `pages/projects/index.vue` : data-dependant client-side, gain modeste.

**Composants à passer en `<Lazy*>`** :
- `<LazyForumEditor>` partout (forum/new, forum/topic/[id])
- `<LazyAdminUsersChart>`, `<LazyAdminRendersByStatusChart>`,
  `<LazyAdminForumActivityChart>` dans `pages/admin/analytics.vue` et
  `pages/admin/index.vue`
- `<LazyCodeBlock>` si utilisé hors forum (CodeBlock embarque highlight.js)

---

## Section 4 — Suivi continu

### 4.1 Relancer l'audit

```bash
npm run analyze
```

Génère :
- `analyze-bundle.html` à la racine (gitignored) — treemap interactif
- Récap CLI top 10 chunks dans le terminal

### 4.2 Budgets cibles

| Métrique | Cible | Marge alerte |
|---|---|---|
| JS initial chunk (home `index.vue`) | < 200 KB gzip | 220 KB |
| Total JS home page | < 500 KB gzip | 600 KB |
| LCP (home, 4G simulé) | < 2.5s | 2.8s |
| CLS (toutes pages marketing) | < 0.1 | 0.15 |
| INP (toutes pages) | < 200ms | 300ms |
| Three.js bundle isolé | < 350 KB gzip | 450 KB |
| Forum bundle (sans highlight.js) | < 250 KB gzip | 300 KB |

### 4.3 Instrumentation prod (web-vitals)

À brancher via un endpoint backend dédié (`POST /api/v1/_metrics/web-vitals`,
à créer côté Django) qui aggrège les métriques pour les exposer à
OpenTelemetry ou un futur dashboard Grafana.

```ts
// plugins/web-vitals.client.ts
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

export default defineNuxtPlugin(() => {
  const reporter = (metric) => {
    navigator.sendBeacon('/api/v1/_metrics/web-vitals', JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      path: location.pathname,
    }))
  }
  onCLS(reporter)
  onINP(reporter)
  onLCP(reporter)
  onFCP(reporter)
  onTTFB(reporter)
})
```

Ajouter `web-vitals` (`^4.x`) en `dependencies` quand cet agent atterrit.

### 4.4 Lighthouse-CI (futur)

Recommandation pour un job CI dédié (à brancher dans `.github/workflows/`)
plus tard :

```yaml
- uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      http://localhost:3000/
      http://localhost:3000/features/auto-3d
      http://localhost:3000/pricing
    budgetPath: ./.lighthouse/budgets.json
    uploadArtifacts: true
```

Avec un budget JSON simple :
```json
[{
  "path": "/*",
  "timings": [
    { "metric": "first-contentful-paint", "budget": 2000 },
    { "metric": "largest-contentful-paint", "budget": 2500 },
    { "metric": "interactive", "budget": 3500 }
  ],
  "resourceSizes": [
    { "resourceType": "script", "budget": 500 }
  ]
}]
```

---

## Section 5 — Quick wins prêts à coder

Chaque entrée est un changement isolable, mesurable et testable en moins
de 30 minutes.

### 1. `pages/index.vue:81` — Image hero LCP optimisée

Ajouter `width`, `height`, `fetchpriority="high"`, `decoding="async"`.

```diff
- <img
-   src="/images/generate/image_generate.png"
-   alt="Éditeur 3D VizHome"
-   class="object-cover w-full h-full"
- />
+ <img
+   src="/images/generate/image_generate.png"
+   alt="Éditeur 3D VizHome"
+   width="960"
+   height="720"
+   fetchpriority="high"
+   decoding="async"
+   class="object-cover w-full h-full"
+ />
```

**Gain** : LCP -200 à -400 ms, CLS -0.05.

### 2. `pages/features/auto-3d.vue:25` — Même traitement sur le hero feature

Idem, sur la balise ligne 25 (hero) + `loading="lazy"` sur les 6 autres
images dans les `<TabsContent>` (lignes 174, 184, 209, 219, 243, 253).

### 3. `package.json:44` — Retirer `@lucide/vue` (inutilisé)

```diff
- "@lucide/vue": "^1.17.0",
```

Vérifier ensuite que `grep -r "@lucide/vue"` ne matche que `package.json`.

### 4. `pages/index.vue:597-602` — Remplacer `i.pravatar.cc` par des assets locaux

```diff
- const avatars = [
-   'https://i.pravatar.cc/100?img=1',
-   'https://i.pravatar.cc/100?img=2',
-   ...
- ]
+ const avatars = [
+   '/images/avatars/avatar-1.webp',
+   '/images/avatars/avatar-2.webp',
+   ...
+ ]
```

**Gain** : élimine 4 requêtes externes, TTFB hero -100 à -300 ms,
ferme un vecteur de single-point-of-failure tiers.

### 5. `pages/render/index.vue:45` — Ajouter `ssr: false`

```diff
- definePageMeta({ layout: 'none', middleware: 'auth' })
+ definePageMeta({ layout: 'none', middleware: 'auth', ssr: false })
```

**Gain** : Three.js et ses 6 loaders ne sont plus parsés côté SSR Nitro,
réduit le bundle SSR de ~200 KB, accélère le TTFB de `/render`.

### 6. `components/forum/ForumEditor.vue` — Restreindre highlight.js à 5 langages

Sans modifier le code (juste la config interne TipTap), passer de
"193 langages auto" à `javascript`, `typescript`, `python`, `bash`, `json`.

**Gain** : ~400 KB gzip retiré du chunk `vendor-tiptap` (qui devient
de fait `vendor-forum`).

### 7. `pages/forum/new.vue` + `pages/forum/topic/[id].vue` — `<LazyForumEditor>`

```diff
- <ForumEditor v-model="content" />
+ <LazyForumEditor v-model="content" />
```

**Gain** : 150-200 KB gzip retiré du chunk initial forum, l'éditeur ne
se charge qu'au clic sur "répondre" ou à l'ouverture de `/forum/new`.

### 8. `pages/admin/analytics.vue` + `pages/admin/index.vue` — `<Lazy*Chart>`

```diff
- <AdminUsersChart :data="..." />
+ <AdminUsersChart v-if="false" /> <!-- pour garder l'auto-import -->
+ <LazyAdminUsersChart :data="..." />
```

(retirer la première ligne, garder juste la deuxième). **Gain** :
`@unovis/vue` + `@unovis/ts` (~100 KB gzip) retirés du chunk admin commun.

### 9. `nuxt.config.ts:109` — Ajouter `vendor-three` au `manualChunks`

(Cet agent **ne peut pas** toucher `nuxt.config.ts` — quick win à
déléguer à un autre passe.)

```ts
if (id.includes('node_modules/three/')) return 'vendor-three'
```

**Gain** : Three.js isolé dans un chunk identifiable, cachable
indépendamment du reste, et pré-fetchable via `<link rel="modulepreload">`
depuis la home.

### 10. `composables/useThreeModels.ts:5-11` — Dynamic-import des loaders

Transformer :
```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// ...
```
En :
```ts
async function getGLTFLoader() {
  const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
  return new GLTFLoader()
}
```

Et n'instancier que le loader correspondant à l'extension du fichier
importé dans `_loadFromFile`. **Gain** : 200-400 KB gzip sur le bundle
initial de `/render`, charge à la demande.

---

## Annexe — Fichiers livrés par cet audit

| Fichier | Rôle |
|---|---|
| `scripts/analyze-bundle.mjs` | Lance le build avec visualizer + recap CLI |
| `nuxt.config.analyze.ts` | Config Nuxt qui étend la principale + `rollup-plugin-visualizer` |
| `package.json` | + `"analyze"` script + `rollup-plugin-visualizer` devDep |
| `.gitignore` | + `analyze-bundle.html` |
| `docs/PERFORMANCE_AUDIT.md` | Ce document |
