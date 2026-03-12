<template>
  <div>
    <section class="relative overflow-hidden h-screen">
      <div class="absolute inset-0 bg-grid-pattern opacity-5" />
      <div class="container mx-auto px-4 py-20 md:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <Badge class="mb-4">Innovation Architecturale</Badge>
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              Vos espaces transformés par l'IA
            </h1>
            <p class="text-xl text-muted-foreground max-w-md">
              Générez des rendus 3D photoréalistes à partir de simples photos
              avec notre moteur d'IA avancé.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" as-child>
                <NuxtLink to="/auth/register">
                  Commencer gratuitement
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" as-child>
                <NuxtLink to="/features">
                  Découvrir les fonctionnalités
                </NuxtLink>
              </Button>
            </div>
            <div class="flex items-center gap-4 pt-6">
              <div class="flex -space-x-2">
                <Avatar class="border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/100?img=1" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <Avatar class="border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/100?img=2" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar class="border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/100?img=3" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
              <div class="text-sm">
                <div class="font-medium">+2,500 professionnels satisfaits</div>
                <div class="text-muted-foreground">★★★★★ (4.9/5)</div>
              </div>
            </div>
          </div>
          <div
            class="relative aspect-video rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Rendu 3D par IA"
              class="object-cover w-full h-full"
            />
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Valeurs de l'entreprise -->
    <section class="py-16 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16">Nos valeurs</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <LightbulbIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Innovation</h3>
              <p class="text-sm text-muted-foreground">
                Technologie de pointe pour révolutionner la visualisation
                architecturale
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <UsersIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Accessibilité</h3>
              <p class="text-sm text-muted-foreground">
                Démocratisation des outils 3D pour tous les professionnels
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <PaletteIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Créativité</h3>
              <p class="text-sm text-muted-foreground">
                Libération du potentiel créatif sans contraintes techniques
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <ShieldIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Fiabilité</h3>
              <p class="text-sm text-muted-foreground">
                Résultats constants et de haute qualité à chaque utilisation
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <LeafIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Écoresponsabilité</h3>
              <p class="text-sm text-muted-foreground">
                Optimisation des ressources pour un impact environnemental
                réduit
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <HeartIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Humanité</h3>
              <p class="text-sm text-muted-foreground">
                Technologie au service de l'humain, jamais l'inverse
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <HandshakeIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Collaboration</h3>
              <p class="text-sm text-muted-foreground">
                Co-création avec nos clients pour des solutions sur mesure
              </p>
            </CardContent>
          </Card>
          <Card class="text-center">
            <CardHeader class="pb-2">
              <div
                class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <BarChartIcon class="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 class="text-lg font-semibold mb-2">Excellence</h3>
              <p class="text-sm text-muted-foreground">
                Recherche constante du meilleur niveau de qualité dans chaque
                projet
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités -->
    <section class="py-20 h-screen">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Fonctionnalités clés</h2>
          <p class="text-muted-foreground">
            Des outils puissants pour transformer vos projets architecturaux
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>3D automatique</CardTitle>
              <CardDescription
                >Génération instantanée de modèles 3D</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Transformez n'importe quelle photo d'intérieur en modèle 3D
                texturé en quelques secondes, sans compétences techniques.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1" as-child>
                <NuxtLink to="/features">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Intelligence artificielle</CardTitle>
              <CardDescription
                >Algorithmes avancés de vision par ordinateur</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Notre IA analyse profondément vos espaces pour une
                reconstruction fidèle de la géométrie, des textures et de
                l'éclairage.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1" as-child>
                <NuxtLink to="/features">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Matériaux réalistes</CardTitle>
              <CardDescription
                >Bibliothèque complète de textures</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Accédez à des milliers de matériaux photoréalistes pour
                personnaliser vos rendus avec une précision inégalée.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1" as-child>
                <NuxtLink to="/features">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Vues 360°</CardTitle>
              <CardDescription>Expérience immersive complète</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Créez des visites virtuelles immersives à 360° pour une
                exploration interactive de vos espaces remodélisés.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1" as-child>
                <NuxtLink to="/features">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mobile & VR</CardTitle>
              <CardDescription>Compatibilité multiplateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Présentez vos projets sur n'importe quel appareil, du smartphone
                à la réalité virtuelle pour une immersion totale.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1" as-child>
                <NuxtLink to="/features">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Export rapide</CardTitle>
              <CardDescription
                >Formats compatibles universellement</CardDescription
              >
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">
                Exportez vos créations dans tous les formats standards de
                l'industrie pour une utilisation immédiate dans vos projets.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1" as-child>
                <NuxtLink to="/features">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Comparaison concurrence -->
    <section class="py-20 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">
            Comparatif avec la concurrence
          </h2>
          <p class="text-muted-foreground">
            Découvrez pourquoi VizHome est leader sur le marché de la
            visualisation 3D
          </p>
        </div>
        <div class="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[180px]">Fonctionnalités</TableHead>
                <TableHead class="text-center bg-primary/5">VizHome</TableHead>
                <TableHead class="text-center">mnml.ai</TableHead>
                <TableHead class="text-center">Maket</TableHead>
                <TableHead class="text-center">Coohom</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-medium"
                  >Génération 3D automatique</TableCell
                >
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-primary" />
                </TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Qualité du rendu</TableCell>
                <TableCell class="text-center">Photoréaliste</TableCell>
                <TableCell class="text-center">Moyenne</TableCell>
                <TableCell class="text-center">Haute</TableCell>
                <TableCell class="text-center">Basse</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Temps de génération</TableCell>
                <TableCell class="text-center"> < 30 sec</TableCell>
                <TableCell class="text-center">2-5 min</TableCell>
                <TableCell class="text-center">1-2 min</TableCell>
                <TableCell class="text-center">5-10 min</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Vues 360°</TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-primary" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium"
                  >Bibliothèque de matériaux</TableCell
                >
                <TableCell class="text-center">10,000+</TableCell>
                <TableCell class="text-center">2,000</TableCell>
                <TableCell class="text-center">5,000</TableCell>
                <TableCell class="text-center">1,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">Intégration VR</TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-primary" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-medium">API pour développeurs</TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-primary" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <CheckIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
                <TableCell class="text-center">
                  <XIcon class="mx-auto h-5 w-5 text-muted-foreground" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="py-20 h-screen">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Témoignages</h2>
          <p class="text-muted-foreground">
            Découvrez ce que nos clients disent de VizHome
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle class="text-base">Claire Martin</CardTitle>
                  <CardDescription>Architecte d'intérieur</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p class="italic text-muted-foreground">
                "VizHome a révolutionné ma façon de présenter mes projets à mes
                clients. En quelques secondes, je transforme une simple photo en
                visualisation 3D complète. Le gain de temps est incroyable et
                mes clients sont impressionnés par le réalisme des rendus."
              </p>
            </CardContent>
            <CardFooter>
              <div class="flex text-primary">
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=8" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle class="text-base">Marc Dubois</CardTitle>
                  <CardDescription>Promoteur immobilier</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p class="italic text-muted-foreground">
                "Grâce à VizHome, nous pouvons montrer à nos acheteurs
                potentiels à quoi ressemblera exactement leur futur appartement,
                même avant le début des travaux. La possibilité de personnaliser
                les matériaux et l'éclairage en temps réel a considérablement
                augmenté notre taux de conversion."
              </p>
            </CardContent>
            <CardFooter>
              <div class="flex text-primary">
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle class="text-base">David Rousseau</CardTitle>
                  <CardDescription>Designer d'espace</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p class="italic text-muted-foreground">
                "L'application est incroyablement intuitive. Les rendus 360°
                m'ont permis de faire visiter virtuellement des projets à des
                clients internationaux qui ne pouvaient pas se déplacer. Le
                support technique est également très réactif, une vraie valeur
                ajoutée pour mon studio."
              </p>
            </CardContent>
            <CardFooter>
              <div class="flex text-primary">
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
                <StarIcon class="w-4 h-4 fill-current" />
              </div>
            </CardFooter>
          </Card>
        </div>
        <div class="mt-10 text-center">
          <Button as-child>
            <NuxtLink to="/testimonials"> Voir tous les témoignages </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Aperçu tarifs -->
    <section class="py-20 bg-muted/30 h-screen">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-3xl font-bold mb-4">Nos offres</h2>
          <p class="text-muted-foreground">
            Des plans adaptés à tous vos besoins
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Freemium</CardTitle>
              <CardDescription>Pour débuter</CardDescription>
              <div class="mt-4">
                <span class="text-3xl font-bold">0€</span>
                <span class="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>3 projets</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>10 rendus HD par mois</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Bibliothèque standard (500 matériaux)</span>
                </li>
                <li class="flex items-center">
                  <XIcon class="h-4 w-4 mr-2 text-muted-foreground" />
                  <span class="text-muted-foreground">Export 360°</span>
                </li>
                <li class="flex items-center">
                  <XIcon class="h-4 w-4 mr-2 text-muted-foreground" />
                  <span class="text-muted-foreground">Intégration VR</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" as-child>
                <NuxtLink to="/auth/register">
                  Commencer gratuitement
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card class="border-primary relative">
            <div class="absolute top-0 right-4 transform -translate-y-1/2">
              <Badge>Populaire</Badge>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Pour les professionnels</CardDescription>
              <div class="mt-4">
                <span class="text-3xl font-bold">49€</span>
                <span class="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Projets illimités</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>50 rendus HD par mois</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Bibliothèque premium (5 000 matériaux)</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Export 360°</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Support prioritaire</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" as-child>
                <NuxtLink to="/auth/register">
                  Essayer 14 jours gratuits
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Pour les agences</CardDescription>
              <div class="mt-4">
                <span class="text-3xl font-bold">199€</span>
                <span class="text-muted-foreground">/mois</span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Projets et utilisateurs illimités</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Rendus illimités</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Bibliothèque complète (10 000+ matériaux)</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>Intégration VR complète</span>
                </li>
                <li class="flex items-center">
                  <CheckIcon class="h-4 w-4 mr-2 text-primary" />
                  <span>API développeur</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full" variant="outline" as-child>
                <NuxtLink to="/contact">
                  Contacter l'équipe commerciale
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div class="mt-10 text-center">
          <Button variant="link" as-child>
            <NuxtLink to="/pricing">
              Voir tous les détails de tarification
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div
          class="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 lg:p-16 text-center"
        >
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold mb-4">
              Prêt à transformer vos espaces ?
            </h2>
            <p class="text-muted-foreground mb-8">
              Commencez dès aujourd'hui avec notre offre gratuite et découvrez
              la puissance de la visualisation 3D par IA.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" as-child>
                <NuxtLink to="/auth/register">
                  Commencer gratuitement
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" as-child>
                <NuxtLink to="/contact"> Demander une démo </NuxtLink>
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
  LightbulbIcon,
  UsersIcon,
  PaletteIcon,
  ShieldIcon,
  LeafIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  StarIcon,
  HeartIcon,
  HandshakeIcon,
  BarChartIcon,
} from 'lucide-vue-next'
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(
      to right,
      rgba(var(--primary-rgb), 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      rgba(var(--primary-rgb), 0.1) 1px,
      transparent 1px
    );
  background-size: 30px 30px;
}
</style>
