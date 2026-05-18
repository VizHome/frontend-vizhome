<template>
  <div>
    <!-- En-tête -->
    <section class="py-16 px-6 border-b">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl font-bold mb-3">Tarification transparente</h1>
        <p class="text-lg text-muted-foreground mb-8">
          Des offres adaptées à tous les besoins, de l'étudiant à l'agence
          d'architecture
        </p>
        <!-- Toggle mensuel/annuel -->
        <div class="inline-flex items-center bg-muted rounded-full p-1 gap-1">
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            :class="
              billingCycle === 'monthly'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="billingCycle = 'monthly'"
          >
            Mensuel
          </button>
          <button
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            :class="
              billingCycle === 'yearly'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="billingCycle = 'yearly'"
          >
            Annuel
            <Badge variant="secondary" class="text-xs rounded-full py-0"
              >-20%</Badge
            >
          </button>
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section class="py-12 px-6 border-b">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Freemium -->
          <Card class="rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle>Freemium</CardTitle>
              <CardDescription>Pour les débutants et étudiants</CardDescription>
              <div class="mt-4">
                <span class="text-4xl font-bold">0€</span>
                <span class="text-muted-foreground text-sm">/mois</span>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Idéal pour découvrir la plateforme et expérimenter les
                fonctionnalités de base.
              </p>
              <Separator />
              <ul class="space-y-2 text-sm">
                <li
                  v-for="item in freemiumFeatures"
                  :key="item"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" as-child>
                <NuxtLink to="/auth/register">Commencer gratuitement</NuxtLink>
              </Button>
            </CardFooter>
          </Card>

          <!-- Pro -->
          <Card class="rounded-xl border-primary border-2 shadow-sm relative">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge class="rounded-full">Populaire</Badge>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Pour les professionnels</CardDescription>
              <div class="mt-4">
                <span class="text-4xl font-bold">{{
                  billingCycle === 'monthly' ? '49€' : '39€'
                }}</span>
                <span class="text-muted-foreground text-sm">/mois</span>
                <div
                  v-if="billingCycle === 'yearly'"
                  class="text-xs text-muted-foreground mt-1"
                >
                  Facturé annuellement (468€)
                </div>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Solution complète pour les architectes et designers d'intérieur.
              </p>
              <Separator />
              <p
                class="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Tout Freemium, plus :
              </p>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="item in proFeatures"
                  :key="item"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" as-child>
                <NuxtLink to="/auth/register"
                  >Essayer 14 jours gratuits</NuxtLink
                >
              </Button>
            </CardFooter>
          </Card>

          <!-- Entreprise -->
          <Card class="rounded-xl border shadow-sm">
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Pour les agences et studios</CardDescription>
              <div class="mt-4">
                <span class="text-4xl font-bold">{{
                  billingCycle === 'monthly' ? '199€' : '159€'
                }}</span>
                <span class="text-muted-foreground text-sm">/mois</span>
                <div
                  v-if="billingCycle === 'yearly'"
                  class="text-xs text-muted-foreground mt-1"
                >
                  Facturé annuellement (1 908€)
                </div>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Solution complète avec options de personnalisation avancées.
              </p>
              <Separator />
              <p
                class="text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Tout Pro, plus :
              </p>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="item in enterpriseFeatures"
                  :key="item"
                  class="flex items-center gap-2"
                >
                  <CheckIcon class="h-4 w-4 text-primary shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button class="w-full rounded-full" variant="outline" as-child>
                <NuxtLink to="/contact"
                  >Contacter l'équipe commerciale</NuxtLink
                >
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- Tableau comparatif -->
    <section class="py-12 px-6 border-b bg-muted/30">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-xl font-bold mb-6 text-center">
          Comparaison détaillée
        </h2>
        <div class="rounded-xl border shadow-sm overflow-x-auto bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[200px]">Fonctionnalités</TableHead>
                <TableHead class="text-center">Freemium</TableHead>
                <TableHead class="text-center bg-primary/5 font-semibold"
                  >Pro</TableHead
                >
                <TableHead class="text-center">Entreprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="row in comparisonRows" :key="row.label">
                <TableCell class="font-medium text-sm">{{
                  row.label
                }}</TableCell>
                <TableCell class="text-center text-sm">
                  <CheckIcon
                    v-if="row.free === true"
                    class="mx-auto h-4 w-4 text-primary"
                  />
                  <XIcon
                    v-else-if="row.free === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="text-muted-foreground">{{
                    row.free
                  }}</span>
                </TableCell>
                <TableCell class="text-center text-sm bg-primary/5">
                  <CheckIcon
                    v-if="row.pro === true"
                    class="mx-auto h-4 w-4 text-primary"
                  />
                  <XIcon
                    v-else-if="row.pro === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="font-medium">{{ row.pro }}</span>
                </TableCell>
                <TableCell class="text-center text-sm">
                  <CheckIcon
                    v-if="row.enterprise === true"
                    class="mx-auto h-4 w-4 text-primary"
                  />
                  <XIcon
                    v-else-if="row.enterprise === false"
                    class="mx-auto h-4 w-4 text-muted-foreground"
                  />
                  <span v-else class="text-muted-foreground">{{
                    row.enterprise
                  }}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-12 px-6 border-b">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-xl font-bold mb-6 text-center">Questions fréquentes</h2>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem v-for="faq in faqs" :key="faq.q" :value="faq.q">
            <AccordionTrigger class="text-left">{{ faq.q }}</AccordionTrigger>
            <AccordionContent class="text-muted-foreground">{{
              faq.a
            }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-12 px-6">
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-primary/5 rounded-2xl border p-10">
          <h2 class="text-xl font-bold mb-3">
            Vous avez des besoins spécifiques ?
          </h2>
          <p class="text-muted-foreground mb-6">
            Contactez notre équipe commerciale pour discuter d'une solution
            personnalisée.
          </p>
          <Button size="lg" class="rounded-full" as-child>
            <NuxtLink to="/contact">Demander un devis personnalisé</NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'


const billingCycle = ref<'monthly' | 'yearly'>('monthly')

const freemiumFeatures = [
  '3 projets simultanés',
  '10 rendus HD par mois',
  'Bibliothèque standard (500 matériaux)',
  'Exports JPEG/PNG',
  'Support communautaire',
]

const proFeatures = [
  'Projets illimités',
  '50 rendus HD par mois',
  'Bibliothèque premium (5 000 matériaux)',
  'Export 360° et visites virtuelles',
  'Support prioritaire par email',
  'Partage sécurisé des rendus',
]

const enterpriseFeatures = [
  'Projets et utilisateurs illimités',
  'Rendus illimités',
  'Bibliothèque complète (10 000+ matériaux)',
  'Intégration VR complète',
  'API développeur',
  'Gestion des équipes et permissions',
  'Support dédié 24/7',
]

const comparisonRows = [
  {
    label: 'Nombre de projets',
    free: '3',
    pro: 'Illimité',
    enterprise: 'Illimité',
  },
  {
    label: 'Rendus HD par mois',
    free: '10',
    pro: '50',
    enterprise: 'Illimité',
  },
  {
    label: 'Bibliothèque de matériaux',
    free: '500',
    pro: '5 000',
    enterprise: '10 000+',
  },
  {
    label: 'Génération 3D automatique',
    free: true,
    pro: true,
    enterprise: true,
  },
  {
    label: 'Résolution maximale',
    free: 'HD (1080p)',
    pro: '4K',
    enterprise: '8K',
  },
  { label: 'Export 360°', free: false, pro: true, enterprise: true },
  { label: 'Visites virtuelles', free: false, pro: true, enterprise: true },
  {
    label: 'Intégration VR',
    free: false,
    pro: 'Basique',
    enterprise: 'Complète',
  },
  {
    label: "Formats d'export",
    free: 'JPEG, PNG',
    pro: 'JPEG, PNG, TIFF',
    enterprise: 'Tous formats',
  },
  {
    label: 'Export des modèles 3D',
    free: false,
    pro: 'OBJ, FBX',
    enterprise: 'Tous formats',
  },
  { label: 'API développeur', free: false, pro: false, enterprise: true },
  {
    label: 'Gestion des équipes',
    free: false,
    pro: 'Basique (3)',
    enterprise: 'Avancée (illimitée)',
  },
  {
    label: 'Support technique',
    free: 'Communautaire',
    pro: 'Email prioritaire',
    enterprise: 'Dédié 24/7',
  },
  { label: 'Marque blanche', free: false, pro: false, enterprise: true },
]

const faqs = [
  {
    q: 'Puis-je changer de forfait à tout moment ?',
    a: 'Oui, vous pouvez passer à un forfait supérieur à tout moment. La différence sera calculée au prorata. Pour passer à un forfait inférieur, le changement prendra effet à la fin de votre période de facturation.',
  },
  {
    q: "Comment fonctionne l'essai gratuit ?",
    a: "L'essai gratuit de 14 jours vous donne accès à toutes les fonctionnalités du forfait Pro. Aucune carte de crédit n'est requise pour commencer.",
  },
  {
    q: 'Les rendus non utilisés sont-ils reportés ?',
    a: 'Non, les rendus non utilisés ne sont pas reportés. Votre quota est réinitialisé au début de chaque période de facturation.',
  },
  {
    q: "Existe-t-il des tarifs pour les établissements d'enseignement ?",
    a: "Oui, nous proposons des remises pour les établissements d'enseignement et les étudiants. Contactez notre équipe commerciale pour plus d'informations.",
  },
  {
    q: 'Comment fonctionne la facturation annuelle ?',
    a: "La facturation annuelle vous permet d'économiser 20% par rapport au tarif mensuel. Vous êtes facturé une fois par an.",
  },
]
</script>
