<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Guide d'interface</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Maîtrisez l'interface de l'éditeur VizHome et ses trois modes de
        création
      </p>
    </div>

    <!-- Sommaire -->
    <Card>
      <CardHeader>
        <CardTitle>Sommaire</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="grid gap-2">
          <li>
            <a href="#rendermodebar" class="text-primary hover:underline"
              >Barre de modes</a
            >
          </li>
          <li>
            <a href="#sketch" class="text-primary hover:underline"
              >Mode Croquis 2D</a
            >
          </li>
          <li>
            <a href="#prompt" class="text-primary hover:underline"
              >Mode Prompt IA</a
            >
          </li>
          <li>
            <a href="#three" class="text-primary hover:underline"
              >Mode 3D Pro</a
            >
          </li>
          <li>
            <a href="#overlays" class="text-primary hover:underline"
              >Overlays et navigation immersive</a
            >
          </li>
          <li>
            <a href="#shortcuts" class="text-primary hover:underline"
              >Raccourcis clavier</a
            >
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Barre de modes -->
    <div id="rendermodebar" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <LayoutDashboardIcon class="h-5 w-5 text-primary" />
        Barre de modes (RenderModeBar)
      </h2>
      <Card class="mb-4">
        <CardContent class="pt-6">
          <p class="mb-4">
            La barre en haut de l'éditeur (<code
              class="bg-muted px-1.5 py-0.5 rounded text-sm"
              >RenderModeBar</code
            >) affiche le logo VizHome et trois boutons de mode. Elle reste
            visible en permanence et permet de basculer instantanément entre les
            trois flux de création.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              class="bg-muted/40 rounded-lg p-4 border flex items-start gap-3"
            >
              <div class="bg-primary/10 rounded-full p-2 shrink-0">
                <PencilIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 class="font-medium text-sm">Croquis 2D</h4>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Canvas de dessin vectoriel libre
                </p>
              </div>
            </div>
            <div
              class="bg-muted/40 rounded-lg p-4 border flex items-start gap-3"
            >
              <div class="bg-primary/10 rounded-full p-2 shrink-0">
                <SparklesIcon class="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 class="font-medium text-sm">Prompt IA</h4>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Génération par texte (2D ou 3D)
                </p>
              </div>
            </div>
            <div
              class="bg-muted/40 rounded-lg p-4 border flex items-start gap-3"
            >
              <div class="bg-primary/10 rounded-full p-2 shrink-0">
                <Box class="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 class="font-medium text-sm">3D Pro</h4>
                <p class="text-xs text-muted-foreground mt-0.5">
                  Éditeur Three.js temps réel
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Mode Croquis 2D -->
    <div id="sketch" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <PencilIcon class="h-5 w-5 text-primary" />
        Mode Croquis 2D
      </h2>
      <Card class="mb-4">
        <CardContent class="pt-6">
          <p class="mb-4">
            Le mode Croquis 2D (<code
              class="bg-muted px-1.5 py-0.5 rounded text-sm"
              >SketchCanvas.vue</code
            >) est un canvas vectoriel interactif. La toolbar est positionnée en
            bas au centre de l'écran.
          </p>
          <h3 class="text-base font-medium mb-3">Outils disponibles</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div
              v-for="tool in sketchTools"
              :key="tool.name"
              class="bg-muted/30 rounded-lg p-3 flex items-start gap-3 border"
            >
              <div class="bg-background rounded-full p-1.5 shrink-0 border">
                <component :is="tool.icon" class="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 class="font-medium text-sm">{{ tool.name }}</h4>
                <p class="text-xs text-muted-foreground">{{ tool.desc }}</p>
              </div>
            </div>
          </div>
          <Alert>
            <SparklesIcon class="h-4 w-4" />
            <AlertTitle>Transformez en rendu IA</AlertTitle>
            <AlertDescription>
              Un bouton dédié dans la toolbar permet d'envoyer directement votre
              croquis au moteur IA pour générer un rendu photoréaliste à partir
              de votre dessin.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Mode Prompt IA -->
    <div id="prompt" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <SparklesIcon class="h-5 w-5 text-primary" />
        Mode Prompt IA
      </h2>
      <Card class="mb-4">
        <CardContent class="pt-6">
          <p class="mb-4">
            Le mode Prompt IA (<code
              class="bg-muted px-1.5 py-0.5 rounded text-sm"
              >PromptPanel.vue</code
            >) affiche un panneau centré avec un formulaire de saisie textuelle.
          </p>
          <h3 class="text-base font-medium mb-3">Fonctionnalités du panneau</h3>
          <ul class="space-y-2 mb-6">
            <li
              v-for="feat in promptFeatures"
              :key="feat.title"
              class="flex items-start gap-2"
            >
              <div class="min-w-[20px] mt-1 shrink-0">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p class="text-sm">
                <strong>{{ feat.title }}</strong> : {{ feat.desc }}
              </p>
            </li>
          </ul>
          <Alert>
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Confirmation avant génération</AlertTitle>
            <AlertDescription>
              Un <strong>AlertDialog</strong> de confirmation s'affiche avant
              chaque génération IA, pour éviter les consommations de crédits
              accidentelles.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>

    <!-- Mode 3D Pro -->
    <div id="three" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <Box class="h-5 w-5 text-primary" />
        Mode 3D Pro
      </h2>
      <Card class="mb-4">
        <CardContent class="pt-6">
          <p class="mb-4">
            Le mode 3D Pro utilise <strong>Three.js</strong> pour un rendu WebGL
            temps réel. L'éditeur est composé de deux parties :
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm"
              >ThreeControls.vue</code
            >
            (toolbar droite + panels flottants) et
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm"
              >RenderOverlays.vue</code
            >
            (overlays contextuels).
          </p>

          <h3 class="text-base font-medium mb-3">Formats d'import supportés</h3>
          <div class="flex flex-wrap gap-2 mb-6">
            <Badge
              v-for="fmt in formats"
              :key="fmt"
              variant="secondary"
              class="rounded-full"
              >{{ fmt }}</Badge
            >
          </div>

          <h3 class="text-base font-medium mb-3">Toolbar droite — 5 boutons</h3>
          <div class="space-y-3 mb-6">
            <div
              v-for="btn in threeButtons"
              :key="btn.label"
              class="bg-muted/30 rounded-lg p-3 border flex items-start gap-3"
            >
              <div class="bg-primary/10 rounded-full p-1.5 shrink-0">
                <component :is="btn.icon" class="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 class="font-medium text-sm">{{ btn.label }}</h4>
                <p class="text-xs text-muted-foreground">{{ btn.desc }}</p>
              </div>
            </div>
          </div>

          <Alert>
            <InfoIcon class="h-4 w-4" />
            <AlertTitle>Boutons conditionnels</AlertTitle>
            <AlertDescription>
              Les boutons <strong>Matériaux</strong> et
              <strong>Rendu IA</strong> n'apparaissent dans la toolbar que
              lorsqu'un modèle 3D est chargé dans la scène.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <!-- Panels flottants détaillés -->
      <h3 class="text-lg font-semibold mb-3 mt-6">Panels flottants</h3>
      <Accordion type="single" collapsible class="w-full">
        <AccordionItem
          v-for="panel in floatingPanels"
          :key="panel.title"
          :value="panel.title"
        >
          <AccordionTrigger class="text-sm font-medium">
            <span class="flex items-center gap-2">
              <component :is="panel.icon" class="h-4 w-4 text-primary" />
              {{ panel.title }}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul class="space-y-1.5 pl-6">
              <li
                v-for="item in panel.items"
                :key="item"
                class="text-sm text-muted-foreground list-disc"
              >
                {{ item }}
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <!-- Overlays -->
    <div id="overlays" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <LayersIcon class="h-5 w-5 text-primary" />
        Overlays et navigation immersive
      </h2>
      <Card class="mb-4">
        <CardContent class="pt-6">
          <p class="mb-4">
            <code class="bg-muted px-1.5 py-0.5 rounded text-sm"
              >RenderOverlays.vue</code
            >
            gère les éléments contextuels superposés à la vue 3D selon le mode
            de navigation actif.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="overlay in overlays"
              :key="overlay.name"
              class="bg-muted/30 rounded-lg p-3 border"
            >
              <h4 class="font-medium text-sm mb-1 flex items-center gap-1.5">
                <component
                  :is="overlay.icon"
                  class="h-3.5 w-3.5 text-primary"
                />
                {{ overlay.name }}
              </h4>
              <p class="text-xs text-muted-foreground">{{ overlay.desc }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Raccourcis clavier -->
    <div id="shortcuts" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <KeyboardIcon class="h-5 w-5 text-primary" />
        Raccourcis clavier
      </h2>
      <Card class="mb-6">
        <CardContent class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-base font-medium mb-3">Navigation 3D (Orbite)</h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center text-sm">
                  <span>Rotation caméra</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs"
                      >Clic gauche</kbd
                    >
                    <span class="text-xs self-center">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs"
                      >Glisser</kbd
                    >
                  </div>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span>Zoom</span>
                  <kbd class="px-2 py-1 bg-muted rounded text-xs"
                    >Molette souris</kbd
                  >
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span>Panoramique</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs"
                      >Clic droit</kbd
                    >
                    <span class="text-xs self-center">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs"
                      >Glisser</kbd
                    >
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-base font-medium mb-3">
                Navigation première personne
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center text-sm">
                  <span>Avancer / Reculer</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">W</kbd>
                    <span class="text-xs self-center">/</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">S</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span>Latéral gauche / droite</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">A</kbd>
                    <span class="text-xs self-center">/</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">D</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span>Regarder autour</span>
                  <kbd class="px-2 py-1 bg-muted rounded text-xs"
                    >Clic gauche + Glisser</kbd
                  >
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs">
          <ArrowLeftIcon class="h-4 w-4" />
          Documentation
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/photos">
          Optimisation des photos
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
  Circle,
  LayoutDashboardIcon,
  Box,
  InfoIcon,
  PaintbrushIcon,
  SunIcon,
  KeyboardIcon,
  PencilIcon,
  SparklesIcon,
  LayersIcon,
  NavigationIcon,
  CameraIcon,
  EyeIcon,
  MessageSquareIcon,
  HistoryIcon,
  UploadCloudIcon,
  Palette,
  WaypointsIcon,
  MapIcon,
  MousePointerIcon,
  EraserIcon,
  TypeIcon,
  Pipette,
  DownloadIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})

const sketchTools = [
  {
    name: 'Crayon libre',
    icon: PencilIcon,
    desc: "Dessinez à main levée avec réglage de l'épaisseur et de la couleur.",
  },
  {
    name: 'Formes géométriques',
    icon: MousePointerIcon,
    desc: 'Rectangles, cercles, lignes droites au pixel près.',
  },
  {
    name: 'Texte',
    icon: TypeIcon,
    desc: 'Ajoutez des annotations textuelles avec choix de police et taille.',
  },
  {
    name: 'Pipette',
    icon: Pipette,
    desc: 'Sélectionnez une couleur directement depuis le canvas.',
  },
  {
    name: 'Gomme',
    icon: EraserIcon,
    desc: 'Effacez des zones sélectionnées avec réglage de taille.',
  },
  {
    name: 'Export PNG',
    icon: DownloadIcon,
    desc: 'Exportez le croquis en image PNG haute résolution.',
  },
]

const promptFeatures = [
  {
    title: 'Saisie texte libre',
    desc: 'Décrivez votre espace en langage naturel.',
  },
  {
    title: 'Type de sortie',
    desc: "Choisissez entre génération d'une image 2D ou d'un modèle 3D.",
  },
  {
    title: 'Suggestions de prompts',
    desc: 'Des prompts pré-définis vous aident à démarrer rapidement.',
  },
  {
    title: 'Historique tabulé',
    desc: 'Retrouvez vos générations précédentes organisées par onglets.',
  },
  {
    title: 'Confirmation AlertDialog',
    desc: 'Une modale de confirmation protège contre les générations accidentelles.',
  },
]

const formats = ['GLB', 'GLTF', 'OBJ', 'FBX', 'STL']

const threeButtons = [
  {
    label: 'Éclairage',
    icon: SunIcon,
    desc: 'Ouvre le panel Éclairage : ambiances (naturelle, dramatique, studio…) et saisons (printemps, été, automne, hiver).',
  },
  {
    label: 'Navigation',
    icon: NavigationIcon,
    desc: 'Ouvre le panel Navigation : modes Orbite, Première personne (WASD), Visite guidée et Vue top-down.',
  },
  {
    label: 'Modèles',
    icon: UploadCloudIcon,
    desc: "Permet d'importer un fichier GLB, GLTF, OBJ, FBX ou STL dans la scène Three.js.",
  },
  {
    label: 'Caméra',
    icon: CameraIcon,
    desc: 'Contrôle le champ de vision (FOV), la hauteur et la mise au point. Toujours visible.',
  },
  {
    label: 'Matériaux',
    icon: PaintbrushIcon,
    desc: 'Sélectionner et modifier les matériaux des meshes chargés. Visible uniquement quand un modèle est présent.',
  },
]

const floatingPanels = [
  {
    title: 'Panel Éclairage',
    icon: SunIcon,
    items: [
      'Ambiances : Naturelle, Dramatique, Studio, Coucher de soleil, Nuit',
      'Saisons : Printemps, Été, Automne, Hiver (modifie la température de couleur)',
      'Intensité lumière ambiante réglable',
      'Direction et couleur de la lumière directionnelle',
    ],
  },
  {
    title: 'Panel Navigation',
    icon: NavigationIcon,
    items: [
      'Orbite : rotation, zoom et panoramique à la souris',
      'Première personne : déplacement WASD + vue à la souris',
      'Visite guidée : parcours automatique avec barre de progression',
      'Top-down : vue de dessus avec pill indicateur',
    ],
  },
  {
    title: 'Panel Matériaux',
    icon: Palette,
    items: [
      'Liste des meshes du modèle chargé',
      "Sélection d'un matériau dans la bibliothèque",
      'Réglages : roughness, metalness, couleur de base',
      'Aperçu en temps réel dans la scène',
    ],
  },
  {
    title: 'Panel Caméra',
    icon: CameraIcon,
    items: [
      'FOV (champ de vision) de 30° à 120°',
      'Hauteur de la caméra ajustable',
      'Réinitialisation rapide de la position',
    ],
  },
]

const overlays = [
  {
    name: 'Empty state',
    icon: UploadCloudIcon,
    desc: "Affiché quand aucun modèle n'est chargé. Invite à importer un fichier ou utiliser le Prompt IA.",
  },
  {
    name: 'Hint première personne',
    icon: EyeIcon,
    desc: "Rappel des touches WASD affiché lors de l'activation du mode première personne.",
  },
  {
    name: 'Barre de visite',
    icon: WaypointsIcon,
    desc: "Progress bar affichant l'avancement de la visite guidée automatique.",
  },
  {
    name: 'Pill top-down',
    icon: MapIcon,
    desc: "Indicateur de vue top-down affiché en bas de l'écran.",
  },
]
</script>
