<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Guide d'interface</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Maîtrisez l'interface utilisateur de VizHome
      </p>
    </div>

    <!-- Sommaire -->
    <Card>
      <CardHeader>
        <CardTitle>Sommaire</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="grid gap-2">
          <li>
            <a href="#dashboard" class="text-primary hover:underline">Tableau de bord</a>
          </li>
          <li>
            <a href="#projects" class="text-primary hover:underline">Gestion des projets</a>
          </li>
          <li>
            <a href="#editor" class="text-primary hover:underline">Éditeur 3D</a>
          </li>
          <li>
            <a href="#models" class="text-primary hover:underline">Bibliothèque de modèles</a>
          </li>
          <li>
            <a href="#settings" class="text-primary hover:underline">Paramètres du compte</a>
          </li>
        </ul>
      </CardContent>
    </Card>

    <!-- Tableau de bord -->
    <div id="dashboard" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <LayoutDashboardIcon class="h-5 w-5 text-primary" />
        Tableau de bord
      </h2>
      <Card class="mb-6">
        <div class="aspect-video relative bg-muted">
          <img src="/images/generate/image_generate.png" alt="Tableau de bord VizHome"
            class="object-cover w-full h-full rounded-t-lg">
        </div>
        <CardContent class="pt-6">
          <p class="mb-4">
            Le tableau de bord est votre point d'entrée principal dans VizHome. Il vous donne un aperçu de vos
            projets
            récents, de vos statistiques d'utilisation et de votre activité.
          </p>
          <h3 class="text-lg font-medium mb-2">Éléments principaux</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Projets récents</strong> : Accès rapide à vos derniers projets avec aperçus.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Statistiques</strong> : Visualisez votre utilisation avec le nombre de projets actifs,
                rendus générés, stockage utilisé et quota restant.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Activité récente</strong> : Timeline des dernières actions effectuées sur vos projets.
              </p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Bouton "Nouveau projet"</strong> : Créez rapidement un nouveau projet depuis n'importe
                quelle page.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <!-- Gestion des projets -->
    <div id="projects" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <FolderIcon class="h-5 w-5 text-primary" />
        Gestion des projets
      </h2>
      <Card class="mb-6">
        <div class="aspect-video relative bg-muted">
          <img src="/images/generate/image_generate.png" alt="Gestion des projets VizHome"
            class="object-cover w-full h-full rounded-t-lg">
        </div>
        <CardContent class="pt-6">
          <p class="mb-4">
            La section Projets vous permet d'organiser et de gérer tous vos projets VizHome. Vous pouvez créer des
            dossiers,
            filtrer vos projets et effectuer des actions par lots.
          </p>
          <h3 class="text-lg font-medium mb-2">Fonctionnalités clés</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Création de projet</strong> : Démarrez un nouveau projet en téléchargeant des photos ou
                en important un modèle 3D.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Organisation</strong> : Regroupez vos projets par client, type ou statut à l'aide de
                dossiers et d'étiquettes.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Gestion</strong> : Modifiez, dupliquez ou archivez des projets via les options du menu
                contextuel.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Partage</strong> : Invitez des collaborateurs ou clients avec différents niveaux d'accès.
              </p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Recherche</strong> : Retrouvez rapidement vos projets grâce à la recherche plein texte et
                aux filtres avancés.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <!-- Éditeur 3D -->
    <div id="editor" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <PencilIcon class="h-5 w-5 text-primary" />
        Éditeur 3D
      </h2>
      <Card class="mb-6">
        <div class="aspect-video relative bg-muted">
          <img src="/images/generate/image_generate.png" alt="Éditeur 3D VizHome" class="object-cover w-full h-full rounded-t-lg">
        </div>
        <CardContent class="pt-6">
          <p class="mb-4">
            L'éditeur 3D est le cœur de VizHome. C'est ici que vous personnalisez vos espaces, modifiez les
            matériaux,
            ajoutez des objets et générez vos rendus finaux.
          </p>
          <h3 class="text-lg font-medium mb-2">Interface de l'éditeur</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Vue 3D</strong> : Visualisation interactive de votre espace avec contrôles de caméra
                intuitifs.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Panneau de propriétés</strong> : Modifiez les caractéristiques des éléments sélectionnés.
              </p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Bibliothèque de matériaux</strong> : Accédez à des milliers de textures et matériaux
                réalistes.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Catalogue d'objets</strong> : Ajoutez des meubles et accessoires depuis notre
                bibliothèque 3D.</p>
            </li>
            <li class="flex items-start gap-2">
              <div class="min-w-[20px] mt-1">
                <Circle class="h-2 w-2 fill-primary text-primary" />
              </div>
              <p><strong>Réglages de rendu</strong> : Contrôlez l'éclairage, les ombres et les effets
                postproduction.</p>
            </li>
          </ul>

          <h3 class="text-lg font-medium mt-6 mb-2">Outils principaux</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-muted rounded-md p-3 flex items-start gap-3">
              <div class="bg-background rounded-full p-2">
                <MousePointerIcon class="h-4 w-4" />
              </div>
              <div>
                <h4 class="font-medium">Sélection</h4>
                <p class="text-sm text-muted-foreground">Sélectionnez des objets ou surfaces</p>
              </div>
            </div>
            <div class="bg-muted rounded-md p-3 flex items-start gap-3">
              <div class="bg-background rounded-full p-2">
                <MoveIcon class="h-4 w-4" />
              </div>
              <div>
                <h4 class="font-medium">Déplacement</h4>
                <p class="text-sm text-muted-foreground">Repositionnez les objets</p>
              </div>
            </div>
            <div class="bg-muted rounded-md p-3 flex items-start gap-3">
              <div class="bg-background rounded-full p-2">
                <PaintbrushIcon class="h-4 w-4" />
              </div>
              <div>
                <h4 class="font-medium">Matériaux</h4>
                <p class="text-sm text-muted-foreground">Appliquez des textures</p>
              </div>
            </div>
            <div class="bg-muted rounded-md p-3 flex items-start gap-3">
              <div class="bg-background rounded-full p-2">
                <SunIcon class="h-4 w-4" />
              </div>
              <div>
                <h4 class="font-medium">Éclairage</h4>
                <p class="text-sm text-muted-foreground">Ajustez les sources lumineuses</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <InfoIcon class="h-4 w-4" />
        <AlertTitle>Astuce</AlertTitle>
        <AlertDescription>
          Utilisez les raccourcis clavier pour naviguer plus rapidement dans l'éditeur. Appuyez sur <kbd
            class="px-2 py-1 bg-muted rounded text-xs">?</kbd> pour afficher tous les raccourcis disponibles.
        </AlertDescription>
      </Alert>
    </div>

    <!-- Bibliothèque de modèles -->
    <div id="models" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <CubeIcon class="h-5 w-5 text-primary" />
        Bibliothèque de modèles
      </h2>
      <Card class="mb-6">
        <CardContent class="pt-6">
          <p class="mb-4">
            La bibliothèque de modèles vous donne accès à des milliers d'objets 3D préfabriqués que vous pouvez
            utiliser
            dans vos projets. Cette section vous permet également de gérer vos propres modèles importés.
          </p>
          <h3 class="text-lg font-medium mb-2">Catégories principales</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <ArmchairIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Meubles</h4>
            </div>
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <LampIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Éclairage</h4>
            </div>
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <UtensilsIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Cuisine</h4>
            </div>
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <ShowerHeadIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Salle de bain</h4>
            </div>
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <ShowerHeadIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Salle de bain</h4>
            </div>
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <FlowerIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Décoration</h4>
            </div>
            <div class="border rounded-lg p-4 text-center">
              <div class="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <TreePineIcon class="h-6 w-6 text-primary" />
              </div>
              <h4 class="font-medium">Extérieur</h4>
            </div>
          </div>

          <h3 class="text-lg font-medium mb-2">Importer vos modèles</h3>
          <p class="mb-4">
            Vous pouvez importer vos propres modèles 3D dans les formats suivants : OBJ, FBX, GLTF/GLB et DAE.
            Les modèles importés seront disponibles dans la section "Mes modèles".
          </p>

          <div class="border rounded-lg p-6 text-center">
            <UploadCloudIcon class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h4 class="font-medium mb-2">Glissez-déposez vos fichiers ici</h4>
            <p class="text-sm text-muted-foreground mb-4">Formats supportés : OBJ, FBX, GLTF/GLB, DAE</p>
            <Button>Parcourir les fichiers</Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Paramètres du compte -->
    <div id="settings" class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <SettingsIcon class="h-5 w-5 text-primary" />
        Paramètres du compte
      </h2>
      <Card class="mb-6">
        <CardContent class="pt-6">
          <p class="mb-4">
            La section Paramètres vous permet de gérer votre compte, vos préférences et vos options de
            facturation.
          </p>

          <h3 class="text-lg font-medium mb-2">Options disponibles</h3>
          <Tabs default-value="profile">
            <TabsList>
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
              <TabsTrigger value="billing">Facturation</TabsTrigger>
              <TabsTrigger value="team">Équipe</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" class="space-y-4 pt-4">
              <div class="space-y-2">
                <h4 class="font-medium">Informations personnelles</h4>
                <p class="text-sm text-muted-foreground">
                  Modifiez vos informations de base telles que votre nom, adresse email et mot de passe.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">Sécurité</h4>
                <p class="text-sm text-muted-foreground">
                  Activez l'authentification à deux facteurs et gérez vos sessions actives.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">Notifications</h4>
                <p class="text-sm text-muted-foreground">
                  Configurez vos préférences de notifications par email et dans l'application.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="appearance" class="space-y-4 pt-4">
              <div class="space-y-2">
                <h4 class="font-medium">Thème</h4>
                <p class="text-sm text-muted-foreground">
                  Choisissez entre le mode clair, sombre ou automatique.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">Interface</h4>
                <p class="text-sm text-muted-foreground">
                  Personnalisez l'apparence de l'éditeur et du tableau de bord.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="billing" class="space-y-4 pt-4">
              <div class="space-y-2">
                <h4 class="font-medium">Abonnement</h4>
                <p class="text-sm text-muted-foreground">
                  Consultez et modifiez votre abonnement actuel.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">Paiement</h4>
                <p class="text-sm text-muted-foreground">
                  Gérez vos méthodes de paiement et consultez l'historique de vos factures.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">Utilisation</h4>
                <p class="text-sm text-muted-foreground">
                  Suivez votre consommation de rendus et d'espace de stockage.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="team" class="space-y-4 pt-4">
              <div class="space-y-2">
                <h4 class="font-medium">Membres</h4>
                <p class="text-sm text-muted-foreground">
                  Invitez des collaborateurs et gérez les permissions.
                </p>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">Rôles</h4>
                <p class="text-sm text-muted-foreground">
                  Configurez les rôles et les niveaux d'accès personnalisés.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation et raccourcis -->
    <div class="scroll-mt-20">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <KeyboardIcon class="h-5 w-5 text-primary" />
        Navigation et raccourcis
      </h2>
      <Card class="mb-6">
        <CardContent class="pt-6">
          <p class="mb-6">
            Pour une utilisation plus efficace de VizHome, vous pouvez utiliser ces raccourcis clavier dans
            l'éditeur 3D.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="text-base font-medium mb-3">Navigation</h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm">Rotation de la caméra</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Clic droit</kbd>
                    <span class="text-xs">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Glisser</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Zoom</span>
                  <div>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Molette souris</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Panoramique</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Maj</kbd>
                    <span class="text-xs">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Clic droit</kbd>
                    <span class="text-xs">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Glisser</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Réinitialiser la vue</span>
                  <div>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">F</kbd>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="text-base font-medium mb-3">Édition</h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm">Sélection</span>
                  <div>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">V</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Déplacer</span>
                  <div>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">G</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Faire pivoter</span>
                  <div>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">R</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Mettre à l'échelle</span>
                  <div>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">S</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Annuler</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
                    <span class="text-xs">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Z</kbd>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm">Rétablir</span>
                  <div class="flex gap-1">
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
                    <span class="text-xs">+</span>
                    <kbd class="px-2 py-1 bg-muted rounded text-xs">Y</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="flex items-center justify-between">
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs">
          <ArrowLeftIcon class="h-4 w-4" />
          Documentation
        </NuxtLink>
      </Button>
      <Button variant="outline" class="gap-1" as-child>
        <NuxtLink to="/docs/photos">
          Optimisation des photos
          <ArrowRightIcon class="h-4 w-4" />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon, ArrowLeftIcon, Circle, LayoutDashboardIcon,
  FolderIcon, CubeIcon, SettingsIcon, MousePointerIcon, MoveIcon, PaintbrushIcon, SunIcon,
  InfoIcon, ArmchairIcon, LampIcon, UtensilsIcon, ShowerHeadIcon, FlowerIcon, TreePineIcon,
  UploadCloudIcon, KeyboardIcon, PencilIcon
} from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>