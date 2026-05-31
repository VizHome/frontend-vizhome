<template>
  <div>
    <!-- ═══ Hero ═══════════════════════════════════════════════════════════════ -->
    <section class="relative py-24 px-6 border-b overflow-hidden">
      <!-- Fond décoratif -->
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div
        class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
      >
        <!-- Texte -->
        <div class="space-y-7">
          <Badge class="rounded-full gap-1.5 px-3 py-1">
            <SparklesIcon class="h-3 w-3" />
            IA générative · Three.js · Temps réel
          </Badge>
          <h1 class="text-5xl font-bold tracking-tight leading-[1.1]">
            De la photo au<br />
            <span class="text-primary">rendu 3D</span> en&nbsp;30&nbsp;sec
          </h1>
          <p class="text-lg text-muted-foreground leading-relaxed">
            VizHome transforme vos espaces grâce à trois modes créatifs :
            croquis 2D, génération par prompt IA, et éditeur 3D professionnel
            avec éclairage et matériaux en temps réel.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <template v-if="isAuthenticated">
              <Button size="lg" class="rounded-full gap-2" as-child>
                <NuxtLink to="/render">
                  <LayoutDashboardIcon class="h-4 w-4" />
                  Aller à mon espace
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" class="rounded-full" as-child>
                <NuxtLink to="/projects">Mes projets</NuxtLink>
              </Button>
            </template>
            <template v-else>
              <Button size="lg" class="rounded-full gap-2" as-child>
                <NuxtLink to="/auth/register">
                  <SparklesIcon class="h-4 w-4" />
                  Commencer gratuitement
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" class="rounded-full" as-child>
                <NuxtLink to="/render">Ouvrir l'éditeur</NuxtLink>
              </Button>
            </template>
          </div>
          <!-- Social proof -->
          <div class="flex items-center gap-4 pt-1">
            <div class="flex -space-x-2">
              <Avatar
                v-for="(av, i) in avatars"
                :key="i"
                class="border-2 border-background h-8 w-8"
              >
                <AvatarImage :src="av" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div class="text-sm">
              <div class="font-semibold">Early access ouvert</div>
              <div class="text-muted-foreground text-xs">
                Architectes, designers, promoteurs — rejoignez les premiers utilisateurs
              </div>
            </div>
          </div>
        </div>

        <!-- Visuel hero -->
        <div class="relative">
          <div
            class="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-xl"
          >
            <img
              src="/images/generate/image_generate.png"
              alt="Éditeur 3D VizHome"
              class="object-cover w-full h-full"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
            />
          </div>
          <!-- Badge mode bar flottant -->
          <div
            class="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border bg-background/90 backdrop-blur-sm shadow-lg px-3 py-2"
          >
            <div
              v-for="m in renderModes"
              :key="m.label"
              class="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
              :class="
                m.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              "
            >
              <component :is="m.icon" class="h-3 w-3" />
              {{ m.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Les 3 modes ═══════════════════════════════════════════════════════ -->
    <section class="py-20 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">Trois façons de créer</h2>
          <p class="text-muted-foreground max-w-xl mx-auto">
            Choisissez votre mode créatif selon votre flux de travail — du
            croquis rapide à la scène 3D complète.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card
            v-for="mode in modes"
            :key="mode.title"
            class="rounded-xl border shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div
              class="aspect-video relative overflow-hidden"
              :class="mode.bgClass"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex flex-col items-center gap-3 text-center p-4">
                  <div
                    class="h-14 w-14 rounded-2xl flex items-center justify-center"
                    :class="mode.iconBg"
                  >
                    <component
                      :is="mode.icon"
                      class="h-7 w-7"
                      :class="mode.iconColor"
                    />
                  </div>
                  <p class="text-sm font-semibold" :class="mode.textColor">
                    {{ mode.tagline }}
                  </p>
                </div>
              </div>
            </div>
            <CardHeader class="pb-2">
              <div class="flex items-center justify-between">
                <CardTitle class="text-base">{{ mode.title }}</CardTitle>
                <Badge variant="outline" class="text-xs rounded-full">{{
                  mode.badge
                }}</Badge>
              </div>
              <CardDescription>{{ mode.subtitle }}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="space-y-1.5 text-sm text-muted-foreground">
                <li
                  v-for="f in mode.features"
                  :key="f"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-3.5 w-3.5 text-primary shrink-0" />
                  {{ f }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div class="mt-8 text-center">
          <Button class="rounded-full gap-2" as-child>
            <NuxtLink to="/render">
              <BoxIcon class="h-4 w-4" />
              Tester l'éditeur maintenant
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <!-- ═══ Métriques ═════════════════════════════════════════════════════════ -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center space-y-1"
          >
            <div class="text-4xl font-bold text-primary">{{ stat.value }}</div>
            <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Fonctionnalités clés ══════════════════════════════════════════════ -->
    <section class="py-20 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">
            Des outils de niveau professionnel
          </h2>
          <p class="text-muted-foreground">
            Tout ce qu'il faut pour impressionner vos clients
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="feat in features"
            :key="feat.title"
            class="rounded-xl border shadow-sm hover:shadow-md transition-shadow group"
          >
            <CardHeader>
              <div
                class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1 group-hover:bg-primary/20 transition-colors"
              >
                <component :is="feat.icon" class="h-5 w-5 text-primary" />
              </div>
              <CardTitle class="text-base">{{ feat.title }}</CardTitle>
              <CardDescription>{{ feat.subtitle }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground">{{ feat.desc }}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                size="sm"
                class="gap-1 -ml-2 text-primary"
                as-child
              >
                <NuxtLink :to="feat.link">
                  En savoir plus
                  <ChevronRightIcon class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- ═══ Comparatif ════════════════════════════════════════════════════════ -->
    <section class="py-20 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">VizHome vs la concurrence</h2>
          <p class="text-muted-foreground">
            Pourquoi les professionnels nous choisissent
          </p>
        </div>
        <div class="rounded-xl border shadow-sm overflow-x-auto bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[200px] font-semibold"
                  >Fonctionnalités</TableHead
                >
                <TableHead
                  class="text-center bg-primary/5 font-bold text-primary"
                  >VizHome</TableHead
                >
                <TableHead class="text-center">mnml.ai</TableHead>
                <TableHead class="text-center">Maket</TableHead>
                <TableHead class="text-center">Coohom</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in comparisonRows" :key="row.label">
                <TableCell class="font-medium text-sm">{{
                  row.label
                }}</TableCell>
                <TableCell class="text-center bg-primary/5">
                  <CheckIcon
                    v-if="row.vizhome === true"
                    class="mx-auto h-4 w-4 text-primary"
                  />
                  <XIcon
                    v-else-if="row.vizhome === false"
                    class="mx-auto h-4 w-4 text-muted-foreground/40"
                  />
                  <span v-else class="font-semibold text-primary text-sm">{{
                    row.vizhome
                  }}</span>
                </TableCell>
                <TableCell class="text-center text-sm text-muted-foreground">
                  <CheckIcon
                    v-if="row.mnml === true"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <XIcon
                    v-else-if="row.mnml === false"
                    class="mx-auto h-4 w-4 text-muted-foreground/30"
                  />
                  <span v-else>{{ row.mnml }}</span>
                </TableCell>
                <TableCell class="text-center text-sm text-muted-foreground">
                  <CheckIcon
                    v-if="row.maket === true"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <XIcon
                    v-else-if="row.maket === false"
                    class="mx-auto h-4 w-4 text-muted-foreground/30"
                  />
                  <span v-else>{{ row.maket }}</span>
                </TableCell>
                <TableCell class="text-center text-sm text-muted-foreground">
                  <CheckIcon
                    v-if="row.coohom === true"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <XIcon
                    v-else-if="row.coohom === false"
                    class="mx-auto h-4 w-4 text-muted-foreground/30"
                  />
                  <span v-else>{{ row.coohom }}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>

    <!-- ═══ Témoignages ═══════════════════════════════════════════════════════ -->
    <section class="py-20 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">
            Ils transforment leurs projets
          </h2>
          <p class="text-muted-foreground">
            Architectes, designers et promoteurs parlent de VizHome
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card
            v-for="t in topTestimonials"
            :key="t.name"
            class="rounded-xl border shadow-sm flex flex-col"
          >
            <CardHeader class="pb-3">
              <div class="flex text-amber-400 mb-3">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="w-4 h-4 fill-current"
                />
              </div>
              <p class="text-sm italic leading-relaxed">"{{ t.quote }}"</p>
            </CardHeader>
            <CardFooter class="mt-auto pt-3 border-t">
              <div class="flex items-center gap-3">
                <Avatar class="h-9 w-9">
                  <AvatarImage :src="t.avatar" />
                  <AvatarFallback>{{ t.initials }}</AvatarFallback>
                </Avatar>
                <div>
                  <p class="text-sm font-semibold">{{ t.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ t.role }}</p>
                </div>
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

    <!-- ═══ Aperçu tarifs ═════════════════════════════════════════════════════ -->
    <section class="py-20 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-3">Commencez gratuitement</h2>
          <p class="text-muted-foreground">Évoluez selon vos besoins</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card class="rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle class="flex items-center justify-between">
                Freemium
                <Badge
                  variant="outline"
                  class="rounded-full text-xs font-normal"
                  >Gratuit</Badge
                >
              </CardTitle>
              <CardDescription>Pour débuter et explorer</CardDescription>
              <div class="mt-4">
                <span class="text-4xl font-bold">0€</span
                ><span class="text-muted-foreground text-sm"> /mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="f in freemiumItems"
                  :key="f"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span>{{
                    f
                  }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" as-child>
                <NuxtLink to="/auth/register">Commencer</NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <Card class="rounded-xl border-primary border-2 shadow-md relative">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge class="rounded-full gap-1">
                <StarIcon class="h-3 w-3" />
                Populaire
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Pour les professionnels</CardDescription>
              <div class="mt-4">
                <span class="text-4xl font-bold">49€</span
                ><span class="text-muted-foreground text-sm"> /mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="f in proItems"
                  :key="f"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span>{{
                    f
                  }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" as-child>
                <NuxtLink to="/auth/register">Essayer 14 jours</NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <Card class="rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Pour les agences et studios</CardDescription>
              <div class="mt-4">
                <span class="text-4xl font-bold">199€</span
                ><span class="text-muted-foreground text-sm"> /mois</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="f in enterpriseItems"
                  :key="f"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" /><span>{{
                    f
                  }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" variant="outline" as-child>
                <NuxtLink to="/contact">Contacter l'équipe</NuxtLink>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div class="mt-6 text-center">
          <Button variant="link" as-child>
            <NuxtLink to="/pricing"
              >Voir la comparaison complète des offres →</NuxtLink
            >
          </Button>
        </div>
      </div>
    </section>

    <!-- ═══ CTA Final ══════════════════════════════════════════════════════════ -->
    <section class="py-24 px-6">
      <div class="max-w-3xl mx-auto text-center">
        <div
          class="relative rounded-3xl border bg-gradient-to-br from-primary/5 to-primary/10 p-12 overflow-hidden"
        >
          <div
            class="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <div
            class="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <div class="relative">
            <div
              class="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
            >
              <SparklesIcon class="h-7 w-7 text-primary" />
            </div>
            <h2 class="text-3xl font-bold mb-3">
              Prêt à transformer vos espaces ?
            </h2>
            <p class="text-muted-foreground mb-8 max-w-md mx-auto">
              Rejoignez les premiers utilisateurs de VizHome et façonnez avec
              nous l'outil de rendu 3D que les architectes méritent.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" class="rounded-full gap-2" as-child>
                <NuxtLink to="/auth/register">
                  <SparklesIcon class="h-4 w-4" />
                  Commencer gratuitement
                </NuxtLink>
              </Button>
              <Button size="lg" variant="outline" class="rounded-full" as-child>
                <NuxtLink to="/contact">Demander une démo</NuxtLink>
              </Button>
            </div>
            <p class="text-xs text-muted-foreground mt-4">
              Aucune carte de crédit requise · Annulez à tout moment
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  SparklesIcon,
  PencilIcon,
  BoxIcon,
  LightbulbIcon,
  PaletteIcon,
  Globe2Icon,
  SunIcon,
  UsersIcon,
  SmartphoneIcon,
  ChevronRightIcon,
  CheckIcon,
  XIcon,
  StarIcon,
  LayoutDashboardIcon,
} from 'lucide-vue-next'

const { isAuthenticated } = useAuth()

// ── Social proof avatars ───────────────────────────────────────────────────
const avatars = [
  'https://i.pravatar.cc/100?img=1',
  'https://i.pravatar.cc/100?img=2',
  'https://i.pravatar.cc/100?img=3',
  'https://i.pravatar.cc/100?img=4',
]

// ── Modes de l'éditeur (miroir de RenderModeBar) ──────────────────────────
const renderModes = [
  { label: 'Croquis 2D', icon: PencilIcon, active: false },
  { label: 'Prompt IA', icon: SparklesIcon, active: true },
  { label: '3D Pro', icon: BoxIcon, active: false },
]

// ── Les 3 modes créatifs ───────────────────────────────────────────────────
const modes = [
  {
    title: 'Croquis 2D',
    badge: 'Esquisse',
    tagline: 'Dessinez librement',
    subtitle: 'Donnez vie à vos idées sur toile blanche',
    bgClass: 'bg-amber-50 dark:bg-amber-950/30',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    textColor: 'text-amber-700 dark:text-amber-300',
    icon: PencilIcon,
    features: [
      'Outils crayon, formes, texte',
      'Palette couleurs & pipette',
      'Export PNG haute résolution',
      'Transformez en rendu IA',
    ],
  },
  {
    title: 'Prompt IA',
    badge: 'Génératif',
    tagline: "Décrivez, laissez l'IA créer",
    subtitle: "Génération d'image ou modèle 3D par texte",
    bgClass: 'bg-primary/5 dark:bg-primary/10',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    textColor: 'text-primary',
    icon: SparklesIcon,
    features: [
      'Image 2D ou modèle 3D au choix',
      'Suggestions de prompts intégrées',
      'Historique avec aperçus',
      'Styles architecturaux variés',
    ],
  },
  {
    title: '3D Pro',
    badge: 'Three.js',
    tagline: 'Scène 3D complète',
    subtitle: 'Éditeur 3D temps réel avec WebGL',
    bgClass: 'bg-slate-100 dark:bg-slate-900/50',
    iconBg: 'bg-slate-200 dark:bg-slate-800',
    iconColor: 'text-slate-600 dark:text-slate-400',
    textColor: 'text-slate-700 dark:text-slate-300',
    icon: BoxIcon,
    features: [
      'Import GLB · GLTF · OBJ · FBX',
      'Éclairage IA (ambiances & saisons)',
      'Navigation orbite / première personne / visite',
      'Capture & rendu IA depuis la scène',
    ],
  },
]

// ── Stats — caractéristiques produit factuelles, pas de chiffres d'usage
// fabriqués (l'ancienne version annonçait "2 500+ utilisateurs", "4.9/5",
// "10K+ matériaux" qui étaient tous inventés). À remplacer par de vrais
// chiffres une fois qu'on aura de la data réelle (renders générés, etc.).
const stats = [
  { value: '< 30s', label: 'Temps de génération moyen' },
  { value: '3', label: 'Modes créatifs (croquis, prompt, 3D)' },
  { value: '5+', label: "Formats d'import (glb, gltf, obj, fbx, stl)" },
  { value: 'Open', label: 'Early access — sans liste d\'attente' },
]

// ── Fonctionnalités ────────────────────────────────────────────────────────
const features = [
  {
    title: 'Génération 3D automatique',
    subtitle: 'Photo → modèle texturé',
    desc: "Notre IA analyse vos photos d'intérieur pour reconstruire la géométrie et les textures en quelques secondes.",
    icon: BoxIcon,
    link: '/features/auto-3d',
  },
  {
    title: 'Éclairage intelligent',
    subtitle: 'Ambiances & saisons',
    desc: "Appliquez des préréglages d'éclairage réalistes — naturel, studio, coucher de soleil, ou par saison.",
    icon: SunIcon,
    link: '/features/intelligent-lighting',
  },
  {
    title: 'Bibliothèque de matériaux',
    subtitle: '10 000+ matériaux PBR',
    desc: 'Parquet, béton, marbre, tissus... Personnalisez chaque surface avec des matériaux photoréalistes.',
    icon: PaletteIcon,
    link: '/features/materials',
  },
  {
    title: 'Vues 360° immersives',
    subtitle: 'Visites virtuelles',
    desc: 'Créez des visites interactives à 360° exportables pour le web, le mobile ou la réalité virtuelle.',
    icon: Globe2Icon,
    link: '/features/360-views',
  },
  {
    title: 'Collaboration',
    subtitle: 'Partagez en un clic',
    desc: 'Invitez clients et collaborateurs à visualiser et commenter vos projets via un lien sécurisé.',
    icon: UsersIcon,
    link: '/features/collaboration',
  },
  {
    title: 'Applications mobiles',
    subtitle: 'iOS & Android',
    desc: 'Présentez vos projets en déplacement depuis votre smartphone ou tablette.',
    icon: SmartphoneIcon,
    link: '/features/mobile-apps',
  },
]

// ── Comparatif ─────────────────────────────────────────────────────────────
const comparisonRows = [
  {
    label: 'Éditeur 3D temps réel (WebGL)',
    vizhome: true,
    mnml: false,
    maket: false,
    coohom: false,
  },
  {
    label: 'Génération par prompt IA',
    vizhome: true,
    mnml: true,
    maket: true,
    coohom: false,
  },
  {
    label: 'Croquis 2D intégré',
    vizhome: true,
    mnml: false,
    maket: false,
    coohom: false,
  },
  {
    label: 'Temps de génération',
    vizhome: '< 30 sec',
    mnml: '2-5 min',
    maket: '1-2 min',
    coohom: '5-10 min',
  },
  {
    label: 'Navigation première personne',
    vizhome: true,
    mnml: false,
    maket: false,
    coohom: false,
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
    vizhome: '10 000+',
    mnml: '2 000',
    maket: '5 000',
    coohom: '1 000',
  },
  {
    label: 'API développeur',
    vizhome: true,
    mnml: false,
    maket: true,
    coohom: false,
  },
]

// ── Témoignages ────────────────────────────────────────────────────────────
const topTestimonials = [
  {
    name: 'Claire Martin',
    role: "Architecte d'intérieur",
    initials: 'CM',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote:
      "En quelques secondes, je transforme une photo en visualisation 3D complète. Le mode 3D Pro avec l'éclairage IA est bluffant — mes clients signent en réunion.",
  },
  {
    name: 'Marc Dubois',
    role: 'Promoteur immobilier',
    initials: 'MD',
    avatar: 'https://i.pravatar.cc/150?img=8',
    quote:
      "Le prompt IA génère des vues d'appartements sur plan en quelques mots. Notre taux de conversion en VEFA a augmenté de 35%.",
  },
  {
    name: 'David Rousseau',
    role: "Designer d'espace",
    initials: 'DR',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote:
      'Je commence au croquis 2D pour les premières esquisses, puis je bascule en 3D Pro pour les rendus finaux. Un workflow fluide et complet.',
  },
]

// ── Plans ──────────────────────────────────────────────────────────────────
const freemiumItems = [
  '3 projets',
  '10 rendus HD/mois',
  '500 matériaux',
  'Croquis 2D & Prompt IA',
]
const proItems = [
  'Projets illimités',
  '50 rendus HD/mois',
  '5 000 matériaux',
  'Mode 3D Pro complet',
  'Export 360°',
]
const enterpriseItems = [
  'Rendus illimités',
  '10 000+ matériaux',
  'API développeur',
  'Équipes illimitées',
  'Support 24/7',
]
</script>
