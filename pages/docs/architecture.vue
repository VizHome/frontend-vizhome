<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Architecture</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Vue d'ensemble des services et des flux de données VizHome.
      </p>
    </header>

    <!-- Schéma textuel -->
    <Card>
      <CardHeader>
        <CardTitle>Topologie Docker</CardTitle>
        <CardDescription>
          7 services orchestrés via docker-compose.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre
          class="bg-muted/50 rounded-lg p-4 text-xs overflow-x-auto font-mono leading-relaxed"
        >
┌──────────────────────────────────────────────────────────────────┐
│                       Navigateur utilisateur                     │
│         (Nuxt 4 SPA — http://localhost:3000 ou app.*)            │
└────────────────┬─────────────────────────────────┬───────────────┘
                 │ JWT REST                        │ direct PUT
                 │ /api/v1/*                       │ MinIO presigned
                 ▼                                 ▼
┌────────────────────────────────┐   ┌─────────────────────────────┐
│   api (Django + Gunicorn)      │   │  minio (S3-compatible)      │
│   :8000                        │   │  :9000  + console :9001     │
│   - DRF, JWT, axes, 2FA        │   │  bucket vizhome-media       │
│   - dj-stripe webhooks         │   │  (renders + modèles 3D)     │
│   - drf-spectacular (OpenAPI)  │   └─────────────────────────────┘
└─────┬──────────┬────────┬──────┘
      │          │        │
      ▼          ▼        ▼
┌──────────┐ ┌────────┐ ┌──────────────┐
│postgres  │ │redis   │ │ celery       │
│:5432     │ │:6379   │ │ worker x N   │
│ Users,   │ │ broker │ │ - generate_  │
│ Projects,│ │ + cache│ │   render     │
│ Renders, │ │ + 2FA  │ │              │
│ Scenes,  │ │challen-│ ├──────────────┤
│ Stripe…  │ │ges     │ │ celery-beat  │
└──────────┘ └────────┘ │ - reset      │
                        │   monthly    │
                        │   counters   │
                        └──────────────┘
                              │
                              │ HTTPS
                              ▼
                  ┌───────────────────────┐
                  │ Providers externes    │
                  │ - Gemini API (Google) │
                  │ - Stripe API          │
                  │ - SMTP (prod)         │
                  └───────────────────────┘
</pre>
      </CardContent>
    </Card>

    <!-- Composants -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Composants</h2>
      <div class="space-y-4">
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <ServerIcon class="h-4 w-4 text-primary" />
              api (Django 5 + DRF)
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-2">
            <p>
              Cœur métier — expose l'API REST
              <code class="text-xs">/api/v1/*</code>. 6 apps modulaires :
              <code class="text-xs">accounts</code>,
              <code class="text-xs">projects</code>,
              <code class="text-xs">renders</code>,
              <code class="text-xs">gallery</code>,
              <code class="text-xs">billing</code>,
              <code class="text-xs">core</code>.
            </p>
            <p>
              Authentification JWT via
              <code class="text-xs">djangorestframework-simplejwt</code>, 2FA
              TOTP via <code class="text-xs">django-otp</code>, rate limiting
              via <code class="text-xs">django-axes</code> + DRF throttling.
              Schéma OpenAPI auto-généré via
              <code class="text-xs">drf-spectacular</code> →
              <code class="text-xs">/api/docs/</code> et
              <code class="text-xs">/api/redoc/</code>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <DatabaseIcon class="h-4 w-4 text-primary" />
              postgres
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-2">
            <p>
              Postgres 16 stocke <em>tout</em> sauf les fichiers binaires :
              users + préférences + sessions + plans, projets + scènes
              (<code class="text-xs">JSONField</code> pour l'état Three.js),
              renders (status, prompt, lien MinIO du résultat), Customers et
              Subscriptions Stripe synchronisés par dj-stripe.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <BoxesIcon class="h-4 w-4 text-primary" />
              minio (storage)
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-2">
            <p>
              Compatible S3 (API + signature SigV4) → migration possible vers
              AWS S3, Cloudflare R2 ou Backblaze B2 sans changer le code.
              Configuré via les variables
              <code class="text-xs">MINIO_S3_*</code>.
            </p>
            <p>
              Le bucket <code class="text-xs">vizhome-media</code> est en
              lecture publique → les URLs de rendus sont consommables direct
              par le navigateur. Les uploads passent par des
              <strong>presigned URLs</strong> générées par boto3 côté
              backend.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <ZapIcon class="h-4 w-4 text-primary" />
              celery + celery-beat
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-2">
            <p>
              Le worker Celery traite les tâches longues — principalement
              <code class="text-xs">apps.renders.tasks.generate_render</code>
              qui appelle Gemini, télécharge le résultat, l'upload sur MinIO,
              et update le Render en DB. Concurrency par défaut : 2 workers.
            </p>
            <p>
              celery-beat (<code class="text-xs">django-celery-beat</code>)
              gère les cron jobs configurables depuis l'admin Django (reset
              mensuel des compteurs, nettoyage…).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <ZapIcon class="h-4 w-4 text-primary" />
              redis
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-2">
            <p>
              Triple rôle : broker Celery, cache Django (challenges 2FA,
              throttles DRF), backend de résultats Celery. Persistance
              activée en prod (<code class="text-xs">--save 60 1</code>).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <GlobeIcon class="h-4 w-4 text-primary" />
              Frontend Nuxt 4
            </CardTitle>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground space-y-2">
            <p>
              SPA avec SSR désactivé sur les pages auth/render. Composables
              singletons (<code class="text-xs">useUser</code>,
              <code class="text-xs">useAuth</code>,
              <code class="text-xs">useProjects</code>,
              <code class="text-xs">useGallery</code>,
              <code class="text-xs">useAiRender</code>,
              <code class="text-xs">useBilling</code>,
              <code class="text-xs">use2fa</code>) avec persistance
              localStorage uniquement pour les tokens JWT.
            </p>
            <p>
              Three.js pour l'éditeur 3D (caméra OrbitControls, lumières,
              TransformControls).
              <code class="text-xs">useApi</code> est un wrapper $fetch qui
              injecte le Bearer JWT et retry sur 401 après refresh
              automatique du token.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Flow data -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Flux de données clés</h2>

      <div class="space-y-4">
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Génération d'un rendu IA</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
Frontend → POST /api/v1/renders/         (202 Accepted + id)
Django  → Render(status=pending)
        → generate_render.delay(id)      [Celery task]
Worker  → Render(status=processing)
        → provider.generate(...)         [Gemini API call]
        → image bytes
        → upload MinIO (renders/outputs/...)
        → Render(status=done, result_url=...)
        → UserStats.renders_this_month += 1
Frontend → GET /api/v1/renders/&#123;id&#125;      [polling 2s]
        → is_terminal=true → display</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">
              Upload d'un modèle 3D (presigned MinIO)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
Frontend → POST /projects/&#123;id&#125;/models/upload-url
                                         (vérif quota storage)
Django  → boto3.generate_presigned_url   (signe avec host PUBLIC)
        → &#123; upload_url, key &#125;
Frontend → PUT &lt;upload_url&gt;          [direct vers MinIO]
        → MinIO 200 OK
Frontend → POST /projects/&#123;id&#125;/models/confirm
                                         &#123; name, key &#125;
Django  → boto3.head_object(key)         (récupère ContentLength)
        → ImportedModel(file=key, ...)   [signal update storage]</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Upgrade Stripe</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
Frontend → POST /me/subscription/checkout &#123;plan:"pro"&#125;
Django  → Stripe.Checkout.Session.create
        → &#123; checkout_url &#125;
Frontend → window.location = checkout_url
User    → paye sur Stripe
Stripe  → POST /webhooks/stripe/         [event]
dj-stripe → sync Subscription, Customer
        → djstripe_receiver
        → on_subscription_change
        → User.plan = "pro" + ajuste quotas</pre>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  BoxesIcon,
  DatabaseIcon,
  GlobeIcon,
  ServerIcon,
  ZapIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'docs' })
</script>
