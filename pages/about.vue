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
              <!-- Liens sociaux : rendus uniquement si une URL réelle est fournie.
                   TODO : remplir `socials` sur chaque fiche pour activer les boutons. -->
              <div
                v-if="member.socials?.length"
                class="flex justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a
                  v-for="s in member.socials"
                  :key="s.url"
                  :href="s.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-muted-foreground hover:text-primary"
                  :aria-label="s.label"
                >
                  <component :is="s.icon" class="h-3.5 w-3.5" />
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
              Fondée en 2026, VizHome est née d'une vision simple mais
              puissante : démocratiser l'accès à la visualisation architecturale
              3D de haute qualité grâce à l'intelligence artificielle.
            </p>
            <p>
              Lucas Messina, notre fondateur, a constaté que de nombreux
              professionnels de l'architecture et du design d'intérieur étaient
              limités par des outils de rendu complexes et coûteux.
            </p>
            <p>
              Avec une équipe d'experts en IA, développement web et
              architecture, nous avons créé une plateforme qui permet à
              n'importe qui de créer des visualisations 3D photoréalistes sans
              compétences techniques spécifiques.
            </p>
            <p>
              Nous sommes actuellement en early access — quelques dizaines
              d'utilisateurs nous aident à façonner le produit avant le
              lancement public.
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

    <!-- Stack technique : remplace l'ancienne section "Partenaires" (logos sans
         vrais partnerships commerciaux, chargés depuis CDN externes fragiles). -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-2">Construit avec</h2>
        <p class="text-muted-foreground max-w-xl mx-auto mb-10">
          Les technologies open source qui font tourner VizHome au quotidien.
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-3xl mx-auto">
          <div
            v-for="tech in stack"
            :key="tech.name"
            class="rounded-xl border bg-background p-4 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors"
          >
            <component
              :is="tech.icon"
              class="h-6 w-6 mb-2 text-primary"
            />
            <p class="text-xs font-medium">{{ tech.name }}</p>
            <p class="text-[10px] text-muted-foreground">{{ tech.role }}</p>
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
  BoxIcon,
  BrainCircuitIcon,
  BuildingIcon,
  CodeIcon,
  DatabaseIcon,
  GithubIcon,
  LinkedinIcon,
  ServerIcon,
} from 'lucide-vue-next'


interface TeamSocial {
  url: string
  icon: typeof LinkedinIcon
  label: string
}

interface TeamMember {
  name: string
  role: string
  photo: string
  icon: typeof BuildingIcon
  socials?: TeamSocial[]
}

const team: TeamMember[] = [
  {
    name: 'Lucas Messina',
    role: 'Fondateur & CEO',
    photo: '/images/teams/profile_luca.jpg',
    icon: BuildingIcon,
    // socials: [{ url: 'https://linkedin.com/in/...', icon: LinkedinIcon, label: 'LinkedIn' }],
  },
  {
    name: 'Thibaut Maurras',
    role: 'CTO & Intégrateur',
    photo: '/images/teams/profile_thibaut.jpg',
    icon: CodeIcon,
    socials: [
      {
        url: 'https://github.com/Foufou-exe',
        icon: GithubIcon,
        label: 'GitHub',
      },
    ],
  },
  {
    name: 'Nathan Marques Da Fontes',
    role: 'Directeur Cybersécurité',
    photo: '/images/teams/profile_nathan.jpeg',
    icon: BrainCircuitIcon,
  },
  {
    name: 'Korto Grinda',
    role: 'Stagiaire IA',
    photo: '/images/teams/profile_kortos.jpg',
    icon: BrainCircuitIcon,
  },
  {
    name: 'Maod Mabrouk',
    role: 'Développeur Full Stack',
    photo: '/images/teams/profile_moad.jpg',
    icon: BrainCircuitIcon,
  },
]

// Stack technique factuelle (vs ancienne section "Partenaires" qui prétendait
// des partnerships avec Autodesk / Adobe / Nvidia inexistants).
const stack = [
  { name: 'Nuxt 4', role: 'Frontend', icon: BoxIcon },
  { name: 'Vue 3', role: 'UI', icon: CodeIcon },
  { name: 'Django 5', role: 'Backend API', icon: ServerIcon },
  { name: 'PostgreSQL', role: 'Base de données', icon: DatabaseIcon },
  { name: 'Three.js', role: 'Rendu 3D', icon: BoxIcon },
  { name: 'Gemini', role: 'IA générative', icon: BrainCircuitIcon },
]
</script>
