# Déploiement — frontend-vizhome

Guide de mise en production du frontend Nuxt 4.

## Architecture cible

Le frontend Nuxt rejoint le **Traefik géré par le repo `backend-vizhome`**.
Pas de Traefik dédié côté frontend : on partage le network Docker externe
`vizhome_proxy` créé par le backend.

```
                Internet (HTTPS + HTTP/3)
                       │
                       ▼
              ┌──────────────────┐
              │     Traefik      │  géré par backend-vizhome
              │  vizhome_proxy   │
              └────────┬─────────┘
                       │
       Host(`vizhome.fr`) + Host(`www.vizhome.fr` → redirect apex)
                       │
                       ▼
              ┌──────────────────┐
              │   vizhome-frontend│  Nuxt 4 SSR (port 3000)
              │  - security headers (Traefik)
              │  - compress (Traefik)
              │  - rate-limit (Traefik)
              │  - /api/* proxy Nitro → api.vizhome.fr
              └────────┬─────────┘
                       │
                       ▼  via proxy Nitro côté serveur OU appel direct côté browser
              ┌──────────────────┐
              │  api.vizhome.fr  │  → Django (backend-vizhome)
              └──────────────────┘
```

Avantage de cette architecture :
* Un **seul** instance Traefik à gérer pour tout l'écosystème
* Certificats Let's Encrypt mutualisés
* Middlewares uniformes (security headers, compress, rate-limit) appliqués
  partout sans duplication
* HTTP/3 et HTTP/2 pour le frontend "gratuitement"

## Build Docker

Deux Dockerfiles :

### `Dockerfile` (production)

Multi-stage : compile dans une image lourde, copie l'output dans une
image minimale.

```bash
docker build -t vizhome-app:prod .
docker run --rm -p 3000:3000 vizhome-app:prod
```

Taille finale : ~150 MB.

### `Dockerfile.dev` (dev avec HMR)

Plus lourd mais inclut tous les binaires de dev. Utilisé avec
bind-mount du code source.

```bash
docker compose -f docker-compose.dev.yml up
```

## Variables d'environnement de production

```bash
# .env.prod
NUXT_PUBLIC_API_URL=https://api.vizhome.fr/api/v1
NUXT_PUBLIC_DOCS_URL=https://docs.vizhome.fr

NUXT_PUBLIC_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
NUXT_PUBLIC_GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxx

NODE_ENV=production
NUXT_TELEMETRY_DISABLED=1
```

::: warning
Toutes les vars `NUXT_PUBLIC_*` finissent **dans le bundle JS client**.
Ne JAMAIS y mettre de secrets — uniquement des identifiants OAuth
publics, URLs, etc.

Les vrais secrets (Stripe secret key, GitHub OAuth secret, etc.) restent
côté backend.
:::

## Déploiement avec Docker Compose + Traefik

Le fichier `docker-compose.prod.yml` ne contient **que le service Nuxt**.
Il rejoint le network `vizhome_proxy` (external) déjà créé par le backend.

### Pré-requis

Le stack backend doit déjà tourner (cf `backend-vizhome/docs/DEPLOYMENT.md`).
En particulier :
* `docker network create vizhome_proxy` a été lancé
* Traefik est up avec sa config dynamique (`security-headers`, `compress`,
  `rate-limit-global`, `redirect-www-to-apex`)

### Démarrage

```bash
cd /opt/frontend-vizhome
cp .env.example .env.prod
nano .env.prod  # remplir les NUXT_PUBLIC_* + FRONTEND_HOST

docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

### Variables d'env spécifiques au compose prod

| Variable | Défaut | Rôle |
|---|---|---|
| `FRONTEND_HOST` | `vizhome.fr` | Host servi par Traefik (apex) |
| `NUXT_API_PROXY_TARGET` | `https://api.vizhome.fr` | Backend cible du proxy Nitro `/api/*` |
| `NUXT_PUBLIC_API_URL` | `/api/v1` | URL d'API côté browser (relative → passe par proxy Nitro) |
| `VIZHOME_FRONTEND_IMAGE` | `ghcr.io/vizhome/vizhome-frontend:latest` | Image à puller |

### Routage géré côté Traefik (cf backend-vizhome)

| Host | Service | Middlewares |
|---|---|---|
| `vizhome.fr` | frontend (Nuxt) | security-headers, compress, rate-limit-global |
| `www.vizhome.fr` | frontend (redirect 301 → apex) | redirect-www-to-apex |
| `api.vizhome.fr` | api Django | security-headers, compress, rate-limit-global |
| `cdn.vizhome.fr` | minio S3 API | security-headers, compress |
| `minio.vizhome.fr` | minio console admin | security-headers |
| `traefik.vizhome.fr` | dashboard Traefik | dashboard-auth + security-headers |

Pas besoin de définir le router sur `www.vizhome.fr` côté frontend : le
backend Traefik gère la redirection via le middleware `redirect-www-to-apex`.

## Déploiement sur Vercel

Vercel détecte automatiquement Nuxt 4.

1. Connect le repo GitHub à Vercel
2. **Environment variables** :
   - `NUXT_PUBLIC_API_URL=https://api.vizhome.fr/api/v1`
   - `NUXT_PUBLIC_DOCS_URL=https://docs.vizhome.fr`
   - `NUXT_PUBLIC_GOOGLE_CLIENT_ID=…`
   - `NUXT_PUBLIC_GITHUB_CLIENT_ID=…`
3. Build command : `npm run build`
4. Output dir : `.output/public`
5. Add custom domain : `app.vizhome.fr`

## Déploiement sur Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".output/public"

[functions]
  directory = ".output/server"
```

## Déploiement statique (Cloudflare Pages, GitHub Pages, etc.)

Si le SSR n'est pas nécessaire :

```bash
npm run generate     # → .output/public/ (statique pur)
```

::: warning
Les pages métier (`/render`, `/projects`, `/gallery`) sont déjà 100%
client-side. Mais les pages publiques (home, pricing) bénéficient du
SSR pour le SEO. Si tu génères en statique, le SEO est conservé via
le pre-rendering Nuxt.

Les composables `useApi` continueront à appeler le backend depuis le
navigateur — assure-toi que **CORS** est bien configuré côté backend
pour autoriser le domaine du frontend.
:::

## CORS backend

Côté `backend-vizhome/.env.prod` :

```bash
DJANGO_CORS_ALLOWED_ORIGINS=https://app.vizhome.fr
```

Sans ça, le frontend en prod aura une erreur CORS sur chaque appel API.

## Mise à jour en prod

```bash
ssh root@vizhome.fr
cd /opt/frontend-vizhome
git pull origin main
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

L'image se rebuild, Traefik conserve le routage, downtime ~5 secondes.

## Monitoring

### Logs

```bash
docker compose -f docker-compose.prod.yml logs -f app
```

### Healthcheck

```bash
curl -fsS https://app.vizhome.fr/
# → HTTP 200 + HTML
```

### Sentry (optionnel)

Le frontend n'a pas de Sentry configuré par défaut. Pour l'ajouter :

```bash
npm install @sentry/nuxt
```

```ts
// nuxt.config.ts
modules: ['@sentry/nuxt/module']
sentry: {
  sourceMapsUploadOptions: { ... }
}
```

Et créer `sentry.client.config.ts` + `sentry.server.config.ts`.

## Performance — bundle size

```bash
npm run build
du -sh .output/public/_nuxt/        # taille des chunks
```

Optimisations possibles :
- `nuxt.config.ts` → `experimental: { payloadExtraction: false }` (déjà fait)
- Lazy-loading des composants lourds (Three.js, Mermaid)
- Splitting des routes via `defineAsyncComponent`
- Image optimization via `@nuxt/image`

## Sécurité — checklist

- [ ] `NODE_ENV=production`
- [ ] Toutes les `NUXT_PUBLIC_*` sont des données non-secrètes
- [ ] HTTPS forcé via Traefik (HSTS dans les headers)
- [ ] CSP (Content Security Policy) configuré
- [ ] CORS configuré côté backend (autorise uniquement le domaine front)
- [ ] Tokens JWT en localStorage uniquement (pas en cookies non-httpOnly)
- [ ] OAuth callbacks pointent vers le bon domaine prod
