<template>
  <div>
    <!-- Hero -->
    <section class="py-20 px-6 border-b">
      <div
        class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div class="space-y-6">
          <Badge class="rounded-full">Innovation Architecturale</Badge>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
            Vos espaces transformés par l'IA
          </h1>
          <p class="text-lg text-muted-foreground">
            Générez des rendus 3D photoréalistes à partir de simples photos avec
            notre moteur d'IA avancé.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="lg" class="rounded-full" as-child>
              <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" class="rounded-full" as-child>
              <NuxtLink to="/features">Découvrir les fonctionnalités</NuxtLink>
            </Button>
          </div>
          <div class="flex items-center gap-4 pt-2">
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
          class="relative aspect-video rounded-xl overflow-hidden border shadow-sm"
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
    </section>

    <!-- Nos valeurs -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-2xl font-bold mb-10 text-center">Nos valeurs</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            v-for="val in values"
            :key="val.label"
            class="text-center rounded-xl border shadow-sm"
          >
            <CardHeader class="pb-2">
              <div
                class="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
              >
                <component :is="val.icon" class="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent class="pt-0">
              <h3 class="font-semibold mb-1 text-sm">{{ val.label }}</h3>
              <p class="text-xs text-muted-foreground">{{ val.desc }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités clés -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold mb-2">Fonctionnalités clés</h2>
          <p class="text-muted-foreground">
            Des outils puissants pour transformer vos projets architecturaux
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="feat in features"
            :key="feat.title"
            class="rounded-xl border shadow-sm"
          >
            <CardHeader>
              <CardTitle class="text-base">{{ feat.title }}</CardTitle>
              <CardDescription>{{ feat.subtitle }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">{{ feat.desc }}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" class="gap-1 -ml-2" as-child>
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

    <!-- Comparatif -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold mb-2">
            Comparatif avec la concurrence
          </h2>
          <p class="text-muted-foreground">
            Découvrez pourquoi VizHome est leader sur le marché
          </p>
        </div>
        <div class="rounded-xl border shadow-sm overflow-x-auto bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[180px]">Fonctionnalités</TableHead>
                <TableHead class="text-center bg-primary/5 font-semibold"
                  >VizHome</TableHead
                >
                <TableHead class="text-center">mnml.ai</TableHead>
                <TableHead class="text-center">Maket</TableHead>
                <TableHead class="text-center">Coohom</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in comparisonRows" :key="row.label">
                <TableCell class="font-medium">{{ row.label }}</TableCell>
                <TableCell class="text-center bg-primary/5">
                  <CheckIcon
                    v-if="row.vizhome === true"
                    class="mx-auto h-4 w-4 text-primary"
                  />
                  <XIcon
                    v-else-if="row.vizhome === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="font-medium text-primary text-sm">{{
                    row.vizhome
                  }}</span>
                </TableCell>
                <TableCell class="text-center text-sm">
                  <CheckIcon
                    v-if="row.mnml === true"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <XIcon
                    v-else-if="row.mnml === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="text-muted-foreground">{{
                    row.mnml
                  }}</span>
                </TableCell>
                <TableCell class="text-center text-sm">
                  <CheckIcon
                    v-if="row.maket === true"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <XIcon
                    v-else-if="row.maket === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="text-muted-foreground">{{
                    row.maket
                  }}</span>
                </TableCell>
                <TableCell class="text-center text-sm">
                  <CheckIcon
                    v-if="row.coohom === true"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <XIcon
                    v-else-if="row.coohom === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="text-muted-foreground">{{
                    row.coohom
                  }}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold mb-2">Témoignages</h2>
          <p class="text-muted-foreground">
            Découvrez ce que nos clients disent de VizHome
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            v-for="t in topTestimonials"
            :key="t.name"
            class="rounded-xl border shadow-sm"
          >
            <CardHeader>
              <div class="flex items-center gap-3">
                <Avatar>
                  <AvatarImage :src="t.avatar" />
                  <AvatarFallback>{{ t.initials }}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle class="text-sm font-medium">{{
                    t.name
                  }}</CardTitle>
                  <CardDescription class="text-xs">{{
                    t.role
                  }}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-sm italic text-muted-foreground">
                "{{ t.quote }}"
              </p>
            </CardContent>
            <CardFooter>
              <div class="flex text-amber-400">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="w-3.5 h-3.5 fill-current"
                />
              </div>
            </CardFooter>
          </Card>
        </div>
        <div class="mt-8 text-center">
          <Button variant="outline" class="rounded-full" as-child>
            <NuxtLink to="/testimonials">Voir tous les témoignages</NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- Aperçu tarifs -->
    <section class="py-16 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="text-2xl font-bold mb-2">Nos offres</h2>
          <p class="text-muted-foreground">
            Des plans adaptés à tous vos besoins
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card class="rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle>Freemium</CardTitle>
              <CardDescription>Pour débuter</CardDescription>
              <div class="mt-3">
                <span class="text-3xl font-bold">0€</span
                ><span class="text-muted-foreground text-sm">/mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >3 projets</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >10 rendus HD/mois</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >500 matériaux</span
                  >
                </li>
                <li class="flex items-center gap-2 text-muted-foreground">
                  <XIcon class="h-4 w-4 shrink-0" /><span>Export 360°</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" as-child
                ><NuxtLink to="/auth/register">Commencer</NuxtLink></Button
              >
            </CardFooter>
          </Card>

          <Card class="rounded-xl border-primary border-2 shadow-sm relative">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge class="rounded-full">Populaire</Badge>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Pour les professionnels</CardDescription>
              <div class="mt-3">
                <span class="text-3xl font-bold">49€</span
                ><span class="text-muted-foreground text-sm">/mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >Projets illimités</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >50 rendus HD/mois</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >5 000 matériaux</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >Export 360°</span
                  >
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" as-child
                ><NuxtLink to="/auth/register"
                  >Essayer 14 jours</NuxtLink
                ></Button
              >
            </CardFooter>
          </Card>

          <Card class="rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Pour les agences</CardDescription>
              <div class="mt-3">
                <span class="text-3xl font-bold">199€</span
                ><span class="text-muted-foreground text-sm">/mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >Utilisateurs illimités</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >Rendus illimités</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >10 000+ matériaux</span
                  >
                </li>
                <li class="flex items-center gap-2">
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span
                    >API développeur</span
                  >
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" variant="outline" as-child
                ><NuxtLink to="/contact">Contacter l'équipe</NuxtLink></Button
              >
            </CardFooter>
          </Card>
        </div>
        <div class="mt-6 text-center">
          <Button variant="link" as-child>
            <NuxtLink to="/pricing"
              >Voir tous les détails de tarification</NuxtLink
            >
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
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
              <NuxtLink to="/contact">Demander une démo</NuxtLink>
            </Button>
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
  HeartIcon,
  HandshakeIcon,
  BarChartIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  StarIcon,
} from 'lucide-vue-next'

definePageMeta({ layout: 'sidebar' })

const values = [
  {
    label: 'Innovation',
    desc: 'Technologie de pointe pour la visualisation',
    icon: LightbulbIcon,
  },
  {
    label: 'Accessibilité',
    desc: 'Outils 3D pour tous les professionnels',
    icon: UsersIcon,
  },
  {
    label: 'Créativité',
    desc: 'Libération du potentiel créatif',
    icon: PaletteIcon,
  },
  {
    label: 'Fiabilité',
    desc: 'Résultats constants et haute qualité',
    icon: ShieldIcon,
  },
  {
    label: 'Écoresponsabilité',
    desc: 'Impact environnemental réduit',
    icon: LeafIcon,
  },
  {
    label: 'Humanité',
    desc: "Technologie au service de l'humain",
    icon: HeartIcon,
  },
  {
    label: 'Collaboration',
    desc: 'Co-création avec nos clients',
    icon: HandshakeIcon,
  },
  {
    label: 'Excellence',
    desc: 'Meilleur niveau de qualité',
    icon: BarChartIcon,
  },
]

const features = [
  {
    title: '3D automatique',
    subtitle: 'Génération instantanée',
    desc: "Transformez n'importe quelle photo d'intérieur en modèle 3D texturé en quelques secondes.",
  },
  {
    title: 'Intelligence artificielle',
    subtitle: 'Algorithmes avancés',
    desc: 'Notre IA analyse vos espaces pour une reconstruction fidèle de la géométrie et des textures.',
  },
  {
    title: 'Matériaux réalistes',
    subtitle: 'Bibliothèque complète',
    desc: 'Accédez à des milliers de matériaux photoréalistes pour personnaliser vos rendus.',
  },
  {
    title: 'Vues 360°',
    subtitle: 'Expérience immersive',
    desc: 'Créez des visites virtuelles immersives pour une exploration interactive de vos espaces.',
  },
  {
    title: 'Mobile & VR',
    subtitle: 'Compatibilité multiplateforme',
    desc: "Présentez vos projets sur n'importe quel appareil, du smartphone à la réalité virtuelle.",
  },
  {
    title: 'Export rapide',
    subtitle: 'Formats universels',
    desc: "Exportez dans tous les formats standards de l'industrie pour une utilisation immédiate.",
  },
]

const comparisonRows = [
  {
    label: 'Génération 3D automatique',
    vizhome: true,
    mnml: true,
    maket: false,
    coohom: true,
  },
  {
    label: 'Qualité du rendu',
    vizhome: 'Photoréaliste',
    mnml: 'Moyenne',
    maket: 'Haute',
    coohom: 'Basse',
  },
  {
    label: 'Temps de génération',
    vizhome: '< 30 sec',
    mnml: '2-5 min',
    maket: '1-2 min',
    coohom: '5-10 min',
  },
  {
    label: 'Vues 360°',
    vizhome: true,
    mnml: false,
    maket: true,
    coohom: false,
  },
  {
    label: 'Bibliothèque matériaux',
    vizhome: '10,000+',
    mnml: '2,000',
    maket: '5,000',
    coohom: '1,000',
  },
  {
    label: 'Intégration VR',
    vizhome: true,
    mnml: false,
    maket: false,
    coohom: false,
  },
  {
    label: 'API développeur',
    vizhome: true,
    mnml: false,
    maket: true,
    coohom: false,
  },
]

const topTestimonials = [
  {
    name: 'Claire Martin',
    role: "Architecte d'intérieur",
    initials: 'CM',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote:
      'En quelques secondes, je transforme une simple photo en visualisation 3D complète. Le gain de temps est incroyable.',
  },
  {
    name: 'Marc Dubois',
    role: 'Promoteur immobilier',
    initials: 'MD',
    avatar: 'https://i.pravatar.cc/150?img=8',
    quote:
      "La personnalisation des matériaux et de l'éclairage en temps réel a considérablement augmenté notre taux de conversion.",
  },
  {
    name: 'David Rousseau',
    role: "Designer d'espace",
    initials: 'DR',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote:
      "Les rendus 360° m'ont permis de faire visiter virtuellement des projets à des clients internationaux.",
  },
]
</script>
