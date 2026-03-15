<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Expérience immersive</Badge>
        <h1 class="text-4xl font-bold mb-6">Vues 360° immersives</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Offrez une expérience interactive complète avec nos visites virtuelles
          à 360° pour présenter vos espaces de façon captivante.
        </p>
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Créer une visite 360°</NuxtLink>
        </Button>
      </div>
      <div
        class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
      >
        <img
          src="/images/generate/image_generate.png"
          alt="Vues 360° immersives"
          class="object-cover w-full h-full"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <Button
            variant="secondary"
            size="icon"
            class="rounded-full h-16 w-16"
          >
            <PlayIcon class="h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>

    <!-- Pourquoi les vues 360° -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">
        Pourquoi utiliser les vues 360° ?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <MousePointerClickIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Engagement interactif</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Les visites 360° augmentent l'engagement des visiteurs de 40% par
              rapport aux images statiques, permettant une expérience mémorable.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <GlobeIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Accessibilité mondiale</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Présentez vos espaces à des clients du monde entier sans
              contraintes géographiques ni déplacements coûteux.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <LineChartIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Taux de conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Les visites virtuelles augmentent les taux de conversion jusqu'à
              30%, aidant à conclure des ventes et approuver des projets plus
              rapidement.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Démos -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-4 text-center">Expérience immersive</h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Explorez nos exemples de visites virtuelles 360° et découvrez la
        puissance de l'immersion.
      </p>
      <Tabs default-value="apartment">
        <TabsList class="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="apartment">Appartement</TabsTrigger>
          <TabsTrigger value="office">Bureau</TabsTrigger>
          <TabsTrigger value="retail">Boutique</TabsTrigger>
        </TabsList>

        <TabsContent
          v-for="tab in demoTabs"
          :key="tab.value"
          :value="tab.value"
        >
          <div
            class="aspect-[16/9] w-full bg-black rounded-xl overflow-hidden relative"
          >
            <img
              src="/images/generate/image_generate.png"
              :alt="`Visite 360° ${tab.label}`"
              class="w-full h-full object-cover opacity-90"
            />
            <!-- Points d'intérêt -->
            <div class="absolute top-1/3 left-1/4">
              <div
                class="w-8 h-8 bg-white/30 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer animate-pulse"
              >
                <PlusIcon class="h-4 w-4 text-white" />
              </div>
            </div>
            <div class="absolute top-1/2 right-1/3">
              <div
                class="w-8 h-8 bg-white/30 rounded-full backdrop-blur-sm flex items-center justify-center cursor-pointer animate-pulse"
              >
                <PlusIcon class="h-4 w-4 text-white" />
              </div>
            </div>
            <!-- Barre de navigation -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center">
              <div
                class="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
              >
                <Button variant="ghost" size="icon" class="text-white h-8 w-8">
                  <ArrowLeftIcon class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" class="text-white h-8 w-8">
                  <HomeIcon class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" class="text-white h-8 w-8">
                  <ArrowRightIcon class="h-4 w-4" />
                </Button>
                <Separator
                  orientation="vertical"
                  class="h-6 mx-1 bg-white/20"
                />
                <Button variant="ghost" size="icon" class="text-white h-8 w-8">
                  <MinusIcon class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" class="text-white h-8 w-8">
                  <PlusIcon class="h-4 w-4" />
                </Button>
                <Separator
                  orientation="vertical"
                  class="h-6 mx-1 bg-white/20"
                />
                <Button variant="ghost" size="icon" class="text-white h-8 w-8">
                  <ExpandIcon class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div class="p-4 text-center">
            <p class="text-muted-foreground">
              {{ tab.description }}
              <a href="#" class="text-primary underline underline-offset-4"
                >Essayer la démo complète</a
              >
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>

    <!-- Fonctionnalités avancées -->
    <section>
      <h2 class="text-3xl font-bold mb-12 text-center">
        Fonctionnalités avancées
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div
          v-for="feature in advancedFeatures"
          :key="feature.title"
          class="flex gap-4"
        >
          <div
            class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
          >
            <component :is="feature.icon" class="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border p-8 md:p-12 text-center"
    >
      <h2 class="text-3xl font-bold mb-4">
        Prêt à créer des expériences immersives ?
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Transformez vos modèles 3D en visites interactives à 360° et offrez une
        expérience mémorable à vos clients.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
        </Button>
        <Button size="lg" variant="outline" class="rounded-full" as-child>
          <NuxtLink to="/gallery">Voir nos exemples</NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  PlayIcon,
  MousePointerClickIcon,
  GlobeIcon,
  LineChartIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  MinusIcon,
  PlusIcon,
  ExpandIcon,
  MapIcon,
  InfoIcon,
  HeadsetIcon,
  ShareIcon,
  MonitorIcon,
  BarChartIcon,
} from 'lucide-vue-next'


const demoTabs = [
  {
    value: 'apartment',
    label: 'appartement',
    description:
      "Cette démo montre un appartement rénové avec points d'intérêt interactifs et navigation intuitive. ",
  },
  {
    value: 'office',
    label: 'bureau',
    description:
      "Expérience interactive d'un espace de bureau moderne avec différentes configurations possibles. ",
  },
  {
    value: 'retail',
    label: 'boutique',
    description:
      'Espace commercial avec produits interactifs permettant aux clients de visualiser différentes options. ',
  },
]

const advancedFeatures = [
  {
    icon: MapIcon,
    title: 'Plan interactif',
    desc: "Intégration d'un plan d'étage permettant une navigation intuitive entre les différentes pièces ou zones.",
  },
  {
    icon: InfoIcon,
    title: "Points d'information",
    desc: "Ajoutez des points d'intérêt interactifs pour mettre en valeur des éléments spécifiques avec du texte, des images ou des vidéos.",
  },
  {
    icon: HeadsetIcon,
    title: 'Audio guide',
    desc: "Intégration d'une narration audio pour guider les visiteurs à travers l'espace et expliquer les caractéristiques importantes.",
  },
  {
    icon: ShareIcon,
    title: 'Partage facile',
    desc: 'Partagez vos visites 360° via un lien unique, par email ou intégrez-les facilement sur votre site web ou réseaux sociaux.',
  },
  {
    icon: MonitorIcon,
    title: 'VR compatible',
    desc: 'Compatibilité avec les casques de réalité virtuelle pour une immersion totale dans vos espaces 3D.',
  },
  {
    icon: BarChartIcon,
    title: 'Statistiques détaillées',
    desc: "Analysez l'engagement des visiteurs avec des métriques détaillées sur le temps passé, les zones d'intérêt et le parcours dans la visite.",
  },
]
</script>
