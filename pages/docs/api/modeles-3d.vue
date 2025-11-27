<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Modèles 3D</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Gestion et utilisation des modèles tridimensionnels
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Les modèles 3D constituent le cœur de VizHome, permettant de
          visualiser et transformer vos espaces. Cette page détaille comment
          travailler avec les modèles générés automatiquement, importer vos
          propres modèles et utiliser notre bibliothèque pour aménager vos
          espaces.
        </p>
      </CardContent>
    </Card>

    <!-- Modèles générés par l'IA -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Modèles générés par l'IA</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="mb-6 overflow-x-auto">
            <img
              src="/images/generate/image_generate.png"
              alt="Modèle 3D généré par IA"
              class="w-full max-w-2xl mx-auto rounded-lg border"
            />
          </div>

          <p class="mb-4">
            VizHome utilise l'intelligence artificielle pour générer
            automatiquement des modèles 3D à partir de vos photos. Ce processus
            comprend plusieurs étapes :
          </p>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Analyse photogrammétrique</h3>
              <p class="text-sm text-muted-foreground">
                L'IA analyse les photos pour identifier les points communs et
                reconstruire la géométrie de l'espace.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Segmentation sémantique</h3>
              <p class="text-sm text-muted-foreground">
                Identification des différents éléments (murs, sols, plafonds,
                portes, fenêtres, meubles) pour créer un modèle structuré.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Génération de maillage</h3>
              <p class="text-sm text-muted-foreground">
                Création d'un maillage 3D optimisé représentant précisément la
                géométrie de l'espace.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Texturage automatique</h3>
              <p class="text-sm text-muted-foreground">
                Application de textures réalistes extraites des photos ou
                générées par IA pour un rendu fidèle des matériaux.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Optimisation finale</h3>
              <p class="text-sm text-muted-foreground">
                Ajustements automatiques pour garantir la qualité et les
                performances du modèle final.
              </p>
            </div>
          </div>

          <div class="mt-6 bg-muted p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <InfoIcon class="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p class="text-sm font-medium">Qualité des modèles générés</p>
                <p class="text-sm text-muted-foreground mt-1">
                  La qualité du modèle 3D généré dépend directement de la
                  qualité et du nombre de photos fournies. Consultez notre
                  <NuxtLink
                    to="/docs/photos"
                    class="text-primary hover:underline"
                    >guide d'optimisation des photos</NuxtLink
                  >
                  pour obtenir les meilleurs résultats.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Édition des modèles -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Édition des modèles</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Une fois votre modèle 3D généré, VizHome propose plusieurs outils
            pour l'éditer et le perfectionner :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Corrections géométriques</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <RectangleHorizontalIcon
                      class="h-4 w-4 text-muted-foreground"
                    />
                    Redressement des murs
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Corrigez automatiquement l'alignement des murs pour obtenir
                    des angles parfaits à 90 degrés.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <RulerIcon class="h-4 w-4 text-muted-foreground" />
                    Ajustement des dimensions
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Modifiez les mesures pour les mettre à l'échelle exacte ou
                    conformément aux plans.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <PencilIcon class="h-4 w-4 text-muted-foreground" />
                    Outils de modélisation
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Ajoutez, supprimez ou modifiez des éléments comme des murs,
                    portes ou fenêtres.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <BoxSelectIcon class="h-4 w-4 text-muted-foreground" />
                    Sélection intelligente
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Identifiez et sélectionnez facilement des éléments
                    spécifiques pour les modifier.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Manipulation et transformation
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                Les outils de transformation vous permettent de modifier la
                position et l'orientation des objets :
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="flex flex-col items-center border rounded-lg p-3">
                  <MoveIcon class="h-6 w-6 text-primary mb-2" />
                  <h4 class="text-sm font-medium">Déplacer</h4>
                  <p class="text-xs text-muted-foreground text-center mt-1">
                    Repositionnez les objets sur les axes X, Y et Z
                  </p>
                </div>
                <div class="flex flex-col items-center border rounded-lg p-3">
                  <RotateCcwIcon class="h-6 w-6 text-primary mb-2" />
                  <h4 class="text-sm font-medium">Pivoter</h4>
                  <p class="text-xs text-muted-foreground text-center mt-1">
                    Tournez les objets selon les trois axes de rotation
                  </p>
                </div>
                <div class="flex flex-col items-center border rounded-lg p-3">
                  <ArrowsOutLineHorizontalIcon
                    class="h-6 w-6 text-primary mb-2"
                  />
                  <h4 class="text-sm font-medium">Redimensionner</h4>
                  <p class="text-xs text-muted-foreground text-center mt-1">
                    Modifiez la taille des objets tout en conservant les
                    proportions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 border-t pt-6">
            <h3 class="text-lg font-medium mb-3">
              Tutoriel vidéo : Édition de modèles
            </h3>
            <div
              class="aspect-video relative bg-muted rounded-lg overflow-hidden"
            >
              <img
                src="/images/generate/image_generate.png"
                alt="Tutoriel vidéo"
                class="object-cover w-full h-full"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  variant="secondary"
                  class="rounded-full h-14 w-14"
                >
                  <PlayIcon class="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Bibliothèque de modèles -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Bibliothèque de modèles</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome propose une vaste bibliothèque de modèles 3D prêts à
            l'emploi pour meubler et décorer vos espaces :
          </p>

          <div class="grid gap-4 md:grid-cols-2 mb-6">
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-video bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Modèles de meubles"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Meubles et décoration</h3>
                <p class="text-sm text-muted-foreground">
                  Plus de 10 000 modèles de meubles et objets de décoration dans
                  différents styles et époques.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-video bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Modèles architecturaux"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Éléments architecturaux</h3>
                <p class="text-sm text-muted-foreground">
                  Portes, fenêtres, escaliers, colonnes et autres éléments
                  structurels pour transformer vos espaces.
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium mb-2">Recherche et filtrage</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Trouvez rapidement les modèles dont vous avez besoin grâce aux
                filtres avancés :
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <div class="px-2 py-1 border rounded-full text-xs">
                  Catégorie
                </div>
                <div class="px-2 py-1 border rounded-full text-xs">Style</div>
                <div class="px-2 py-1 border rounded-full text-xs">Couleur</div>
                <div class="px-2 py-1 border rounded-full text-xs">
                  Matériau
                </div>
                <div class="px-2 py-1 border rounded-full text-xs">
                  Dimensions
                </div>
                <div class="px-2 py-1 border rounded-full text-xs">Prix</div>
                <div class="px-2 py-1 border rounded-full text-xs">
                  Note utilisateurs
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Collections</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Les collections regroupent des ensembles cohérents de meubles et
                objets pour faciliter l'aménagement :
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    Collections par pièce
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Salon, cuisine, chambre, salle de bain, bureau, etc.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    Collections par style
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Contemporain, scandinave, industriel, classique, etc.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">
                    Collections thématiques
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Éco-responsable, enfants, extérieur, bureaux professionnels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Import de modèles externes -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Import de modèles externes</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome vous permet d'importer vos propres modèles 3D dans
            différents formats :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Formats pris en charge</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Standard</h4>
                  <p class="text-xs text-muted-foreground">
                    OBJ, FBX, GLTF/GLB, STL
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Architecture</h4>
                  <p class="text-xs text-muted-foreground">
                    IFC, SKP (SketchUp), 3DS
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">CAO</h4>
                  <p class="text-xs text-muted-foreground">DWG, DXF, STEP</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Processus d'importation</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    1
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-base font-medium">Préparez votre modèle</h3>
                    <p class="text-sm text-muted-foreground">
                      Assurez-vous que votre modèle est à l'échelle correcte et
                      optimisé (moins de 500 000 polygones recommandé).
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
                      Accédez à la bibliothèque
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Depuis votre projet, cliquez sur l'onglet
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >Bibliothèque</span
                      >
                      puis sur
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >Mes modèles</span
                      >.
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
                    <h3 class="text-base font-medium">Importez le fichier</h3>
                    <p class="text-sm text-muted-foreground">
                      Cliquez sur
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >Importer</span
                      >
                      et sélectionnez votre fichier 3D. Pour les formats avec
                      textures externes (comme OBJ+MTL), importez tous les
                      fichiers ensemble.
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
                    <h3 class="text-base font-medium">
                      Vérifiez et configurez
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Prévisualisez le modèle, ajustez son orientation et son
                      échelle si nécessaire, et vérifiez les matériaux.
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
                      Finalisez l'importation
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Ajoutez des métadonnées (nom, catégorie, tags) et cliquez
                      sur
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >Enregistrer</span
                      >. Votre modèle est maintenant disponible dans votre
                      bibliothèque personnelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Optimisation des modèles importés
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                VizHome propose des outils d'optimisation automatique pour
                améliorer les performances :
              </p>
              <ul class="space-y-2 text-sm ml-2">
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>
                    Décimation du maillage pour réduire le nombre de polygones
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>Compression et optimisation des textures</p>
                </li>
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>
                    Génération de niveaux de détail (LOD) pour améliorer les
                    performances
                  </p>
                </li>
                <li class="flex items-start gap-2">
                  <CircleCheckIcon class="h-4 w-4 text-primary mt-0.5" />
                  <p>Correction automatique des normales et des UVs</p>
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
        <NuxtLink to="/docs/materiaux">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Matériaux</CardTitle>
              <CardDescription>Textures et finitions réalistes</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Apprenez à appliquer et personnaliser les matériaux sur vos
                modèles 3D.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/rendus">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Rendus</CardTitle>
              <CardDescription
                >Création d'images professionnelles</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Générez des visualisations photoréalistes à partir de vos
                modèles 3D.
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
                Organisez vos espaces 3D et suivez l'avancement de vos projets.
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
  InfoIcon,
  RectangleHorizontalIcon,
  RulerIcon,
  PencilIcon,
  BoxSelectIcon,
  MoveIcon,
  RotateCcwIcon,
  PlayIcon,
  CircleCheckIcon,
} from 'lucide-vue-next'

// Composant personnalisé pour l'icône de redimensionnement
const ArrowsOutLineHorizontalIcon = defineComponent({
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
          h('path', { d: 'M8 10H4V6' }),
          h('path', { d: 'M4 10L9 15' }),
          h('path', { d: 'M16 10H20V6' }),
          h('path', { d: 'M20 10L15 15' }),
        ]
      )
  },
})

definePageMeta({
  layout: 'docs',
})
</script>
