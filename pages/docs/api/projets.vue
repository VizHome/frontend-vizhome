<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Projets</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Création et gestion de vos projets de visualisation 3D
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Les projets sont au cœur de l'expérience VizHome. Un projet regroupe
          toutes les ressources nécessaires à la visualisation d'un espace
          spécifique : photos, modèle 3D, matériaux, meubles et rendus. Cette
          page vous guide dans la création et la gestion efficace de vos
          projets.
        </p>
      </CardContent>
    </Card>

    <!-- Structure des projets -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Structure des projets</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Chaque projet VizHome suit une structure logique qui facilite
            l'organisation de votre travail :
          </p>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Informations générales</h3>
              <p class="text-sm text-muted-foreground">
                Nom, description, type de propriété, superficie, date de
                création et dernière modification.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Photos d'origine</h3>
              <p class="text-sm text-muted-foreground">
                Photos téléchargées utilisées comme référence pour la
                reconstruction 3D.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Modèle 3D</h3>
              <p class="text-sm text-muted-foreground">
                Reconstruction 3D de l'espace, incluant géométrie et textures.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Personnalisation</h3>
              <p class="text-sm text-muted-foreground">
                Matériaux, meubles et objets ajoutés pour transformer l'espace.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Rendus</h3>
              <p class="text-sm text-muted-foreground">
                Images statiques, rendus IA et autres fichiers exportés.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Collaborateurs</h3>
              <p class="text-sm text-muted-foreground">
                Utilisateurs invités à visualiser ou modifier le projet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Création d'un projet -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Création d'un projet</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="mb-6 overflow-x-auto">
            <img
              src="/images/generate/image_generate.png"
              alt="Création de projet"
              class="w-full max-w-2xl mx-auto rounded-lg border"
            />
          </div>

          <p class="mb-4">
            La création d'un nouveau projet dans VizHome est simple et intuitive
            :
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                1
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Démarrer un projet</h3>
                <p class="text-sm text-muted-foreground">
                  Sur votre tableau de bord, cliquez sur le bouton
                  <span class="px-2 py-1 bg-muted rounded text-xs"
                    >+ Nouveau projet</span
                  >
                  ou sélectionnez l'option dans le menu principal.
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
                <h3 class="text-base font-medium">Informations de base</h3>
                <p class="text-sm text-muted-foreground">
                  Renseignez un nom, une description et sélectionnez le type de
                  propriété (résidentiel, commercial, etc.).
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
                <h3 class="text-base font-medium">Téléchargement des photos</h3>
                <p class="text-sm text-muted-foreground">
                  Importez au minimum 5 photos de l'espace. Consultez notre
                  guide sur
                  <NuxtLink
                    to="/docs/photos"
                    class="text-primary hover:underline"
                    >l'optimisation des photos
                  </NuxtLink>
                  pour de meilleurs résultats.
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
                <h3 class="text-base font-medium">Génération du modèle 3D</h3>
                <p class="text-sm text-muted-foreground">
                  Lancez la génération automatique. Selon la complexité et le
                  nombre de photos, cette étape peut prendre entre 2 et 10
                  minutes.
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
                <h3 class="text-base font-medium">Validation</h3>
                <p class="text-sm text-muted-foreground">
                  Vérifiez le modèle généré et procédez aux ajustements si
                  nécessaire. Vous pouvez demander une régénération si les
                  résultats ne sont pas satisfaisants.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Organisation et gestion -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Organisation et gestion</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome offre plusieurs outils pour organiser et gérer efficacement
            vos projets :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Dossiers et catégories</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Regroupez vos projets par client, type d'espace ou statut pour
                faciliter leur accès.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Dossiers</h4>
                  <p class="text-xs text-muted-foreground">
                    Créez une structure hiérarchique pour classer vos projets
                    (par exemple, Clients > Nom du client > Projets).
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Tags</h4>
                  <p class="text-xs text-muted-foreground">
                    Ajoutez des étiquettes personnalisées pour faciliter la
                    recherche et le filtrage de vos projets.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Statuts de projet</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Suivez la progression de vos projets grâce aux statuts
                prédéfinis ou personnalisés.
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <div
                  class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  Brouillon
                </div>
                <div
                  class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                >
                  En cours
                </div>
                <div
                  class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                >
                  Terminé
                </div>
                <div
                  class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                >
                  En attente de validation
                </div>
                <div
                  class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                >
                  Archivé
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Recherche et filtres</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Retrouvez rapidement vos projets grâce à des options de
                recherche et de filtrage avancées.
              </p>
              <div class="border rounded-lg p-4 bg-muted/30">
                <div class="flex flex-col md:flex-row gap-3">
                  <div class="relative grow">
                    <SearchIcon
                      class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    />
                    <div
                      class="h-9 w-full rounded-md border border-input px-9 text-sm"
                    >
                      Rechercher des projets...
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <div
                      class="h-9 px-4 rounded-md border border-input flex items-center gap-2 text-sm"
                    >
                      <FilterIcon class="h-4 w-4 text-muted-foreground" />
                      <span>Filtres</span>
                    </div>
                    <div
                      class="h-9 px-4 rounded-md border border-input flex items-center gap-2 text-sm"
                    >
                      <ArrowDownUpIcon class="h-4 w-4 text-muted-foreground" />
                      <span>Trier</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Collaboration -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Collaboration sur les projets</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Travaillez efficacement en équipe sur vos projets VizHome en
            invitant des collaborateurs :
          </p>

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium mb-2">Niveaux d'accès</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <EyeIcon class="h-4 w-4 text-muted-foreground" />
                    Visualisation
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Permet uniquement de consulter le projet et les rendus sans
                    pouvoir faire de modifications.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <EditIcon class="h-4 w-4 text-muted-foreground" />
                    Édition
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Autorise la modification des matériaux, l'ajout de meubles
                    et la création de rendus.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <UserCogIcon class="h-4 w-4 text-muted-foreground" />
                    Administration
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Donne accès à toutes les fonctionnalités, y compris la
                    gestion des collaborateurs.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Inviter des collaborateurs
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                Pour ajouter un collaborateur à votre projet :
              </p>
              <ol class="list-decimal list-inside space-y-2 text-sm ml-2">
                <li>
                  Accédez au projet et cliquez sur l'onglet
                  <span class="text-primary">Collaborateurs</span>
                </li>
                <li>
                  Cliquez sur <span class="text-primary">Inviter</span> et
                  saisissez l'adresse e-mail du collaborateur
                </li>
                <li>Sélectionnez le niveau d'accès approprié</li>
                <li>Ajoutez un message personnalisé (optionnel)</li>
                <li>
                  Cliquez sur
                  <span class="text-primary">Envoyer l'invitation</span>
                </li>
              </ol>
              <p class="text-sm text-muted-foreground mt-3">
                Le collaborateur recevra un e-mail avec un lien pour accéder
                directement au projet.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Suivi des modifications</h3>
              <p class="text-sm text-muted-foreground mb-3">
                Toutes les modifications apportées à un projet sont enregistrées
                dans l'historique, avec le nom du collaborateur, la date et la
                description du changement.
              </p>
              <div class="border rounded-lg p-4 mb-4">
                <div class="space-y-3">
                  <div class="flex items-start gap-3">
                    <div
                      class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium"
                    >
                      SP
                    </div>
                    <div>
                      <p class="text-sm">
                        <span class="font-medium">Sophie Petit</span> a modifié
                        les matériaux du salon
                      </p>
                      <p class="text-xs text-muted-foreground">
                        Aujourd'hui à 14:32
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div
                      class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium"
                    >
                      MB
                    </div>
                    <div>
                      <p class="text-sm">
                        <span class="font-medium">Marc Blanc</span> a ajouté 3
                        meubles dans la cuisine
                      </p>
                      <p class="text-xs text-muted-foreground">Hier à 09:15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Archivage et suppression -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Archivage et suppression</h2>
      <Card>
        <CardContent class="pt-6">
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium mb-2">Archivage de projets</h3>
              <p class="text-sm text-muted-foreground mb-3">
                L'archivage permet de conserver vos projets terminés sans
                encombrer votre tableau de bord principal :
              </p>
              <ul class="list-disc list-inside space-y-2 text-sm ml-2">
                <li>
                  Les projets archivés ne sont pas comptabilisés dans votre
                  quota de projets actifs
                </li>
                <li>
                  Ils restent accessibles dans la section "Archives" et peuvent
                  être restaurés à tout moment
                </li>
                <li>
                  Les projets archivés depuis plus de 12 mois peuvent être
                  automatiquement supprimés (selon votre plan)
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Suppression définitive</h3>
              <p class="text-sm text-muted-foreground mb-3">
                La suppression d'un projet est définitive et entraîne la perte
                de toutes les données associées. Pour supprimer un projet :
              </p>
              <div class="border border-red-200 rounded-lg p-4 bg-red-50">
                <div class="flex items-start gap-3">
                  <AlertTriangleIcon class="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p class="text-sm font-medium text-red-800">Attention</p>
                    <p class="text-xs text-red-700 mt-1">
                      La suppression d'un projet est irréversible. Toutes les
                      données associées, y compris les photos, le modèle 3D et
                      les rendus, seront définitivement perdues.
                    </p>
                    <p class="text-xs text-red-700 mt-2">
                      Nous vous recommandons d'exporter vos rendus et d'archiver
                      le projet plutôt que de le supprimer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Pages associées -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Pages associées</h2>
      <div class="grid gap-4 md:grid-cols-3">
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
                Découvrez comment générer des rendus de haute qualité pour vos
                projets.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
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
                Apprenez à gérer et personnaliser les modèles 3D de vos projets.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/photos">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Photos</CardTitle>
              <CardDescription>Optimisation des images sources</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Guide pour prendre des photos optimales et les préparer pour la
                reconstruction 3D.
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
  SearchIcon,
  FilterIcon,
  ArrowDownUpIcon,
  EyeIcon,
  EditIcon,
  UserCogIcon,
  AlertTriangleIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})
</script>
