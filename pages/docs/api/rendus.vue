<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Rendus</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Génération et gestion des rendus photoréalistes
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Les rendus photoréalistes sont l'un des atouts majeurs de VizHome. Ils
          vous permettent de créer des visualisations impressionnantes de vos
          espaces réaménagés ou redécorés. Cette page vous guide dans la
          création, la personnalisation et l'exportation de rendus de haute
          qualité.
        </p>
      </CardContent>
    </Card>

    <!-- Types de rendus -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Types de rendus disponibles</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome propose plusieurs types de rendus pour répondre à vos
            différents besoins de présentation :
          </p>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-video bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Rendu standard"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Rendus standards</h3>
                <p class="text-sm text-muted-foreground">
                  Images statiques haute résolution idéales pour les
                  présentations, sites web et documents imprimés. Disponibles en
                  plusieurs résolutions jusqu'à 4K.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-video bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Rendu IA photoréaliste"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Rendu IA photoréaliste</h3>
                <p class="text-sm text-muted-foreground">
                  Image haute résolution générée par l'IA à partir d'un modèle
                  3D ou d'un prompt texte, exportable en PNG.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-video bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Export PNG"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Export PNG / capture</h3>
                <p class="text-sm text-muted-foreground">
                  Capture de la scène 3D WebGL dans l'état courant, incluant
                  l'éclairage, les matériaux et l'angle de caméra définis.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-video bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Vidéo"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Parcours vidéo</h3>
                <p class="text-sm text-muted-foreground">
                  Animations présentant un parcours dynamique à travers
                  l'espace. Idéales pour montrer différentes perspectives et
                  transitions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Création de rendus -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Création de rendus</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Pour créer un nouveau rendu dans votre projet VizHome :
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                1
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">
                  Accédez à l'éditeur de rendu
                </h3>
                <p class="text-sm text-muted-foreground">
                  Dans votre projet, cliquez sur l'onglet
                  <span class="px-2 py-1 bg-muted rounded text-xs">Rendus</span>
                  puis sur
                  <span class="px-2 py-1 bg-muted rounded text-xs"
                    >+ Nouveau rendu</span
                  >.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                2
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">
                  Choisissez le type de rendu
                </h3>
                <p class="text-sm text-muted-foreground">
                  Sélectionnez le format souhaité : rendu IA photoréaliste,
                  export PNG de la scène ou capture vidéo du parcours.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                3
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Positionnez la caméra</h3>
                <p class="text-sm text-muted-foreground">
                  Utilisez les outils de navigation pour trouver l'angle
                  parfait. Vous pouvez régler la hauteur, l'angle, la distance
                  focale et le champ de vision.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                4
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Ajustez l'éclairage</h3>
                <p class="text-sm text-muted-foreground">
                  Personnalisez l'éclairage (naturel ou artificiel), l'heure de
                  la journée et l'ambiance générale.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                5
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">
                  Configurez les paramètres de rendu
                </h3>
                <p class="text-sm text-muted-foreground">
                  Définissez la résolution, la qualité et les effets spéciaux
                  (profondeur de champ, reflets, etc.).
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                6
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Lancez le rendu</h3>
                <p class="text-sm text-muted-foreground">
                  Cliquez sur
                  <span class="px-2 py-1 bg-muted rounded text-xs"
                    >Générer</span
                  >
                  pour lancer le calcul du rendu. Vous pouvez suivre la
                  progression en temps réel.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-muted p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <LightbulbIcon class="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p class="text-sm font-medium">Astuce</p>
                <p class="text-sm text-muted-foreground mt-1">
                  Pour gagner du temps, utilisez le mode prévisualisation rapide
                  avant de lancer un rendu haute qualité. Cela vous permet
                  d'ajuster la composition sans attendre le calcul complet.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Optimisation des rendus -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Optimisation des rendus</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Pour obtenir des rendus de qualité professionnelle, voici quelques
            techniques d'optimisation :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Composition</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Utilisez la règle des tiers pour placer les éléments
                    importants aux points d'intérêt
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Créez de la profondeur en incluant des éléments au premier,
                    second et arrière-plan
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Évitez de couper les objets importants aux bords de l'image
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Éclairage</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Utilisez trois sources d'éclairage : principale, d'appoint
                    et d'accentuation
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Créez des contrastes pour mettre en valeur certaines zones
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Adaptez la température de couleur selon l'ambiance souhaitée
                    (chaude ou froide)
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Matériaux et textures</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Vérifiez l'échelle des textures pour un réalisme optimal
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Ajustez les propriétés de réflexion et rugosité des surfaces
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Utilisez des maps de relief pour ajouter de la profondeur
                    aux surfaces planes
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Post-traitement</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Ajoutez une légère vignette pour diriger l'attention vers le
                    centre
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Utilisez la correction des couleurs pour une ambiance
                    cohérente
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <div class="min-w-[20px] mt-1">
                    <Circle class="h-2 w-2 fill-primary text-primary" />
                  </div>
                  <p>
                    Appliquez un flou de profondeur modéré pour un effet plus
                    réaliste
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium mb-3">
              Exemples de rendus optimisés
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="border rounded-lg overflow-hidden">
                <div class="aspect-video bg-muted relative">
                  <img
                    src="/images/generate/image_generate.png"
                    alt="Exemple de rendu 1"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="p-3">
                  <p class="text-xs text-muted-foreground">
                    Salon contemporain avec éclairage naturel et accentuation
                  </p>
                </div>
              </div>
              <div class="border rounded-lg overflow-hidden">
                <div class="aspect-video bg-muted relative">
                  <img
                    src="/images/generate/image_generate.png"
                    alt="Exemple de rendu 2"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="p-3">
                  <p class="text-xs text-muted-foreground">
                    Cuisine avec éclairage d'ambiance et profondeur de champ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Export et partage -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Export et partage</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Une fois vos rendus générés, plusieurs options s'offrent à vous pour
            les exporter et les partager :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Formats d'export</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <ImageIcon class="h-4 w-4 text-muted-foreground" />
                    Images statiques
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Formats disponibles : JPG, PNG, TIFF, EXR<br />
                    Résolutions : jusqu'à 8K (abonnement Entreprise)
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <SparklesIcon class="h-4 w-4 text-muted-foreground" />
                    Rendu IA
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Image photoréaliste générée par l'IA depuis un prompt ou un
                    modèle 3D<br />
                    Livré en PNG haute résolution
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <BoxIcon class="h-4 w-4 text-muted-foreground" />
                    Modèle 3D exporté
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Export du modèle Three.js modifié<br />
                    Format GLB/GLTF avec matériaux PBR intégrés
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <VideoIcon class="h-4 w-4 text-muted-foreground" />
                    Vidéos
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Formats disponibles : MP4, MOV<br />
                    Résolutions : jusqu'à 4K, 30 ou 60 fps
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Options de partage</h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-3">
                  <LinkIcon class="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p class="font-medium">Lien de partage</p>
                    <p class="text-muted-foreground">
                      Générez un lien unique pour partager directement votre
                      rendu ou votre visite virtuelle, avec la possibilité de
                      protéger l'accès par mot de passe.
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <MailIcon class="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p class="font-medium">Envoi par e-mail</p>
                    <p class="text-muted-foreground">
                      Envoyez vos rendus directement depuis la plateforme, avec
                      un message personnalisé et la possibilité d'inclure
                      plusieurs rendus.
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <ShareIcon class="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p class="font-medium">Partage sur réseaux sociaux</p>
                    <p class="text-muted-foreground">
                      Publiez directement sur Facebook, Instagram, LinkedIn ou
                      Twitter, avec une prévisualisation optimisée.
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <GitPullRequest class="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p class="font-medium">Intégration web</p>
                    <p class="text-muted-foreground">
                      Incorporez vos rendus IA ou captures 3D sur votre site web
                      via un code d'intégration personnalisable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Personnalisation de la présentation
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                Avant de partager vos rendus, vous pouvez personnaliser leur
                présentation :
              </p>
              <ul class="space-y-2 text-sm ml-2">
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>
                    Ajoutez votre logo et vos coordonnées pour une présentation
                    professionnelle
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>
                    Regroupez plusieurs rendus d'un même projet en un lien de
                    présentation unique
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>
                    Ajoutez des annotations interactives pour mettre en avant
                    certains détails
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>
                    Personnalisez l'interface des visites virtuelles avec vos
                    couleurs
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Pages associées -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Pages associées</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <NuxtLink to="/docs/modeles-3d">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Modèles 3D</CardTitle>
              <CardDescription
                >Gestion des modèles tridimensionnels</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Découvrez comment manipuler et personnaliser les modèles 3D pour
                vos rendus.
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
                Apprenez à utiliser les matériaux pour créer des rendus plus
                réalistes.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/projets">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Projets</CardTitle>
              <CardDescription>Gestion de vos projets</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Organisez efficacement vos projets et partagez-les avec vos
                collaborateurs.
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
  LightbulbIcon,
  Circle,
  ImageIcon,
  VideoIcon,
  LinkIcon,
  MailIcon,
  ShareIcon,
  GitPullRequest,
  CircleCheckIcon,
  SparklesIcon,
  BoxIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})
</script>
