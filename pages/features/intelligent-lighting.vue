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
      <h2 class="text-3xl font-bold mb-4 text-center">Types d'éclairage</h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Explorez les différentes options d'éclairage pour créer l'ambiance
        parfaite pour vos espaces.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          v-for="type in lightingTypes"
          :key="type.title"
          class="rounded-xl border shadow-sm overflow-hidden"
        >
          <div class="aspect-video">
            <img
              src="/images/generate/image_generate.png"
              :alt="type.title"
              class="w-full h-full object-cover"
            />
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
      <h2 class="text-3xl font-bold mb-10 text-center">
        Modes d'éclairage spécialisés
      </h2>
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
  HomeIcon,
  BuildingIcon,
  LampDeskIcon,
  UtensilsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'sidebar' })

const lightingTypes = [
  {
    title: 'Éclairage naturel',
    desc: 'Simulez la lumière du soleil à différentes heures de la journée pour voir comment votre espace change avec la lumière naturelle.',
  },
  {
    title: 'Éclairage artificiel',
    desc: "Configurez différents types de luminaires avec contrôle précis de l'intensité, de la couleur et de la diffusion.",
  },
  {
    title: "Éclairage d'ambiance",
    desc: "Créez des atmosphères spécifiques avec des préréglages d'éclairage pour différentes ambiances et occasions.",
  },
]

const lightingModes = [
  {
    icon: HomeIcon,
    title: 'Mode résidentiel',
    desc: "Optimisé pour les espaces de vie avec simulation de l'éclairage domestique, incluant des options pour différentes périodes de la journée et ambiances.",
    tags: ['Matinée', 'Soirée', 'Nuit'],
  },
  {
    icon: BuildingIcon,
    title: 'Mode commercial',
    desc: "Conçu pour les espaces commerciaux avec des options pour l'éclairage de produits, de vitrines et d'espaces événementiels.",
    tags: ['Vitrine', 'Boutique', 'Showroom'],
  },
  {
    icon: LampDeskIcon,
    title: 'Mode bureau',
    desc: 'Éclairage adapté aux environnements de travail avec options pour maximiser la productivité et le confort visuel.',
    tags: ['Productif', 'Réunion', 'Créatif'],
  },
  {
    icon: UtensilsIcon,
    title: 'Mode gastronomie',
    desc: "Spécialement conçu pour les restaurants et cafés, avec des options d'éclairage qui mettent en valeur les plats et créent l'ambiance désirée.",
    tags: ['Intimité', 'Dynamique', 'Élégant'],
  },
]
</script>
