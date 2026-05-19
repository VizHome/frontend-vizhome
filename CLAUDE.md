# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical rule — keep `docs/` in sync

Every structural or behavioral change **must** be reflected in `docs/` in the
**same commit** as the code change. Doc updates are part of "done", not a
follow-up task.

| Type de changement | Fichier(s) à éditer |
|---|---|
| Nouveau composable, page, composant, layout, plugin, middleware | `docs/STRUCTURE.md` |
| Nouveau pattern (singleton, polling, presigned…), refacto | `docs/ARCHITECTURE.md` |
| Nouveau script npm, outil de debug, workflow de test | `docs/DEVELOPMENT.md` |
| Nouvelle variable d'env, étape de deploy | `docs/DEPLOYMENT.md` + `.env.example` |
| Nouvelle convention Vue, règle ESLint, usage shadcn-vue | `docs/CONTRIBUTING.md` |
| Nouveau composable critique | mention dans `STRUCTURE.md` **et** `ARCHITECTURE.md` |

## Commands

```bash
npm run dev          # nuxt dev → http://localhost:3000
npm run build        # SSR build → .output/
npm run generate     # static build → .output/public/
npm run preview      # nuxt preview
npm run lint         # eslint --fix .
npm run test         # vitest (interactive)
npm run typecheck    # nuxi typecheck
```

Single test: `npx vitest run path/to/file.spec.ts` or
`npx vitest run -t "test name pattern"`.

Backend API expected at `http://localhost:8000` (Django). Configure via
`NUXT_PUBLIC_API_URL` in `.env`.

## Architecture

### Composables singletons — the core pattern

There is **no Pinia**. State is managed by composables whose `ref()`s are
**hoisted at module scope** (not inside the exported function). Every call
to `useAuth()` returns the same `tokens`, every call to `useProjects()`
shares the same `projects` array. This is intentional — verify it before
adding a new composable.

```ts
// composables/useFoo.ts — CORRECT pattern
const state = ref<Foo | null>(null)  // ← module-level, shared

export function useFoo() {
  function load() { /* mutates state */ }
  return { state, load }
}
```

### The 25 composables (by domain)

**Backend integration** (5)
- `useApi` — `$fetch` wrapper with JWT auto-injection + 401 retry via refresh
- `useAuth` — login/register/logout/refresh + OAuth + 2FA verify
- `useUser` — profile + stats + preferences (API-driven)
- `useBilling` — plans + subscription + Stripe checkout
- `use2fa` — TOTP setup/verify/disable

**Domain** (5)
- `useProjects` — CRUD + scene state save + **presigned MinIO upload**
- `useAiRender` — POST `/renders/` → poll every 2s → prepend to gallery
- `useGallery` — paginated renders gallery
- `useSceneSerializer` — marshal Three.js state to/from PostgreSQL JSONField
- `useRenderMode` — active render page mode (sketch / prompt / screenshot)

**Three.js — core** (5)
- `useThreeScene` — renderer, camera, OrbitControls, animation loop
- `useThreeModels` — GLTF/OBJ/FBX/STL import + TransformControls + auto-upload
- `useThreeLighting` / `useThreeLightingPresets` — day/night cycle, mood presets
- `useThreeAudio` — ambient sound (Web Audio API)

**Three.js — navigation** (4)
- `useThreeNavigation` — orchestrator
- `useThreeFirstPerson` — PointerLockControls
- `useThreeTopDown` — orthographic pan+zoom
- `useThreeTour` — CatmullRom auto camera path

**Three.js — scene content** (6)
- `useThreeAnnotations` — 3D raycasted hotspots
- `useThreeMeshSelect` — raycasting + texture assignment
- `useThreeElements` — trees, fence, garden, path, clouds, seasons
- `useThreeHouse` — procedural house + colors + door + rotation
- `useThreeWeather` — rain, snow, fog, smoke, fireflies
- `useSketchCanvas` — 2D drawing (pencil/eraser/shapes/fill)

### Layouts (3)

- `default.vue` — marketing/legal pages (header + footer)
- `sidebar.vue` — internal docs layout
- `none.vue` — auth pages + render editor (no chrome)

### Middleware

- `auth.ts` — redirects to `/auth/login` if not authenticated
- `guest.ts` — inverse, for `/auth/*` pages

### Plugins

- `auth.client.ts` — boots from localStorage, fetches `/me` to hydrate `useUser`

### Non-obvious patterns to preserve

1. **shadcn-vue uses `reka-ui`** (not `radix-vue`). Components import from
   `reka-ui`. Consequence: **`v-model` works directly** — do not use
   `v-model:checked` on `Checkbox`, it silently fails.

2. **Presigned MinIO upload flow** (`useProjects.uploadModelToCurrentProject`):
   1. `POST /projects/{id}/models/upload-url` → returns presigned PUT URL + headers
   2. Browser `PUT` file directly to MinIO (bypasses Django)
   3. `POST /projects/{id}/models/confirm` with key → backend creates `ImportedModel`
   - Supports MTL files for OBJ imports.

3. **`useApi` 401 retry loop** — auto-injects `Bearer <access>`, on 401 calls
   `auth.refreshAccessToken()` then retries once. On refresh failure, logs
   out. Don't catch 401 manually in callers.

4. **Three.js model auto-upload** — `useThreeModels` stores File refs
   (`_pendingFile`, `_pendingMtlFile`) and exposes `_autoUploadLastModel` +
   `syncAllUnsynced` for deferred upload when project context becomes
   available.

5. **`<script setup lang="ts">` everywhere** — no Options API.

### Stack (confirmed in `package.json`)

Nuxt 4.3.1 · Vue 3.5.30 · Tailwind 4.2.1 (via `@tailwindcss/vite`) ·
shadcn-vue 2.6.2 (wrapping reka-ui 2.9.1) · Three.js 0.183.2 ·
vee-validate 4.15.1 + yup 1.7.1 · lucide-vue-next · `@tanstack/vue-table`

### `nuxt.config.ts` modules

`@nuxt/eslint`, `@nuxt/test-utils`, `shadcn-nuxt`, `@nuxtjs/color-mode`.

No `extends`. No custom dev port (uses default 3000). Experimental:
`viewTransition: true`, `typedPages: true`. Build: manual chunks
(`vendor-vue`, `vendor-ui`), Three.js transpiled, `compressPublicAssets`.

### Reference docs

- `docs/STRUCTURE.md` · `docs/ARCHITECTURE.md` · `docs/DEVELOPMENT.md` ·
  `docs/DEPLOYMENT.md` · `docs/CONTRIBUTING.md`
- `README.md` — onboarding public (stack, scripts, structure)

## Conventions

- `<script setup lang="ts">` mandatory, no Options API
- Composable singletons over Pinia (refs at module scope)
- `v-model` on shadcn-vue components (no `:checked`, `:value`, etc.)
- Auto-imports active for composables + components — no manual `import`
- Protected routes: `definePageMeta({ middleware: 'auth' })`
- Commits: Conventional Commits
