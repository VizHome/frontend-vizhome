<template>
  <div>
    <!-- En-tête de la fonctionnalité -->
    <section class="pt-20 pb-12 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge class="mb-4">Mobilité</Badge>
            <h1 class="text-4xl font-bold mb-6">Applications mobiles</h1>
            <p class="text-xl text-muted-foreground mb-6">
              Emportez VizHome partout avec vous grâce à nos applications
              mobiles pour iOS et Android. Créez, visualisez et partagez vos
              projets 3D où que vous soyez.
            </p>
            <div class="flex flex-wrap gap-4">
              <Button size="lg" as-child class="gap-2">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <AppleIcon class="h-5 w-5" />
                  App Store
                </a>
              </Button>
              <Button size="lg" as-child class="gap-2">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <SmartphoneIcon class="h-5 w-5" />
                  Google Play
                </a>
              </Button>
            </div>
          </div>
          <div class="relative">
            <img
              src="/images/generate/image_generate.png"
              alt="Applications mobiles"
              class="rounded-lg shadow-xl"
            />
            <img
              src="/images/generate/image_generate.png"
              alt="App mobile détail"
              class="absolute -bottom-8 -left-8 w-2/3 rounded-lg shadow-xl border-4 border-background"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités principales -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          Fonctionnalités principales
        </h2>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
              >
                <CameraIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Capture rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Prenez une photo avec votre téléphone et transformez-la
                instantanément en modèle 3D grâce à notre IA mobile.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
              >
                <Smartphone3dIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Visualisation AR</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Visualisez vos projets en réalité augmentée directement dans
                votre environnement physique pour une expérience immersive.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
              >
                <CloudIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Synchronisation cloud</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Tous vos projets sont automatiquement synchronisés entre vos
                appareils pour un accès transparent où que vous soyez.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div
                class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
              >
                <NotebookIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Notes de terrain</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Prenez des notes et faites des croquis directement sur site,
                puis intégrez-les à vos projets 3D pour une référence rapide.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Interface utilisateur -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
        >
          <div class="order-2 lg:order-1">
            <h2 class="text-3xl font-bold mb-6">Interface intuitive</h2>
            <p class="text-muted-foreground mb-6">
              Notre application mobile a été conçue pour être facile à utiliser,
              même en déplacement, avec une interface claire et des contrôles
              tactiles intuitifs.
            </p>
            <Tabs default-value="projects" class-name="w-full">
              <TabsList class-name="grid w-full grid-cols-3">
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="edit">Édition</TabsTrigger>
                <TabsTrigger value="share">Partage</TabsTrigger>
              </TabsList>
              <TabsContent value="projects" class-name="space-y-4 mt-4">
                <h3 className="font-medium">Gestion de projets simplifiée</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span
                      >Affichage en grille ou en liste de tous vos projets</span
                    >
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>Filtres intelligents par date, type ou statut</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>Accès rapide aux projets récents ou favoris</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="edit" class-name="space-y-4 mt-4">
                <h3 className="font-medium">Outils d'édition tactiles</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span
                      >Modification des matériaux par simple tapotement</span
                    >
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>Contrôles de rotation et de zoom intuitifs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>Réglage de l'éclairage avec des gestes simples</span>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="share" class-name="space-y-4 mt-4">
                <h3 className="font-medium">Options de partage flexibles</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span
                      >Partage direct via messagerie, email ou réseaux
                      sociaux</span
                    >
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>Génération de liens de visualisation sécurisés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon
                      class-name="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    />
                    <span>Export d'images haute résolution en un clic</span>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
          <div class="order-1 lg:order-2">
            <Carousel class="w-full max-w-xs mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div class="p-1">
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Interface projets"
                      class="rounded-xl shadow-lg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="p-1">
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Interface édition"
                      class="rounded-xl shadow-lg"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="p-1">
                    <img
                      src="/images/generate/image_generate.png"
                      alt="Interface partage"
                      class="rounded-xl shadow-lg"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>

    <!-- Réalité augmentée -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6 text-center">
          Expérience de réalité augmentée
        </h2>
        <p class="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Visualisez vos projets dans le monde réel avec notre technologie de
          réalité augmentée avancée
        </p>

        <div class="max-w-5xl mx-auto">
          <div class="relative aspect-video rounded-lg overflow-hidden">
            <img
              src="/images/generate/image_generate.png"
              alt="Réalité augmentée"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <Button
                variant="secondary"
                size="icon"
                class="rounded-full h-16 w-16"
              >
                <Play class="h-8 w-8" />
              </Button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="bg-muted/30 p-4 rounded-lg">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"
              >
                <ScanIcon class="h-5 w-5 text-primary" />
              </div>
              <h3 class="font-medium mb-2">Scan de l'environnement</h3>
              <p class="text-sm text-muted-foreground">
                L'application analyse automatiquement l'espace pour placer les
                objets de manière réaliste.
              </p>
            </div>

            <div class="bg-muted/30 p-4 rounded-lg">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"
              >
                <HandIcon class="h-5 w-5 text-primary" />
              </div>
              <h3 class="font-medium mb-2">Manipulation intuitive</h3>
              <p class="text-sm text-muted-foreground">
                Déplacez, tournez et redimensionnez les modèles avec des gestes
                naturels.
              </p>
            </div>

            <div class="bg-muted/30 p-4 rounded-lg">
              <div
                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"
              >
                <CameraIcon class="h-5 w-5 text-primary" />
              </div>
              <h3 class="font-medium mb-2">Capture d'écrans AR</h3>
              <p class="text-sm text-muted-foreground">
                Prenez des photos ou des vidéos de vos projets intégrés dans
                l'environnement réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">
          Ce que disent nos utilisateurs
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent class="pt-6">
              <div class="flex text-amber-400 mb-4">
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
              </div>
              <blockquote class="italic text-muted-foreground mb-6">
                "L'application mobile VizHome est devenue mon outil
                indispensable sur les chantiers. Je peux scanner un espace et
                présenter immédiatement des options de design à mes clients."
              </blockquote>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=26" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 class="font-medium">Julien Durand</h3>
                  <p class="text-sm text-muted-foreground">
                    Architecte d'intérieur
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div class="flex text-amber-400 mb-4">
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
              </div>
              <blockquote class="italic text-muted-foreground mb-6">
                "La fonction de réalité augmentée est incroyable. Mes clients
                peuvent littéralement voir leur future maison avant même qu'elle
                ne soit construite. Un outil de vente puissant."
              </blockquote>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=28" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 class="font-medium">Emma Martin</h3>
                  <p class="text-sm text-muted-foreground">Agent immobilier</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div class="flex text-amber-400 mb-4">
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
                <StarIcon class="h-4 w-4 fill-current" />
              </div>
              <blockquote class="italic text-muted-foreground mb-6">
                "La synchronisation avec la version desktop est parfaite. Je
                commence un projet au bureau et je peux le continuer en
                déplacement sans aucune difficulté."
              </blockquote>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                  <AvatarFallback>LB</AvatarFallback>
                </Avatar>
                <div>
                  <h3 class="font-medium">Lucas Bernard</h3>
                  <p class="text-sm text-muted-foreground">Designer d'espace</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Disponibilité -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div
          class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-5xl mx-auto"
        >
          <h2 class="text-3xl font-bold mb-4">
            Téléchargez notre application mobile
          </h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Disponible sur iOS et Android, notre application vous permet
            d'emporter VizHome partout avec vous.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" as-child class="gap-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <AppleIcon class="h-5 w-5" />
                Télécharger sur iOS
              </a>
            </Button>
            <Button size="lg" as-child class="gap-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <SmartphoneIcon class="h-5 w-5" />
                Télécharger sur Android
              </a>
            </Button>
          </div>
          <p class="text-sm text-muted-foreground mt-6">
            Nécessite iOS 14.0+ ou Android 9.0+. Connexion Internet requise pour
            certaines fonctionnalités.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  AppleIcon,
  SmartphoneIcon,
  CameraIcon,
  CloudIcon,
  NotebookIcon,
  CheckIcon,
  Play,
  ScanIcon,
  HandIcon,
  StarIcon,
} from 'lucide-vue-next'

// Composant personnalisé pour l'icône 3D du smartphone
const Smartphone3dIcon = defineComponent({
  setup() {
    return () =>
      h(
        'svg',
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
        [
          h('rect', {
            x: '5',
            y: '2',
            width: '14',
            height: '20',
            rx: '2',
            ry: '2',
          }),
          h('path', { d: 'M12 18h.01' }),
          h('path', { d: 'M8 6h8' }),
          h('path', { d: 'M10 10l2 2 2-2' }),
        ]
      )
  },
})
</script>
