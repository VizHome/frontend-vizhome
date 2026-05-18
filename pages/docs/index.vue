<template>
  <div class="space-y-8 w-full">
    <!-- En-tête -->
    <header>
      <h1 class="text-3xl font-bold tracking-tight">Documentation VizHome</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Plateforme de visualisation 3D architecturale propulsée par IA Gemini.
      </p>
    </header>

    <!-- Introduction -->
    <Card>
      <CardHeader>
        <CardTitle>Bienvenue</CardTitle>
        <CardDescription>
          Stack open-source self-hostable : Nuxt 4, Django 5, PostgreSQL,
          MinIO, Celery, Gemini, Stripe.
        </CardDescription>
      </CardHeader>
      <CardContent class="text-sm leading-relaxed">
        VizHome propose <strong>trois modes de création</strong> dans une seule
        application : génération IA par prompt, croquis 2D avec restitution
        photoréaliste, et éditeur 3D temps réel (Three.js). Les projets, scènes
        et modèles 3D sont sauvegardés côté backend Django via une API REST
        documentée via OpenAPI.
      </CardContent>
    </Card>

    <!-- Quick Start : les 3 modes -->
    <section id="demarrage-rapide">
      <h2 class="text-2xl font-bold mb-4">Les trois modes</h2>

      <div class="grid gap-4 md:grid-cols-3">
        <Card class="rounded-xl border shadow-sm">
          <CardHeader class="pb-2">
            <div
              class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
            >
              <SparklesIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Prompt IA</CardTitle>
            <CardDescription>Texte → image</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            Décris l'espace en français/anglais, sélectionne <em>2D</em> ou
            <em>3D</em>. Le backend délègue à
            <code class="text-xs">gemini-2.5-flash-image-preview</code> via
            Celery. Polling jusqu'au résultat.
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader class="pb-2">
            <div
              class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
            >
              <PencilIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Croquis 2D</CardTitle>
            <CardDescription>Dessin → photoréaliste</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            Canvas vectoriel (crayon, formes, gomme, pipette). Convertis ton
            croquis en image stylisée via Gemini en lui passant un
            <code class="text-xs">style_hint</code>.
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader class="pb-2">
            <div
              class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
            >
              <Box class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">3D Pro</CardTitle>
            <CardDescription>Éditeur Three.js</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            Importe des modèles GLB/GLTF/OBJ/FBX/STL. Upload presigned direct
            vers MinIO. Persistance scène (caméra, lumières, météo) +
            transforms dans Postgres.
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Pipeline en 30 secondes -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Pipeline en 30 secondes</h2>
      <Card>
        <CardContent class="pt-6">
          <ol class="space-y-3 text-sm">
            <li class="flex gap-3">
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs"
                >1</span
              >
              <span>
                Le frontend appelle
                <code class="text-xs">POST /api/v1/renders/</code> avec le
                prompt → <strong>202 Accepted</strong> + id du render créé.
              </span>
            </li>
            <li class="flex gap-3">
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs"
                >2</span
              >
              <span>
                Django enqueue une tâche Celery → status passe à
                <code class="text-xs">processing</code>.
              </span>
            </li>
            <li class="flex gap-3">
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs"
                >3</span
              >
              <span>
                Le worker appelle le provider Gemini, télécharge l'image,
                l'upload sur MinIO, met à jour le Render avec
                <code class="text-xs">result_url</code>.
              </span>
            </li>
            <li class="flex gap-3">
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs"
                >4</span
              >
              <span>
                Le frontend poll
                <code class="text-xs">GET /api/v1/renders/&#123;id&#125;</code>
                toutes les 2 s jusqu'à <code class="text-xs">done</code>.
              </span>
            </li>
            <li class="flex gap-3">
              <span
                class="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs"
                >5</span
              >
              <span>
                Le rendu apparaît dans la galerie (statut filtré
                <code class="text-xs">?status=done</code>) avec son
                <code class="text-xs">result_url</code> MinIO directement
                consommable côté navigateur.
              </span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </section>

    <!-- Aller plus loin -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Aller plus loin</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <NuxtLink to="/docs/architecture">
          <Card class="h-full hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle class="text-base flex items-center gap-2">
                <LayersIcon class="h-4 w-4 text-primary" />
                Architecture
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              Topologie des services Docker, flux de données, choix
              techniques (Celery, MinIO, dj-stripe…).
            </CardContent>
          </Card>
        </NuxtLink>

        <NuxtLink to="/docs/installation">
          <Card class="h-full hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle class="text-base flex items-center gap-2">
                <DownloadIcon class="h-4 w-4 text-primary" />
                Installation
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              Démarrage local en
              <code class="text-xs">docker compose up</code>, variables d'env,
              setup Stripe + Gemini.
            </CardContent>
          </Card>
        </NuxtLink>

        <NuxtLink to="/docs/interface">
          <Card class="h-full hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle class="text-base flex items-center gap-2">
                <MousePointerIcon class="h-4 w-4 text-primary" />
                Guide d'interface
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              Tour des modes, raccourcis clavier, sauvegarde de projet,
              partage public.
            </CardContent>
          </Card>
        </NuxtLink>

        <NuxtLink to="/docs/api">
          <Card class="h-full hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle class="text-base flex items-center gap-2">
                <CodeIcon class="h-4 w-4 text-primary" />
                Référence API
              </CardTitle>
            </CardHeader>
            <CardContent class="text-sm text-muted-foreground">
              Endpoints REST versionnés
              <code class="text-xs">/api/v1/</code>, auth JWT, exemples cURL.
              Spec OpenAPI auto-générée.
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </section>

    <!-- Tech stack -->
    <section>
      <h2 class="text-2xl font-bold mb-4">Stack technique</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 class="font-medium text-sm mb-2">Frontend</h3>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Nuxt 4 (Vue 3 + TypeScript)</li>
                <li>• Tailwind CSS 4 + shadcn-vue</li>
                <li>• Three.js (3D temps réel)</li>
                <li>• Pinia (state management via composables)</li>
              </ul>
            </div>
            <div>
              <h3 class="font-medium text-sm mb-2">Backend</h3>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Django 5 + Django REST Framework</li>
                <li>• PostgreSQL 16 + Redis 7</li>
                <li>• Celery (jobs async IA)</li>
                <li>• MinIO (storage S3-compatible)</li>
                <li>• dj-stripe (billing)</li>
                <li>• djangorestframework-simplejwt (auth)</li>
                <li>• google-genai (provider Gemini)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Box,
  CodeIcon,
  DownloadIcon,
  LayersIcon,
  MousePointerIcon,
  PencilIcon,
  SparklesIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'docs' })
</script>
