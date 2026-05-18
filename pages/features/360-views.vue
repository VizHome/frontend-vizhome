<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Navigation immersive</Badge>
        <h1 class="text-4xl font-bold mb-6">Exploration 3D interactive</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Naviguez librement dans vos espaces 3D grâce à quatre modes de
          navigation différents : orbite, première personne, visite guidée et
          vue de dessus.
        </p>
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/render">Ouvrir l'éditeur 3D</NuxtLink>
        </Button>
      </div>
      <div
        class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
      >
        <img
          src="/images/generate/image_generate.png"
          alt="Navigation 3D immersive"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm rounded-xl border p-3 flex items-center justify-between gap-2"
        >
          <div
            v-for="mode in navModesBadges"
            :key="mode.label"
            class="flex items-center gap-1.5 text-xs font-medium"
          >
            <component :is="mode.icon" class="h-4 w-4 text-primary" />
            <span>{{ mode.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 modes de navigation -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">4 modes de navigation</h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Chaque mode offre une expérience différente adaptée à votre usage :
        présentation, visite, inspection ou vue d'ensemble.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="mode in navModes"
          :key="mode.title"
          class="rounded-xl border shadow-sm"
        >
          <CardHeader>
            <div class="flex items-center gap-3 mb-1">
              <div
                class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
              >
                <component :is="mode.icon" class="h-5 w-5 text-primary" />
              </div>
              <CardTitle>{{ mode.title }}</CardTitle>
            </div>
            <Badge variant="outline" class="w-fit text-xs rounded-full">{{
              mode.shortcut
            }}</Badge>
          </CardHeader>
          <CardContent class="space-y-3">
            <p class="text-muted-foreground">{{ mode.desc }}</p>
            <ul class="space-y-1">
              <li
                v-for="ctrl in mode.controls"
                :key="ctrl"
                class="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckIcon class="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                {{ ctrl }}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Contrôles clavier -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-4 text-center">Raccourcis clavier</h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Maîtrisez la navigation avec les raccourcis intégrés à l'éditeur.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div>
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <RotateCcwIcon class="h-4 w-4 text-primary" />
            Mode Orbite
          </h3>
          <div class="space-y-2">
            <div
              v-for="k in orbitKeys"
              :key="k.key"
              class="flex items-center justify-between gap-4"
            >
              <span class="text-muted-foreground text-sm">{{ k.action }}</span>
              <kbd
                class="px-2 py-1 bg-background border rounded text-xs font-mono"
                >{{ k.key }}</kbd
              >
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <PersonStandingIcon class="h-4 w-4 text-primary" />
            Mode Première personne
          </h3>
          <div class="space-y-2">
            <div
              v-for="k in fpKeys"
              :key="k.key"
              class="flex items-center justify-between gap-4"
            >
              <span class="text-muted-foreground text-sm">{{ k.action }}</span>
              <kbd
                class="px-2 py-1 bg-background border rounded text-xs font-mono"
                >{{ k.key }}</kbd
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">
        Pourquoi plusieurs modes ?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <PresentationIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Présentation client</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              La visite guidée automatique impressionne vos clients sans effort
              : l'éditeur pilote la caméra sur un parcours prédéfini pendant que
              vous commentez.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <ScanSearchIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Inspection détaillée</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Le mode orbite permet d'inspecter chaque détail d'un modèle en le
              faisant tourner librement, idéal pour vérifier les matériaux et
              proportions.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <WaypointsIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Expérience immersive</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              La première personne WASD plonge votre client dans l'espace comme
              s'il le visitait réellement, créant une connexion émotionnelle
              avec le projet.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border p-8 md:p-12 text-center"
    >
      <h2 class="text-3xl font-bold mb-4">
        Explorez vos modèles 3D dès maintenant
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Importez un fichier GLB, GLTF, OBJ, FBX ou STL et naviguez immédiatement
        dans votre espace avec les quatre modes disponibles.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
        </Button>
        <Button size="lg" variant="outline" class="rounded-full" as-child>
          <NuxtLink to="/render">Ouvrir l'éditeur</NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  RotateCcwIcon,
  PersonStandingIcon,
  NavigationIcon,
  MapIcon,
  CheckIcon,
  WaypointsIcon,
  PresentationIcon,
  ScanSearchIcon,
} from 'lucide-vue-next'

const navModesBadges = [
  { icon: RotateCcwIcon, label: 'Orbite' },
  { icon: PersonStandingIcon, label: 'Première personne' },
  { icon: NavigationIcon, label: 'Visite guidée' },
  { icon: MapIcon, label: 'Top-down' },
]

const navModes = [
  {
    icon: RotateCcwIcon,
    title: 'Orbite',
    shortcut: 'Mode par défaut',
    desc: 'Tournez autour du modèle en maintenant la caméra focalisée sur un point central. Idéal pour inspecter un objet ou un bâtiment sous tous les angles.',
    controls: [
      'Clic gauche + glisser : rotation',
      'Clic droit + glisser : panoramique',
      'Molette : zoom avant/arrière',
    ],
  },
  {
    icon: PersonStandingIcon,
    title: 'Première personne',
    shortcut: 'Touche F ou bouton FP',
    desc: "Explorez l'espace depuis l'intérieur comme si vous marchiez dedans. Contrôles WASD + souris pour une immersion totale dans le modèle.",
    controls: [
      'Z / W : avancer',
      'S : reculer',
      'Q / A : strafe gauche',
      'D : strafe droite',
      'Souris : regarder autour',
    ],
  },
  {
    icon: NavigationIcon,
    title: 'Visite guidée',
    shortcut: 'Bouton Tour',
    desc: 'La caméra effectue automatiquement un tour complet du modèle sur une trajectoire circulaire, parfait pour les présentations clients en mode "mains libres".',
    controls: [
      'Rotation automatique continue',
      'Bouton Stop pour interrompre',
      "Reprend là où elle s'est arrêtée",
    ],
  },
  {
    icon: MapIcon,
    title: 'Vue de dessus (Top-down)',
    shortcut: 'Bouton Top',
    desc: "Vue aérienne orthogonale du modèle, utile pour comprendre l'organisation spatiale d'un plan d'étage ou l'agencement d'une pièce.",
    controls: [
      'Vue fixe depuis le dessus',
      'Clic + glisser : panoramique',
      'Molette : zoom',
    ],
  },
]

const orbitKeys = [
  { action: 'Rotation', key: 'Clic gauche + glisser' },
  { action: 'Panoramique', key: 'Clic droit + glisser' },
  { action: 'Zoom', key: 'Molette' },
  { action: 'Réinitialiser', key: 'Double-clic' },
]

const fpKeys = [
  { action: 'Avancer', key: 'Z ou W' },
  { action: 'Reculer', key: 'S' },
  { action: 'Strafe gauche', key: 'Q ou A' },
  { action: 'Strafe droite', key: 'D' },
  { action: 'Regarder', key: 'Souris' },
]
</script>
