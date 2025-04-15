<template>
  <div>
    <!-- Hero Section -->
    <section class="pt-20 pb-16 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Des fonctionnalités pensées pour les créateurs</h1>
            <p class="text-xl text-muted-foreground mb-8">
              Découvrez comment l'intelligence artificielle de VizHome révolutionne la visualisation architecturale
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <Button size="lg" as-child>
                <NuxtLink to="/auth/register">
                  Essayer gratuitement
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" as-child>
                <NuxtLink to="/docs">
                  Explorer la documentation
                </NuxtLink>
              </Button>
            </div>
          </div>
          <div
            class="relative aspect-video bg-gradient-to-tr from-primary/5 to-primary/10 rounded-lg overflow-hidden shadow-xl">
            <img src="/images/docs/projet_1.png" alt="Interface VizHome"
              class="object-cover w-full h-full mix-blend-overlay" />
            <div class="absolute inset-0 bg-background/10 backdrop-blur-sm flex items-center justify-center">
              <div class="bg-background/80 backdrop-blur-md rounded-lg p-6 shadow-lg max-w-xs">
                <div class="flex items-center gap-3 mb-3">
                  <div class="bg-primary/10 p-2 rounded-full">
                    <SparklesIcon class="h-5 w-5 text-primary" />
                  </div>
                  <h3 class="font-medium">IA générative</h3>
                </div>
                <p class="text-sm text-muted-foreground">
                  Transformez vos photos en rendus 3D photoréalistes en quelques secondes grâce à notre technologie d'IA
                  avancée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités principales -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">Fonctionnalités principales</h2>
        <p class="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Des outils puissants qui vous permettent de visualiser et transformer vos espaces comme jamais auparavant
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card class="overflow-hidden">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <ImageIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Génération 3D automatique</CardTitle>
              <CardDescription>
                Transformation instantanée de photos en modèles 3D
              </CardDescription>
            </CardHeader>
            <div class="px-6">
              <img src="/images/docs/projet_1.png" alt="Génération 3D automatique"
                class="rounded-lg h-48 w-full object-cover" />
            </div>
            <CardContent class="pt-6">
              <p class="text-muted-foreground">
                Notre IA analyse vos photos et génère automatiquement un modèle 3D complet en quelques secondes,
                sans aucune compétence technique requise.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1">
                En savoir plus
                <ChevronRightIcon class="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <PaintbrushIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Bibliothèque de matériaux</CardTitle>
              <CardDescription>
                Milliers de textures et matériaux photoréalistes
              </CardDescription>
            </CardHeader>
            <div class="px-6">
              <img src="/images/docs/projet_1.png" alt="Bibliothèque de matériaux"
                class="rounded-lg h-48 w-full object-cover" />
            </div>
            <CardContent class="pt-6">
              <p class="text-muted-foreground">
                Accédez à une vaste bibliothèque de plus de 10 000 matériaux et textures de haute qualité pour
                personnaliser chaque aspect de vos rendus.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1">
                En savoir plus
                <ChevronRightIcon class="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <EyeIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Vues 360° immersives</CardTitle>
              <CardDescription>
                Expérience interactive complète de vos espaces
              </CardDescription>
            </CardHeader>
            <div class="px-6">
              <img src="/images/docs/projet_1.png" alt="Vues 360° immersives"
                class="rounded-lg h-48 w-full object-cover" />
            </div>
            <CardContent class="pt-6">
              <p class="text-muted-foreground">
                Créez des visites virtuelles à 360° de vos rendus pour une immersion totale et
                un moyen percutant de présenter vos projets.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1">
                En savoir plus
                <ChevronRightIcon class="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <SunIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Éclairage intelligent</CardTitle>
              <CardDescription>
                Contrôles d'éclairage avancés et réalistes
              </CardDescription>
            </CardHeader>
            <div class="px-6">
              <img src="/images/docs/projet_1.png" alt="Éclairage intelligent"
                class="rounded-lg h-48 w-full object-cover" />
            </div>
            <CardContent class="pt-6">
              <p class="text-muted-foreground">
                Notre technologie simule avec précision différentes conditions d'éclairage, des ambiances naturelles
                aux éclairages artificiels complexes.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1">
                En savoir plus
                <ChevronRightIcon class="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Share2Icon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Partage et collaboration</CardTitle>
              <CardDescription>
                Outils collaboratifs pour équipes et clients
              </CardDescription>
            </CardHeader>
            <div class="px-6">
              <img src="/images/docs/projet_1.png" alt="Partage et collaboration"
                class="rounded-lg h-48 w-full object-cover" />
            </div>
            <CardContent class="pt-6">
              <p class="text-muted-foreground">
                Partagez facilement vos projets avec vos clients ou collaborateurs, recueillez des commentaires
                et travaillez ensemble en temps réel.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1">
                En savoir plus
                <ChevronRightIcon class="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card class="overflow-hidden">
            <CardHeader>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <SmartphoneIcon class="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Applications mobiles</CardTitle>
              <CardDescription>
                Accessibilité sur tous vos appareils
              </CardDescription>
            </CardHeader>
            <div class="px-6">
              <img src="/images/docs/projet_1.png" alt="Applications mobiles"
                class="rounded-lg h-48 w-full object-cover" />
            </div>
            <CardContent class="pt-6">
              <p class="text-muted-foreground">
                Utilisez VizHome où que vous soyez grâce à nos applications iOS et Android qui offrent
                une expérience complète et optimisée pour mobile.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1">
                En savoir plus
                <ChevronRightIcon class="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Technologie IA -->
    <section class="py-16 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">La puissance de l'IA au service de votre créativité</h2>
            <p class="text-lg text-muted-foreground mb-6">
              Notre technologie propriétaire combine plusieurs réseaux de neurones pour une compréhension complète de
              vos espaces.
            </p>

            <Accordion type="single" collapsible class="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Reconnaissance spatiale</AccordionTrigger>
                <AccordionContent>
                  Notre IA analyse la géométrie de l'espace, identifie les surfaces, les profondeurs et les proportions
                  pour créer un modèle 3D précis de votre environnement, même à partir d'une seule photo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Analyse des matériaux</AccordionTrigger>
                <AccordionContent>
                  Le système détecte et classifie automatiquement les différents matériaux présents dans votre espace,
                  puis applique des textures réalistes qui reproduisent fidèlement leurs propriétés physiques.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Simulation d'éclairage</AccordionTrigger>
                <AccordionContent>
                  Notre moteur d'IA analyse les sources de lumière existantes et simule précisément leur comportement,
                  y compris les réflexions, réfractions et ombres, pour un rendu photoréaliste.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Génération contextuelle</AccordionTrigger>
                <AccordionContent>
                  L'IA comprend le contexte architectural et peut suggérer des améliorations ou compléter des parties
                  manquantes de manière cohérente avec le style et la fonction de l'espace.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div class="relative">
            <div class="bg-gradient-to-tr from-primary/5 to-primary/10 rounded-xl p-6">
              <img src="/images/docs/projet_1.png" alt="Technologie IA VizHome"
                class="rounded-lg shadow-lg w-full" />
            </div>

            <div class="absolute -bottom-6 -left-6 bg-background rounded-lg shadow-lg p-4 border">
              <div class="flex items-center gap-3 mb-2">
                <div class="bg-primary/10 p-2 rounded-full">
                  <BrainIcon class="h-5 w-5 text-primary" />
                </div>
                <h3 class="font-medium">Deep Learning</h3>
              </div>
              <p class="text-xs text-muted-foreground max-w-xs">
                Notre IA s'améliore continuellement grâce à des millions de rendus et s'adapte à vos préférences
                spécifiques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages compétitifs -->
    <section class="py-16 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">Pourquoi choisir VizHome ?</h2>
        <p class="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Nos avantages qui nous distinguent de la concurrence
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <BoltIcon class="h-5 w-5 text-primary" />
                Vitesse incomparable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Notre moteur de rendu est jusqu'à 10 fois plus rapide que les solutions traditionnelles.
                Obtenez des résultats en quelques secondes plutôt qu'en heures.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <MousePointerClickIcon class="h-5 w-5 text-primary" />
                Simplicité d'utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Interface intuitive qui ne nécessite aucune expertise technique. Si vous savez prendre
                une photo, vous savez utiliser VizHome.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <ImagePlusIcon class="h-5 w-5 text-primary" />
                Qualité exceptionnelle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Rendus photoréalistes de qualité professionnelle avec une précision inégalée des matériaux,
                textures et éclairages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <CloudIcon class="h-5 w-5 text-primary" />
                Solution cloud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Aucun matériel coûteux requis. Notre infrastructure cloud gère tout le traitement,
                vous permettant de travailler de n'importe où.
              </p>
            </CardContent>
          </Card>

          <Card class="md:col-span-2">
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <CodeIcon class="h-5 w-5 text-primary" />
                API complète pour développeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground mb-4">
                Intégrez la puissance de VizHome directement dans vos applications et workflows grâce à notre API
                RESTful.
              </p>
              <div class="bg-muted rounded-md p-4 overflow-auto text-sm">
                <pre><code>curl -X POST https://api.vizhome.fr/v1/renders \
-H "Authorization: Bearer YOUR_API_KEY" \
-F "image=@room.jpg" \
-F "options={\"quality\":\"high\",\"format\":\"jpg\"}"</code></pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Cas d'utilisation -->
    <section class="py-16 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">Cas d'utilisation</h2>
        <p class="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Comment nos clients utilisent VizHome dans leur domaine
        </p>

        <Tabs defaultValue="architecture" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="immobilier">Immobilier</TabsTrigger>
            <TabsTrigger value="design">Design d'intérieur</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          </TabsList>
          <TabsContent value="architecture" className="mt-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src="/images/docs/projet_1.png" alt="Cas d'utilisation architecture"
                    className="h-full w-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6">
                  <h3 className="text-xl font-bold mb-3">Pour les architectes</h3>
                  <p className="text-muted-foreground mb-4">
                    Les architectes utilisent VizHome pour présenter rapidement des concepts à leurs clients,
                    transformer des croquis en visualisations 3D et explorer différentes options de design sans avoir à
                    créer des rendus manuels laborieux.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Présentation de concepts en temps réel lors des réunions clients</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Exploration rapide de multiples options de design</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Intégration avec les logiciels de CAO existants</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="immobilier" className="mt-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src="/images/docs/projet_1.png" alt="Cas d'utilisation immobilier"
                    className="h-full w-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6">
                  <h3 className="text-xl font-bold mb-3">Pour les professionnels de l'immobilier</h3>
                  <p className="text-muted-foreground mb-4">
                    Les agents immobiliers utilisent VizHome pour créer des visites virtuelles, montrer le potentiel des
                    propriétés vides ou à rénover, et donner vie aux biens avant même qu'ils ne soient construits.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Visualisation de biens en construction ou sur plan</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Staging virtuel de propriétés vides</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Création de visites virtuelles 360° pour les plateformes d'annonces</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="design" className="mt-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src="/images/docs/projet_1.png" alt="Cas d'utilisation design d'intérieur"
                    className="h-full w-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6">
                  <h3 className="text-xl font-bold mb-3">Pour les designers d'intérieur</h3>
                  <p className="text-muted-foreground mb-4">
                    Les designers d'intérieur utilisent VizHome pour tester différentes combinaisons de couleurs,
                    matériaux et mobilier, et montrer à leurs clients une visualisation précise du résultat final avant
                    d'engager des frais.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Expérimentation avec différentes palettes de couleurs et matériaux</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Visualisation de meubles et d'accessoires dans l'espace réel</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Présentation de concepts multiples aux clients pour faciliter la décision
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="ecommerce" className="mt-6">
            <Card>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src="/images/docs/projet_1.png" alt="Cas d'utilisation e-commerce"
                    className="h-full w-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6">
                  <h3 className="text-xl font-bold mb-3">Pour l'e-commerce</h3>
                  <p className="text-muted-foreground mb-4">
                    Les entreprises d'e-commerce utilisent VizHome pour créer des visualisations de produits dans des
                    environnements réels, réduisant le besoin de photographies coûteuses et augmentant les taux de
                    conversion.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Création de catalogues virtuels avec des produits en contexte</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Fonctionnalité "voir dans votre espace" pour les sites web</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5" />
                      <p className="text-sm">Génération automatisée de visuels pour les campagnes marketing</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>

    <!-- CTA final -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold mb-4">Prêt à transformer vos espaces ?</h2>
            <p class="text-muted-foreground mb-8">Commencez dès aujourd'hui avec notre offre gratuite et découvrez la
              puissance de VizHome.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" as-child>
                <NuxtLink to="/auth/register">
                  Commencer gratuitement
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" as-child>
                <NuxtLink to="/pricing">
                  Voir les tarifs
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRightIcon, ImageIcon, PaintbrushIcon, EyeIcon, SunIcon, Share2Icon,
  SmartphoneIcon, BrainIcon, BoltIcon, MousePointerClickIcon, ImagePlusIcon, CloudIcon,
  CodeIcon, CheckCircleIcon, SparklesIcon
} from 'lucide-vue-next'
</script>

<style scoped></style>