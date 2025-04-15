<template>
  <div>
    <!-- Section en-tête -->
    <section class="pt-20 pb-12 bg-muted/30 space-y-12 h-screen">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">À propos de VizHome</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transformez vos espaces avec l'intelligence artificielle et la vision architecturale
        </p>
      </div>

      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Notre mission</h2>
            <p class="text-lg text-muted-foreground mb-6">
              Chez VizHome, nous sommes déterminés à démocratiser l'accès à la visualisation architecturale 3D en
              mettant
              la puissance de l'intelligence artificielle entre les mains des professionnels et des particuliers.
            </p>
            <p class="text-lg text-muted-foreground">
              Notre objectif est de permettre à chacun de transformer facilement ses idées et projets en visualisations
              photoréalistes, sans nécessiter des années d'expertise en 3D ou des investissements coûteux en matériel.
            </p>
          </div>
          <div class="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <img src="/images/about/worker.png" alt="Mission VizHome" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre histoire -->
    <section class="py-16 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Notre histoire</h2>
        <div class="max-w-3xl mx-auto">
          <div class="relative">
            <div class="absolute left-[15px] top-0 h-full w-0.5 bg-primary/20"></div>

            <div class="space-y-12">
              <div class="relative pl-10">
                <div class="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <div class="h-3 w-3 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-2">2024 - Les débuts</h3>
                  <p class="text-muted-foreground">
                    VizHome a été fondée par une équipe d'architectes et de développeurs
                    partageant une vision commune : rendre la visualisation 3D plus accessible.
                    Après deux ans de recherche et développement en intelligence artificielle appliquée
                    à la reconnaissance d'images architecturales, notre premier prototype voit le jour.
                  </p>
                </div>
              </div>

              <div class="relative pl-10">
                <div class="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <div class="h-3 w-3 rounded-full bg-primary animate-pulse bg-green-500"></div>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-2">2025 - Le lancement</h3>
                  <p class="text-muted-foreground">
                    Lancement de la première version bêta de VizHome, avec un groupe restreint d'utilisateurs
                    professionnels. Les retours enthousiastes nous encouragent à accélérer le développement
                    et à perfectionner notre moteur d'IA.
                  </p>
                </div>
              </div>

              <div class="relative pl-10">
                <div class="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <div class="h-3 w-3 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-2">2026 - L'innovation</h3>
                  <p class="text-muted-foreground">
                    VizHome révolutionne le marché en introduisant la première plateforme de rendu 3D
                    entièrement pilotée par IA, avec des temps de génération réduits à quelques secondes.
                    Notre équipe s'agrandit et notre solution commence à être adoptée par des studios
                    d'architecture de renom.
                  </p>
                </div>
              </div>

              <div class="relative pl-10">
                <div class="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <div class="h-3 w-3 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-2">2027 - L'expansion</h3>
                  <p class="text-muted-foreground">
                    Aujourd'hui, VizHome prévoit d'être utilisée dans plus de 50 pays.
                    Notre équipe continue de repousser les limites de ce qui est possible en matière de
                    visualisation architecturale, avec l'introduction de nouvelles fonctionnalités comme
                    les visites virtuelles 360° et l'intégration VR.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos valeurs -->
    <section class="py-16 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Nos valeurs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <LightbulbIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Innovation</h3>
              <p class="text-sm text-muted-foreground">
                Nous repoussons sans cesse les frontières de la technologie pour créer des solutions qui étaient
                auparavant impossibles. L'innovation est au cœur de notre ADN et guide chacune de nos décisions.
              </p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardHeader class="pb-2">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <UsersIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Accessibilité</h3>
              <p class="text-sm text-muted-foreground">
                Nous croyons que la technologie avancée doit être accessible à tous. Notre mission est de démocratiser
                des outils auparavant réservés à une élite technique, permettant à chacun de concrétiser sa vision
                créative.
              </p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardHeader class="pb-2">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <LeafIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Écoresponsabilité</h3>
              <p class="text-sm text-muted-foreground">
                En optimisant les ressources de calcul et en réduisant le besoin de matériel spécialisé, nous
                contribuons
                à diminuer l'empreinte carbone du secteur. Notre approche cloud est conçue pour être économe en énergie.
              </p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardHeader class="pb-2">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <PaletteIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Créativité</h3>
              <p class="text-sm text-muted-foreground">
                Nous valorisons la créativité sous toutes ses formes. Notre technologie est conçue pour
                amplifier le potentiel créatif de nos utilisateurs, jamais pour le remplacer.
              </p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardHeader class="pb-2">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <ShieldIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Fiabilité</h3>
              <p class="text-sm text-muted-foreground">
                Nous nous engageons à fournir des services stables et des résultats constants sur lesquels
                nos clients peuvent compter pour leurs projets professionnels et personnels.
              </p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardHeader class="pb-2">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <HeartIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Passion</h3>
              <p class="text-sm text-muted-foreground">
                Notre équipe est animée par une passion commune pour l'architecture, la technologie et l'art.
                Cette passion se reflète dans chaque aspect de notre produit.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Notre équipe -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Notre équipe</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="relative w-32 h-32 mx-auto mb-4">
              <img src="/images/teams/profile_luca.jpg" alt="Lucas Messina"
                class="rounded-full object-cover w-full h-full" />
              <div class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                <BuildingIcon class="h-4 w-4 text-secondary" />
              </div>
            </div>
            <h3 class="font-medium text-lg">Lucas Messina</h3>
            <p class="text-sm text-muted-foreground">Fondateur & CEO</p>
          </div>

          <div class="text-center">
            <div class="relative w-32 h-32 mx-auto mb-4">
              <img src="/images/teams/profile_thibaut.jpg" alt="Thomas Dubois"
                class="rounded-full object-cover w-full h-full" />
              <div class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                <CodeIcon class="h-4 w-4 text-secondary" />
              </div>
            </div>
            <h3 class="font-medium text-lg">Thibaut Maurras</h3>
            <p class="text-sm text-muted-foreground">
              CTO & Intégrateur
            </p>
          </div>

          <div class="text-center h-screen">
            <div class="relative w-32 h-32 mx-auto mb-4">
              <img src="/images/teams/profile_nathan.jpeg" alt="Marc Legrand"
                class="rounded-full object-cover w-full h-full" />
              <div class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                <BrainCircuitIcon class="h-4 w-4 text-secondary" />
              </div>
            </div>
            <h3 class="font-medium text-lg">Nathan Marques Da Fontes</h3>
            <p class="text-sm text-muted-foreground">Directeur Cybersecuritée</p>
          </div>

          <div class="text-center">
            <div class="relative w-32 h-32 mx-auto mb-4">
              <img src="/images/teams/profile_kortos.jpg" alt="Marc Legrand"
                class="rounded-full object-cover w-full h-full" />
              <div class="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                <BrainCircuitIcon class="h-4 w-4 text-secondary" />
              </div>
            </div>
            <h3 class="font-medium text-lg">Korto Grinda</h3>
            <p class="text-sm text-muted-foreground">Stagiaire</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Rejoignez l'aventure VizHome</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Découvrez comment notre technologie peut transformer vos projets architecturaux
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" as-child>
            <NuxtLink to="/auth/register">
              Essayer gratuitement
            </NuxtLink>
          </Button>
          <Button size="lg" variant="outline" as-child>
            <NuxtLink to="/contact">
              Nous contacter
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  LightbulbIcon, UsersIcon, LeafIcon, PaletteIcon, ShieldIcon, HeartIcon,
  CodeIcon, BuildingIcon, BrainCircuitIcon, Box, BarChartIcon
} from 'lucide-vue-next'
</script>

<style scoped></style>