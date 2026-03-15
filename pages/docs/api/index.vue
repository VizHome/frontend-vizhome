<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Présentation générale de la plateforme VizHome
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          VizHome est une plateforme innovante de visualisation 3D
          architecturale propulsée par l'intelligence artificielle, conçue pour
          répondre aux besoins des professionnels de l'immobilier, de
          l'architecture et de la décoration. Cette page vous présente les
          principales fonctionnalités et avantages de notre solution.
        </p>
      </CardContent>
    </Card>

    <!-- Qu'est-ce que VizHome -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Qu'est-ce que VizHome ?</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome transforme la manière dont les professionnels visualisent et
            présentent des espaces intérieurs grâce à une technologie de pointe
            en intelligence artificielle et en rendu 3D. Notre plateforme vous
            permet de :
          </p>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Reconstruire des espaces en 3D</h3>
              <p class="text-sm text-muted-foreground">
                Transformez de simples photos en modèles 3D précis et détaillés
                en quelques minutes.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Personnaliser virtuellement</h3>
              <p class="text-sm text-muted-foreground">
                Modifiez les matériaux, l'éclairage, les meubles et la
                décoration sans aucune limitation.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Générer des rendus photoréalistes</h3>
              <p class="text-sm text-muted-foreground">
                Créez des visualisations de qualité professionnelle pour
                impressionner vos clients.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Déclencher des rendus IA</h3>
              <p class="text-sm text-muted-foreground">
                Soumettez des prompts ou des modèles 3D pour générer des rendus
                photoréalistes via l'IA et récupérez les résultats.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Collaborer efficacement</h3>
              <p class="text-sm text-muted-foreground">
                Partagez vos projets avec vos équipes et clients pour un
                feedback instantané.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Principales fonctionnalités -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Principales fonctionnalités</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base"
              >Reconstruction 3D automatique</CardTitle
            >
            <CardDescription>De la photo au modèle 3D</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Notre IA analyse vos photos et génère automatiquement un modèle 3D
              texturé complet avec une précision remarquable.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Bibliothèque de matériaux</CardTitle>
            <CardDescription
              >Des milliers d'options de personnalisation</CardDescription
            >
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Accédez à notre vaste collection de matériaux réalistes pour
              transformer l'apparence de n'importe quel espace.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Catalogue de meubles 3D</CardTitle>
            <CardDescription
              >Aménagez vos espaces virtuellement</CardDescription
            >
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Des milliers de meubles et objets 3D pour meubler et décorer vos
              espaces selon vos besoins.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Rendu avancé</CardTitle>
            <CardDescription
              >Images photoréalistes de haute qualité</CardDescription
            >
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Générez des images de qualité professionnelle avec différentes
              ambiances d'éclairage et perspectives.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Édition collaborative</CardTitle>
            <CardDescription>Travaillez en équipe efficacement</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Invitez des collaborateurs à modifier vos projets et suivez toutes
              les modifications en temps réel.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">API et intégrations</CardTitle>
            <CardDescription>Connectez VizHome à vos outils</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Intégrez notre technologie à vos applications existantes via notre
              API RESTful complète.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Pour qui -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Pour qui ?</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <BuildingIcon class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-medium">Agents immobiliers</h3>
                <p class="text-sm text-muted-foreground mt-1">
                  Valorisez vos biens grâce à des visuels attrayants et des
                  visites virtuelles, tout en réduisant les visites inutiles.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <PencilRulerIcon class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-medium">Architectes et décorateurs</h3>
                <p class="text-sm text-muted-foreground mt-1">
                  Présentez vos concepts de design avec un réalisme
                  impressionnant et explorez rapidement différentes options.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <HardHatIcon class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-medium">Entreprises de rénovation</h3>
                <p class="text-sm text-muted-foreground mt-1">
                  Montrez le "avant/après" de vos projets de rénovation pour
                  aider vos clients à visualiser les transformations.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <StoreIcon class="h-5 w-5" />
              </div>
              <div>
                <h3 class="font-medium">Commerce de détail et e-commerce</h3>
                <p class="text-sm text-muted-foreground mt-1">
                  Permettez à vos clients de visualiser vos produits dans leur
                  propre espace avant l'achat.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Plans et tarifs -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Plans et tarifs</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome propose plusieurs formules adaptées à différents besoins et
            budgets. Consultez notre
            <NuxtLink to="/pricing" class="text-primary hover:underline"
              >page de tarifs</NuxtLink
            >
            pour plus de détails.
          </p>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-2">Freemium</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Idéal pour tester la plateforme
              </p>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>3 projets gratuits</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>20 rendus par projet</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Résolution standard</span>
                </li>
              </ul>
            </div>
            <div class="border rounded-lg p-4 bg-primary/5 border-primary">
              <h3 class="font-medium mb-2">Professionnel</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Pour les professionnels individuels
              </p>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Projets illimités</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Rendus illimités</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Haute résolution</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Rendu IA illimité</span>
                </li>
              </ul>
            </div>
            <div class="border rounded-lg p-4">
              <h3 class="font-medium mb-2">Entreprise</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Pour les équipes et grandes structures
              </p>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Tout le plan Professionnel</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Utilisateurs multiples</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>API complète</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Intégrations personnalisées</span>
                </li>
                <li class="flex items-start gap-2">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <span>Support dédié</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Ressources complémentaires -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Ressources complémentaires</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <NuxtLink to="/docs/projets">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Gestion des projets</CardTitle>
              <CardDescription
                >Organisation et suivi de vos travaux</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Découvrez comment organiser efficacement vos projets de
                visualisation et partager vos travaux.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/rendus">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Rendus de qualité</CardTitle>
              <CardDescription
                >Création d'images professionnelles</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Apprenez à générer des rendus photoréalistes qui
                impressionneront vos clients.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/modeles-3d">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Modèles 3D</CardTitle>
              <CardDescription>Gestion et personnalisation</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Explorez notre bibliothèque de modèles 3D et apprenez à importer
                vos propres modèles.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/materiaux">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Matériaux</CardTitle>
              <CardDescription>Textures et finitions réalistes</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Transformez l'apparence de vos espaces avec notre vaste
                bibliothèque de matériaux.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  BuildingIcon,
  PencilRulerIcon,
  HardHatIcon,
  StoreIcon,
  CheckIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})
</script>
