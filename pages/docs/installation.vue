<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Installation</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Démarrer VizHome en local en quelques commandes.
      </p>
    </header>

    <!-- Prérequis -->
    <Card>
      <CardHeader>
        <CardTitle>Prérequis</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center gap-2">
            <CheckIcon class="h-4 w-4 text-green-500 shrink-0" />
            <span><strong>Docker Desktop</strong> (Mac/Windows) ou
              <strong>Docker Engine</strong> + Compose v2 (Linux)</span>
          </li>
          <li class="flex items-center gap-2">
            <CheckIcon class="h-4 w-4 text-green-500 shrink-0" />
            <span><strong>Node.js 22+</strong> et npm (pour le frontend)</span>
          </li>
          <li class="flex items-center gap-2">
            <CheckIcon class="h-4 w-4 text-green-500 shrink-0" />
            <span><strong>Git</strong></span>
          </li>
          <li class="flex items-center gap-2">
            <CheckIcon class="h-4 w-4 text-green-500 shrink-0" />
            <span>4 Go de RAM dispo (Postgres + Redis + MinIO + Django + Celery)</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Backend -->
    <section>
      <h2 class="text-2xl font-bold mb-4">1. Backend Django</h2>
      <Card>
        <CardContent class="pt-6 space-y-4">
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
git clone https://github.com/VizHome/backend-vizhome.git
cd backend-vizhome
cp .env.example .env

# Génère une SECRET_KEY Django et colle-la dans .env :
python -c "import secrets; print(secrets.token_urlsafe(64))"

# Démarre la stack (postgres + redis + minio + minio-init + api + celery)
docker compose up -d</pre>

          <p class="text-sm text-muted-foreground">
            Au premier démarrage :
          </p>
          <ul class="text-sm text-muted-foreground space-y-1 pl-4">
            <li>
              • Postgres applique automatiquement les migrations (12 apps)
            </li>
            <li>• Le bucket MinIO <code class="text-xs">vizhome-media</code> est créé</li>
            <li>• Celery worker démarre avec 2 process</li>
          </ul>

          <p class="text-sm mt-3">
            Vérification :
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
curl http://localhost:8000/health/ready
# → &#123;"status": "ok", "checks": &#123;"postgres": "ok", "redis": "ok"&#125;&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Frontend -->
    <section>
      <h2 class="text-2xl font-bold mb-4">2. Frontend Nuxt</h2>
      <Card>
        <CardContent class="pt-6 space-y-4">
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
git clone https://github.com/VizHome/frontend-vizhome.git
cd frontend-vizhome
cp .env.example .env
npm install
npm run dev</pre>

          <p class="text-sm text-muted-foreground">
            Par défaut le frontend pointe sur
            <code class="text-xs">http://localhost:8000/api/v1</code> (variable
            <code class="text-xs">NUXT_PUBLIC_API_URL</code>). Adapte-la dans
            <code class="text-xs">.env</code> si ton backend tourne ailleurs.
          </p>

          <p class="text-sm">L'app est dispo sur :</p>
          <ul class="text-sm space-y-1 pl-4">
            <li>
              • Frontend :
              <a
                href="http://localhost:3000"
                class="text-primary hover:underline"
                target="_blank"
                >http://localhost:3000</a
              >
            </li>
            <li>
              • API REST :
              <a
                href="http://localhost:8000/api/v1/"
                class="text-primary hover:underline"
                target="_blank"
                >http://localhost:8000/api/v1/</a
              >
            </li>
            <li>
              • Swagger UI :
              <a
                href="http://localhost:8000/api/docs/"
                class="text-primary hover:underline"
                target="_blank"
                >http://localhost:8000/api/docs/</a
              >
            </li>
            <li>
              • Django admin :
              <a
                href="http://localhost:8000/admin/"
                class="text-primary hover:underline"
                target="_blank"
                >http://localhost:8000/admin/</a
              >
            </li>
            <li>
              • Console MinIO :
              <a
                href="http://localhost:9001"
                class="text-primary hover:underline"
                target="_blank"
                >http://localhost:9001</a
              >
              (<code class="text-xs">vizhome / vizhome_minio_dev_password</code>)
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>

    <!-- Premier user -->
    <section>
      <h2 class="text-2xl font-bold mb-4">3. Créer un superuser</h2>
      <Card>
        <CardContent class="pt-6 space-y-3">
          <p class="text-sm text-muted-foreground">
            Pour accéder à l'admin Django :
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
docker compose exec api python manage.py createsuperuser</pre>
          <p class="text-sm text-muted-foreground">
            Pour un user normal, utilise la page d'inscription du frontend
            <a
              href="http://localhost:3000/auth/register"
              class="text-primary hover:underline"
              target="_blank"
              >/auth/register</a
            >.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Activer les services tiers -->
    <section>
      <h2 class="text-2xl font-bold mb-4">4. Activer les services tiers</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Les services externes sont <strong>désactivés gracieusement</strong>
        tant que les clés ne sont pas configurées (les endpoints
        correspondants renvoient 503 ou un fallback). Voici le minimum à
        activer pour avoir une expérience complète :
      </p>

      <div class="space-y-4">
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <SparklesIcon class="h-4 w-4 text-primary" />
              Gemini (génération IA)
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-2">
            <p class="text-sm text-muted-foreground">
              Récupère une clé sur
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener"
                class="text-primary hover:underline"
                >aistudio.google.com/apikey</a
              >, puis dans <code class="text-xs">.env</code> :
            </p>
            <pre
              class="bg-muted/50 rounded p-3 text-xs font-mono"
            >GEMINI_API_KEY=AIzaSy...
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image-preview</pre>
            <p class="text-sm text-muted-foreground">
              Sans cette clé, les renders renvoient 400 avec
              <code class="text-xs">"Provider IA indisponible"</code>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <CreditCardIcon class="h-4 w-4 text-primary" />
              Stripe (abonnements)
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-2">
            <p class="text-sm text-muted-foreground">
              Crée un compte sur
              <a
                href="https://dashboard.stripe.com/test/apikeys"
                target="_blank"
                rel="noopener"
                class="text-primary hover:underline"
                >dashboard.stripe.com</a
              >
              et récupère tes clés test :
            </p>
            <pre
              class="bg-muted/50 rounded p-3 text-xs font-mono"
            >STRIPE_TEST_SECRET_KEY=sk_test_...
STRIPE_TEST_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # via `stripe listen`</pre>
            <p class="text-sm text-muted-foreground">
              Puis crée les Products+Prices Stripe :
            </p>
            <pre
              class="bg-muted/50 rounded p-3 text-xs font-mono"
            >docker compose exec api python manage.py setup_stripe_products</pre>
            <p class="text-sm text-muted-foreground">
              Pour les webhooks en dev :
            </p>
            <pre
              class="bg-muted/50 rounded p-3 text-xs font-mono"
            >stripe listen --forward-to http://localhost:8000/webhooks/stripe/webhook/</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base flex items-center gap-2">
              <KeyIcon class="h-4 w-4 text-primary" />
              OAuth (Google + GitHub)
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-2">
            <p class="text-sm text-muted-foreground">
              Optionnel — sans ces clés, les boutons OAuth sur la page de
              connexion sont désactivés avec un tooltip.
            </p>
            <ul class="text-sm text-muted-foreground space-y-1 pl-4">
              <li>
                • Google :
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener"
                  class="text-primary hover:underline"
                  >Cloud Console → OAuth Client ID</a
                >
              </li>
              <li>
                • GitHub :
                <a
                  href="https://github.com/settings/developers"
                  target="_blank"
                  rel="noopener"
                  class="text-primary hover:underline"
                  >Developer Settings → OAuth App</a
                >
                (callback URL :
                <code class="text-xs"
                  >http://localhost:3000/auth/oauth/github/callback</code
                >)
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p class="text-sm text-muted-foreground mt-4">
        Le guide complet avec toutes les variables d'env est dans le repo
        backend :
        <code class="text-xs">backend-vizhome/SETUP_KEYS.md</code>.
      </p>
    </section>

    <!-- Production -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Déploiement en production</h2>
      <Card>
        <CardContent class="pt-6 space-y-3">
          <p class="text-sm text-muted-foreground">
            Un <code class="text-xs">docker-compose.prod.yml</code> dédié est
            fourni avec :
          </p>
          <ul class="text-sm text-muted-foreground space-y-1 pl-4">
            <li>• Dockerfile multi-stage (~629 MB vs 1.2 GB en dev)</li>
            <li>• Gunicorn (4 workers, max-requests 1000)</li>
            <li>• Traefik comme reverse proxy + HTTPS automatique via Let's Encrypt</li>
            <li>• celery-beat séparé (cron jobs)</li>
            <li>• Sentry SDK (si <code class="text-xs">SENTRY_DSN</code> renseigné)</li>
          </ul>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
cp .env.prod.example .env.prod
# Adapte les hosts (API_HOST=api.vizhome.fr, etc.)
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build</pre>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  CheckIcon,
  CreditCardIcon,
  KeyIcon,
  SparklesIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'docs' })
</script>
