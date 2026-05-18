# Argument pour la version de Node.js à utiliser, par défaut la version alpine 22
ARG NODE_VERSION=22-alpine

# =========================================================
# Stage 1 — deps : installe uniquement les dépendances npm
# =========================================================
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

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
