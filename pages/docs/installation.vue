<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Installation</h1>
      <p class="text-lg text-muted-foreground mt-2">
        VizHome est une application web — aucune installation requise.
      </p>
    </div>

    <!-- Prérequis -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Prérequis navigateur</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome s'exécute entièrement dans le navigateur via WebGL 2.0 et
            Three.js. Assurez-vous que votre configuration répond aux exigences
            suivantes :
          </p>
          <div class="space-y-4">
            <div
              v-for="req in requirements"
              :key="req.label"
              class="flex items-start gap-3"
            >
              <div class="min-w-[20px] mt-1">
                <CheckIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <strong>{{ req.label }}</strong> : {{ req.desc }}
              </div>
            </div>
          </div>
          <Alert class="mt-6">
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Performances optimales</AlertTitle>
            <AlertDescription>
              Pour les modèles 3D complexes (> 500 k polygones), une carte
              graphique dédiée est recommandée. Le moteur Three.js tire parti de
              l'accélération matérielle WebGL 2.0.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Démarrer en 3 étapes -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Démarrer en 3 étapes</h2>
      <Card>
        <CardContent class="pt-6">
          <ol class="space-y-6">
            <li
              v-for="(step, i) in steps"
              :key="step.title"
              class="flex items-start gap-4"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0"
              >
                {{ i + 1 }}
              </div>
              <div class="space-y-1 pt-1">
                <p class="font-medium">{{ step.title }}</p>
                <p class="text-muted-foreground text-sm">{{ step.desc }}</p>
                <div
                  v-if="step.code"
                  class="bg-muted rounded px-3 py-1.5 text-sm font-mono mt-2"
                >
                  {{ step.code }}
                </div>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>

    <!-- Formats 3D supportés -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Formats 3D supportés</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Le mode <strong>3D Pro</strong> accepte les formats de fichiers
            suivants via le bouton d'import dans la barre d'outils :
          </p>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6"
          >
            <div
              v-for="fmt in formats"
              :key="fmt.ext"
              class="rounded-xl border shadow-sm p-4 text-center"
            >
              <p class="text-lg font-bold text-primary mb-1">{{ fmt.ext }}</p>
              <p class="text-xs text-muted-foreground">{{ fmt.name }}</p>
            </div>
          </div>
          <Alert>
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Format recommandé</AlertTitle>
            <AlertDescription>
              <strong>GLB</strong> (glTF binaire) est le format le plus
              performant : compact, auto-suffisant et optimisé pour le rendu
              temps réel WebGL. Préférez-le pour les imports depuis Blender,
              Unity ou Sketchfab.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- API et intégrations -->
    <div>
      <h2 class="text-2xl font-bold mb-4">API et intégrations</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Pour les développeurs souhaitant intégrer VizHome dans leurs
            workflows ou applications, une API REST et des SDK sont disponibles.
          </p>

          <div class="space-y-4 mb-6">
            <div>
              <h3 class="text-lg font-medium mb-2">API REST</h3>
              <p class="text-muted-foreground text-sm mb-2">
                Accessible via HTTPS, format JSON. Permet l'upload de modèles,
                le déclenchement de rendus IA et la récupération des résultats.
              </p>
              <div class="bg-muted rounded p-3 text-sm font-mono">
                Base URL: https://api.vizhome.fr/v1
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">SDK officiels</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  v-for="sdk in sdks"
                  :key="sdk.lang"
                  class="border rounded p-4"
                >
                  <h4 class="font-medium mb-1">{{ sdk.lang }}</h4>
                  <div class="bg-muted rounded p-2 text-xs font-mono mb-2">
                    {{ sdk.install }}
                  </div>
                  <NuxtLink
                    to="/docs/api"
                    class="text-sm text-primary hover:underline"
                    >Documentation {{ sdk.lang }}</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>

          <Alert variant="warning">
            <AlertCircleIcon class="h-4 w-4" />
            <AlertTitle>Clé API requise</AlertTitle>
            <AlertDescription>
              L'accès à l'API nécessite une clé valide disponible avec les plans
              Pro et Entreprise.
              <NuxtLink to="/pricing" class="text-primary hover:underline"
                >Voir les tarifs</NuxtLink
              >.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs">
          <ArrowLeftIcon class="h-4 w-4" />
          Démarrage rapide
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/architecture">
          Architecture
          <ArrowRightIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  InfoIcon,
  AlertCircleIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})

const requirements = [
  {
    label: 'Navigateur',
    desc: 'Chrome 88+, Firefox 85+, Safari 14+ ou Edge 88+ avec WebGL 2.0 activé',
  },
  {
    label: 'Carte graphique',
    desc: 'Compatible WebGL 2.0 — obligatoire pour le rendu Three.js (intégrée suffisante pour les modèles légers)',
  },
  {
    label: 'Connexion',
    desc: "Minimum 10 Mbps — 25+ Mbps recommandé pour l'import de modèles lourds et le rendu IA",
  },
  {
    label: 'RAM',
    desc: '8 Go minimum, 16 Go recommandé pour les scènes complexes chargées en mémoire GPU',
  },
]

const steps = [
  {
    title: 'Créer un compte',
    desc: "Rendez-vous sur la page d'inscription et créez votre compte gratuitement. Le plan Freemium vous donne accès aux 3 modes (Croquis 2D, Prompt IA, 3D Pro).",
    code: 'https://app.vizhome.fr/register',
  },
  {
    title: "Ouvrir l'éditeur",
    desc: "Accédez à /render depuis votre tableau de bord. L'éditeur se charge directement dans votre navigateur — aucun plugin ni téléchargement.",
    code: null,
  },
  {
    title: 'Choisir un mode et créer',
    desc: 'Sélectionnez Croquis 2D pour dessiner, Prompt IA pour générer par texte, ou 3D Pro pour importer un modèle existant (GLB, GLTF, OBJ, FBX, STL).',
    code: null,
  },
]

const formats = [
  { ext: 'GLB', name: 'glTF Binaire' },
  { ext: 'GLTF', name: 'glTF JSON' },
  { ext: 'OBJ', name: 'Wavefront OBJ' },
  { ext: 'FBX', name: 'Autodesk FBX' },
  { ext: 'STL', name: 'Stéréolithographie' },
]

const sdks = [
  { lang: 'JavaScript', install: 'npm install @vizhome/sdk' },
  { lang: 'Python', install: 'pip install vizhome-python' },
  { lang: 'PHP', install: 'composer require vizhome/vizhome-php' },
]
</script>
