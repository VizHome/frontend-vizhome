# Structure du projet — frontend-vizhome

Vue arborescente complète du frontend Nuxt 4.

## Arborescence racine

```
frontend-vizhome/
├── app.vue                       point d'entrée Vue racine
├── nuxt.config.ts                config Nuxt (modules, runtimeConfig, vite)
├── tsconfig.json
├── components.json               config shadcn-vue
├── eslint.config.mjs
├── .lintstagedrc.mjs
├── .prettierrc / .prettierignore
├── .env / .env.example
├── package.json / package-lock.json
│
├── assets/css/
│   └── tailwind.css              imports Tailwind + customisation
│
├── public/                       assets statiques (favicon, images)
│
├── composables/                  ★ logique métier réutilisable (singletons)
├── components/                   composants Vue (UI + métier)
├── pages/                        routing auto par fichiers
├── layouts/                      layouts globaux
├── middleware/                   route middlewares (auth, guest)
├── plugins/                      plugins Nuxt (auth.client)
├── i18n/                         translations fr / en / es / de
├── server/                       endpoints Nitro internes (vide)
├── lib/utils.ts                  cn() Tailwind merger
├── tests/                        tests Vitest
│
├── docker-compose.dev.yml        stack dev avec HMR
├── docker-compose.prod.yml       stack prod (Nuxt build static)
├── Dockerfile / Dockerfile.dev
└── README.md
```

## Composables

```
composables/
├── useApi.ts                     ★ wrapper $fetch + JWT auto-injection + refresh sur 401
├── useAuth.ts                    ★ login/register/logout/refresh + OAuth + 2FA verify
├── useUser.ts                    profil + stats + préférences (API-driven, ex localStorage)
├── useBilling.ts                 plans + subscription + invoices + Checkout Stripe
├── use2fa.ts                     setup TOTP + verify + disable
├── useProjects.ts                CRUD projets + save scene + upload presigned MinIO
├── useGallery.ts                 galerie paginée des renders
├── useAiRender.ts                pipeline async POST /renders + polling 2s
├── useSceneSerializer.ts         capture/restaure état Three.js (caméra, lumières, etc.)
├── useRenderMode.ts              mode actif (sketch | prompt | 3d)
├── useSketchCanvas.ts            canvas 2D vectoriel (pencil, eraser, shapes)
├── useForum.ts                   ★ forum communautaire — categories, topics, replies (CRUD)
└── useThree*.ts                  12 composables Three.js (scene, models, lighting, weather, navigation…)
```

### Composables Three.js détaillés

```
useThreeScene.ts                  init renderer, animation loop, resize handler
useThreeModels.ts                 import GLB/OBJ/FBX/STL, TransformControls, presigned auto-upload
useThreeLighting.ts               directional + ambient lights
useThreeLightingPresets.ts        sunrise / sunset / noon / night / studio
useThreeWeather.ts                clear / cloudy / rain / fog
useThreeNavigation.ts             orbit / first_person / top_down / tour
useThreeFirstPerson.ts            WASD + saut + souris
useThreeTopDown.ts                vue plan
useThreeTour.ts                   tour automatique
useThreeElements.ts               sol + skybox
useThreeHouse.ts                  scène demo
useThreeAnnotations.ts            notes 3D positionnées
useThreeMeshSelect.ts             sélection raycaster
useThreeAudio.ts                  ambiance audio (optionnel)
```

## Pages (routing auto Nuxt)

```
pages/
├── index.vue                     home avec hero conditionné sur isAuthenticated
├── pricing.vue
├── about.vue
├── contact.vue
├── faq.vue
├── testimonials.vue
│
├── auth/
│   ├── login.vue                 email + password + Google + GitHub + 2FA challenge
│   ├── register.vue              first/last/email/password + acceptation CGU
│   ├── forgot-password.vue       envoi mail reset
│   ├── reset-password.vue        page liée au mail reset (uid + token)
│   └── oauth/github/callback.vue échange code GitHub
│
├── render/
│   └── index.vue                 ★ éditeur 3D + sketch + prompt (middleware: auth)
│
├── projects/
│   └── index.vue                 galerie projets sauvegardés (middleware: auth)
│
├── gallery/
│   └── index.vue                 galerie rendus IA (middleware: auth)
│
├── features/
│   ├── index.vue
│   ├── auto-3d.vue
│   ├── collaboration.vue
│   ├── materials.vue
│   ├── intelligent-lighting.vue
│   ├── 360-views.vue
│   └── mobile-apps.vue
│
├── forum/                        ★ forum communautaire (layout: 'forum')
│   ├── index.vue                 hub : catégories + activité récente
│   ├── [category].vue            liste topics d'une cat + search + sort + pagination
│   ├── topic/
│   │   └── [id].vue              détail topic + replies + form reply + actions owner/staff
│   └── new.vue                   form création topic (auth requise, `?category=<slug>` pré-sélection)
│
└── legal/
    ├── privacy-policy.vue
    ├── terms-of-use.vue
    ├── cookie-policy.vue
    ├── data-processing.vue
    ├── refund-cancellation-policy.vue
    ├── responsible-use-policy.vue
    └── specific-service-terms.vue
```

## Components

```
components/
├── ui/                           ★ shadcn-vue (button, card, dialog, dropdown…)
│   └── (44 composants UI atomic, importés au besoin)
│
├── AppLogo.vue                   logo réactif au theme
├── AppNavbar.vue                 navbar publique (pages marketing) — inclut lien /forum
├── AppFooter.vue
├── AppSidebar.vue                drawer mobile + sidebar
├── ModeToggle.vue                light/dark/system switcher
├── LanguageSwitcher.vue          fr/en/es/de
├── PasswordStrength.vue          indicateur force mdp
├── InteractiveGridPattern.vue    fond animé (auth pages)
├── CodeBlock.vue                 ★ bloc de code coloré (highlight.js) + bouton copier
├── FAQAccordion.vue              accordion FAQ avec support CodeBlock inline
│
├── UserNav.vue                   ★ bulle utilisateur (avatar + dropdown)
├── ProjectCard.vue               carte projet dans /projects
├── ProjectTopBar.vue             bandeau projet ouvert dans /render
├── SaveProjectDialog.vue         dialog "Sauvegarder comme…"
│
├── render/                       composants spécifiques à /render
│   ├── RenderModeBar.vue         barre de switch sketch/prompt/3d
│   ├── RenderOverlays.vue
│   ├── PromptPanel.vue           textarea + suggestions + historique
│   ├── SketchCanvas.vue          canvas 2D vectoriel
│   ├── ScreenshotRenderPanel.vue
│   ├── ThreeControls.vue         panneau de contrôles 3D
│   ├── OnboardingOverlay.vue     première visite
│   └── ToolButton.vue
│
├── user/                         dialogs accessibles via UserNav
│   ├── ProfileDialog.vue
│   ├── SettingsDialog.vue        7 sections (apparence, langue, notif, 2FA, sessions…)
│   ├── SubscriptionDialog.vue
│   ├── BillingDialog.vue
│   ├── StatsDialog.vue
│   └── HelpDialog.vue
│
└── forum/                        ★ composants spécifiques au layout forum
    ├── ForumHeader.vue           barre nav forum (logo, recherche, user menu, cats)
    ├── ForumFooter.vue           footer minimaliste forum
    ├── CategoryCard.vue          carte cliquable d'une catégorie
    ├── TopicCard.vue             carte d'un sujet dans une liste
    └── ReplyCard.vue             carte d'une réponse dans le détail d'un topic
```

## Layouts

```
layouts/
├── default.vue                   avec AppNavbar + AppFooter (pages marketing)
├── sidebar.vue                   avec AppSidebar
├── none.vue                      sans navbar (pages métier, auth)
└── forum.vue                     ★ ForumHeader + ForumFooter (toutes pages /forum/*)
```

Spécification du layout par page via `definePageMeta({ layout: 'forum' })`.

## Middleware

```
middleware/
├── auth.ts                       redirige vers /auth/login si !authenticated
└── guest.ts                      redirige les connectés loin de /auth/*
```

Usage : `definePageMeta({ middleware: 'auth' })`.

## Plugins

```
plugins/
└── auth.client.ts                hydrate les tokens depuis localStorage au boot,
                                  puis fetchMe() pour récupérer le user
```

`.client.ts` ⇒ pas exécuté en SSR.

## Conventions

### Singletons pour le state global

Les composables `useXxx.ts` exposent un état partagé via des `ref`
hoistés au niveau du module :

```ts
const tokens = ref<JwtTokens | null>(null)  // partagé entre toutes les instances

export function useAuth() {
  // ...
  return { tokens, login, logout }
}
```

Pas de Pinia — les composables suffisent pour cette taille de projet.

### Mapping snake_case (API) ↔ camelCase (UI)

Les serializers DRF renvoient du `snake_case`. Les composables font la
conversion vers `camelCase` pour la cohérence Vue/TypeScript :

```ts
function mapStats(api: ApiUserStats): UserStats {
  return {
    rendersThisMonth: api.renders_this_month,
    storageUsedGb: api.storage_used_bytes / 1024**3,
    // ...
  }
}
```

### Auth header automatique

Tous les appels via `useApi()` injectent automatiquement le Bearer JWT
et retry sur 401 après refresh :

```ts
const api = useApi()
const projects = await api('/projects/')  // auth automatique
```

## Tests

```bash
npm run test                  # tous les tests
npm run test:ui               # interface Vitest
npm run test:coverage         # avec couverture
```

Structure :

```
tests/
├── setup.ts                  setup Vitest (auto-imports, etc.)
└── (peu de tests pour l'instant — couverture à renforcer)
```
