<template>
  <div>
    <!-- Section en-tête -->
    <section class="pt-20 pb-12 bg-muted/30 space-y-12 h-screen">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">À propos de VizHome</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transformez vos espaces avec l'intelligence artificielle et la vision
          architecturale
        </p>
      </div>

      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Notre mission</h2>
            <p class="text-lg text-muted-foreground mb-6">
              Chez VizHome, nous sommes déterminés à démocratiser l'accès à la
              visualisation architecturale 3D en mettant la puissance de
              l'intelligence artificielle entre les mains des professionnels et
              des particuliers.
            </p>
            <p class="text-lg text-muted-foreground">
              Notre objectif est de permettre à chacun de transformer facilement
              ses idées et projets en visualisations photoréalistes, sans
              nécessiter des années d'expertise en 3D ou des investissements
              coûteux en matériel.
            </p>
          </div>
          <div
            class="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Mission VizHome"
              class="object-cover w-full h-full"
            />
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Notre équipe -->
    <section id="team" class="py-16 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">Notre équipe</h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Des experts passionnés par l'IA et l'architecture qui travaillent
          ensemble pour transformer votre vision en réalité.
        </p>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          <div class="group">
            <div
              class="text-center bg-card rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-card/80"
            >
              <div class="relative w-32 h-32 mx-auto mb-4">
                <img
                  src="/images/teams/profile_luca.jpg"
                  alt="Lucas Messina"
                  class="rounded-full object-cover w-full h-full border-2 border-primary/10 group-hover:border-primary transition-all"
                />
                <div
                  class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5"
                >
                  <BuildingIcon class="h-4 w-4 text-secondary" />
                </div>
              </div>
              <h3 class="font-medium text-lg">Lucas Messina</h3>
              <p class="text-sm text-muted-foreground mb-3">Fondateur & CEO</p>
              <p
                class="text-sm text-muted-foreground hidden group-hover:block mb-3"
              >
                Visionnaire et entrepreneur avec plus de 10 ans d'expérience
                dans l'industrie architecturale.
              </p>
              <div
                class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <LinkedinIcon class="h-4 w-4" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <TwitterIcon class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div class="group">
            <div
              class="text-center bg-card rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-card/80"
            >
              <div class="relative w-32 h-32 mx-auto mb-4">
                <img
                  src="/images/teams/profile_thibaut.jpg"
                  alt="Thibaut Maurras"
                  class="rounded-full object-cover w-full h-full border-2 border-primary/10 group-hover:border-primary transition-all"
                />
                <div
                  class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5"
                >
                  <CodeIcon class="h-4 w-4 text-secondary" />
                </div>
              </div>
              <h3 class="font-medium text-lg">Thibaut Maurras</h3>
              <p class="text-sm text-muted-foreground mb-3">
                CTO & Intégrateur
              </p>
              <p
                class="text-sm text-muted-foreground hidden group-hover:block mb-3"
              >
                Expert en développement et intégration, passionné par les
                technologies 3D et l'expérience utilisateur.
              </p>
              <div
                class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <LinkedinIcon class="h-4 w-4" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <GithubIcon class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div class="group">
            <div
              class="text-center bg-card rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-card/80"
            >
              <div class="relative w-32 h-32 mx-auto mb-4">
                <img
                  src="/images/teams/profile_nathan.jpeg"
                  alt="Nathan Marques Da Fontes"
                  class="rounded-full object-cover w-full h-full border-2 border-primary/10 group-hover:border-primary transition-all"
                />
                <div
                  class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5"
                >
                  <BrainCircuitIcon class="h-4 w-4 text-secondary" />
                </div>
              </div>
              <h3 class="font-medium text-lg">Nathan Marques Da Fontes</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Directeur Cybersécurité
              </p>
              <p
                class="text-sm text-muted-foreground hidden group-hover:block mb-3"
              >
                Spécialiste en sécurité informatique, garantit la sécurité des
                données de nos clients et de nos systèmes.
              </p>
              <div
                class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <LinkedinIcon class="h-4 w-4" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <ShieldIcon class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div class="group">
            <div
              class="text-center bg-card rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-card/80"
            >
              <div class="relative w-32 h-32 mx-auto mb-4">
                <img
                  src="/images/teams/profile_kortos.jpg"
                  alt="Korto Grinda"
                  class="rounded-full object-cover w-full h-full border-2 border-primary/10 group-hover:border-primary transition-all"
                />
                <div
                  class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5"
                >
                  <BrainCircuitIcon class="h-4 w-4 text-secondary" />
                </div>
              </div>
              <h3 class="font-medium text-lg">Korto Grinda</h3>
              <p class="text-sm text-muted-foreground mb-3">Stagiaire IA</p>
              <p
                class="text-sm text-muted-foreground hidden group-hover:block mb-3"
              >
                Jeune talent spécialisé dans les algorithmes d'IA et
                l'apprentissage automatique pour nos modèles 3D.
              </p>
              <div
                class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <LinkedinIcon class="h-4 w-4" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <GithubIcon class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div class="group">
            <div
              class="text-center bg-card rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-card/80"
            >
              <div class="relative w-32 h-32 mx-auto mb-4">
                <img
                  src="/images/teams/profile_moad.jpg"
                  alt="Maod Mabrouk"
                  class="rounded-full object-cover w-full h-full border-2 border-primary/10 group-hover:border-primary transition-all"
                />
                <div
                  class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5"
                >
                  <BrainCircuitIcon class="h-4 w-4 text-secondary" />
                </div>
              </div>
              <h3 class="font-medium text-lg">Maod Mabrouk</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Developpeur Full Stack
              </p>
              <p
                class="text-sm text-muted-foreground hidden group-hover:block mb-3"
              >
                Passionné par le développement web et les technologies
                émergentes, il contribue activement à l'évolution de notre
                plateforme.
              </p>
              <div
                class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <LinkedinIcon class="h-4 w-4" />
                </a>
                <a href="#" class="text-muted-foreground hover:text-primary">
                  <GithubIcon class="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre histoire -->
    <section class="py-16 h-screen">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Notre histoire</h2>
            <div class="space-y-4">
              <p class="text-muted-foreground">
                Fondée en 2024, VizHome est née d'une vision simple mais
                puissante : démocratiser l'accès à la visualisation
                architecturale 3D de haute qualité.
              </p>
              <p class="text-muted-foreground">
                Lucas Messina, notre fondateur, a constaté que de nombreux
                professionnels de l'architecture et du design d'intérieur
                étaient limités par les outils de rendu complexes et coûteux
                disponibles sur le marché.
              </p>
              <p class="text-muted-foreground">
                En réunissant une équipe d'experts en IA, en développement et en
                architecture, nous avons créé une plateforme qui permet à
                n'importe qui de créer des visualisations 3D photoréalistes sans
                compétences techniques spécifiques.
              </p>
              <p class="text-muted-foreground">
                Aujourd'hui, VizHome sert des milliers de professionnels et
                d'entreprises dans plus de 30 pays, transformant la façon dont
                ils présentent leurs projets et communiquent avec leurs clients.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="absolute -inset-4 bg-primary/5 rounded-xl -rotate-2" />
            <div class="absolute -inset-4 bg-primary/5 rounded-xl rotate-2" />
            <img
              src="https://images.unsplash.com/photo-1664575599736-c5197c684172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="L'histoire de VizHome"
              class="relative rounded-lg shadow-md w-full h-auto aspect-video object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Nos partenaires -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">Nos partenaires</h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Nous collaborons avec les meilleures entreprises pour vous offrir un
          service d'excellence.
        </p>

        <div class="flex flex-wrap justify-center items-center gap-12">
          <div
            class="w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
          >
            <img
              src="https://companieslogo.com/img/orig/ADSK-7966e9ee.png?t=1633504999"
              alt="Partenaire 1"
              class="max-h-full max-w-full"
            />
          </div>
          <div
            class="w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png"
              alt="Partenaire 2"
              class="max-h-full max-w-full"
            />
          </div>
          <div
            class="w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Logo_Unity.svg/1200px-Logo_Unity.svg.png"
              alt="Partenaire 3"
              class="max-h-full max-w-full"
            />
          </div>
          <div
            class="w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg"
              alt="Partenaire 4"
              class="max-h-full max-w-full"
            />
          </div>
          <div
            class="w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
          >
            <img
              src="https://logos-world.net/wp-content/uploads/2020/11/Adobe-Logo.png"
              alt="Partenaire 5"
              class="max-h-full max-w-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Rejoignez-nous -->
    <section class="py-16 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Rejoignez l'aventure VizHome</h2>
          <p class="text-muted-foreground mb-8">
            Découvrez comment VizHome peut transformer votre façon de concevoir
            et de présenter vos projets d'architecture et d'intérieur.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink to="/auth/register">
              <Button size="lg">Essayer gratuitement</Button>
            </NuxtLink>
            <NuxtLink to="/contact">
              <Button variant="outline" size="lg">Contactez-nous</Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  LightbulbIcon,
  UsersIcon,
  CodeIcon,
  BuildingIcon,
  BrainCircuitIcon,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
  ShieldCheckIcon,
  ShieldIcon,
  FileTextIcon,
} from 'lucide-vue-next'
</script>
