<template>
  <div class="space-y-8 w-full">
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Guide d'interface</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Tour des principaux écrans et fonctionnalités frontend.
      </p>
    </header>

    <!-- Layout général -->
    <Card>
      <CardHeader>
        <CardTitle>Layout général</CardTitle>
      </CardHeader>
      <CardContent class="text-sm space-y-2">
        <p>
          Les pages métier (<code class="text-xs">/render</code>,
          <code class="text-xs">/gallery</code>,
          <code class="text-xs">/projects</code>) utilisent un layout sans
          navbar, avec une <strong>bulle utilisateur flottante</strong> en
          haut à droite (<code class="text-xs">UserNav</code>) qui sert de
          menu principal.
        </p>
        <p>La bulle expose :</p>
        <ul class="pl-4 space-y-1 text-muted-foreground">
          <li>• Profil (PATCH <code class="text-xs">/me</code>)</li>
          <li>• Statistiques (lecture <code class="text-xs">/me</code>.stats)</li>
          <li>• Abonnement (Stripe Checkout)</li>
          <li>• Paramètres (préférences, 2FA, sessions, mot de passe)</li>
          <li>• Liens vers <em>Mes projets</em> et <em>Galerie</em></li>
          <li>• Aide / déconnexion</li>
        </ul>
      </CardContent>
    </Card>

    <!-- Page /render -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Page <code class="text-xl">/render</code>
      </h2>
      <Card>
        <CardContent class="pt-6 space-y-3 text-sm">
          <p>
            Le cœur de l'app — éditeur unique qui héberge les
            <strong>3 modes</strong> via un
            <code class="text-xs">RenderModeBar</code> au bas de l'écran. Le
            canvas Three.js reste monté (v-show) pour éviter de
            réinitialiser la scène lors des changements de mode.
          </p>

          <div class="grid gap-3 md:grid-cols-3 mt-4">
            <div class="rounded-lg border p-3">
              <div class="flex items-center gap-2 mb-2">
                <PencilIcon class="h-4 w-4 text-primary" />
                <strong>Croquis 2D</strong>
              </div>
              <p class="text-xs text-muted-foreground">
                Canvas vectoriel (pencil, eraser, line, rect, circle, fill,
                eyedropper). Génération via
                <code class="text-xs">generateFromSketch()</code> →
                <code class="text-xs">POST /renders/ source=sketch</code>.
              </p>
            </div>
            <div class="rounded-lg border p-3">
              <div class="flex items-center gap-2 mb-2">
                <SparklesIcon class="h-4 w-4 text-primary" />
                <strong>Prompt IA</strong>
              </div>
              <p class="text-xs text-muted-foreground">
                Textarea + suggestions cliquables + historique des 10
                derniers prompts (chargé via
                <code class="text-xs">GET /renders/history</code>). Choix
                2D / 3D (3D actuellement non supporté par Gemini).
              </p>
            </div>
            <div class="rounded-lg border p-3">
              <div class="flex items-center gap-2 mb-2">
                <Box class="h-4 w-4 text-primary" />
                <strong>3D Pro</strong>
              </div>
              <p class="text-xs text-muted-foreground">
                Éditeur Three.js : OrbitControls, presets d'éclairage,
                météo, import de modèles (GLB/GLTF/OBJ/FBX/STL), screenshot
                → IA stylisation.
              </p>
            </div>
          </div>

          <p class="mt-4">
            En haut de page, un
            <code class="text-xs">ProjectTopBar</code> affiche le projet
            courant (si <code class="text-xs">?project=N</code> dans l'URL)
            avec un bouton <em>Sauvegarder</em>. Sinon, un bouton
            <em>Sauvegarder comme…</em> propose de créer un nouveau projet.
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Page /projects -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Page <code class="text-xl">/projects</code>
      </h2>
      <Card>
        <CardContent class="pt-6 space-y-2 text-sm">
          <p>
            Galerie des projets sauvegardés. Chaque carte expose un menu
            dropdown :
          </p>
          <ul class="pl-4 space-y-1 text-muted-foreground">
            <li>
              • <strong>Éditer</strong> →
              <code class="text-xs"
                >/render?project=&#123;id&#125;</code
              >
            </li>
            <li>
              • <strong>Dupliquer</strong> (sans / avec modèles 3D — la
              copie avec assets fait un
              <code class="text-xs">copy_object</code> server-side MinIO,
              très rapide même pour des gros fichiers)
            </li>
            <li>
              • <strong>Partager</strong> → crée un share token et copie
              l'URL publique
              <code class="text-xs">/shared/&#123;token&#125;</code> dans
              le presse-papier
            </li>
            <li>• <strong>Supprimer</strong> (avec confirm dialog)</li>
          </ul>
          <p>
            Pagination par bouton <em>Charger plus</em>
            (<code class="text-xs"
              >GET /projects/?page=N&amp;page_size=12</code
            >).
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Page /gallery -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Page <code class="text-xl">/gallery</code>
      </h2>
      <Card>
        <CardContent class="pt-6 space-y-2 text-sm">
          <p>
            Galerie des rendus IA générés (statut
            <code class="text-xs">done</code> uniquement). Filtres par
            source : <em>Croquis</em>, <em>Prompt</em>, <em>Capture</em>.
          </p>
          <p>
            Actions par item : télécharger (lien direct MinIO public) ou
            supprimer (<code class="text-xs">DELETE /renders/&#123;id&#125;</code>,
            qui libère aussi le storage MinIO via signal Django).
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Pages auth -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Pages d'authentification</h2>
      <Card>
        <CardContent class="pt-6 space-y-3 text-sm">
          <p>
            Toutes les pages auth ont le middleware
            <code class="text-xs">guest</code> — un user déjà connecté est
            redirigé vers <code class="text-xs">/render</code>
            automatiquement.
          </p>
          <ul class="space-y-2">
            <li>
              <strong><code class="text-xs">/auth/login</code></strong> —
              email + mot de passe + boutons Google / GitHub. Si le user a
              activé le 2FA, un formulaire 6 chiffres s'affiche après le
              premier submit.
            </li>
            <li>
              <strong><code class="text-xs">/auth/register</code></strong>
              — first_name, last_name, email, mot de passe (force visuelle)
              + acceptation CGU.
            </li>
            <li>
              <strong>
                <code class="text-xs">/auth/forgot-password</code>
              </strong>
              — envoie un email (console en dev) avec un lien
              <code class="text-xs"
                >/auth/reset-password?uid&amp;token</code
              >.
            </li>
            <li>
              <strong>
                <code class="text-xs">/auth/reset-password</code>
              </strong>
              — formulaire nouveau mot de passe, validation des tokens via
              <code class="text-xs">PasswordResetTokenGenerator</code>.
            </li>
            <li>
              <strong>
                <code class="text-xs">/auth/oauth/github/callback</code>
              </strong>
              — reçoit le code GitHub, valide le state CSRF, échange via le
              backend.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>

    <!-- Raccourcis -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Raccourcis utiles</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="grid gap-3 sm:grid-cols-2 text-sm">
            <div class="flex items-center justify-between border-b pb-2">
              <span>Recherche docs</span>
              <kbd
                class="px-2 py-0.5 rounded border bg-muted text-xs font-mono"
                >⌘/Ctrl + K</kbd
              >
            </div>
            <div class="flex items-center justify-between border-b pb-2">
              <span>Navigation 1ère personne (mode 3D)</span>
              <kbd
                class="px-2 py-0.5 rounded border bg-muted text-xs font-mono"
                >W A S D</kbd
              >
            </div>
            <div class="flex items-center justify-between border-b pb-2">
              <span>Saut (mode 1ère personne)</span>
              <kbd
                class="px-2 py-0.5 rounded border bg-muted text-xs font-mono"
                >Espace</kbd
              >
            </div>
            <div class="flex items-center justify-between border-b pb-2">
              <span>Orbit autour de la scène</span>
              <kbd
                class="px-2 py-0.5 rounded border bg-muted text-xs font-mono"
                >Souris + drag</kbd
              >
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Box, PencilIcon, SparklesIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'docs' })
</script>
