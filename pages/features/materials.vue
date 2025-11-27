<template>
  <div>
    <!-- En-tête de la fonctionnalité -->
    <section class="pt-20 pb-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge class="mb-4">Bibliothèque étendue</Badge>
            <h1 class="text-4xl font-bold mb-6">Bibliothèque de matériaux</h1>
            <p class="text-xl text-muted-foreground mb-6">
              Accédez à plus de 10 000 matériaux photoréalistes pour transformer
              vos espaces avec une précision inégalée.
            </p>
            <Button size="lg" as-child>
              <NuxtLink to="/auth/register">
                Explorer la bibliothèque
              </NuxtLink>
            </Button>
          </div>
          <div
            class="relative aspect-video rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Bibliothèque de matériaux"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Catégories de matériaux -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">
          Catégories principales
        </h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explorez notre vaste collection de matériaux classés par catégories
          pour tous vos besoins
        </p>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          <Card class="overflow-hidden">
            <div class="aspect-square">
              <img
                src="/images/generate/image_generate.png"
                alt="Bois"
                class="w-full h-full object-cover"
              />
            </div>
            <CardFooter class="p-3">
              <h3 class="font-medium text-center w-full">Bois</h3>
            </CardFooter>
          </Card>
          <Card class="overflow-hidden">
            <div class="aspect-square">
              <img
                src="/images/generate/image_generate.png"
                alt="Pierre"
                class="w-full h-full object-cover"
              />
            </div>
            <CardFooter class="p-3">
              <h3 class="font-medium text-center w-full">Pierre</h3>
            </CardFooter>
          </Card>
          <Card class="overflow-hidden">
            <div class="aspect-square">
              <img
                src="/images/generate/image_generate.png"
                alt="Métal"
                class="w-full h-full object-cover"
              />
            </div>
            <CardFooter class="p-3">
              <h3 class="font-medium text-center w-full">Métal</h3>
            </CardFooter>
          </Card>
          <Card class="overflow-hidden">
            <div class="aspect-square">
              <img
                src="/images/generate/image_generate.png"
                alt="Tissus"
                class="w-full h-full object-cover"
              />
            </div>
            <CardFooter class="p-3">
              <h3 class="font-medium text-center w-full">Tissus</h3>
            </CardFooter>
          </Card>
          <Card class="overflow-hidden">
            <div class="aspect-square">
              <img
                src="/images/generate/image_generate.png"
                alt="Céramique"
                class="w-full h-full object-cover"
              />
            </div>
            <CardFooter class="p-3">
              <h3 class="font-medium text-center w-full">Céramique</h3>
            </CardFooter>
          </Card>
          <Card class="overflow-hidden">
            <div class="aspect-square">
              <img
                src="/images/generate/image_generate.png"
                alt="Verre"
                class="w-full h-full object-cover"
              />
            </div>
            <CardFooter class="p-3">
              <h3 class="font-medium text-center w-full">Verre</h3>
            </CardFooter>
          </Card>
        </div>

        <div class="text-center mt-8">
          <Button variant="outline" size="sm" class="gap-1">
            Voir toutes les catégories
            <ChevronRightIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités clés -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          Fonctionnalités clés
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
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

          <Card>
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

          <Card>
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
      </div>
    </section>

    <!-- Matériaux personnalisés -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
        >
          <div>
            <h2 class="text-3xl font-bold mb-6">
              Importez vos propres matériaux
            </h2>
            <p class="text-muted-foreground mb-6">
              En plus de notre vaste bibliothèque, vous pouvez importer vos
              propres textures et matériaux pour une personnalisation complète
              de vos projets.
            </p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <div class="mt-1">
                  <CheckCircleIcon class="h-5 w-5 text-primary" />
                </div>
                <span
                  >Compatibilité avec les formats courants (JPEG, PNG,
                  PSD)</span
                >
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1">
                  <CheckCircleIcon class="h-5 w-5 text-primary" />
                </div>
                <span
                  >Support des matériaux PBR (albedo, normal, roughness,
                  metallic)</span
                >
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1">
                  <CheckCircleIcon class="h-5 w-5 text-primary" />
                </div>
                <span
                  >Bibliothèque personnelle pour stocker vos matériaux
                  favoris</span
                >
              </li>
              <li class="flex items-start gap-3">
                <div class="mt-1">
                  <CheckCircleIcon class="h-5 w-5 text-primary" />
                </div>
                <span
                  >Partage de matériaux entre membres d'une même équipe</span
                >
              </li>
            </ul>
          </div>
          <div class="bg-muted/30 rounded-lg p-6">
            <div
              class="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center"
            >
              <UploadCloudIcon
                class="h-12 w-12 mx-auto text-muted-foreground mb-4"
              />
              <h3 class="font-medium mb-2">Glissez-déposez vos fichiers ici</h3>
              <p class="text-sm text-muted-foreground mb-4">
                Formats supportés : JPEG, PNG, PSD, TIFF
              </p>
              <Button>Parcourir les fichiers</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Presets et collections -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">
          Collections thématiques
        </h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Découvrez nos collections spécialement conçues par nos designers pour
          différents styles et ambiances
        </p>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          <Card class="overflow-hidden">
            <div class="aspect-video">
              <img
                src="/images/generate/image_generate.png"
                alt="Style Moderne"
                class="w-full h-full object-cover"
              />
            </div>
            <CardContent class="p-4">
              <h3 class="font-medium mb-1">Moderne Minimaliste</h3>
              <p class="text-sm text-muted-foreground">24 matériaux</p>
            </CardContent>
          </Card>

          <Card class="overflow-hidden">
            <div class="aspect-video">
              <img
                src="/images/generate/image_generate.png"
                alt="Style Industriel"
                class="w-full h-full object-cover"
              />
            </div>
            <CardContent class="p-4">
              <h3 class="font-medium mb-1">Industriel Brut</h3>
              <p class="text-sm text-muted-foreground">32 matériaux</p>
            </CardContent>
          </Card>

          <Card class="overflow-hidden">
            <div class="aspect-video">
              <img
                src="/images/generate/image_generate.png"
                alt="Style Scandinave"
                class="w-full h-full object-cover"
              />
            </div>
            <CardContent class="p-4">
              <h3 class="font-medium mb-1">Scandinave Épuré</h3>
              <p class="text-sm text-muted-foreground">18 matériaux</p>
            </CardContent>
          </Card>

          <Card class="overflow-hidden">
            <div class="aspect-video">
              <img
                src="/images/generate/image_generate.png"
                alt="Style Classique"
                class="w-full h-full object-cover"
              />
            </div>
            <CardContent class="p-4">
              <h3 class="font-medium mb-1">Classique Élégant</h3>
              <p class="text-sm text-muted-foreground">28 matériaux</p>
            </CardContent>
          </Card>
        </div>

        <div class="text-center mt-8">
          <Button variant="outline" size="sm" class="gap-1">
            Explorer toutes les collections
            <ChevronRightIcon class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div
          class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto"
        >
          <h2 class="text-3xl font-bold mb-4">
            Donnez vie à vos espaces avec les bons matériaux
          </h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explorez notre bibliothèque de plus de 10 000 matériaux et
            transformez vos projets dès aujourd'hui.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" as-child>
              <NuxtLink to="/auth/register"> Commencer gratuitement </NuxtLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <NuxtLink to="/pricing"> Voir nos offres </NuxtLink>
            </Button>
          </div>
        </div>
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
</script>
