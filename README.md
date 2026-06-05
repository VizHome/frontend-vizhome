# VizHome Frontend

<div align="center">
  <img src="./public/images/logo/LogoBlack.png" alt="VizHome" width="120">
</div>


> Application **Nuxt 4 + Vue 3** pour VizHome — éditeur 3D Three.js
> (sketch / prompt IA / 3D pro), forum, support helpdesk, espace utilisateur.

[![CI](https://github.com/VizHome/frontend-vizhome/actions/workflows/ci.yml/badge.svg)](https://github.com/VizHome/frontend-vizhome/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/VizHome/frontend-vizhome)](https://github.com/VizHome/frontend-vizhome/releases)
[![Docker](https://img.shields.io/badge/ghcr.io-vizhome--frontend-blue)](https://github.com/VizHome/frontend-vizhome/pkgs/container/vizhome-frontend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=VizHome_frontend-vizhome&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=VizHome_frontend-vizhome)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=VizHome_frontend-vizhome&metric=coverage)](https://sonarcloud.io/summary/new_code?id=VizHome_frontend-vizhome)

---

## ✨ Features

- [x] 🎨 **Éditeur 3D Three.js** : 3 modes (Croquis 2D / Prompt IA / 3D Pro), import GLB/OBJ/FBX/STL, TransformControls, presets éclairage, météo, navigation orbit/FPS/top-down/tour
- [x] 📐 **Sérialisation scène** : sauvegarde caméra/lumières/transforms/météo dans `Project.scene` (PostgreSQL JSONField)
- [x] 🖼 **Galerie rendus IA** : polling 2s sur status, prévisualisation, partage public
- [x] 💬 **Forum** : timeline GitHub-style (avatar externe + card avec arrow notch), TipTap WYSIWYG, images via MinIO
- [x] 🆘 **Support helpdesk** : tickets avec messages threading, ForumEditor pour formatage riche
- [x] 👨‍💼 **Admin panel** : sidebar shadcn-vue, dashboard KPI, drill-downs (users/renders/forum/support), audit log, charts unovis, CSV export
- [x] 💳 **Page billing** : plans + subscription + invoices Stripe, upgrade en 1 click
- [x] 🌐 **OAuth** : Google + GitHub via authorization code flow (PKCE-style)
- [x] 🎭 **i18n** : fr / en / es / de (vue-i18n)
- [x] 🌓 **Theme** : light/dark/system via `@nuxtjs/color-mode`

## 🛠 Stack

| Couche | Tech |
|---|---|
| Framework | Nuxt 4 + Vue 3 + TypeScript |
| UI | shadcn-vue 2 (wrapping reka-ui) + Tailwind CSS 4 |
| State | Composables singletons (refs hoistés au module-scope, **pas de Pinia**) |
| 3D | Three.js 0.183 |
| Forms | vee-validate + yup |
| Rich text | TipTap 2 + lowlight (codeblock highlight) |
| Charts | @unovis/vue |
| Icons | lucide-vue-next |
| Tests | Vitest + jsdom |
| Lint | ESLint flat config |
| Auth storage | JWT en localStorage + refresh automatique sur 401 |

## 🚀 Quick start

### Sans Docker (dev)

```bash
git clone https://github.com/VizHome/frontend-vizhome.git
cd frontend-vizhome

cp .env.example .env
# Édite .env : NUXT_API_PROXY_TARGET, NUXT_PUBLIC_GOOGLE_CLIENT_ID, etc.

npm install
npm run dev
# → http://localhost:3000
```

⚠️ Le backend doit tourner en parallèle (cf `backend-vizhome/README.md`).
Le proxy Nitro forward `/api/*` et `/webhooks/*` vers `NUXT_API_PROXY_TARGET`
(défaut `http://localhost:8000`).

### Avec Docker

```bash
docker compose -f docker-compose.dev.yml up -d
```

## 📜 Commandes

```bash
npm run dev              # serveur dev avec HMR
npm run build            # build SSR (.output/)
npm run generate         # build statique (.output/public/)
npm run preview          # preview de la build prod
npm run lint             # eslint --fix .
npm run test             # vitest (run)
npm run test:ui          # vitest UI
npm run test:coverage    # vitest avec coverage v8
npm run typecheck        # nuxi typecheck
```

## 📂 Structure

```
.
├── pages/                routing auto Nuxt
│   ├── render/           éditeur 3D (canvas + sketch + prompt)
│   ├── projects/         galerie projets
│   ├── gallery/          rendus IA
│   ├── forum/            forum (categories, topics, replies)
│   ├── support/          tickets helpdesk
│   ├── account/billing/  abonnement + factures
│   └── admin/            panel admin (sidebar)
│
├── layouts/              none / default / app / forum / support / admin / sidebar
├── components/
│   ├── ui/               shadcn-vue (44 composants)
│   ├── render/           RenderModeBar, PromptPanel, SketchCanvas, ThreeControls
│   ├── forum/            ForumEditor (TipTap), ForumContent, ForumReplyCard…
│   ├── admin/            AdminSidebar, AdminMetricCard
│   └── user/             SettingsDialog (9 sections), HelpDialog
│
├── composables/          36 composables singletons
│   ├── useAuth, useUser, useApi, useBilling, use2fa
│   ├── useProjects, useRenderMode, useSceneSerializer
│   ├── useForum, useSupport
│   ├── useAdmin*, useThree*
│
├── middleware/           auth, guest, staff
├── plugins/              auth.client.ts
├── tests/                Vitest (unit + composables)
└── nuxt.config.ts        proxy Nitro + SEO + Vite optim
```

Détails : `docs/STRUCTURE.md`, `docs/ARCHITECTURE.md`, `docs/CONTRIBUTING.md`.

## 🧪 Tests

```bash
npm run test                                         # tous les tests unit
npm run test -- tests/composables/useAuth           # un seul fichier
npm run test:coverage                               # avec rapport coverage v8
npm run test -- --reporter=verbose                  # détail
```

Suite actuelle (12 tests passants) : `useRenderMode`, `useAuth`, `plainTextLength`.

Pour ajouter un test composable :
```ts
// tests/composables/useXxx.test.ts
import { describe, expect, it, vi } from 'vitest'

async function freshModule() {
  vi.resetModules()
  return (await import('~/composables/useXxx')).useXxx()
}

describe('useXxx', () => {
  it('foo', async () => {
    const x = await freshModule()
    expect(x.bar.value).toBe('baz')
  })
})
```

## 🔁 CI / CD

| Trigger | Workflow | Action |
|---|---|---|
| Push `main`/`dev` ou PR | `ci.yml` | lint, typecheck, tests+coverage, build Nuxt, build Docker, smoke, Trivy, npm audit |
| Push `main` | `release.yml` | release-please PR → tag + GitHub Release + image GHCR multi-arch + SBOM |
| Push `dev` | `pre-release.yml` | image `dev-<sha>` + GitHub Pre-Release |
| PR | `pr-checks.yml` | titre Conventional Commits + size label + TruffleHog |

Tous les commits doivent suivre **[Conventional Commits](https://www.conventionalcommits.org/)** — détails dans `.github/CONTRIBUTING_CI.md`.

### Secrets GitHub requis

- `GH_PAT` : Personal Access Token (scopes `repo`, `write:packages`)
- `SONAR_TOKEN` + `SONAR_HOST_URL` : SonarCloud/SonarQube
- `CODECOV_TOKEN` (optionnel)

## 🌐 Variables d'environnement clés

```env
# Proxy backend (Nitro routeRules)
NUXT_API_PROXY_TARGET=http://localhost:8000

# Override de l'API URL côté frontend (par défaut relatif via proxy)
# NUXT_PUBLIC_API_URL=/api/v1

# OAuth (cf .env.example pour tous les détails)
NUXT_PUBLIC_GOOGLE_CLIENT_ID=...apps.googleusercontent.com
NUXT_PUBLIC_GITHUB_CLIENT_ID=Iv1...
```

## 🤝 Contribution

1. Branche `feat/<nom>` ou `fix/<nom>` depuis `dev`
2. Code + tests + docs si applicable
3. PR vers `dev` avec un titre Conventional Commits (`feat(auth): …`)
4. Merge sur `dev` → pre-release auto
5. Quand prêt : PR `dev → main` → release-please prend le relais

## 📄 License

[MIT](LICENSE)
