# VizHome — Frontend

<div align="center">
  <img src="./public/images/logo/LogoBlack.png" alt="VizHome" width="160" height="160">

  <h3>Plateforme de visualisation 3D architecturale propulsée par l'IA</h3>

  <p>
    <a href="https://app.vizhome.fr">🌐 Application</a> ·
    <a href="https://docs.vizhome.fr">📖 Documentation</a> ·
    <a href="https://api.vizhome.fr/api/docs/">🔧 API</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Nuxt-4.3-00DC82?style=flat-square&logo=nuxt.js&logoColor=white" alt="Nuxt 4">
    <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind 4">
    <img src="https://img.shields.io/badge/Three.js-0.183-000000?style=flat-square&logo=three.js&logoColor=white" alt="Three.js">
  </p>
</div>

---

## À propos

**VizHome** transforme des maquettes et descriptions textuelles en
visualisations 3D photoréalistes via IA. Cette SPA Nuxt 4 sert d'éditeur
de scène (canvas Three.js), de galerie de rendus et d'interface de
facturation.

Backend (Django + DRF) : [`backend-vizhome`](../backend-vizhome) ·
Documentation publique : [`docs-vizehome`](../docs-vizehome)

## Stack

| Couche | Choix |
|---|---|
| Framework | **Nuxt 4.3** (Vue 3.5 + Vite + Nitro) |
| Langage | TypeScript |
| CSS | **Tailwind 4** (via `@tailwindcss/vite`) |
| UI Components | **shadcn-vue 2.6** (wrapping **reka-ui** 2.9) |
| Icônes | `lucide-vue-next` |
| 3D | **Three.js 0.183** (OrbitControls, TransformControls, GLTF/OBJ/FBX/STL loaders) |
| Formulaires | `vee-validate` + `yup` |
| Tableaux | `@tanstack/vue-table` |
| Carousels | `embla-carousel-vue` |
| Dark mode | `@nuxtjs/color-mode` |
| State | **Aucun Pinia** — pattern composables singletons (refs hoistés au niveau module) |
| Tests | Vitest + `@nuxt/test-utils` |
| Lint | ESLint via `@nuxt/eslint` |

> ⚠️ **`reka-ui` (pas `radix-vue`)** — shadcn-vue a migré. Conséquence
> pratique : `v-model` direct sur les composants (jamais `v-model:checked`).

## Architecture en 4 points

1. **25 composables singletons** organisés par domaine (backend, métier,
   Three.js core, Three.js navigation, Three.js scene content). Les `ref()`
   sont déclarés **au niveau module**, donc partagés entre toutes les
   instances appelantes.

2. **`useApi()`** wrappe `$fetch` avec injection JWT automatique + retry
   sur 401 (rafraîchit le token et rejoue). Aucun caller n'a besoin de
   gérer l'auth manuellement.

3. **Upload pré-signé MinIO** : le navigateur PUT le fichier 3D
   directement vers MinIO via une URL signée par le backend. Django ne voit
   jamais le binaire — performant pour gros modèles.

4. **Pipeline de rendu IA** : `useAiRender` POST `/renders/` → polling
   2s sur le détail → quand `status=done`, prepend dans la galerie.

Détails : [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Démarrage rapide

### Prérequis

- Node.js 22+
- Backend tournant sur `http://localhost:8000` (voir [`../backend-vizhome`](../backend-vizhome))

### Installation

```bash
git clone <repo>
cd frontend-vizhome
npm install
cp .env.example .env       # ajuste NUXT_PUBLIC_API_URL si besoin
npm run dev                # → http://localhost:3000
```

### Variables d'environnement

```bash
# .env
NUXT_PUBLIC_API_URL=http://localhost:8000   # backend Django
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

Voir `.env.example` pour le template complet.

## Scripts

```bash
npm run dev          # nuxt dev → http://localhost:3000 (HMR)
npm run build        # SSR build → .output/
npm run generate     # static build → .output/public/
npm run preview      # nuxt preview
npm run lint         # eslint --fix .
npm run test         # vitest (mode interactif)
npm run typecheck    # nuxi typecheck
```

Test ciblé : `npx vitest run path/to/file.spec.ts` ou
`npx vitest run -t "test name"`.

## Structure du repo

```
frontend-vizhome/
├── composables/        ← 25 composables singletons (useApi, useAuth, useThree*, etc.)
├── pages/              ← routing auto (index, /auth/*, /projects/, /render/, /gallery/, /legal/*)
├── components/         ← composants Vue
│   ├── ui/             ← shadcn-vue components (Button, Card, Dialog…)
│   └── ...             ← composants métier
├── layouts/            ← default / sidebar / none
├── middleware/         ← auth.ts, guest.ts
├── plugins/            ← auth.client.ts (boot JWT depuis localStorage)
├── public/             ← assets statiques (logo, favicon, images)
├── assets/             ← CSS Tailwind + ressources buildées
├── nuxt.config.ts
├── tailwind.config.js
├── tsconfig.json
├── eslint.config.mjs
├── CLAUDE.md           ← instructions IA + patterns du repo
└── docs/               ← doc technique pour contributeurs
    ├── STRUCTURE.md
    ├── ARCHITECTURE.md
    ├── DEVELOPMENT.md
    ├── DEPLOYMENT.md
    └── CONTRIBUTING.md
```

## Pages principales

| Route | Rôle |
|---|---|
| `/` | Landing publique (hero + features + pricing CTA) |
| `/auth/login`, `/register`, `/forgot-password`, `/reset-password` | Auth (avec flow 2FA) |
| `/auth/oauth/github/callback` | Callback OAuth GitHub |
| `/projects/` | Liste des projets de l'utilisateur |
| `/render/` | Éditeur 3D (canvas Three.js + génération IA) |
| `/gallery/` | Galerie paginée des rendus IA |
| `/pricing`, `/features/*`, `/about`, `/contact`, `/faq` | Pages marketing |
| `/legal/*` | Mentions légales |

Routes protégées : `definePageMeta({ middleware: 'auth' })`.

## Conventions à respecter

- **`<script setup lang="ts">`** uniquement — pas d'Options API
- **Pattern composable singleton** plutôt que Pinia (refs au niveau module)
- **`v-model` direct** sur les composants shadcn-vue (jamais `:checked`, `:value`…)
- **Auto-import actif** pour composables + components — pas de `import` manuel
- **Conventional Commits** (`feat`, `fix`, `refactor`, `docs`, `chore`)

Détail : [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md).

## Déploiement

Voir [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Options testées :

- **Vercel** — détection auto Nuxt 4, push `main` = deploy
- **Netlify** — `netlify.toml` à créer
- **Cloudflare Pages** — `npm run generate` (statique pur)
- **Self-hosted** — Dockerfile multi-stage + Traefik

## Ressources

- 📖 Documentation publique : https://docs.vizhome.fr
- 🔧 API live : https://api.vizhome.fr/api/docs/
- 📧 Contact : dev@vizhome.fr

## Licence

Propriétaire — © VizHome 2026. Tous droits réservés.
