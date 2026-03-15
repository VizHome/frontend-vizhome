<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Documentation VizHome</h1>
      <p class="text-lg text-muted-foreground mt-2">
        Tout ce dont vous avez besoin pour tirer le meilleur parti de VizHome
      </p>
    </div>

    <!-- Introduction -->
    <Card>
      <CardHeader>
        <CardTitle>Bienvenue sur VizHome</CardTitle>
        <CardDescription
          >Transformation d'espaces par IA en quelques clics</CardDescription
        >
      </CardHeader>
      <CardContent>
        <p>
          VizHome est une solution SaaS d'intégration 3D architecturale
          propulsée par l'intelligence artificielle. Notre plateforme permet de
          générer des visualisations photoréalistes à partir de simples photos,
          en utilisant une technologie de pointe pour reconstruire l'espace en
          3D et appliquer des textures et matériaux réalistes.
        </p>
      </CardContent>
    </Card>

    <!-- Quick Start -->
    <section id="demarrage-rapide">
      <h2 class="text-2xl font-bold mb-4">Démarrage rapide</h2>

      <!-- Les 3 modes -->
      <div class="grid gap-4 md:grid-cols-3 mb-6">
        <Card class="rounded-xl border shadow-sm">
          <CardHeader class="pb-2">
            <div
              class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
            >
              <PencilIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Croquis 2D</CardTitle>
            <CardDescription>Dessinez, annotez, exportez</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            Canvas vectoriel avec outils crayon, formes, texte et pipette.
            Exportez en PNG ou transformez votre croquis en rendu IA.
          </CardContent>
        </Card>
        <Card class="rounded-xl border shadow-sm">
          <CardHeader class="pb-2">
            <div
              class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
            >
              <SparklesIcon class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">Prompt IA</CardTitle>
            <CardDescription>Générez par description</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            Décrivez votre espace en texte libre. L'IA génère une image 2D ou un
            modèle 3D. Suggestions, historique tabulé et confirmation avant
            génération.
          </CardContent>
        </Card>
        <Card class="rounded-xl border shadow-sm">
          <CardHeader class="pb-2">
            <div
              class="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
            >
              <Box class="h-5 w-5 text-primary" />
            </div>
            <CardTitle class="text-base">3D Pro</CardTitle>
            <CardDescription>Éditeur temps réel avancé</CardDescription>
          </CardHeader>
          <CardContent class="text-sm text-muted-foreground">
            Importez un modèle GLB/GLTF/OBJ/FBX/STL. Contrôlez l'éclairage, les
            matériaux, la caméra et naviguez en première personne (WASD).
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent class-name="py-10 px-10">
          <div class="grid gap-6 pt-5">
            <div class="flex items-start gap-4">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                1
              </div>
              <div class="space-y-1">
                <h3 class="text-base font-medium">Créer un compte</h3>
                <p class="text-sm text-muted-foreground">
                  Commencez par
                  <NuxtLink
                    to="/auth/register"
                    class="text-primary hover:underline"
                    >créer un compte
                  </NuxtLink>
                  ou vous connecter. L'offre Freemium vous permet de tester
                  gratuitement les fonctionnalités de base.
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
                <h3 class="text-base font-medium">Ouvrir l'éditeur</h3>
                <p class="text-sm text-muted-foreground">
                  Rendez-vous sur
                  <NuxtLink to="/render" class="text-primary hover:underline"
                    >/render</NuxtLink
                  >. La barre de mode en haut vous permet de choisir entre
                  <strong>Croquis 2D</strong>, <strong>Prompt IA</strong> et
                  <strong>3D Pro</strong>.
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
                  Choisir votre flux de travail
                </h3>
                <p class="text-sm text-muted-foreground">
                  En <strong>Croquis 2D</strong>, utilisez les outils de dessin
                  librement. En <strong>Prompt IA</strong>, décrivez votre
                  projet en texte. En <strong>3D Pro</strong>, importez un
                  fichier GLB, OBJ, FBX ou STL.
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
                <h3 class="text-base font-medium">Personnaliser le rendu</h3>
                <p class="text-sm text-muted-foreground">
                  En mode 3D Pro, accédez aux panneaux flottants via la toolbar
                  droite : éclairage (ambiances + saisons), navigation (orbite,
                  première personne, visite, top-down), matériaux et caméra.
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
                <h3 class="text-base font-medium">Exporter et partager</h3>
                <p class="text-sm text-muted-foreground">
                  Exportez vos rendus en PNG haute résolution, ou partagez un
                  lien sécurisé avec vos clients. En Croquis 2D, le bouton
                  export est accessible directement depuis la toolbar.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>

    <!-- Guides -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Guides</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Guide de l'interface</CardTitle>
            <CardDescription
              >Navigation et utilisation de VizHome</CardDescription
            >
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Découvrez comment naviguer dans l'interface utilisateur, gérer vos
              projets et utiliser les outils d'édition.
            </p>
          </CardContent>
          <CardFooter>
            <NuxtLink to="/docs/interface">
              <Button variant="ghost" size="sm" class="gap-1">
                Lire le guide
                <ArrowRightIcon class="h-4 w-4" />
              </Button>
            </NuxtLink>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Optimisation des photos</CardTitle>
            <CardDescription
              >Meilleures pratiques pour la capture d'images</CardDescription
            >
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Apprenez à prendre des photos optimales pour des résultats 3D de
              haute qualité avec notre IA.
            </p>
          </CardContent>
          <CardFooter>
            <NuxtLink to="/docs/photos">
              <Button variant="ghost" size="sm" class="gap-1">
                Lire le guide
                <ArrowRightIcon class="h-4 w-4" />
              </Button>
            </NuxtLink>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Édition avancée</CardTitle>
            <CardDescription>Techniques de personnalisation</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Maîtrisez les outils d'édition avancés pour personnaliser
              entièrement vos rendus 3D.
            </p>
          </CardContent>
          <CardFooter>
            <NuxtLink to="/docs/editing">
              <Button variant="ghost" size="sm" class="gap-1">
                Lire le guide
                <ArrowRightIcon class="h-4 w-4" />
              </Button>
            </NuxtLink>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader class="pb-2">
            <CardTitle class="text-base">Vues 360° et VR</CardTitle>
            <CardDescription>Création d'expériences immersives</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Créez et partagez des visites virtuelles à 360° et des expériences
              VR de vos projets.
            </p>
          </CardContent>
          <CardFooter>
            <NuxtLink to="/docs/vr">
              <Button variant="ghost" size="sm" class="gap-1">
                Lire le guide
                <ArrowRightIcon class="h-4 w-4" />
              </Button>
            </NuxtLink>
          </CardFooter>
        </Card>
      </div>
    </div>

    <!-- Video tutorials -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Tutoriels vidéo</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <Card>
          <div class="aspect-video relative bg-muted">
            <img
              src="/images/docs/projet_1.png"
              alt="Tutoriel d'introduction"
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
          <CardHeader>
            <CardTitle class="text-base">Introduction à VizHome</CardTitle>
            <CardDescription>8:24 min</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <div class="aspect-video relative bg-muted">
            <img
              src="/images/docs/projet_2.png"
              alt="Tutoriel matériaux"
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
          <CardHeader>
            <CardTitle class="text-base"
              >Personnalisation des matériaux</CardTitle
            >
            <CardDescription>12:16 min</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>

    <!-- API Reference teaser -->
    <div>
      <h2 class="text-2xl font-bold mb-4">API et intégration</h2>
      <Card>
        <CardHeader>
          <CardTitle>Développement avec VizHome</CardTitle>
          <CardDescription
            >Intégrez la puissance de VizHome dans vos
            applications</CardDescription
          >
        </CardHeader>
        <CardContent>
          <p class="mb-4">
            Notre API RESTful permet aux développeurs d'accéder à toutes les
            fonctionnalités de VizHome directement depuis leurs applications.
            Générez des rendus, gérez des projets et accédez à la bibliothèque
            de matériaux par programmation.
          </p>
          <div class="bg-muted rounded-md p-4 text-sm font-mono">
            <pre>
curl -X POST https://api.vizhome.fr/v1/renders \
-H "Authorization: Bearer YOUR_API_KEY" \
-F "image=@photo.jpg" \
-F "options={\"quality\":\"high\"}"</pre
            >
          </div>
        </CardContent>
        <CardFooter>
          <NuxtLink to="/docs/api">
            <Button class="gap-1">
              Documentation de l'API
              <ArrowRightIcon class="h-4 w-4" />
            </Button>
          </NuxtLink>
        </CardFooter>
      </Card>
    </div>

    <!-- FAQ -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Questions fréquentes</h2>
      <Accordion type="single" collapsible class="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            >Comment fonctionne la technologie IA de VizHome ?</AccordionTrigger
          >
          <AccordionContent>
            Notre IA utilise un ensemble de réseaux de neurones profonds (CNN,
            GAN) pour analyser vos photos et reconstruire la géométrie 3D de
            l'espace. Le système identifie automatiquement les matériaux,
            textures et sources de lumière, puis génère un modèle 3D texturé
            complet. La phase finale applique un moteur de rendu avancé pour
            créer des visualisations photoréalistes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger
            >Quelles sont les contraintes techniques des photos
            ?</AccordionTrigger
          >
          <AccordionContent>
            Pour des résultats optimaux, nous recommandons des photos d'au moins
            12 MP, bien éclairées et nettes. Prenez plusieurs photos du même
            espace sous différents angles. Évitez les photos prises avec un
            objectif fisheye ou des distorsions extrêmes. Notre système peut
            traiter des images jusqu'à 50 MP.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger
            >Puis-je utiliser mes propres modèles 3D ?</AccordionTrigger
          >
          <AccordionContent>
            Oui, VizHome permet d'importer vos propres modèles 3D aux formats
            OBJ, FBX, GLTF et DAE. Ces modèles peuvent être intégrés dans les
            scènes générées par notre IA, vous permettant de personnaliser
            entièrement vos visualisations avec vos propres meubles ou objets.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger
            >VizHome fonctionne-t-il hors ligne ?</AccordionTrigger
          >
          <AccordionContent>
            VizHome est principalement un service cloud qui nécessite une
            connexion internet pour la génération des modèles 3D et l'accès à
            notre bibliothèque de matériaux. Cependant, une fois générés, vos
            rendus peuvent être téléchargés et visualisés hors ligne. Pour les
            entreprises, nous proposons également des solutions d'infrastructure
            sur site.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger
            >Comment puis-je partager mes projets avec mes clients
            ?</AccordionTrigger
          >
          <AccordionContent>
            Vous pouvez générer un lien sécurisé vers votre rendu, exporter des
            images haute résolution, créer une visite virtuelle interactive ou
            intégrer vos rendus et vues 360° directement sur votre site web via
            notre widget. Les paramètres de confidentialité vous permettent de
            contrôler qui peut voir vos projets.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <!-- Support -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Support technique</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Notre équipe de support est disponible pour vous aider avec toutes
              vos questions techniques.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full" as-child>
              <NuxtLink to="/contact">Contacter le support</NuxtLink>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Communauté</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Rejoignez notre communauté d'utilisateurs pour échanger des
              astuces et retours d'expérience.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full" as-child>
              <a href="https://discord.gg/vizhome" target="_blank">Discord</a>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle class="text-base">Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Réservez une session de formation personnalisée avec l'un de nos
              experts.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full" as-child>
              <NuxtLink to="/contact">Réserver une formation</NuxtLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon, PencilIcon, SparklesIcon, Box } from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>
