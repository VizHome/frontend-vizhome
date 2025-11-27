<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Matériaux</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Gestion et application des textures et matériaux
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardContent class="pt-6">
        <p>
          Les matériaux sont essentiels pour créer des visualisations réalistes
          et attrayantes. VizHome propose une vaste bibliothèque de matériaux et
          des outils puissants pour les personnaliser et les appliquer à vos
          modèles 3D. Cette page vous guide dans l'utilisation efficace des
          matériaux pour transformer vos espaces.
        </p>
      </CardContent>
    </Card>

    <!-- Bibliothèque de matériaux -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Bibliothèque de matériaux</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome propose une bibliothèque complète de matériaux réalistes
            organisés par catégories :
          </p>

          <div class="grid gap-6 md:grid-cols-3">
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-square bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Matériaux pour murs"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Murs et cloisons</h3>
                <p class="text-sm text-muted-foreground">
                  Peintures, papiers peints, briques, lambris, panneaux
                  décoratifs et revêtements spéciaux.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-square bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Matériaux pour sols"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Sols</h3>
                <p class="text-sm text-muted-foreground">
                  Parquets, carrelages, moquettes, béton, vinyle, marbre et
                  revêtements synthétiques.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-square bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Matériaux pour plafonds"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Plafonds</h3>
                <p class="text-sm text-muted-foreground">
                  Peintures, plâtre, faux-plafonds, poutres apparentes et
                  panneaux acoustiques.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-square bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Matériaux pour cuisine"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Plans de travail</h3>
                <p class="text-sm text-muted-foreground">
                  Granit, quartz, marbre, bois, stratifié, béton ciré et acier
                  inoxydable.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-square bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Matériaux textiles"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Textiles</h3>
                <p class="text-sm text-muted-foreground">
                  Coton, lin, velours, cuir, suède et textiles techniques pour
                  meubles et rideaux.
                </p>
              </div>
            </div>
            <div class="border rounded-lg overflow-hidden">
              <div class="aspect-square bg-muted relative">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Matériaux extérieurs"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="p-4">
                <h3 class="font-medium mb-1">Extérieurs</h3>
                <p class="text-sm text-muted-foreground">
                  Bardage, terrasse, pierre naturelle, béton et matériaux
                  composites résistants aux intempéries.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-lg font-medium mb-3">Recherche et filtrage</h3>
            <p class="text-sm text-muted-foreground mb-3">
              Trouvez rapidement le matériau parfait grâce à nos filtres avancés
              :
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
                    Rechercher des matériaux...
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div
                    class="h-9 px-3 rounded-md border border-input flex items-center gap-1 text-sm"
                  >
                    <span>Catégorie</span>
                    <ChevronDownIcon class="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div
                    class="h-9 px-3 rounded-md border border-input flex items-center gap-1 text-sm"
                  >
                    <span>Couleur</span>
                    <ChevronDownIcon class="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div
                    class="h-9 px-3 rounded-md border border-input flex items-center gap-1 text-sm"
                  >
                    <span>Texture</span>
                    <ChevronDownIcon class="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div
                    class="h-9 px-3 rounded-md border border-input flex items-center gap-1 text-sm"
                  >
                    <span>Style</span>
                    <ChevronDownIcon class="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Structure des matériaux -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Structure des matériaux</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Les matériaux dans VizHome sont basés sur un système PBR (Physically
            Based Rendering) qui simule le comportement réaliste des surfaces.
            Chaque matériau est composé de plusieurs couches et propriétés :
          </p>

          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Couleur de base (Albedo)</h3>
              <p class="text-sm text-muted-foreground">
                La couleur fondamentale du matériau, indépendamment de
                l'éclairage.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Normal Map</h3>
              <p class="text-sm text-muted-foreground">
                Texture qui ajoute des détails de relief sans augmenter la
                complexité géométrique.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Rugosité (Roughness)</h3>
              <p class="text-sm text-muted-foreground">
                Détermine si la surface est lisse et réfléchissante ou rugueuse
                et mate.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Métallicité (Metalness)</h3>
              <p class="text-sm text-muted-foreground">
                Indique si le matériau est métallique ou non, affectant la
                manière dont il réfléchit la lumière.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Occlusion ambiante (AO)</h3>
              <p class="text-sm text-muted-foreground">
                Simule les ombres douces dans les zones où la lumière pénètre
                difficilement.
              </p>
            </div>
            <div class="border-l-4 border-primary pl-4 py-2">
              <h3 class="font-medium">Émissivité</h3>
              <p class="text-sm text-muted-foreground">
                Permet au matériau d'émettre sa propre lumière, idéal pour les
                écrans, lampes et objets lumineux.
              </p>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium mb-3">Illustration PBR</h3>
              <div class="border rounded-lg overflow-hidden">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Illustration PBR"
                  class="w-full"
                />
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-3">Comparaison de matériaux</h3>
              <div class="space-y-2">
                <div class="grid grid-cols-2 gap-2">
                  <div class="border rounded-lg overflow-hidden">
                    <div class="aspect-square bg-muted relative">
                      <img
                        src="/images/generate/image_generate.png"
                        alt="Surface lisse"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="p-2">
                      <p class="text-xs text-center">Faible rugosité (lisse)</p>
                    </div>
                  </div>
                  <div class="border rounded-lg overflow-hidden">
                    <div class="aspect-square bg-muted relative">
                      <img
                        src="/images/generate/image_generate.png"
                        alt="Surface rugueuse"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="p-2">
                      <p class="text-xs text-center">Forte rugosité (mate)</p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="border rounded-lg overflow-hidden">
                    <div class="aspect-square bg-muted relative">
                      <img
                        src="/images/generate/image_generate.png"
                        alt="Surface métallique"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="p-2">
                      <p class="text-xs text-center">Métallique</p>
                    </div>
                  </div>
                  <div class="border rounded-lg overflow-hidden">
                    <div class="aspect-square bg-muted relative">
                      <img
                        src="/images/generate/image_generate.png"
                        alt="Surface non-métallique"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="p-2">
                      <p class="text-xs text-center">Non-métallique</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Application des matériaux -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Application des matériaux</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            VizHome offre plusieurs méthodes pour appliquer et modifier les
            matériaux sur vos modèles 3D :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Sélection et application</h3>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    1
                  </div>
                  <div class="space-y-1">
                    <h3 class="text-base font-medium">
                      Sélectionnez la surface
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Cliquez sur l'élément auquel vous souhaitez appliquer un
                      matériau (mur, sol, meuble, etc.). Vous pouvez
                      sélectionner plusieurs surfaces en maintenant la touche
                      Ctrl.
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
                      Ouvrez le panneau Matériaux
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Dans la barre latérale droite, cliquez sur l'onglet
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >Matériaux</span
                      >
                      pour accéder à la bibliothèque.
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
                    <h3 class="text-base font-medium">
                      Choisissez un matériau
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Parcourez la bibliothèque et sélectionnez le matériau
                      souhaité. Vous pouvez utiliser les filtres pour affiner
                      votre recherche.
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
                    <h3 class="text-base font-medium">Appliquez le matériau</h3>
                    <p class="text-sm text-muted-foreground">
                      Cliquez sur le matériau choisi et il sera automatiquement
                      appliqué à la surface sélectionnée, avec une
                      prévisualisation en temps réel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Outils d'application avancés
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <BrushIcon class="h-4 w-4 text-muted-foreground" />
                    Pinceau de matériaux
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Appliquez des matériaux en "peignant" directement sur le
                    modèle, avec contrôle de la taille du pinceau et de
                    l'intensité d'application.
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <WandIcon class="h-4 w-4 text-muted-foreground" />
                    Sélection intelligente
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Sélectionnez automatiquement toutes les surfaces similaires
                    pour appliquer un matériau uniformément (ex: tous les murs,
                    toutes les portes).
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <LayersIcon class="h-4 w-4 text-muted-foreground" />
                    Masques et calques
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Créez des masques pour appliquer plusieurs matériaux sur une
                    même surface (ex: carrelage avec frise).
                  </p>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1 flex items-center gap-2">
                    <Eye class="h-4 w-4 text-muted-foreground" />
                    Pipette
                  </h4>
                  <p class="text-xs text-muted-foreground">
                    Prélevez un matériau existant dans votre scène pour
                    l'appliquer à d'autres surfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 bg-muted p-4 rounded-lg">
            <div class="flex items-start gap-3">
              <LightbulbIcon class="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p class="text-sm font-medium">Astuce</p>
                <p class="text-sm text-muted-foreground mt-1">
                  Utilisez la fonction "Variantes" pour générer automatiquement
                  des variantes de couleur et de texture d'un matériau que vous
                  aimez. Cela permet d'explorer rapidement différentes options
                  tout en maintenant une cohérence visuelle.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Personnalisation des matériaux -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Personnalisation des matériaux</h2>
      <Card>
        <CardContent class="pt-6">
          <p class="mb-4">
            Au-delà de la bibliothèque préexistante, VizHome vous permet de
            personnaliser vos matériaux ou d'en créer de nouveaux :
          </p>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Éditeur de matériaux</h3>
              <div class="border rounded-lg overflow-hidden mb-4">
                <img
                  src="/images/generate/image_generate.png"
                  alt="Éditeur de matériaux"
                  class="w-full"
                />
              </div>
              <p class="text-sm text-muted-foreground mb-4">
                L'éditeur de matériaux offre un contrôle complet sur toutes les
                propriétés PBR, vous permettant d'ajuster :
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Propriétés de base</h4>
                  <ul
                    class="list-disc list-inside text-xs text-muted-foreground space-y-1"
                  >
                    <li>Couleur et teinte</li>
                    <li>Échelle et répétition</li>
                    <li>Rotation et orientation</li>
                  </ul>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Propriétés physiques</h4>
                  <ul
                    class="list-disc list-inside text-xs text-muted-foreground space-y-1"
                  >
                    <li>Rugosité et brillance</li>
                    <li>Métallicité</li>
                    <li>Translucidité et opacité</li>
                  </ul>
                </div>
                <div class="border rounded-lg p-3">
                  <h4 class="text-sm font-medium mb-1">Effets spéciaux</h4>
                  <ul
                    class="list-disc list-inside text-xs text-muted-foreground space-y-1"
                  >
                    <li>Relief et bump mapping</li>
                    <li>Réflexion et réfraction</li>
                    <li>Émission de lumière</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">
                Import de textures personnalisées
              </h3>
              <p class="text-sm text-muted-foreground mb-3">
                Vous pouvez créer des matériaux entièrement personnalisés en
                important vos propres textures :
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
                      Créez un nouveau matériau
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Dans le panneau Matériaux, cliquez sur
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >+ Nouveau matériau</span
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
                    <h3 class="text-base font-medium">Importez vos textures</h3>
                    <p class="text-sm text-muted-foreground">
                      Cliquez sur
                      <span class="px-2 py-1 bg-muted rounded text-xs"
                        >Importer</span
                      >
                      pour chaque type de texture (albedo, normal, roughness,
                      etc.) et sélectionnez vos fichiers image.
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
                    <h3 class="text-base font-medium">
                      Ajustez les paramètres
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Configurez l'échelle, la répétition et les autres
                      propriétés pour obtenir le résultat souhaité.
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
                      Enregistrez dans votre bibliothèque
                    </h3>
                    <p class="text-sm text-muted-foreground">
                      Donnez un nom à votre matériau et enregistrez-le pour
                      l'utiliser dans tous vos projets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-2">Matériaux générés par IA</h3>
              <p class="text-sm text-muted-foreground mb-3">
                VizHome propose également un outil de génération de matériaux
                par IA, vous permettant de créer des textures uniques à partir
                de descriptions textuelles ou d'images de référence.
              </p>
              <div class="border rounded-lg p-4 bg-muted/30">
                <div class="flex flex-col gap-3">
                  <div>
                    <label class="text-sm font-medium"
                      >Description du matériau</label
                    >
                    <div
                      class="mt-1 h-20 w-full rounded-md border border-input p-2 text-sm"
                    >
                      Parquet en chêne clair, légèrement vieilli, avec des nœuds
                      naturels et des veines prononcées
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <Button variant="outline" size="sm" class="gap-1">
                      <UploadIcon class="h-4 w-4" />
                      <span>Importer référence</span>
                    </Button>
                    <Button variant="default" size="sm" class="gap-1">
                      <SparklesIcon class="h-4 w-4" />
                      <span>Générer</span>
                    </Button>
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
        <NuxtLink to="/docs/api/modeles-3d">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Modèles 3D</CardTitle>
              <CardDescription
                >Gestion des modèles tridimensionnels</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Découvrez comment manipuler et personnaliser les modèles 3D de
                vos projets.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/api/rendus">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Rendus</CardTitle>
              <CardDescription
                >Création d'images professionnelles</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Générez des rendus photoréalistes avec vos matériaux
                personnalisés.
              </p>
            </CardContent>
          </Card>
        </NuxtLink>
        <NuxtLink to="/docs/api/projets">
          <Card class="h-full transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle class="text-base">Projets</CardTitle>
              <CardDescription>Gestion de vos projets</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">
                Organisez efficacement vos projets et appliquez vos matériaux
                favoris.
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
  ChevronDownIcon,
  LightbulbIcon,
  BrushIcon,
  WandIcon,
  LayersIcon,
  Eye,
  UploadIcon,
  SparklesIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'docs',
})
</script>
