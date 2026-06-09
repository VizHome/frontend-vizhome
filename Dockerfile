# Argument pour la version de Node.js à utiliser, par défaut la version alpine 22
ARG NODE_VERSION=22-alpine

# =========================================================
# Stage 1 — deps : installe uniquement les dépendances npm
# =========================================================
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

# Le lock a été régénéré avec npm 11 ; node:22-alpine vient avec npm 10
# qui refuse certains nested deps de nitropack. Bump npm pour rester
# compatible avec le format du lockfile.
RUN npm install -g npm@11

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund --ignore-scripts

# =========================================================
# Stage 2 — builder : compile l'application Nuxt
# =========================================================
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# =========================================================
# Stage 3 — runner : image finale minimale (.output autonome)
# =========================================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# ─── Build args injectés via docker build-push-action (release.yml) ─────
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=dev

# ─── OCI image labels ────────────────────────────────────────────────────
# Standard : https://github.com/opencontainers/image-spec/blob/main/annotations.md
LABEL org.opencontainers.image.title="VizHome Frontend" \
      org.opencontainers.image.description="Application Nuxt 4 + Vue 3 pour VizHome — \
éditeur 3D Three.js (sketch / prompt IA / 3D pro), forum communautaire, \
support helpdesk, espace utilisateur (projets, galerie, abonnement)." \
      org.opencontainers.image.vendor="VizHome" \
      org.opencontainers.image.authors="VizHome team" \
      org.opencontainers.image.url="https://vizhome.fr" \
      org.opencontainers.image.documentation="https://github.com/VizHome/frontend-vizhome/blob/main/README.md" \
      org.opencontainers.image.source="https://github.com/VizHome/frontend-vizhome" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.base.name="docker.io/library/node:${NODE_VERSION}" \
      org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$VCS_REF \
      org.opencontainers.image.version=$VERSION \
      # Labels custom VizHome
      fr.vizhome.component="frontend" \
      fr.vizhome.runtime="node-22" \
      fr.vizhome.framework="nuxt-4"

ENV NODE_ENV=production \
    NUXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0 \
    PORT=3000

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nuxt -u 1001 -G nodejs

COPY --from=builder --chown=nuxt:nodejs /app/.output ./.output

USER nuxt
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget --quiet --spider http://localhost:3000/ || exit 1

CMD ["node", ".output/server/index.mjs"]
