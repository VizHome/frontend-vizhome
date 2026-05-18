<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Rendus IA</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Pipeline asynchrone Celery + Gemini, polling côté client jusqu'au
        résultat.
      </p>
    </header>

    <!-- Vue d'ensemble -->
    <Card>
      <CardHeader>
        <CardTitle>Vue d'ensemble</CardTitle>
      </CardHeader>
      <CardContent class="text-sm space-y-3">
        <p>
          Un <strong>Render</strong> représente une demande de génération IA.
          Il a 3 sources possibles, 2 types de sortie, et passe par 4 statuts
          dans son cycle de vie.
        </p>

        <div class="grid gap-3 sm:grid-cols-2 mt-4">
          <div class="rounded-lg border p-3">
            <p class="font-semibold mb-1.5">
              <code class="text-xs">source</code>
            </p>
            <ul class="text-xs space-y-1 text-muted-foreground">
              <li>
                • <code class="text-xs">prompt</code> — texte uniquement
              </li>
              <li>
                • <code class="text-xs">sketch</code> — croquis 2D + style
                hint
              </li>
              <li>
                • <code class="text-xs">screenshot</code> — capture de la
                scène 3D + restylisation
              </li>
            </ul>
          </div>
          <div class="rounded-lg border p-3">
            <p class="font-semibold mb-1.5">
              <code class="text-xs">output_type</code>
            </p>
            <ul class="text-xs space-y-1 text-muted-foreground">
              <li>• <code class="text-xs">2d</code> — image PNG/JPG</li>
              <li>
                • <code class="text-xs">3d</code> — actuellement rejeté par
                Gemini (400)
              </li>
            </ul>
          </div>
          <div class="rounded-lg border p-3">
            <p class="font-semibold mb-1.5">
              <code class="text-xs">status</code>
            </p>
            <ul class="text-xs space-y-1 text-muted-foreground">
              <li>• <code class="text-xs">pending</code> — créé, attend Celery</li>
              <li>• <code class="text-xs">processing</code> — worker actif</li>
              <li>• <code class="text-xs">done</code> — terminé avec succès</li>
              <li>• <code class="text-xs">failed</code> — erreur, voir error_message</li>
            </ul>
          </div>
          <div class="rounded-lg border p-3">
            <p class="font-semibold mb-1.5">Provider IA</p>
            <p class="text-xs text-muted-foreground">
              Configurable via
              <code class="text-xs">RENDERS_DEFAULT_PROVIDER</code> (par
              défaut <code class="text-xs">gemini</code>). Pattern
              abstrait : ajouter OpenAI, Replicate, Stable Diffusion
              consiste à créer une classe
              <code class="text-xs">BaseProvider</code> et l'enregistrer
              dans le <code class="text-xs">registry</code>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Création -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Créer un rendu</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">POST /renders/</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Crée un <code class="text-xs">Render(status=pending)</code> en
            DB et enqueue une tâche Celery
            <code class="text-xs">generate_render.delay(render.pk)</code>.
            Renvoie immédiatement (sans attendre le résultat) → idéal pour
            une UX réactive.
          </p>

          <p>
            <strong>Vérifie le quota</strong>
            <code class="text-xs">renders_this_month &lt; renders_limit</code>
            avant la création. Le quota n'est incrémenté qu'après un succès
            (pas en cas de
            <code class="text-xs">failed</code>).
          </p>

          <p class="font-semibold">Request — mode prompt</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "source": "prompt",
  "output_type": "2d",
  "prompt": "A modern minimalist living room with large windows",
  "title": "Salon"                  // optionnel
&#125;</pre>

          <p class="font-semibold">Request — mode sketch / screenshot</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "source": "sketch",
  "output_type": "2d",
  "prompt": "Rendu photoréaliste de ce croquis",
  "style_hint": "photoréaliste, ensoleillé",
  "sketch_base64": "iVBORw0KGgo..."   // PNG base64 (avec ou sans préfixe data:)
&#125;</pre>

          <p class="font-semibold">Response 202 Accepted</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "id": 42,
  "source": "prompt",
  "output_type": "2d",
  "prompt": "A modern minimalist living room",
  "status": "pending",
  "is_terminal": false,
  "result_url": null,
  "input_image_url": null,
  "error_message": "",
  "provider": "",
  "created_at": "2026-05-13T08:42:13.826009+02:00",
  "completed_at": null
&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Polling -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Suivre l'avancement (polling)</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            GET /renders/&#123;id&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Le frontend poll cet endpoint toutes les
            <strong>2 secondes</strong> tant que
            <code class="text-xs">is_terminal === false</code>. Stratégie
            implémentée dans
            <code class="text-xs">useAiRender.generate()</code> avec un
            timeout max de 3 min et une option d'annulation
            (<code class="text-xs">cancelCurrentGeneration()</code>).
          </p>

          <p class="font-semibold">Pendant le traitement</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "status": "processing",
  "is_terminal": false,
  "started_at": "2026-05-13T08:42:14.012Z",
  ...
&#125;</pre>

          <p class="font-semibold">Quand c'est terminé</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs overflow-x-auto font-mono"
          >&#123;
  "status": "done",
  "is_terminal": true,
  "result_url": "http://localhost:9000/vizhome-media/renders/outputs/2026/05/render_42.png",
  "provider": "gemini",
  "completed_at": "2026-05-13T08:42:28.519Z",
  ...
&#125;</pre>

          <p class="font-semibold">Si Gemini refuse (safety filters, etc.)</p>
          <pre
            class="bg-muted/50 rounded p-3 text-xs font-mono"
          >&#123;
  "status": "failed",
  "is_terminal": true,
  "error_message": "Aucune image dans la réponse Gemini (probablement bloquée par les safety filters).",
  "completed_at": "..."
&#125;</pre>
        </CardContent>
      </Card>
    </section>

    <!-- Galerie -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Galerie</h2>
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">GET /renders/</CardTitle>
        </CardHeader>
        <CardContent class="text-sm space-y-3">
          <p>
            Liste paginée des rendus du user. Filtres possibles :
          </p>
          <ul class="pl-4 space-y-1">
            <li>
              • <code class="text-xs">?status=done</code> — utilisé par
              <code class="text-xs">/gallery</code> pour ne pas montrer les
              renders pending/failed
            </li>
            <li>
              • <code class="text-xs">?source=prompt|sketch|screenshot</code>
              — onglets de filtres dans la galerie
            </li>
            <li>
              • <code class="text-xs">?page_size=N</code> — 20 par défaut
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            GET /renders/history
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm">
          <p>
            10 derniers prompts <code class="text-xs">status=done</code>
            <code class="text-xs">source=prompt</code> du user. Pas de
            pagination. Utilisé par
            <code class="text-xs">PromptPanel</code> pour l'autocomplete.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Provider Gemini -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Provider Gemini</h2>

      <Card>
        <CardContent class="pt-6 text-sm space-y-3">
          <p>
            Implémentation dans
            <code class="text-xs">apps/renders/providers/gemini.py</code>.
            Utilise le SDK officiel
            <code class="text-xs">google-genai</code> avec le modèle
            <code class="text-xs">gemini-2.5-flash-image-preview</code> par
            défaut (configurable via
            <code class="text-xs">GEMINI_IMAGE_MODEL</code>).
          </p>
          <p>
            Le même modèle gère <strong>text-to-image</strong> ET
            <strong>image-to-image</strong> :
          </p>
          <ul class="pl-4 space-y-1 text-muted-foreground">
            <li>
              • source=<code class="text-xs">prompt</code> → contents =
              <code class="text-xs">[prompt]</code>
            </li>
            <li>
              • source=<code class="text-xs">sketch|screenshot</code> →
              contents =
              <code class="text-xs">[prompt + style_hint, PIL.Image]</code>
            </li>
          </ul>
          <p>
            En cas de <code class="text-xs">ProviderError</code>
            (clé absente, safety filter, contenu refusé) → Render marqué
            <code class="text-xs">failed</code> sans retry. En cas
            d'erreur transitoire (réseau, rate limit) → retry 2 fois avant
            d'abandonner.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- CRUD -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Modifications &amp; suppression</h2>

      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            PATCH /renders/&#123;id&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm">
          <p>
            Seul le champ <code class="text-xs">title</code> est modifiable
            (pour renommer dans la galerie). Le prompt et le résultat sont
            immutables.
          </p>
        </CardContent>
      </Card>

      <Card class="mt-4">
        <CardHeader class="pb-3">
          <CardTitle class="text-base font-mono">
            DELETE /renders/&#123;id&#125;
          </CardTitle>
        </CardHeader>
        <CardContent class="text-sm">
          <p>
            Supprime le render + son input/result image sur MinIO. Pas de
            décrément du quota mensuel (la consommation a déjà eu lieu).
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Quotas -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Quotas par plan</h2>
      <Card>
        <CardContent class="pt-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left py-2 font-semibold">Plan</th>
                <th class="text-right py-2 font-semibold">Renders / mois</th>
                <th class="text-right py-2 font-semibold">Storage</th>
              </tr>
            </thead>
            <tbody class="text-muted-foreground">
              <tr class="border-b">
                <td class="py-2">Free</td>
                <td class="text-right">5</td>
                <td class="text-right">1 Go</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">Pro</td>
                <td class="text-right">50</td>
                <td class="text-right">5 Go</td>
              </tr>
              <tr class="border-b">
                <td class="py-2">Enterprise</td>
                <td class="text-right">9 999</td>
                <td class="text-right">1 To</td>
              </tr>
            </tbody>
          </table>
          <p class="text-xs text-muted-foreground mt-3">
            Le compteur <code class="text-xs">renders_this_month</code> est
            reset le 1er du mois à 00:00 via une tâche Celery beat
            (configurable depuis l'admin Django) ou via la commande
            <code class="text-xs"
              >python manage.py reset_monthly_counters</code
            >.
          </p>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'docs' })
</script>
