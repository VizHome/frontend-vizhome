<template>
  <div>
    <!-- Hero -->
    <section class="py-16 px-6 border-b">
      <div
        class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h1 class="text-4xl font-bold mb-4">
            Des fonctionnalités pensées pour les créateurs
          </h1>
          <p class="text-lg text-muted-foreground mb-6">
            Découvrez comment l'intelligence artificielle de VizHome
            révolutionne la visualisation architecturale
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <Button size="lg" class="rounded-full" as-child>
              <NuxtLink to="/auth/register">Essayer gratuitement</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" class="rounded-full" as-child>
              <a :href="docsUrl" target="_blank" rel="noopener">
                Explorer la documentation
              </a>
            </Button>
          </div>
        </div>
        <div
          class="relative aspect-video rounded-xl overflow-hidden border shadow-sm bg-gradient-to-tr from-primary/5 to-primary/10"
        >
          <img
            src="/images/docs/projet_1.png"
            alt="Interface VizHome"
            class="object-cover w-full h-full mix-blend-overlay"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="bg-background/80 backdrop-blur-sm rounded-xl border shadow-sm p-5 max-w-xs"
            >
              <div class="flex items-center gap-3 mb-2">
                <div class="bg-primary/10 p-2 rounded-full">
                  <SparklesIcon class="h-4 w-4 text-primary" />
                </div>
                <h3 class="font-medium text-sm">IA générative</h3>
              </div>
              <p class="text-xs text-muted-foreground">
                Transformez vos photos en rendus 3D photoréalistes en quelques
                secondes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités principales -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold mb-2">Fonctionnalités principales</h2>
          <p class="text-muted-foreground">
            Des outils puissants pour visualiser et transformer vos espaces
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="feat in mainFeatures"
            :key="feat.title"
            class="rounded-xl border shadow-sm overflow-hidden"
          >
            <CardHeader>
              <div
                class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"
              >
                <component :is="feat.icon" class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">{{ feat.title }}</CardTitle>
              <CardDescription>{{ feat.subtitle }}</CardDescription>
            </CardHeader>
            <div class="px-6">
              <img
                src="/images/docs/projet_1.png"
                :alt="feat.title"
                class="rounded-lg h-36 w-full object-cover"
              />
            </div>
            <CardContent class="pt-4">
              <p class="text-sm text-muted-foreground">{{ feat.desc }}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1 -ml-2" as-child>
                <NuxtLink :to="feat.href">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- IA -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div
        class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      >
        <div>
          <h2 class="text-2xl font-bold mb-4">
            La puissance de l'IA au service de votre créativité
          </h2>
          <p class="text-muted-foreground mb-6">
            Notre technologie propriétaire combine plusieurs réseaux de neurones
            pour une compréhension complète de vos espaces.
          </p>
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem
              v-for="item in aiItems"
              :key="item.title"
              :value="item.title"
            >
              <AccordionTrigger>{{ item.title }}</AccordionTrigger>
              <AccordionContent class="text-muted-foreground">{{
                item.content
              }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div class="relative">
          <div
            class="bg-gradient-to-tr from-primary/5 to-primary/10 rounded-xl p-4 border"
          >
            <img
              src="/images/docs/projet_1.png"
              alt="Technologie IA VizHome"
              class="rounded-lg shadow-sm w-full"
            />
          </div>
          <div
            class="absolute -bottom-4 -left-4 bg-background rounded-xl shadow-sm border p-4"
          >
            <div class="flex items-center gap-2 mb-1">
              <div class="bg-primary/10 p-1.5 rounded-full">
                <BrainIcon class="h-4 w-4 text-primary" />
              </div>
              <h3 class="font-medium text-sm">Deep Learning</h3>
            </div>
            <p class="text-xs text-muted-foreground max-w-[220px]">
              Notre IA s'améliore continuellement grâce à des millions de
              rendus.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold mb-2">Pourquoi choisir VizHome ?</h2>
          <p class="text-muted-foreground">
            Nos avantages qui nous distinguent de la concurrence
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            v-for="adv in advantages"
            :key="adv.title"
            class="rounded-xl border shadow-sm"
            :class="adv.wide ? 'md:col-span-2' : ''"
          >
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-base">
                <component :is="adv.icon" class="h-4 w-4 text-primary" />
                {{ adv.title }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">{{ adv.desc }}</p>
              <div
                v-if="adv.code"
                class="bg-muted rounded-lg p-3 mt-3 overflow-auto text-xs font-mono"
              >
                <pre>{{ adv.code }}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Cas d'utilisation -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold mb-2">Cas d'utilisation</h2>
          <p class="text-muted-foreground">
            Comment nos clients utilisent VizHome dans leur domaine
          </p>
        </div>
        <Tabs default-value="architecture" class="w-full">
          <TabsList class="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="immobilier">Immobilier</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          </TabsList>
          <TabsContent
            v-for="useCase in useCases"
            :key="useCase.value"
            :value="useCase.value"
          >
            <Card class="rounded-xl border shadow-sm overflow-hidden">
              <div class="flex flex-col sm:flex-row">
                <div class="sm:w-2/5 bg-muted min-h-[160px]">
                  <img
                    src="/images/docs/projet_1.png"
                    :alt="useCase.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="sm:w-3/5 p-6">
                  <h3 class="font-bold mb-2">{{ useCase.title }}</h3>
                  <p class="text-sm text-muted-foreground mb-4">
                    {{ useCase.desc }}
                  </p>
                  <ul class="space-y-1.5">
                    <li
                      v-for="point in useCase.points"
                      :key="point"
                      class="flex items-start gap-2 text-sm"
                    >
                      <CheckCircleIcon
                        class="h-4 w-4 text-primary mt-0.5 shrink-0"
                      />
                      {{ point }}
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 px-6">
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-primary/5 rounded-2xl border p-10">
          <h2 class="text-2xl font-bold mb-3">
            Prêt à transformer vos espaces ?
          </h2>
          <p class="text-muted-foreground mb-6">
            Commencez dès aujourd'hui avec notre offre gratuite.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" class="rounded-full" as-child>
              <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" class="rounded-full" as-child>
              <NuxtLink to="/pricing">Voir les tarifs</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// URL du site docs séparé (projet docs-vizhome)
import {
  ChevronRightIcon,
  ImageIcon,
  PaintbrushIcon,
  EyeIcon,
  SunIcon,
  Share2Icon,
  SmartphoneIcon,
  BrainIcon,
  BoltIcon,
  MousePointerClickIcon,
  ImagePlusIcon,
  CloudIcon,
  CodeIcon,
  CheckCircleIcon,
  SparklesIcon,
} from 'lucide-vue-next'

const config = useRuntimeConfig()
const docsUrl = (config.public.docsUrl as string) || 'http://localhost:3001'

useSeo({
  title: 'Fonctionnalités',
  description:
    'Vue d\'ensemble des outils VizHome : génération 3D par IA, éclairage intelligent, matériaux PBR, vues 360°, collaboration et accès mobile.',
  ogImage: '/images/generate/image_generate.png',
})

const mainFeatures = [
  {
    title: 'Génération 3D automatique',
    subtitle: 'Transformation instantanée',
    desc: 'Notre IA analyse vos photos et génère automatiquement un modèle 3D complet en quelques secondes.',
    icon: ImageIcon,
    href: '/features/auto-3d',
  },
  {
    title: 'Bibliothèque de matériaux',
    subtitle: '10 000+ textures',
    desc: 'Accédez à une vaste bibliothèque de matériaux et textures de haute qualité pour personnaliser vos rendus.',
    icon: PaintbrushIcon,
    href: '/features/materials',
  },
  {
    title: 'Vues 360° immersives',
    subtitle: 'Expérience interactive',
    desc: 'Créez des visites virtuelles à 360° pour une immersion totale et un moyen percutant de présenter vos projets.',
    icon: EyeIcon,
    href: '/features/360-views',
  },
  {
    title: 'Éclairage intelligent',
    subtitle: 'Contrôles avancés',
    desc: "Notre technologie simule avec précision différentes conditions d'éclairage, naturelles et artificielles.",
    icon: SunIcon,
    href: '/features/intelligent-lighting',
  },
  {
    title: 'Partage et collaboration',
    subtitle: 'Outils collaboratifs',
    desc: 'Partagez facilement vos projets avec vos clients ou collaborateurs et travaillez ensemble en temps réel.',
    icon: Share2Icon,
    href: '/features/collaboration',
  },
  {
    title: 'Applications mobiles',
    subtitle: 'Tous vos appareils',
    desc: 'Utilisez VizHome où que vous soyez grâce à nos applications iOS et Android optimisées pour mobile.',
    icon: SmartphoneIcon,
    href: '/features/mobile-apps',
  },
]

const aiItems = [
  {
    title: 'Reconnaissance spatiale',
    content:
      "Notre IA analyse la géométrie de l'espace, identifie les surfaces, les profondeurs et les proportions pour créer un modèle 3D précis, même à partir d'une seule photo.",
  },
  {
    title: 'Analyse des matériaux',
    content:
      'Le système détecte et classifie automatiquement les différents matériaux présents dans votre espace, puis applique des textures réalistes qui reproduisent fidèlement leurs propriétés physiques.',
  },
  {
    title: "Simulation d'éclairage",
    content:
      "Notre moteur d'IA analyse les sources de lumière existantes et simule précisément leur comportement, y compris les réflexions, réfractions et ombres.",
  },
  {
    title: 'Génération contextuelle',
    content:
      "L'IA comprend le contexte architectural et peut suggérer des améliorations ou compléter des parties manquantes de manière cohérente avec le style et la fonction de l'espace.",
  },
]

const advantages = [
  {
    title: 'Vitesse incomparable',
    icon: BoltIcon,
    desc: "Notre moteur de rendu est jusqu'à 10 fois plus rapide que les solutions traditionnelles. Obtenez des résultats en quelques secondes plutôt qu'en heures.",
  },
  {
    title: "Simplicité d'utilisation",
    icon: MousePointerClickIcon,
    desc: 'Interface intuitive qui ne nécessite aucune expertise technique. Si vous savez prendre une photo, vous savez utiliser VizHome.',
  },
  {
    title: 'Qualité exceptionnelle',
    icon: ImagePlusIcon,
    desc: 'Rendus photoréalistes de qualité professionnelle avec une précision inégalée des matériaux, textures et éclairages.',
  },
  {
    title: 'Solution cloud',
    icon: CloudIcon,
    desc: "Aucun matériel coûteux requis. Notre infrastructure cloud gère tout le traitement, vous permettant de travailler de n'importe où.",
  },
  {
    title: 'API complète pour développeurs',
    icon: CodeIcon,
    wide: true,
    desc: 'Intégrez la puissance de VizHome directement dans vos applications et workflows grâce à notre API RESTful.',
    code: 'curl -X POST https://api.vizhome.fr/v1/renders \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -F "image=@room.jpg" \\\n  -F \'options={"quality":"high","format":"jpg"}\'',
  },
]

const useCases = [
  {
    value: 'architecture',
    title: 'Pour les architectes',
    desc: 'Les architectes utilisent VizHome pour présenter rapidement des concepts à leurs clients, transformer des croquis en visualisations 3D et explorer différentes options de design.',
    points: [
      'Présentation de concepts en temps réel lors des réunions clients',
      'Exploration rapide de multiples options de design',
      'Intégration avec les logiciels de CAO existants',
    ],
  },
  {
    value: 'immobilier',
    title: "Pour les professionnels de l'immobilier",
    desc: 'Les agents immobiliers utilisent VizHome pour créer des visites virtuelles, montrer le potentiel des propriétés vides ou à rénover.',
    points: [
      'Visualisation de biens en construction ou sur plan',
      'Staging virtuel de propriétés vides',
      "Création de visites virtuelles 360° pour les plateformes d'annonces",
    ],
  },
  {
    value: 'design',
    title: "Pour les designers d'intérieur",
    desc: "Les designers d'intérieur utilisent VizHome pour tester différentes combinaisons de couleurs, matériaux et mobilier.",
    points: [
      'Expérimentation avec différentes palettes de couleurs et matériaux',
      "Visualisation de meubles et d'accessoires dans l'espace réel",
      'Présentation de concepts multiples aux clients',
    ],
  },
  {
    value: 'ecommerce',
    title: "Pour l'e-commerce",
    desc: "Les entreprises d'e-commerce utilisent VizHome pour créer des visualisations de produits dans des environnements réels.",
    points: [
      'Création de catalogues virtuels avec des produits en contexte',
      'Fonctionnalité "voir dans votre espace" pour les sites web',
      'Génération automatisée de visuels pour les campagnes marketing',
    ],
  },
]
</script>
