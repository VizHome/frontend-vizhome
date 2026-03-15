<template>
  <div>
    <!-- Hero -->
    <section class="py-16 px-6 border-b">
      <div
        class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h1 class="text-4xl font-bold mb-4">À propos de VizHome</h1>
          <p class="text-lg text-muted-foreground mb-6">
            Transformez vos espaces avec l'intelligence artificielle et la
            vision architecturale
          </p>
          <h2 class="text-xl font-semibold mb-3">Notre mission</h2>
          <p class="text-muted-foreground mb-4">
            Chez VizHome, nous sommes déterminés à démocratiser l'accès à la
            visualisation architecturale 3D en mettant la puissance de
            l'intelligence artificielle entre les mains des professionnels et
            des particuliers.
          </p>
          <p class="text-muted-foreground">
            Notre objectif est de permettre à chacun de transformer facilement
            ses idées et projets en visualisations photoréalistes, sans
            nécessiter des années d'expertise en 3D ou des investissements
            coûteux.
          </p>
        </div>
        <div
          class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="Mission VizHome"
            class="object-cover w-full h-full"
          />
          <div
            class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"
          />
        </div>
      </div>
    </section>

    <!-- Équipe -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-2 text-center">Notre équipe</h2>
        <p class="text-muted-foreground text-center max-w-xl mx-auto mb-10">
          Des experts passionnés par l'IA et l'architecture qui travaillent
          ensemble pour transformer votre vision en réalité.
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div v-for="member in team" :key="member.name" class="group">
            <div
              class="text-center bg-background rounded-xl p-4 border shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div class="relative w-20 h-20 mx-auto mb-3">
                <img
                  :src="member.photo"
                  :alt="member.name"
                  class="rounded-full object-cover w-full h-full border-2 border-primary/10 group-hover:border-primary transition-all"
                />
                <div
                  class="absolute bottom-0 right-0 bg-primary rounded-full p-1"
                >
                  <component
                    :is="member.icon"
                    class="h-3 w-3 text-primary-foreground"
                  />
                </div>
              </div>
              <h3 class="font-medium text-sm">{{ member.name }}</h3>
              <p class="text-xs text-muted-foreground mt-0.5">
                {{ member.role }}
              </p>
              <div
                class="flex justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <LinkedinIcon class="h-3.5 w-3.5" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <component :is="member.socialIcon" class="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Histoire -->
    <section class="py-16 px-6 border-b">
      <div
        class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h2 class="text-2xl font-bold mb-4">Notre histoire</h2>
          <div class="space-y-4 text-muted-foreground">
            <p>
              Fondée en 2024, VizHome est née d'une vision simple mais puissante
              : démocratiser l'accès à la visualisation architecturale 3D de
              haute qualité.
            </p>
            <p>
              Lucas Messina, notre fondateur, a constaté que de nombreux
              professionnels de l'architecture et du design d'intérieur étaient
              limités par les outils de rendu complexes et coûteux disponibles
              sur le marché.
            </p>
            <p>
              En réunissant une équipe d'experts en IA, en développement et en
              architecture, nous avons créé une plateforme qui permet à
              n'importe qui de créer des visualisations 3D photoréalistes sans
              compétences techniques spécifiques.
            </p>
            <p>
              Aujourd'hui, VizHome sert des milliers de professionnels dans plus
              de 30 pays.
            </p>
          </div>
        </div>
        <div class="relative">
          <div class="absolute -inset-3 bg-primary/5 rounded-xl -rotate-2" />
          <div class="absolute -inset-3 bg-primary/5 rounded-xl rotate-2" />
          <img
            src="https://images.unsplash.com/photo-1664575599736-c5197c684172?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="L'histoire de VizHome"
            class="relative rounded-xl shadow-sm w-full h-auto aspect-video object-cover border"
          />
        </div>
      </div>
    </section>

    <!-- Partenaires -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-2">Nos partenaires</h2>
        <p class="text-muted-foreground max-w-xl mx-auto mb-10">
          Nous collaborons avec les meilleures entreprises pour vous offrir un
          service d'excellence.
        </p>
        <div class="flex flex-wrap justify-center items-center gap-10">
          <div
            v-for="partner in partners"
            :key="partner.name"
            class="w-28 h-14 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 flex items-center justify-center"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-6">
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-primary/5 rounded-2xl border p-10">
          <h2 class="text-2xl font-bold mb-3">Rejoignez l'aventure VizHome</h2>
          <p class="text-muted-foreground mb-6">
            Découvrez comment VizHome peut transformer votre façon de concevoir
            et présenter vos projets.
          </p>
          <div class="flex flex-wrap gap-3 justify-center">
            <Button size="lg" class="rounded-full" as-child>
              <NuxtLink to="/auth/register">Essayer gratuitement</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" class="rounded-full" as-child>
              <NuxtLink to="/contact">Contactez-nous</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingIcon,
  CodeIcon,
  BrainCircuitIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  ShieldIcon,
} from 'lucide-vue-next'


const team = [
  {
    name: 'Lucas Messina',
    role: 'Fondateur & CEO',
    photo: '/images/teams/profile_luca.jpg',
    icon: BuildingIcon,
    socialIcon: TwitterIcon,
  },
  {
    name: 'Thibaut Maurras',
    role: 'CTO & Intégrateur',
    photo: '/images/teams/profile_thibaut.jpg',
    icon: CodeIcon,
    socialIcon: GithubIcon,
  },
  {
    name: 'Nathan Marques Da Fontes',
    role: 'Directeur Cybersécurité',
    photo: '/images/teams/profile_nathan.jpeg',
    icon: BrainCircuitIcon,
    socialIcon: ShieldIcon,
  },
  {
    name: 'Korto Grinda',
    role: 'Stagiaire IA',
    photo: '/images/teams/profile_kortos.jpg',
    icon: BrainCircuitIcon,
    socialIcon: GithubIcon,
  },
  {
    name: 'Maod Mabrouk',
    role: 'Développeur Full Stack',
    photo: '/images/teams/profile_moad.jpg',
    icon: BrainCircuitIcon,
    socialIcon: GithubIcon,
  },
]

const partners = [
  {
    name: 'Autodesk',
    logo: 'https://companieslogo.com/img/orig/ADSK-7966e9ee.png?t=1633504999',
  },
  {
    name: 'Blender',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png',
  },
  {
    name: 'Unity',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Logo_Unity.svg/1200px-Logo_Unity.svg.png',
  },
  {
    name: 'Nvidia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
  },
  {
    name: 'Adobe',
    logo: 'https://logos-world.net/wp-content/uploads/2020/11/Adobe-Logo.png',
  },
]
</script>
