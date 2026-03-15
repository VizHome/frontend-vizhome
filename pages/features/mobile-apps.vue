<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Mobilité</Badge>
        <h1 class="text-4xl font-bold mb-6">Applications mobiles</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Emportez VizHome partout avec vous grâce à nos applications mobiles
          pour iOS et Android. Créez, visualisez et partagez vos projets 3D où
          que vous soyez.
        </p>
        <div class="flex flex-wrap gap-3">
          <Button size="lg" class="rounded-full gap-2" as-child>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <AppleIcon class="h-5 w-5" />
              App Store
            </a>
          </Button>
          <Button size="lg" class="rounded-full gap-2" as-child>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <SmartphoneIcon class="h-5 w-5" />
              Google Play
            </a>
          </Button>
        </div>
      </div>
      <div class="relative">
        <img
          src="/images/generate/image_generate.png"
          alt="Applications mobiles"
          class="rounded-xl border shadow-sm w-full"
        />
        <img
          src="/images/generate/image_generate.png"
          alt="App mobile détail"
          class="absolute -bottom-8 -left-8 w-2/3 rounded-xl shadow-sm border-4 border-background"
        />
      </div>
    </section>

    <!-- Fonctionnalités principales -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">
        Fonctionnalités principales
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

    <!-- Interface intuitive -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 class="text-3xl font-bold mb-6">Interface intuitive</h2>
          <p class="text-muted-foreground mb-6">
            Notre application mobile a été conçue pour être facile à utiliser,
            même en déplacement, avec une interface claire et des contrôles
            tactiles intuitifs.
          </p>
          <Tabs default-value="projects">
            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projets</TabsTrigger>
              <TabsTrigger value="edit">Édition</TabsTrigger>
              <TabsTrigger value="share">Partage</TabsTrigger>
            </TabsList>
            <TabsContent value="projects" class="space-y-3 mt-4">
              <h3 class="font-semibold">Gestion de projets simplifiée</h3>
              <ul class="space-y-2">
                <li
                  v-for="item in tabContent.projects"
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
              <h3 class="font-semibold">Outils d'édition tactiles</h3>
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
              <h3 class="font-semibold">Options de partage flexibles</h3>
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
              alt="Interface mobile"
              class="rounded-xl shadow-sm border"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Réalité augmentée -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">
        Expérience de réalité augmentée
      </h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Visualisez vos projets dans le monde réel avec notre technologie de
        réalité augmentée avancée.
      </p>
      <div
        class="relative aspect-video rounded-xl overflow-hidden border shadow-sm mb-8"
      >
        <img
          src="/images/generate/image_generate.png"
          alt="Réalité augmentée"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <Button
            variant="secondary"
            size="icon"
            class="rounded-full h-16 w-16"
          >
            <PlayIcon class="h-8 w-8" />
          </Button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feat in arFeatures"
          :key="feat.title"
          class="bg-muted/30 rounded-xl border p-4"
        >
          <div
            class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"
          >
            <component :is="feat.icon" class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold mb-2">{{ feat.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ feat.desc }}</p>
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
        Téléchargez notre application mobile
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Disponible sur iOS et Android, notre application vous permet d'emporter
        VizHome partout avec vous.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="rounded-full gap-2" as-child>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <AppleIcon class="h-5 w-5" />
            Télécharger sur iOS
          </a>
        </Button>
        <Button size="lg" class="rounded-full gap-2" as-child>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <SmartphoneIcon class="h-5 w-5" />
            Télécharger sur Android
          </a>
        </Button>
      </div>
      <p class="text-sm text-muted-foreground mt-6">
        Nécessite iOS 14.0+ ou Android 9.0+. Connexion Internet requise pour
        certaines fonctionnalités.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  AppleIcon,
  SmartphoneIcon,
  CameraIcon,
  CloudIcon,
  NotebookIcon,
  CheckIcon,
  PlayIcon,
  ScanIcon,
  HandIcon,
  StarIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'sidebar' })

const mainFeatures = [
  {
    icon: CameraIcon,
    title: 'Capture rapide',
    desc: 'Prenez une photo avec votre téléphone et transformez-la instantanément en modèle 3D grâce à notre IA mobile.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Visualisation AR',
    desc: 'Visualisez vos projets en réalité augmentée directement dans votre environnement physique pour une expérience immersive.',
  },
  {
    icon: CloudIcon,
    title: 'Synchronisation cloud',
    desc: 'Tous vos projets sont automatiquement synchronisés entre vos appareils pour un accès transparent où que vous soyez.',
  },
  {
    icon: NotebookIcon,
    title: 'Notes de terrain',
    desc: 'Prenez des notes et faites des croquis directement sur site, puis intégrez-les à vos projets 3D pour une référence rapide.',
  },
]

const tabContent = {
  projects: [
    'Affichage en grille ou en liste de tous vos projets',
    'Filtres intelligents par date, type ou statut',
    'Accès rapide aux projets récents ou favoris',
  ],
  edit: [
    'Modification des matériaux par simple tapotement',
    'Contrôles de rotation et de zoom intuitifs',
    "Réglage de l'éclairage avec des gestes simples",
  ],
  share: [
    'Partage direct via messagerie, email ou réseaux sociaux',
    'Génération de liens de visualisation sécurisés',
    "Export d'images haute résolution en un clic",
  ],
}

const arFeatures = [
  {
    icon: ScanIcon,
    title: "Scan de l'environnement",
    desc: "L'application analyse automatiquement l'espace pour placer les objets de manière réaliste.",
  },
  {
    icon: HandIcon,
    title: 'Manipulation intuitive',
    desc: 'Déplacez, tournez et redimensionnez les modèles avec des gestes naturels.',
  },
  {
    icon: CameraIcon,
    title: "Capture d'écrans AR",
    desc: "Prenez des photos ou des vidéos de vos projets intégrés dans l'environnement réel.",
  },
]

const testimonials = [
  {
    name: 'Julien Durand',
    role: "Architecte d'intérieur",
    initials: 'JD',
    avatar: 'https://i.pravatar.cc/150?img=26',
    quote:
      "L'application mobile VizHome est devenue mon outil indispensable sur les chantiers. Je peux scanner un espace et présenter immédiatement des options de design à mes clients.",
  },
  {
    name: 'Emma Martin',
    role: 'Agent immobilier',
    initials: 'EM',
    avatar: 'https://i.pravatar.cc/150?img=28',
    quote:
      "La fonction de réalité augmentée est incroyable. Mes clients peuvent littéralement voir leur future maison avant même qu'elle ne soit construite. Un outil de vente puissant.",
  },
  {
    name: 'Lucas Bernard',
    role: "Designer d'espace",
    initials: 'LB',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote:
      'La synchronisation avec la version desktop est parfaite. Je commence un projet au bureau et je peux le continuer en déplacement sans aucune difficulté.',
  },
]
</script>
