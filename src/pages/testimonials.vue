<template>
  <div>
    <!-- Section en-tête -->
    <section class="pt-20 pb-12 bg-muted/30">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Ce que nos clients disent</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez comment VizHome transforme le quotidien des professionnels de l'architecture et du design
        </p>
      </div>
    </section>

    <!-- Filtres de témoignages -->
    <section class="py-8 border-b">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <Button :variant="filter === 'all' ? 'default' : 'outline'" @click="filter = 'all'">
            Tous les secteurs
          </Button>
          <Button :variant="filter === 'architecte' ? 'default' : 'outline'" @click="filter = 'architecte'">
            Architectes
          </Button>
          <Button :variant="filter === 'designer' ? 'default' : 'outline'" @click="filter = 'designer'">
            Designers d'intérieur
          </Button>
          <Button :variant="filter === 'immobilier' ? 'default' : 'outline'" @click="filter = 'immobilier'">
            Immobilier
          </Button>
          <Button :variant="filter === 'construction' ? 'default' : 'outline'" @click="filter = 'construction'">
            Construction
          </Button>
        </div>
      </div>
    </section>

    <!-- Témoignages en vedette -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">Témoignages en vedette</h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card class="overflow-hidden h-full">
            <div class="md:flex h-full">
              <div class="md:w-2/5 bg-muted">
                <img
src="/images/docs/projet_1.png" alt="Témoignage de Mathilde Laurent"
                  class="w-full h-full object-cover" >
              </div>
              <div class="md:w-3/5 p-6 flex flex-col">
                <div class="mb-4 flex items-center gap-2">
                  <Badge>Architecte</Badge>
                  <div class="flex text-amber-400">
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                  </div>
                </div>
                <blockquote class="italic text-lg text-muted-foreground flex-grow">
                  "VizHome a radicalement transformé ma façon de présenter des projets aux clients. Je peux désormais
                  générer des visualisations photoréalistes en quelques secondes, directement pendant mes réunions.
                  L'impact sur ma pratique a été considérable."
                </blockquote>
                <div class="mt-4 pt-4 border-t">
                  <h3 class="font-medium">Mathilde Laurent</h3>
                  <p class="text-sm text-muted-foreground">Fondatrice, Studio ML Architecture</p>
                </div>
              </div>
            </div>
          </Card>

          <Card class="overflow-hidden h-full">
            <div class="md:flex h-full">
              <div class="md:w-2/5 bg-muted">
                <img
src="/images/docs/projet_1.png" alt="Témoignage de Thomas Moreau"
                  class="w-full h-full object-cover" >
              </div>
              <div class="md:w-3/5 p-6 flex flex-col">
                <div class="mb-4 flex items-center gap-2">
                  <Badge>Immobilier</Badge>
                  <div class="flex text-amber-400">
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                    <StarIcon class="h-4 w-4 fill-current" />
                  </div>
                </div>
                <blockquote class="italic text-lg text-muted-foreground flex-grow">
                  "En tant que promoteur immobilier, VizHome nous a permis de commercialiser des appartements sur plan
                  avec un réalisme stupéfiant. Nos clients peuvent maintenant visualiser leur futur logement avec une
                  précision inégalée, ce qui a boosté nos ventes de 35%."
                </blockquote>
                <div class="mt-4 pt-4 border-t">
                  <h3 class="font-medium">Thomas Moreau</h3>
                  <p class="text-sm text-muted-foreground">Directeur Commercial, Groupe Habitat Plus</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Liste des témoignages filtrés -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="(testimonial, index) in filteredTestimonials" :key="index" class="flex flex-col h-full">
            <CardHeader>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage :src="testimonial.avatar" :alt="testimonial.name" />
                    <AvatarFallback>{{ getInitials(testimonial.name) }}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 class="font-medium">{{ testimonial.name }}</h3>
                    <p class="text-sm text-muted-foreground">{{ testimonial.position }}</p>
                  </div>
                </div>
                <Badge>{{ testimonial.sector }}</Badge>
              </div>
            </CardHeader>
            <CardContent class="flex-grow">
              <div class="flex text-amber-400 mb-3">
                <StarIcon v-for="i in testimonial.rating" :key="i" class="h-4 w-4 fill-current" />
              </div>
              <blockquote class="italic text-muted-foreground">
                "{{ testimonial.quote }}"
              </blockquote>
            </CardContent>
            <CardFooter class="border-t pt-4">
              <p class="text-sm text-muted-foreground">{{ testimonial.date }}</p>
            </CardFooter>
          </Card>
        </div>

        <!-- Voir plus -->
        <div class="text-center mt-12">
          <Button v-if="!allLoaded" variant="outline" class="gap-1" @click="loadMore">
            Voir plus de témoignages
            <ChevronDownIcon class="h-4 w-4" />
          </Button>
          <p v-else class="text-muted-foreground">Tous les témoignages ont été chargés</p>
        </div>
      </div>
    </section>

    <!-- Statistiques de satisfaction -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center">La satisfaction en chiffres</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UsersIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-4xl font-bold text-primary mb-2">2,500+</div>
              <p class="text-muted-foreground">Utilisateurs actifs</p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <StarIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <p class="text-muted-foreground">Note moyenne</p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ThumbsUpIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-4xl font-bold text-primary mb-2">96%</div>
              <p class="text-muted-foreground">Taux de satisfaction</p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <RefreshCwIcon class="h-6 w-6 text-primary" />
              </div>
              <div class="text-4xl font-bold text-primary mb-2">92%</div>
              <p class="text-muted-foreground">Taux de renouvellement</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Demandez une démo -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-5xl">
        <Card>
          <CardContent class="pt-6 pb-6">
            <div class="md:flex items-center gap-8">
              <div class="md:w-1/2 mb-6 md:mb-0">
                <h2 class="text-2xl font-bold mb-4">Vous souhaitez devenir le prochain témoignage ?</h2>
                <p class="text-muted-foreground mb-6">
                  Contactez-nous pour une démo personnalisée et découvrez comment VizHome peut transformer vos projets
                  architecturaux.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" as-child>
                    <NuxtLink to="/contact">
                      Demander une démo
                    </NuxtLink>
                  </Button>
                  <Button size="lg" variant="outline" as-child>
                    <NuxtLink to="/auth/register">
                      Essayer gratuitement
                    </NuxtLink>
                  </Button>
                </div>
              </div>
              <div class="md:w-1/2">
                <img
src="/images/docs/projet_1.png" alt="Demandez une démo"
                  class="rounded-lg w-full shadow-lg" >
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { StarIcon, UsersIcon, ThumbsUpIcon, RefreshCwIcon, ChevronDownIcon } from 'lucide-vue-next'

// État du filtre
const filter = ref('all')
const displayCount = ref(6)
const allLoaded = ref(false)

// Liste des témoignages
const testimonials = [
  {
    name: 'Sophie Bernard',
    position: 'Architecte d\'intérieur, Studio Design +',
    company: 'Studio Design +',
    sector: 'Designer',
    rating: 5,
    quote: 'VizHome m\'a permis de présenter à mes clients des dizaines d\'options d\'aménagement en un temps record. L\'outil est devenu indispensable dans mon processus créatif.',
    avatar: 'https://i.pravatar.cc/150?img=24',
    date: 'Septembre 2023',
  },
  {
    name: 'Marc Durand',
    position: 'Directeur, Durand Architectes',
    company: 'Durand Architectes',
    sector: 'Architecte',
    rating: 5,
    quote: 'La précision des rendus est stupéfiante. Nos clients peuvent désormais visualiser leurs futurs espaces avec un réalisme qui était auparavant impossible à atteindre sans des semaines de travail.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    date: 'Août 2023',
  },
  {
    name: 'Julien Petit',
    position: 'Agent immobilier, ImmoPlus',
    company: 'ImmoPlus',
    sector: 'Immobilier',
    rating: 4,
    quote: 'Grâce à VizHome, je peux montrer le potentiel des biens en travaux ou vides. Mes clients peuvent se projeter instantanément, ce qui facilite énormément les ventes.',
    avatar: 'https://i.pravatar.cc/150?img=8',
    date: 'Octobre 2023',
  },
  {
    name: 'Claire Moreau',
    position: 'Architecte DPLG, Atelier CM',
    company: 'Atelier CM',
    sector: 'Architecte',
    rating: 5,
    quote: 'L\'intégration de VizHome dans mon workflow a considérablement réduit le temps consacré aux rendus, me permettant de me concentrer davantage sur la conception architecturale.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    date: 'Juillet 2023',
  },
  {
    name: 'Antoine Legrand',
    position: 'Chef de projet, BâtiPlus Construction',
    company: 'BâtiPlus Construction',
    sector: 'Construction',
    rating: 5,
    quote: 'Sur nos chantiers, VizHome nous permet de visualiser l\'avancement des travaux et de communiquer efficacement avec les clients sur les prochaines étapes. Un outil révolutionnaire !',
    avatar: 'https://i.pravatar.cc/150?img=3',
    date: 'Novembre 2023',
  },
  {
    name: 'Marie Dubois',
    position: 'Designer d\'intérieur freelance',
    company: 'Marie Dubois Design',
    sector: 'Designer',
    rating: 4,
    quote: 'En tant que freelance, VizHome m\'a donné accès à des outils de visualisation professionnels que je n\'aurais pas pu me permettre autrement. Mes clients sont impressionnés par la qualité des rendus.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    date: 'Août 2023',
  },
  {
    name: 'Pierre Martin',
    position: 'Directeur commercial, Résidences Premium',
    company: 'Résidences Premium',
    sector: 'Immobilier',
    rating: 5,
    quote: 'Nous utilisons VizHome pour commercialiser nos programmes immobiliers avant même le début de la construction. Les résultats sont spectaculaires et notre taux de réservation a augmenté de 40%.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    date: 'Septembre 2023',
  },
  {
    name: 'Émilie Laurent',
    position: 'Architecte paysagiste, Green Design',
    company: 'Green Design',
    sector: 'Architecte',
    rating: 5,
    quote: 'VizHome a révolutionné ma façon de présenter des projets paysagers. La capacité de visualiser des jardins et espaces extérieurs avec différentes saisons et conditions météorologiques est incroyable.',
    avatar: 'https://i.pravatar.cc/150?img=9',
    date: 'Octobre 2023',
  },
  {
    name: 'Lucas Girard',
    position: 'Directeur artistique, Studio Pixel',
    company: 'Studio Pixel',
    sector: 'Designer',
    rating: 4,
    quote: 'L\'intégration de VizHome dans notre studio a transformé notre processus créatif. La rapidité avec laquelle nous pouvons itérer sur des concepts visuels est sans précédent.',
    avatar: 'https://i.pravatar.cc/150?img=7',
    date: 'Novembre 2023',
  },
  {
    name: 'Nathalie Blanc',
    position: 'Directrice de projets, Constructions Modernes',
    company: 'Constructions Modernes',
    sector: 'Construction',
    rating: 5,
    quote: 'VizHome nous aide à communiquer efficacement avec les différentes parties prenantes d\'un projet. Tout le monde peut visualiser clairement le résultat final, réduisant ainsi les malentendus.',
    avatar: 'https://i.pravatar.cc/150?img=4',
    date: 'Décembre 2023',
  },
  {
    name: 'Maxime Rousseau',
    position: 'Architecte, Cabinet MR',
    company: 'Cabinet MR',
    sector: 'Architecte',
    rating: 5,
    quote: 'En tant qu\'architecte travaillant sur des projets de rénovation, VizHome m\'a permis de montrer à mes clients le \'avant/après\' de manière saisissante. Un outil indispensable pour gagner leur confiance.',
    avatar: 'https://i.pravatar.cc/150?img=15',
    date: 'Janvier 2024',
  },
  {
    name: 'Sarah Lecomte',
    position: 'Responsable marketing, Groupe Immobilier LCT',
    company: 'Groupe Immobilier LCT',
    sector: 'Immobilier',
    rating: 5,
    quote: 'VizHome a transformé notre stratégie marketing. Nos brochures et sites web présentent désormais des visualisations photoréalistes qui captivent vraiment nos prospects.',
    avatar: 'https://i.pravatar.cc/150?img=6',
    date: 'Février 2024',
  },
]

// Filtrer les témoignages en fonction du filtre sélectionné et du nombre à afficher
const filteredTestimonials = computed(() => {
  let result = testimonials

  if (filter.value !== 'all') {
    result = result.filter((t) => t.sector.toLowerCase() === filter.value.toLowerCase())
  }

  return result.slice(0, displayCount.value)
})

// Fonction pour charger plus de témoignages
const loadMore = () => {
  displayCount.value += 6
  if (displayCount.value >= testimonials.length) {
    allLoaded.value = true
  }
}

// Fonction pour obtenir les initiales d'un nom
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
}
</script>

<style scoped></style>