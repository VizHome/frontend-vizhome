<template>
  <div>
    <!-- En-tête de la fonctionnalité -->
    <section class="pt-20 pb-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge class="mb-4">Expérience immersive</Badge>
            <h1 class="text-4xl font-bold mb-6">Vues 360° immersives</h1>
            <p class="text-xl text-muted-foreground mb-6">
              Offrez une expérience interactive complète avec nos visites
              virtuelles à 360° pour présenter vos espaces de façon captivante.
            </p>
            <Button size="lg" as-child>
              <NuxtLink to="/auth/register"> Créer une visite 360° </NuxtLink>
            </Button>
          </div>
          <div
            class="relative aspect-video rounded-lg overflow-hidden shadow-xl"
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
                <Play class="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages des vues 360° -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          Pourquoi utiliser les vues 360° ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
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
                Les visites 360° augmentent l'engagement des visiteurs de 40%
                par rapport aux images statiques, permettant une expérience
                mémorable.
              </p>
            </CardContent>
          </Card>

          <Card>
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

          <Card>
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
      </div>
    </section>

    <!-- Démonstration interactive -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">
          Expérience immersive
        </h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Explorez nos exemples de visites virtuelles 360° et découvrez la
          puissance de l'immersion
        </p>

        <Tabs default-value="apartment" class-name="max-w-5xl mx-auto">
          <TabsList class-name="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="apartment">Appartement</TabsTrigger>
            <TabsTrigger value="office">Bureau</TabsTrigger>
            <TabsTrigger value="retail">Boutique</TabsTrigger>
          </TabsList>

          <TabsContent value="apartment">
            <div
              class="aspect-[16/9] w-full bg-black rounded-lg overflow-hidden relative"
            >
              <img
                src="/images/generate/image_generate.png"
                alt="Visite 360° d'appartement"
                class="w-full h-full object-cover opacity-90"
              />
              <!-- Interface de navigation 360° simulée -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center">
                <div
                  class="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ArrowLeftIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <HomeIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ArrowRightIcon class="h-4 w-4" />
                  </Button>
                  <Separator
                    orientation="vertical"
                    class="h-6 mx-1 bg-white/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <MinusIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <PlusIcon class="h-4 w-4" />
                  </Button>
                  <Separator
                    orientation="vertical"
                    class="h-6 mx-1 bg-white/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ExpandIcon class="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
            </div>
            <div class="p-4 text-center">
              <p class="text-muted-foreground">
                Cette démo montre un appartement rénové avec points d'intérêt
                interactifs et navigation intuitive.
                <a href="#" class="text-primary underline underline-offset-4"
                  >Essayer la démo complète</a
                >
              </p>
            </div>
          </TabsContent>

          <TabsContent value="office">
            <div
              class="aspect-[16/9] w-full bg-black rounded-lg overflow-hidden relative"
            >
              <img
                src="/images/generate/image_generate.png"
                alt="Visite 360° de bureau"
                class="w-full h-full object-cover opacity-90"
              />
              <!-- Interface de navigation 360° simulée (similaire) -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center">
                <div
                  class="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ArrowLeftIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <HomeIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ArrowRightIcon class="h-4 w-4" />
                  </Button>
                  <Separator
                    orientation="vertical"
                    class="h-6 mx-1 bg-white/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <MinusIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <PlusIcon class="h-4 w-4" />
                  </Button>
                  <Separator
                    orientation="vertical"
                    class="h-6 mx-1 bg-white/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ExpandIcon class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div class="p-4 text-center">
              <p class="text-muted-foreground">
                Expérience interactive d'un espace de bureau moderne avec
                différentes configurations possibles.
                <a href="#" class="text-primary underline underline-offset-4"
                  >Essayer la démo complète</a
                >
              </p>
            </div>
          </TabsContent>

          <TabsContent value="retail">
            <div
              class="aspect-[16/9] w-full bg-black rounded-lg overflow-hidden relative"
            >
              <img
                src="/images/generate/image_generate.png"
                alt="Visite 360° de boutique"
                class="w-full h-full object-cover opacity-90"
              />
              <!-- Interface de navigation 360° simulée (similaire) -->
              <div class="absolute bottom-4 left-0 right-0 flex justify-center">
                <div
                  class="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ArrowLeftIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <HomeIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ArrowRightIcon class="h-4 w-4" />
                  </Button>
                  <Separator
                    orientation="vertical"
                    class="h-6 mx-1 bg-white/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <MinusIcon class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <PlusIcon class="h-4 w-4" />
                  </Button>
                  <Separator
                    orientation="vertical"
                    class="h-6 mx-1 bg-white/20"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    class="text-white h-8 w-8"
                  >
                    <ExpandIcon class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div class="p-4 text-center">
              <p class="text-muted-foreground">
                Espace commercial avec produits interactifs permettant aux
                clients de visualiser différentes options.
                <a href="#" class="text-primary underline underline-offset-4"
                  >Essayer la démo complète</a
                >
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>

    <!-- Fonctionnalités avancées -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          Fonctionnalités avancées
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto"
        >
          <div class="flex gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <MapIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-medium mb-2">Plan interactif</h3>
              <p class="text-muted-foreground">
                Intégration d'un plan d'étage permettant une navigation
                intuitive entre les différentes pièces ou zones.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <InfoIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-medium mb-2">Points d'information</h3>
              <p class="text-muted-foreground">
                Ajoutez des points d'intérêt interactifs pour mettre en valeur
                des éléments spécifiques avec du texte, des images ou des
                vidéos.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <HeadsetIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-medium mb-2">Audio guide</h3>
              <p class="text-muted-foreground">
                Intégration d'une narration audio pour guider les visiteurs à
                travers l'espace et expliquer les caractéristiques importantes.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <ShareIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-medium mb-2">Partage facile</h3>
              <p class="text-muted-foreground">
                Partagez vos visites 360° via un lien unique, par email ou
                intégrez-les facilement sur votre site web ou réseaux sociaux.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <GraduationCapIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-medium mb-2">VR compatible</h3>
              <p class="text-muted-foreground">
                Compatibilité avec les casques de réalité virtuelle pour une
                immersion totale dans vos espaces 3D.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center"
            >
              <BarChartIcon class="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 class="text-xl font-medium mb-2">Statistiques détaillées</h3>
              <p class="text-muted-foreground">
                Analysez l'engagement des visiteurs avec des métriques
                détaillées sur le temps passé, les zones d'intérêt et le
                parcours dans la visite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <div
          class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto"
        >
          <h2 class="text-3xl font-bold mb-4">
            Prêt à créer des expériences immersives ?
          </h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transformez vos modèles 3D en visites interactives à 360° et offrez
            une expérience mémorable à vos clients.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" as-child>
              <NuxtLink to="/auth/register"> Commencer gratuitement </NuxtLink>
            </Button>
            <Button size="lg" variant="outline" as-child>
              <NuxtLink to="/examples"> Voir nos exemples </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Play,
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
  GraduationCapIcon,
  BarChartIcon,
} from 'lucide-vue-next'
</script>
