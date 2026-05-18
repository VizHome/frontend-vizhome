<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Référence API</h1>
      <p class="text-lg text-muted-foreground mt-2">
        API REST versionnée sous <code class="text-base">/api/v1/</code>.
        Authentification JWT, format JSON, codes HTTP standards.
      </p>
    </header>

    <!-- Source de vérité -->
    <Card class="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle class="text-base flex items-center gap-2">
          <InfoIcon class="h-4 w-4 text-primary" />
          Source de vérité : Swagger / ReDoc
        </CardTitle>
      </CardHeader>
      <CardContent class="text-sm space-y-2">
        <p>
          Ce guide donne une vue d'ensemble pédagogique. La référence
          exhaustive (tous les endpoints, schémas, payloads) est
          <strong>auto-générée</strong> depuis le code Django via
          <code class="text-xs">drf-spectacular</code> :
        </p>
        <ul class="pl-4 space-y-1">
          <li>
            • Swagger UI interactive (essaie les endpoints depuis le browser) :
            <code class="text-xs">/api/docs/</code>
          </li>
          <li>
            • ReDoc (lecture, recherche, export) :
            <code class="text-xs">/api/redoc/</code>
          </li>
          <li>
            • Schéma OpenAPI 3.0 (YAML) :
            <code class="text-xs">/api/schema/</code>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Base URL -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Base URL</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="rounded-md border bg-muted/40 p-3 text-sm font-mono mb-2">
            https://api.vizhome.fr/api/v1/
          </div>
          <p class="text-sm text-muted-foreground">
            En dev : <code class="text-xs">http://localhost:8000/api/v1/</code>.
            Toutes les routes documentées ci-dessous sont relatives à cette
            base.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Authentification -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Authentification</h2>
      <Card>
        <CardContent class="pt-6 space-y-3 text-sm">
          <p>
            La majorité des endpoints requièrent un token JWT dans le header :
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >Authorization: Bearer &lt;access_token&gt;</pre>
          <p>
            L'access token est valide 15 minutes. Quand il expire, le client
            doit appeler <code class="text-xs">POST /auth/refresh</code> avec
            le refresh token (valide 7 jours, rotation activée). Le composable
            <code class="text-xs">useApi</code> du frontend fait ce refresh
            automatiquement sur 401.
          </p>
          <p>
            Voir la
            <NuxtLink
              to="/docs/api/authentification"
              class="text-primary hover:underline"
              >page dédiée à l'authentification</NuxtLink
            >
            pour le détail (register, login, OAuth Google/GitHub, 2FA TOTP).
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Conventions -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Conventions</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Format des requêtes / réponses</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <ul class="pl-4 space-y-1">
            <li>
              • Content-Type : <code class="text-xs">application/json</code>
            </li>
            <li>
              • Encoding : <code class="text-xs">UTF-8</code>
            </li>
            <li>
              • Snake_case partout (<code class="text-xs">created_at</code>,
              <code class="text-xs">output_type</code>, etc.)
            </li>
            <li>
              • Timestamps : ISO 8601 avec timezone
              (<code class="text-xs">2026-05-13T08:42:13.826009+02:00</code>)
            </li>
            <li>
              • Pagination DRF : <code class="text-xs">PageNumberPagination</code>,
              20 items par défaut, modifiable via
              <code class="text-xs">?page_size=N</code>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Pagination</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
GET /api/v1/projects/?page=2&amp;page_size=20

200 OK
&#123;
  "count": 42,
  "next": "http://localhost:8000/api/v1/projects/?page=3",
  "previous": "http://localhost:8000/api/v1/projects/?page=1",
  "results": [ ... ]
&#125;</pre>
          <p class="text-xs text-muted-foreground">
            Endpoints sans pagination :
            <code class="text-xs">GET /renders/history</code> (toujours 10
            items max), <code class="text-xs">GET /billing/plans</code>
            (catalogue fixe).
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Codes HTTP</CardTitle>
        </CardHeader>
        <CardContent class="text-sm">
          <table class="w-full text-xs">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2 font-semibold">Code</th>
                <th class="text-left py-2 font-semibold">Sens</th>
              </tr>
            </thead>
            <tbody class="text-muted-foreground">
              <tr class="border-b">
                <td class="py-2 font-mono">200 OK</td>
                <td>Succès, payload renvoyé</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">201 Created</td>
                <td>Ressource créée (register, projects, share…)</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">202 Accepted</td>
                <td>
                  Render en attente de traitement async (Celery picker)
                </td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">204 No Content</td>
                <td>
                  Succès sans payload (logout, delete, forgot-password…)
                </td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">400 Bad Request</td>
                <td>Validation DRF échouée — voir les champs en erreur</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">401 Unauthorized</td>
                <td>Token absent / expiré / invalide → refresh ou login</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">403 Forbidden</td>
                <td>Pas le droit (ex : project d'un autre user)</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">404 Not Found</td>
                <td>Ressource inexistante (ou tu n'y as pas accès)</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">410 Gone</td>
                <td>Share link expiré</td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">429 Too Many Requests</td>
                <td>
                  Throttle DRF ou lockout
                  <code class="text-xs">django-axes</code>
                </td>
              </tr>
              <tr class="border-b">
                <td class="py-2 font-mono">503 Service Unavailable</td>
                <td>
                  Stripe / Gemini non configuré côté serveur (clés absentes)
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base">Format d'erreur</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-2">
          <p>
            Erreur de validation DRF — un dict avec les noms de champs :
          </p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
400 Bad Request
&#123;
  "email": ["Un compte avec cet email existe déjà."],
  "password": ["Trop court (8 caractères minimum)."]
&#125;</pre>
          <p>Erreur générique — <code class="text-xs">detail</code> + parfois <code class="text-xs">code</code> :</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >
503 Service Unavailable
&#123;
  "detail": "Stripe n'est pas configuré sur ce serveur.",
  "code": "stripe_unavailable"
&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Liste endpoints -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Inventaire des endpoints</h2>

      <div class="space-y-4">
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Auth</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
POST   /auth/register
POST   /auth/login                          (→ 200 + JWT ou 200 + challenge 2FA)
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/2fa/verify                     (étape 2 du login 2FA)
POST   /auth/oauth/google/exchange          (id_token Google)
POST   /auth/oauth/github/exchange          (code GitHub)</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Me</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
GET    /me/                                 (profil + stats + préférences)
PATCH  /me/                                 (first_name, last_name, avatar_url)
GET    /me/preferences
PATCH  /me/preferences
POST   /me/change-password
GET    /me/sessions
DELETE /me/sessions/&#123;id&#125;
POST   /me/2fa/setup                        (génère QR code)
POST   /me/2fa/verify-setup
POST   /me/2fa/disable

GET    /me/subscription
POST   /me/subscription/checkout            (→ Stripe Checkout URL)
POST   /me/subscription/cancel
GET    /me/invoices
GET    /me/payment-methods</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Renders IA</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
POST   /renders/                            (→ 202 + render pending)
GET    /renders/                            (galerie paginée
                                             ?source=...&amp;status=done)
GET    /renders/history                     (10 derniers prompts done)
GET    /renders/&#123;id&#125;
PATCH  /renders/&#123;id&#125;                          (title seulement)
DELETE /renders/&#123;id&#125;</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Projects, Scènes &amp; Modèles 3D</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
GET    /projects/
POST   /projects/
GET    /projects/&#123;id&#125;                         (inclut scene + modèles)
PATCH  /projects/&#123;id&#125;                         (title, description)
DELETE /projects/&#123;id&#125;
POST   /projects/&#123;id&#125;/duplicate                ?copy_assets=true

GET    /projects/&#123;id&#125;/scene
PUT    /projects/&#123;id&#125;/scene                    (JSON state Three.js)

GET    /projects/&#123;id&#125;/models
POST   /projects/&#123;id&#125;/models                   (multipart, petits fichiers)
POST   /projects/&#123;id&#125;/models/upload-url        (presigned MinIO)
POST   /projects/&#123;id&#125;/models/confirm           (après PUT direct)
PATCH  /projects/&#123;id&#125;/models/&#123;mid&#125;             (transform)
DELETE /projects/&#123;id&#125;/models/&#123;mid&#125;

POST   /projects/&#123;id&#125;/annotations
GET    /projects/&#123;id&#125;/annotations
PATCH  /projects/&#123;id&#125;/annotations/&#123;aid&#125;
DELETE /projects/&#123;id&#125;/annotations/&#123;aid&#125;

POST   /projects/&#123;id&#125;/share                    (crée un share token)
GET    /projects/&#123;id&#125;/share
DELETE /projects/&#123;id&#125;/share/&#123;sid&#125;

GET    /shared/&#123;token&#125;                         (PUBLIC, pas d'auth)</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Billing</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
GET    /billing/plans                       (PUBLIC, pas d'auth)

POST   /webhooks/stripe/webhook/            (dj-stripe, signature validée)</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-base">Healthcheck</CardTitle>
          </CardHeader>
          <CardContent>
            <pre
              class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
            >
GET    /health/live                         (200 si Django up)
GET    /health/ready                        (200 si Postgres + Redis OK)</pre>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Exemple cURL -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Exemple complet (cURL)</h2>
      <Card>
        <CardContent class="pt-6">
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono leading-relaxed"
          >
# 1. Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '&#123;
    "email": "test@vizhome.fr",
    "first_name": "Test",
    "last_name": "User",
    "password": "SecurePass1!",
    "password_confirm": "SecurePass1!"
  &#125;'

# 2. Récupère l'access token de la réponse, puis :
TOKEN="eyJhbGciOiJIUz..."

# 3. Crée un projet
curl -X POST http://localhost:8000/api/v1/projects/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '&#123;"title":"Mon premier projet"&#125;'

# 4. Lance un rendu IA
curl -X POST http://localhost:8000/api/v1/renders/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '&#123;
    "source": "prompt",
    "output_type": "2d",
    "prompt": "A modern living room with large windows"
  &#125;'</pre>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'docs' })
</script>
