<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Accès universel</Badge>
        <h1 class="text-4xl font-bold mb-6">VizHome partout</h1>
        <p class="text-xl text-muted-foreground mb-8">
          VizHome est une application web responsive accessible depuis n'importe
          quel appareil disposant d'un navigateur moderne. Consultez vos
          projets, ajustez les matériaux et partagez vos rendus depuis votre
          bureau, tablette ou mobile.
        </p>
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/render">Ouvrir l'éditeur</NuxtLink>
        </Button>
      </div>
      <div class="relative">
        <img
          src="/images/generate/image_generate.png"
          alt="VizHome sur mobile et desktop"
          class="rounded-xl border shadow-sm w-full"
        />
        <img
          src="/images/generate/image_generate.png"
          alt="Vue détaillée mobile"
          class="absolute -bottom-8 -left-8 w-2/3 rounded-xl shadow-sm border-4 border-background"
        />
      </div>
    </section>

    <!-- Ce qui fonctionne sur mobile -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">
        Fonctionnalités sur mobile et tablette
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="feat in mainFeatures"
          :key="feat.title"
          class="rounded-xl border shadow-sm"
        >
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <component :is="feat.icon" class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{{ feat.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ feat.desc }}</p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Interface adaptée -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 class="text-3xl font-bold mb-6">Interface adaptée aux écrans</h2>
          <p class="text-muted-foreground mb-6">
            L'interface de VizHome s'adapte automatiquement à la taille de
            l'écran. Sur mobile et tablette, les gestes tactiles remplacent la
            souris pour naviguer dans les modèles 3D.
          </p>
          <Tabs default-value="view">
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value="view">Visualisation</TabsTrigger>
              <TabsTrigger value="edit">Édition</TabsTrigger>
              <TabsTrigger value="share">Partage</TabsTrigger>
            </TabsList>
            <TabsContent value="view" class="space-y-3 mt-4">
              <h3 class="font-semibold">Navigation tactile 3D</h3>
              <ul class="space-y-2">
                <li
                  v-for="item in tabContent.view"
                  :key="item"
                  class="flex items-start gap-2"
                >
                  <CheckIcon
                    class="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  />
                  <span class="text-muted-foreground">{{ item }}</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="edit" class="space-y-3 mt-4">
              <h3 class="font-semibold">Édition sur tablette</h3>
              <ul class="space-y-2">
                <li
                  v-for="item in tabContent.edit"
                  :key="item"
                  class="flex items-start gap-2"
                >
                  <CheckIcon
                    class="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  />
                  <span class="text-muted-foreground">{{ item }}</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="share" class="space-y-3 mt-4">
              <h3 class="font-semibold">Partage depuis mobile</h3>
              <ul class="space-y-2">
                <li
                  v-for="item in tabContent.share"
                  :key="item"
                  class="flex items-start gap-2"
                >
                  <CheckIcon
                    class="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  />
                  <span class="text-muted-foreground">{{ item }}</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        <div class="flex items-center justify-center">
          <div class="w-full max-w-xs">
            <img
              src="/images/generate/image_generate.png"
              alt="Interface mobile VizHome"
              class="rounded-xl shadow-sm border"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Compatibilité -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">
        Compatibilité navigateurs
      </h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        VizHome requiert un navigateur avec support WebGL 2.0 pour le rendu 3D
        Three.js. Tous les navigateurs modernes le supportent.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div
          v-for="browser in browsers"
          :key="browser.name"
          class="bg-muted/30 rounded-xl border p-4 flex items-center gap-4"
        >
          <div
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
          >
            <component :is="browser.icon" class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p class="font-medium">{{ browser.name }}</p>
            <p class="text-xs text-muted-foreground">{{ browser.note }}</p>
          </div>
          <CheckIcon class="h-5 w-5 text-primary ml-auto flex-shrink-0" />
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-10 text-center">
        Ce que disent nos utilisateurs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          v-for="t in testimonials"
          :key="t.name"
          class="rounded-xl border shadow-sm"
        >
          <CardContent class="pt-6">
            <div class="flex text-amber-400 mb-4">
              <StarIcon v-for="i in 5" :key="i" class="h-4 w-4 fill-current" />
            </div>
            <blockquote class="italic text-muted-foreground mb-6">
              "{{ t.quote }}"
            </blockquote>
            <div class="flex items-center gap-3">
              <Avatar>
                <AvatarImage :src="t.avatar" />
                <AvatarFallback>{{ t.initials }}</AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">{{ t.name }}</p>
                <p class="text-sm text-muted-foreground">{{ t.role }}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border p-8 md:p-12 text-center"
    >
      <h2 class="text-3xl font-bold mb-4">
        Accédez à VizHome où que vous soyez
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Aucune installation requise. Ouvrez simplement votre navigateur et
        commencez à créer.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Créer un compte gratuit</NuxtLink>
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
  MonitorIcon,
  TabletIcon,
  SmartphoneIcon,
  Share2Icon,
  CheckIcon,
  GlobeIcon,
  StarIcon,
} from 'lucide-vue-next'

const mainFeatures = [
  {
    icon: MonitorIcon,
    title: 'Éditeur complet',
    desc: 'Sur desktop, accédez aux 3 modes (Croquis 2D, Prompt IA, 3D Pro) avec tous les outils et panels disponibles.',
  },
  {
    icon: TabletIcon,
    title: 'Tablette optimisée',
    desc: "Sur tablette, les gestes multi-touch permettent de naviguer dans les modèles 3D et d'ajuster les matériaux via les panels.",
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile — consultation',
    desc: 'Sur smartphone, consultez et partagez vos projets. La navigation 3D reste accessible avec les gestes tactiles.',
  },
  {
    icon: Share2Icon,
    title: 'Partage universel',
    desc: "Envoyez un lien de visualisation à vos clients — ils accèdent au modèle 3D interactif depuis n'importe quel appareil.",
  },
]

const tabContent = {
  view: [
    'Pinch-to-zoom pour zoomer sur le modèle',
    'Glisser un doigt pour faire pivoter (mode orbite)',
    'Deux doigts pour panoramiquer',
  ],
  edit: [
    'Modification des matériaux via les panels tactiles',
    "Réglage de l'éclairage avec les sliders",
    'Génération de prompts IA depuis le clavier mobile',
  ],
  share: [
    'Copie du lien de partage en un tap',
    'Export PNG directement depuis le navigateur mobile',
    'Envoi par messagerie ou email natif',
  ],
}

const browsers = [
  {
    icon: GlobeIcon,
    name: 'Chrome / Chromium',
    note: 'Version 88+ · WebGL 2.0 ✓',
  },
  { icon: GlobeIcon, name: 'Firefox', note: 'Version 85+ · WebGL 2.0 ✓' },
  {
    icon: GlobeIcon,
    name: 'Safari',
    note: 'Version 14+ · WebGL 2.0 ✓ (iOS 14+)',
  },
  { icon: GlobeIcon, name: 'Edge', note: 'Version 88+ · WebGL 2.0 ✓' },
]

const testimonials = [
  {
    name: 'Julien Durand',
    role: "Architecte d'intérieur",
    initials: 'JD',
    avatar: 'https://i.pravatar.cc/150?img=26',
    quote:
      "Je présente mes rendus 3D sur tablette directement chez le client. L'interface tactile est fluide et mes clients adorent interagir avec le modèle.",
  },
  {
    name: 'Emma Martin',
    role: 'Agent immobilier',
    initials: 'EM',
    avatar: 'https://i.pravatar.cc/150?img=28',
    quote:
      "Depuis mon téléphone, j'envoie en quelques secondes un lien de visualisation 3D à mes acheteurs. Plus besoin de déplacer un ordinateur en visite.",
  },
  {
    name: 'Lucas Bernard',
    role: "Designer d'espace",
    initials: 'LB',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote:
      'Je commence un projet au bureau sur desktop et je peux vérifier le rendu final depuis mon mobile pendant mes déplacements. Parfaitement synchronisé.',
  },
]
</script>
