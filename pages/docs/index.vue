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
                <h3 class="text-base font-medium">Création de compte</h3>
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
                <h3 class="text-base font-medium">Importer des photos</h3>
                <p class="text-sm text-muted-foreground">
                  Téléchargez des photos de votre espace. Pour des résultats
                  optimaux, utilisez des photos bien éclairées prises sous
                  différents angles.
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
                <h3 class="text-base font-medium">Génération 3D</h3>
                <p class="text-sm text-muted-foreground">
                  Notre IA analyse vos images et génère automatiquement un
                  modèle 3D texturé de votre espace en quelques secondes.
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
                <h3 class="text-base font-medium">Personnalisation</h3>
                <p class="text-sm text-muted-foreground">
                  Modifiez les matériaux, ajoutez des meubles, changez
                  l'éclairage et explorez différentes perspectives de votre
                  espace.
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
                <h3 class="text-base font-medium">Export et partage</h3>
                <p class="text-sm text-muted-foreground">
                  Exportez vos rendus en haute résolution ou créez des vues 360°
                  pour une immersion complète. Partagez-les facilement avec vos
                  clients ou collègues.
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
            VizHome offre plusieurs options de partage. Vous pouvez générer un
            lien sécurisé vers une galerie en ligne, exporter des images haute
            résolution, créer une visite virtuelle interactive ou intégrer vos
            rendus et vues 360° directement sur votre site web via notre widget.
            Les paramètres de confidentialité vous permettent de contrôler qui
            peut voir vos projets.
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
import { ArrowRightIcon } from 'lucide-vue-next'

// Définir le layout docs pour cette page
definePageMeta({
  layout: 'docs',
})
</script>
