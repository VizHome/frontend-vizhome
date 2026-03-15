<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Technologie exclusive</Badge>
        <h1 class="text-4xl font-bold mb-6">Éclairage intelligent</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Simulez des conditions d'éclairage réalistes et dynamiques pour donner
          vie à vos espaces 3D avec notre technologie d'éclairage intelligent.
        </p>
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register"
            >Découvrir l'éclairage intelligent</NuxtLink
          >
        </Button>
      </div>
      <div
        class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
      >
        <img
          src="/images/generate/image_generate.png"
          alt="Éclairage intelligent"
          class="object-cover w-full h-full"
        />
      </div>
    </section>

    <!-- Types d'éclairage -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">Ambiances et saisons</h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Le panel Éclairage du mode 3D Pro vous donne accès à des préréglages
        d'ambiances et de saisons pour transformer instantanément l'atmosphère
        de votre scène.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <Card class="rounded-xl border shadow-sm p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <SunIcon class="h-5 w-5 text-primary" />
            </div>
            <h3 class="text-lg font-semibold">Ambiances lumineuses</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="a in ambiances"
              :key="a"
              variant="secondary"
              class="rounded-full"
              >{{ a }}</Badge
            >
          </div>
        </Card>
        <Card class="rounded-xl border shadow-sm p-6">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <LeafIcon class="h-5 w-5 text-primary" />
            </div>
            <h3 class="text-lg font-semibold">Saisons</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              v-for="s in saisons"
              :key="s"
              variant="secondary"
              class="rounded-full"
              >{{ s }}</Badge
            >
          </div>
          <p class="text-sm text-muted-foreground mt-3">
            Chaque saison modifie la température de couleur et la direction de
            la lumière solaire.
          </p>
        </Card>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          v-for="type in lightingTypes"
          :key="type.title"
          class="rounded-xl border shadow-sm overflow-hidden"
        >
          <div
            class="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center"
          >
            <component :is="type.icon" class="h-12 w-12 text-primary/40" />
          </div>
          <CardContent class="p-4">
            <h3 class="font-medium mb-2">{{ type.title }}</h3>
            <p class="text-muted-foreground text-sm">{{ type.desc }}</p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Technologie d'illumination globale -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 class="text-3xl font-bold mb-6">
            Technologie d'illumination globale
          </h2>
          <p class="text-muted-foreground mb-6">
            Notre moteur d'éclairage avancé simule avec précision la façon dont
            la lumière rebondit, se diffuse et interagit avec différentes
            surfaces et matériaux.
          </p>
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Réflexions réalistes</AccordionTrigger>
              <AccordionContent>
                Simulation précise des réflexions directes et indirectes sur
                toutes les surfaces, prenant en compte les propriétés des
                matériaux comme la brillance et la rugosité.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Ombres douces et dures</AccordionTrigger>
              <AccordionContent>
                Génération automatique d'ombres réalistes avec variation de la
                douceur en fonction de la distance et de la taille de la source
                lumineuse.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Occlusion ambiante</AccordionTrigger>
              <AccordionContent>
                Calcul avancé de l'occlusion ambiante qui ajoute de la
                profondeur et du réalisme aux coins, jonctions et zones moins
                exposées à la lumière.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Caustiques</AccordionTrigger>
              <AccordionContent>
                Simulation des effets de concentration de lumière comme ceux
                créés par les surfaces réfléchissantes ou réfractives (verre,
                eau, métal poli).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="relative">
          <img
            src="/images/generate/image_generate.png"
            alt="Technologie d'éclairage"
            class="rounded-xl shadow-sm border w-full"
          />
          <div
            class="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border"
          >
            <h3 class="text-sm font-semibold mb-1">Performance optimisée</h3>
            <p class="text-xs text-muted-foreground">
              Rendu en temps réel grâce à notre IA
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact de l'éclairage -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">
        L'impact de l'éclairage
      </h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Découvrez comment un éclairage bien conçu peut transformer complètement
        l'apparence et l'ambiance d'un espace.
      </p>
      <div class="max-w-3xl mx-auto">
        <div
          class="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden border shadow-sm"
        >
          <div
            class="absolute inset-0"
            style="clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%)"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Avant l'éclairage"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute inset-0">
            <img
              src="/images/generate/image_generate.png"
              alt="Après l'éclairage"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            class="absolute inset-y-0 left-1/2 -ml-1 w-2 bg-white/70 cursor-col-resize flex justify-center"
          >
            <div
              class="bg-white h-10 w-10 rounded-full shadow-lg absolute top-1/2 -mt-5 flex items-center justify-center border-4 border-primary"
            >
              <ChevronLeftIcon class="h-4 w-4 text-primary" />
              <ChevronRightIcon class="h-4 w-4 text-primary" />
            </div>
          </div>
          <div
            class="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 text-sm rounded backdrop-blur-sm"
          >
            Éclairage basique
          </div>
          <div
            class="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 text-sm rounded backdrop-blur-sm"
          >
            Éclairage intelligent
          </div>
        </div>
        <p class="text-muted-foreground text-center mt-6">
          Faites glisser le curseur pour voir la différence entre l'éclairage
          standard et notre technologie d'éclairage intelligent.
        </p>
      </div>
    </section>

    <!-- Modes d'éclairage spécialisés -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-10 text-center">Contrôles avancés</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="mode in lightingModes"
          :key="mode.title"
          class="rounded-xl border shadow-sm"
        >
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <component :is="mode.icon" class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>{{ mode.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground mb-4">{{ mode.desc }}</p>
            <div class="flex flex-wrap gap-2">
              <Badge v-for="tag in mode.tags" :key="tag" variant="outline">{{
                tag
              }}</Badge>
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
        Illuminez vos projets avec précision
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Transformez l'ambiance de vos espaces 3D grâce à notre technologie
        d'éclairage intelligent et offrez une expérience visuelle inégalée.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
        </Button>
        <Button size="lg" variant="outline" class="rounded-full" as-child>
          <NuxtLink to="/pricing">Voir nos offres</NuxtLink>
        </Button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  SunIcon,
  MoonIcon,
  CloudSunIcon,
  LampDeskIcon,
  LeafIcon,
  SunriseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SunsetIcon,
  ThermometerIcon,
} from 'lucide-vue-next'

const ambiances = [
  'Naturelle',
  'Dramatique',
  'Studio',
  'Coucher de soleil',
  'Nuit',
]
const saisons = ['Printemps', 'Été', 'Automne', 'Hiver']

const lightingTypes = [
  {
    icon: SunIcon,
    title: 'Lumière naturelle',
    desc: "Simulez la lumière du jour selon l'heure, la saison et l'orientation de l'espace.",
  },
  {
    icon: LampDeskIcon,
    title: 'Lumière artificielle',
    desc: 'Intensité, couleur et direction de la lumière directionnelle entièrement configurables.',
  },
  {
    icon: MoonIcon,
    title: 'Ambiance nocturne',
    desc: 'Mode Nuit avec température de couleur froide et ombres profondes pour des rendus dramatiques.',
  },
]

const lightingModes = [
  {
    icon: ThermometerIcon,
    title: 'Intensité ambiante',
    desc: "Réglage de la lumière ambiante globale pour contrôler les zones d'ombre et la profondeur de la scène.",
    tags: ['Ambiance', 'Ombre douce', 'Profondeur'],
  },
  {
    icon: SunIcon,
    title: 'Lumière directionnelle',
    desc: 'Direction et couleur de la source lumineuse principale, simulant soleil ou projecteur.',
    tags: ['Direction', 'Couleur', 'Intensité'],
  },
  {
    icon: CloudSunIcon,
    title: 'Saisons automatiques',
    desc: "Chaque saison règle automatiquement la température de couleur et l'angle du soleil.",
    tags: ['Printemps', 'Été', 'Automne', 'Hiver'],
  },
  {
    icon: SunriseIcon,
    title: "Préréglages d'ambiance",
    desc: "Cinq ambiances prêtes à l'emploi pour transformer l'atmosphère en un clic.",
    tags: ['Naturelle', 'Studio', 'Dramatique', 'Coucher de soleil', 'Nuit'],
  },
]
</script>
