<template>
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">
    <!-- Hero -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <Badge class="mb-4 rounded-full">Bibliothèque étendue</Badge>
        <h1 class="text-4xl font-bold mb-6">Bibliothèque de matériaux</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Accédez à plus de 10 000 matériaux photoréalistes pour transformer vos
          espaces avec une précision inégalée.
        </p>
        <Button size="lg" class="rounded-full" as-child>
          <NuxtLink to="/auth/register">Explorer la bibliothèque</NuxtLink>
        </Button>
      </div>
      <div
        class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
      >
        <img
          src="/images/generate/image_generate.png"
          alt="Bibliothèque de matériaux"
          class="object-cover w-full h-full"
        />
      </div>
    </section>

    <!-- Catégories de matériaux -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">
        Catégories principales
      </h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Explorez notre vaste collection de matériaux classés par catégories pour
        tous vos besoins.
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <Card
          v-for="cat in categories"
          :key="cat.name"
          class="rounded-xl border shadow-sm overflow-hidden"
        >
          <div class="aspect-square">
            <img
              src="/images/generate/image_generate.png"
              :alt="cat.name"
              class="w-full h-full object-cover"
            />
          </div>
          <CardFooter class="p-3 flex justify-center">
            <span class="font-medium text-sm">{{ cat.name }}</span>
          </CardFooter>
        </Card>
      </div>
      <div class="text-center mt-8">
        <Button variant="outline" class="rounded-full gap-2">
          Voir toutes les catégories
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </section>

    <!-- Fonctionnalités clés -->
    <section class="bg-muted/30 rounded-xl border p-8 md:p-12">
      <h2 class="text-3xl font-bold mb-10 text-center">Fonctionnalités clés</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <SearchIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Recherche avancée</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Trouvez le matériau parfait grâce à notre moteur de recherche
              intelligent par couleur, texture, style ou pièce.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <ReplaceIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Remplacement instantané</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Appliquez les matériaux en temps réel avec un aperçu instantané
              pour voir le résultat avant de valider.
            </p>
          </CardContent>
        </Card>

        <Card class="rounded-xl border shadow-sm">
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
            >
              <PaletteIcon class="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Personnalisation</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">
              Ajustez les propriétés des matériaux (brillance, rugosité,
              couleur) pour obtenir exactement l'effet souhaité.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Importez vos propres matériaux -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl font-bold mb-6">Importez vos propres matériaux</h2>
        <p class="text-muted-foreground mb-6">
          En plus de notre vaste bibliothèque, vous pouvez importer vos propres
          textures et matériaux pour une personnalisation complète de vos
          projets.
        </p>
        <ul class="space-y-3">
          <li
            v-for="item in importFeatures"
            :key="item"
            class="flex items-start gap-3"
          >
            <CheckCircleIcon
              class="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
            />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="bg-muted/30 rounded-xl border p-6">
        <div
          class="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 text-center"
        >
          <UploadCloudIcon
            class="h-12 w-12 mx-auto text-muted-foreground mb-4"
          />
          <h3 class="font-medium mb-2">Glissez-déposez vos fichiers ici</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Formats supportés : JPEG, PNG, PSD, TIFF
          </p>
          <Button class="rounded-full">Parcourir les fichiers</Button>
        </div>
      </div>
    </section>

    <!-- Collections thématiques -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-center">
        Collections thématiques
      </h2>
      <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Découvrez nos collections spécialement conçues par nos designers pour
        différents styles et ambiances.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="col in collections"
          :key="col.name"
          class="rounded-xl border shadow-sm overflow-hidden"
        >
          <div class="aspect-video">
            <img
              src="/images/generate/image_generate.png"
              :alt="col.name"
              class="w-full h-full object-cover"
            />
          </div>
          <CardContent class="p-4">
            <h3 class="font-medium mb-1">{{ col.name }}</h3>
            <p class="text-sm text-muted-foreground">
              {{ col.count }} matériaux
            </p>
          </CardContent>
        </Card>
      </div>
      <div class="text-center mt-8">
        <Button variant="outline" class="rounded-full gap-2">
          Explorer toutes les collections
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border p-8 md:p-12 text-center"
    >
      <h2 class="text-3xl font-bold mb-4">
        Donnez vie à vos espaces avec les bons matériaux
      </h2>
      <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Explorez notre bibliothèque de plus de 10 000 matériaux et transformez
        vos projets dès aujourd'hui.
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
  SearchIcon,
  ReplaceIcon,
  PaletteIcon,
  CheckCircleIcon,
  UploadCloudIcon,
  ChevronRightIcon,
} from 'lucide-vue-next'


const categories = [
  { name: 'Bois' },
  { name: 'Pierre' },
  { name: 'Métal' },
  { name: 'Tissus' },
  { name: 'Céramique' },
  { name: 'Verre' },
]

const importFeatures = [
  'Compatibilité avec les formats courants (JPEG, PNG, PSD)',
  'Support des matériaux PBR (albedo, normal, roughness, metallic)',
  'Bibliothèque personnelle pour stocker vos matériaux favoris',
  "Partage de matériaux entre membres d'une même équipe",
]

const collections = [
  { name: 'Moderne Minimaliste', count: 24 },
  { name: 'Industriel Brut', count: 32 },
  { name: 'Scandinave Épuré', count: 18 },
  { name: 'Classique Élégant', count: 28 },
]
</script>
