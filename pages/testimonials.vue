<template>
  <div>
    <!-- En-tête -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">Ce que nos clients disent</h1>
        <p class="text-lg text-muted-foreground">
          Découvrez comment VizHome transforme le quotidien des professionnels
          de l'architecture et du design
        </p>
      </div>
    </section>

    <!-- Filtres -->
    <section class="py-6 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
        <button
          v-for="f in filters"
          :key="f.value"
          class="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors"
          :class="
            filter === f.value
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground hover:text-foreground border-border'
          "
          @click="filter = f.value"
        >
          {{ f.label }}
        </button>
      </div>
    </section>

    <!-- Témoignages vedette -->
    <section class="py-12 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-xl font-bold mb-8 text-center">
          Témoignages en vedette
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <Card
            v-for="feat in featuredTestimonials"
            :key="feat.name"
            class="rounded-xl border shadow-sm overflow-hidden"
          >
            <div class="flex flex-col sm:flex-row h-full">
              <div class="sm:w-2/5 bg-muted min-h-[140px]">
                <img
                  :src="feat.image"
                  :alt="feat.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="sm:w-3/5 p-6 flex flex-col">
                <div class="flex items-center gap-2 mb-3">
                  <Badge class="rounded-full">{{ feat.sector }}</Badge>
                  <div class="flex text-amber-400">
                    <StarIcon
                      v-for="i in 5"
                      :key="i"
                      class="h-3.5 w-3.5 fill-current"
                    />
                  </div>
                </div>
                <blockquote
                  class="italic text-sm text-muted-foreground flex-grow leading-relaxed"
                >
                  "{{ feat.quote }}"
                </blockquote>
                <div class="mt-4 pt-4 border-t">
                  <h3 class="font-medium text-sm">{{ feat.name }}</h3>
                  <p class="text-xs text-muted-foreground">
                    {{ feat.position }}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Grille filtrée -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="(t, i) in filteredTestimonials"
            :key="i"
            class="rounded-xl border shadow-sm flex flex-col"
          >
            <CardHeader>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage :src="t.avatar" :alt="t.name" />
                    <AvatarFallback>{{ getInitials(t.name) }}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 class="font-medium text-sm">{{ t.name }}</h3>
                    <p class="text-xs text-muted-foreground">
                      {{ t.position }}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" class="rounded-full text-xs">{{
                  t.sector
                }}</Badge>
              </div>
            </CardHeader>
            <CardContent class="flex-grow">
              <div class="flex text-amber-400 mb-2">
                <StarIcon
                  v-for="i in t.rating"
                  :key="i"
                  class="h-3.5 w-3.5 fill-current"
                />
              </div>
              <blockquote class="italic text-sm text-muted-foreground">
                "{{ t.quote }}"
              </blockquote>
            </CardContent>
            <CardFooter class="border-t pt-3">
              <p class="text-xs text-muted-foreground">{{ t.date }}</p>
            </CardFooter>
          </Card>
        </div>

        <!-- Voir plus -->
        <div class="text-center mt-8">
          <Button
            v-if="!allLoaded"
            variant="outline"
            class="rounded-full gap-1"
            @click="loadMore"
          >
            Voir plus de témoignages
            <ChevronDownIcon class="h-4 w-4" />
          </Button>
          <p v-else class="text-sm text-muted-foreground">
            Tous les témoignages ont été chargés
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 px-6 border-b bg-muted/30">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-xl font-bold mb-8 text-center">
          La satisfaction en chiffres
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            v-for="stat in stats"
            :key="stat.value"
            class="rounded-xl border shadow-sm text-center"
          >
            <CardContent class="pt-6">
              <div
                class="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3"
              >
                <component :is="stat.icon" class="h-5 w-5 text-primary" />
              </div>
              <div class="text-3xl font-bold text-primary mb-1">
                {{ stat.value }}
              </div>
              <p class="text-xs text-muted-foreground">{{ stat.label }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA démo -->
    <section class="py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <Card class="rounded-xl border shadow-sm overflow-hidden">
          <CardContent class="pt-6 pb-6">
            <div class="flex flex-col md:flex-row items-center gap-8">
              <div class="md:w-1/2">
                <h2 class="text-xl font-bold mb-3">
                  Vous souhaitez devenir le prochain témoignage ?
                </h2>
                <p class="text-muted-foreground mb-6 text-sm">
                  Contactez-nous pour une démo personnalisée et découvrez
                  comment VizHome peut transformer vos projets architecturaux.
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <Button class="rounded-full" as-child>
                    <NuxtLink to="/contact">Demander une démo</NuxtLink>
                  </Button>
                  <Button variant="outline" class="rounded-full" as-child>
                    <NuxtLink to="/auth/register"
                      >Essayer gratuitement</NuxtLink
                    >
                  </Button>
                </div>
              </div>
              <div class="md:w-1/2">
                <img
                  src="/images/docs/projet_1.png"
                  alt="Demandez une démo"
                  class="rounded-xl w-full shadow-sm border"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {
  StarIcon,
  UsersIcon,
  ThumbsUpIcon,
  RefreshCwIcon,
  ChevronDownIcon,
} from 'lucide-vue-next'
import { ref, computed } from 'vue'


const filter = ref('all')
const displayCount = ref(6)
const allLoaded = ref(false)

const filters = [
  { value: 'all', label: 'Tous les secteurs' },
  { value: 'architecte', label: 'Architectes' },
  { value: 'designer', label: "Designers d'intérieur" },
  { value: 'immobilier', label: 'Immobilier' },
  { value: 'construction', label: 'Construction' },
]

const featuredTestimonials = [
  {
    name: 'Mathilde Laurent',
    position: 'Fondatrice, Studio ML Architecture',
    sector: 'Architecte',
    image: '/images/docs/projet_1.png',
    quote:
      'VizHome a radicalement transformé ma façon de présenter des projets aux clients. Je peux désormais générer des visualisations photoréalistes en quelques secondes, directement pendant mes réunions.',
  },
  {
    name: 'Thomas Moreau',
    position: 'Directeur Commercial, Groupe Habitat Plus',
    sector: 'Immobilier',
    image: '/images/docs/projet_1.png',
    quote:
      'En tant que promoteur immobilier, VizHome nous a permis de commercialiser des appartements sur plan avec un réalisme stupéfiant. Nos ventes ont augmenté de 35%.',
  },
]

const testimonials = [
  {
    name: 'Sophie Bernard',
    position: "Architecte d'intérieur, Studio Design +",
    sector: 'Designer',
    rating: 5,
    quote:
      "VizHome m'a permis de présenter à mes clients des dizaines d'options d'aménagement en un temps record.",
    avatar: 'https://i.pravatar.cc/150?img=24',
    date: 'Septembre 2023',
  },
  {
    name: 'Marc Durand',
    position: 'Directeur, Durand Architectes',
    sector: 'Architecte',
    rating: 5,
    quote:
      'La précision des rendus est stupéfiante. Nos clients peuvent désormais visualiser leurs futurs espaces avec un réalisme qui était auparavant impossible.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    date: 'Août 2023',
  },
  {
    name: 'Julien Petit',
    position: 'Agent immobilier, ImmoPlus',
    sector: 'Immobilier',
    rating: 4,
    quote:
      'Grâce à VizHome, je peux montrer le potentiel des biens en travaux ou vides. Mes clients peuvent se projeter instantanément.',
    avatar: 'https://i.pravatar.cc/150?img=8',
    date: 'Octobre 2023',
  },
  {
    name: 'Claire Moreau',
    position: 'Architecte DPLG, Atelier CM',
    sector: 'Architecte',
    rating: 5,
    quote:
      "L'intégration de VizHome dans mon workflow a considérablement réduit le temps consacré aux rendus.",
    avatar: 'https://i.pravatar.cc/150?img=1',
    date: 'Juillet 2023',
  },
  {
    name: 'Antoine Legrand',
    position: 'Chef de projet, BâtiPlus Construction',
    sector: 'Construction',
    rating: 5,
    quote:
      "Sur nos chantiers, VizHome nous permet de visualiser l'avancement des travaux et de communiquer efficacement avec les clients.",
    avatar: 'https://i.pravatar.cc/150?img=3',
    date: 'Novembre 2023',
  },
  {
    name: 'Marie Dubois',
    position: "Designer d'intérieur freelance",
    sector: 'Designer',
    rating: 4,
    quote:
      "En tant que freelance, VizHome m'a donné accès à des outils de visualisation professionnels que je n'aurais pas pu me permettre autrement.",
    avatar: 'https://i.pravatar.cc/150?img=5',
    date: 'Août 2023',
  },
  {
    name: 'Pierre Martin',
    position: 'Directeur commercial, Résidences Premium',
    sector: 'Immobilier',
    rating: 5,
    quote:
      'Nous utilisons VizHome pour commercialiser nos programmes immobiliers avant même le début de la construction. Notre taux de réservation a augmenté de 40%.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    date: 'Septembre 2023',
  },
  {
    name: 'Émilie Laurent',
    position: 'Architecte paysagiste, Green Design',
    sector: 'Architecte',
    rating: 5,
    quote:
      'VizHome a révolutionné ma façon de présenter des projets paysagers.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    date: 'Octobre 2023',
  },
  {
    name: 'Lucas Girard',
    position: 'Directeur artistique, Studio Pixel',
    sector: 'Designer',
    rating: 4,
    quote:
      "L'intégration de VizHome dans notre studio a transformé notre processus créatif.",
    avatar: 'https://i.pravatar.cc/150?img=7',
    date: 'Novembre 2023',
  },
  {
    name: 'Nathalie Blanc',
    position: 'Directrice de projets, Constructions Modernes',
    sector: 'Construction',
    rating: 5,
    quote:
      'VizHome nous aide à communiquer efficacement avec les différentes parties prenantes.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    date: 'Décembre 2023',
  },
  {
    name: 'Maxime Rousseau',
    position: 'Architecte, Cabinet MR',
    sector: 'Architecte',
    rating: 5,
    quote:
      "En tant qu'architecte travaillant sur des projets de rénovation, VizHome m'a permis de montrer le 'avant/après' de manière saisissante.",
    avatar: 'https://i.pravatar.cc/150?img=15',
    date: 'Janvier 2024',
  },
  {
    name: 'Sarah Lecomte',
    position: 'Responsable marketing, Groupe Immobilier LCT',
    sector: 'Immobilier',
    rating: 5,
    quote:
      'VizHome a transformé notre stratégie marketing. Nos brochures présentent désormais des visualisations photoréalistes.',
    avatar: 'https://i.pravatar.cc/150?img=6',
    date: 'Février 2024',
  },
]

const filteredTestimonials = computed(() => {
  let result = testimonials
  if (filter.value !== 'all') {
    result = result.filter(
      t => t.sector.toLowerCase() === filter.value.toLowerCase()
    )
  }
  return result.slice(0, displayCount.value)
})

const loadMore = () => {
  displayCount.value += 6
  if (displayCount.value >= testimonials.length) allLoaded.value = true
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(p => p.charAt(0))
    .join('')

const stats = [
  { value: '2,500+', label: 'Utilisateurs actifs', icon: UsersIcon },
  { value: '4.9/5', label: 'Note moyenne', icon: StarIcon },
  { value: '96%', label: 'Taux de satisfaction', icon: ThumbsUpIcon },
  { value: '92%', label: 'Taux de renouvellement', icon: RefreshCwIcon },
]
</script>
