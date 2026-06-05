<template>
  <div class="mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col gap-6">
    <!-- Bandeau post-checkout (success / cancel) -->
    <Alert
      v-if="checkoutResult === 'success'"
      class="border-green-300 bg-green-50 dark:border-green-900/40 dark:bg-green-950/20"
    >
      <CircleCheckIcon class="size-4 text-green-600 dark:text-green-400" />
      <AlertTitle class="text-green-700 dark:text-green-400">
        Paiement confirmé 🎉
      </AlertTitle>
      <AlertDescription class="text-green-700/80 dark:text-green-400/80">
        Ton abonnement est actif. Si ton plan n'apparaît pas encore ci-dessous,
        attends quelques secondes que Stripe nous notifie puis recharge.
      </AlertDescription>
    </Alert>

    <Alert v-else-if="checkoutResult === 'cancel'" variant="default">
      <CircleAlertIcon class="size-4 text-amber-500" />
      <AlertTitle>Paiement annulé</AlertTitle>
      <AlertDescription>
        Tu as quitté le paiement. Aucune carte n'a été débitée.
      </AlertDescription>
    </Alert>

    <!-- Bandeau erreur fetch (un endpoint billing en échec) -->
    <Alert v-if="loadErrors.length > 0" variant="destructive">
      <CircleAlertIcon class="size-4" />
      <AlertTitle>Certaines données n'ont pas pu être chargées</AlertTitle>
      <AlertDescription>
        <ul class="mt-1.5 flex flex-col gap-0.5 text-xs">
          <li v-for="(err, i) in loadErrors" :key="i">· {{ err }}</li>
        </ul>
      </AlertDescription>
    </Alert>

    <!-- Header -->
    <section>
      <nav class="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
        <NuxtLink to="/render" class="hover:text-foreground">App</NuxtLink>
        <ChevronRightIcon class="size-3" />
        <span class="text-foreground">Abonnement</span>
      </nav>
      <h1 class="text-2xl font-bold tracking-tight">Abonnement & facturation</h1>
      <p class="text-sm text-muted-foreground">
        Gère ton plan, consulte tes factures et tes consommations.
      </p>
    </section>

    <!-- Plan actuel + usage -->
    <Card>
      <CardHeader>
        <CardTitle class="text-base">Plan actuel</CardTitle>
        <CardDescription>
          {{ subscription?.hasSubscription
            ? `Abonné depuis Stripe, statut ${subscription.status ?? '—'}.`
            : 'Tu es sur le plan gratuit.' }}
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <Badge :class="planBadgeClass" class="h-7 px-3 text-sm uppercase tracking-wider border-0">
              {{ currentPlan?.label || user?.plan }}
            </Badge>
            <span
              v-if="subscription?.cancelAtPeriodEnd"
              class="text-xs text-amber-600 dark:text-amber-400"
            >
              · S'arrête le {{ formatDate(subscription.currentPeriodEnd) }}
            </span>
            <span
              v-else-if="subscription?.currentPeriodEnd"
              class="text-xs text-muted-foreground"
            >
              · Renouvellement le {{ formatDate(subscription.currentPeriodEnd) }}
            </span>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Button
              v-if="!subscription?.hasSubscription"
              class="rounded-full gap-1.5"
              :disabled="isCheckingOut"
              @click="onUpgrade('pro')"
            >
              <SparklesIcon class="size-4" />
              Passer sur Pro
            </Button>
            <Button
              v-else-if="!subscription.cancelAtPeriodEnd"
              variant="outline"
              class="rounded-full gap-1.5"
              :disabled="isCancelling"
              @click="onCancel"
            >
              <XCircleIcon class="size-4" />
              {{ isCancelling ? 'Annulation…' : 'Annuler l\'abonnement' }}
            </Button>
          </div>
        </div>

        <!-- Usage barres -->
        <div v-if="stats" class="grid gap-3 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5 rounded-lg border p-3">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Renders ce mois</span>
              <span class="font-medium tabular-nums">
                {{ stats.rendersThisMonth }} / {{ stats.rendersLimit }}
              </span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                class="h-full rounded-full bg-primary transition-all"
                :style="{ width: percent(stats.rendersThisMonth, stats.rendersLimit) }"
              />
            </div>
          </div>
          <div class="flex flex-col gap-1.5 rounded-lg border p-3">
            <div class="flex items-center justify-between text-xs">
              <span class="text-muted-foreground">Stockage</span>
              <span class="font-medium tabular-nums">
                {{ stats.storageUsedGb.toFixed(2) }} / {{ stats.storageLimitGb }} Go
              </span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                class="h-full rounded-full bg-primary transition-all"
                :style="{ width: percent(stats.storageUsedGb, stats.storageLimitGb) }"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Plans disponibles -->
    <Card>
      <CardHeader>
        <CardTitle class="text-base">Plans disponibles</CardTitle>
        <CardDescription>
          Compare et upgrade en quelques clics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="plans.length === 0" class="text-sm text-muted-foreground">
          Chargement des plans…
        </div>
        <div v-else class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="p in plans"
            :key="p.name"
            class="flex flex-col gap-3 rounded-xl border p-4 transition-colors"
            :class="user?.plan === p.name
              ? 'border-primary bg-primary/5'
              : 'hover:border-primary/40'"
          >
            <div class="flex items-baseline justify-between">
              <h3 class="text-lg font-semibold">{{ p.label }}</h3>
              <span class="text-xs text-muted-foreground uppercase">
                {{ formatPlanPrice(p.priceEur) }}
              </span>
            </div>
            <p class="text-xs text-muted-foreground">{{ p.description }}</p>
            <ul class="flex flex-col gap-1 text-xs text-muted-foreground">
              <li>· {{ p.rendersLimit }} renders/mois</li>
              <li>· {{ (p.storageLimitBytes / 1024 ** 3).toFixed(0) }} Go stockage</li>
            </ul>
            <Button
              v-if="user?.plan !== p.name && p.isBillable"
              size="sm"
              class="mt-auto rounded-full"
              :disabled="isCheckingOut"
              @click="onUpgrade(p.name)"
            >
              {{ isCheckingOut ? 'Redirection…' : 'Choisir ce plan' }}
            </Button>
            <Badge
              v-else-if="user?.plan === p.name"
              variant="secondary"
              class="mt-auto w-fit border-0 bg-primary/10 text-primary"
            >
              Plan actuel
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Factures -->
    <Card>
      <CardHeader>
        <CardTitle class="text-base">Factures</CardTitle>
        <CardDescription>
          {{ invoices.length === 0 ? 'Aucune facture pour l\'instant.' : `${invoices.length} factures` }}
        </CardDescription>
      </CardHeader>
      <CardContent v-if="invoices.length > 0" class="p-0">
        <table class="w-full text-sm">
          <thead class="border-b text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th class="px-4 py-2 text-left font-medium">#</th>
              <th class="px-4 py-2 text-right font-medium">Montant</th>
              <th class="px-4 py-2 text-left font-medium">Status</th>
              <th class="px-4 py-2 text-left font-medium">Date</th>
              <th class="px-4 py-2 text-left font-medium">Lien</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="i in invoices" :key="i.id" class="hover:bg-muted/30">
              <td class="px-4 py-2 font-mono text-xs">{{ i.number || i.id.slice(0, 10) }}</td>
              <td class="px-4 py-2 text-right tabular-nums">
                {{ formatMoney(i.amountPaid, i.currency) }}
              </td>
              <td class="px-4 py-2">
                <Badge
variant="secondary" class="h-5 border-0 px-1.5 text-[10px] uppercase tracking-wider"
                  :class="i.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-muted text-muted-foreground'"
                >
                  {{ i.status }}
                </Badge>
              </td>
              <td class="px-4 py-2 text-xs text-muted-foreground">
                {{ formatDate(i.created) }}
              </td>
              <td class="px-4 py-2 text-xs flex gap-2">
                <a v-if="i.hostedInvoiceUrl" :href="i.hostedInvoiceUrl" target="_blank" rel="noopener" class="text-primary hover:underline">Stripe</a>
                <a v-if="i.invoicePdf" :href="i.invoicePdf" target="_blank" rel="noopener" class="text-primary hover:underline">PDF</a>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  SparklesIcon,
  XCircleIcon,
} from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'

import type { PlanName } from '~/composables/useBilling'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
  ssr: false,
})

useHead({ title: 'Abonnement — VizHome' })

const route = useRoute()
const { user, stats, fetchMe } = useUser()
const {
  plans, subscription, invoices,
  fetchPlans, fetchSubscription, fetchInvoices,
  startCheckout, cancelSubscription,
} = useBilling()

const checkoutResult = computed<'success' | 'cancel' | null>(() => {
  const c = route.query.checkout
  if (c === 'success') return 'success'
  if (c === 'cancel') return 'cancel'
  return null
})

const currentPlan = computed(() => plans.value.find(p => p.name === user.value?.plan))

const planBadgeClass = computed(() => {
  switch (user.value?.plan) {
    case 'pro': return 'bg-primary/10 text-primary'
    case 'enterprise': return 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
    default: return 'bg-muted text-muted-foreground'
  }
})

// Charge plans + subscription + invoices en parallèle — chaque fetch est
// indépendant, on isole les erreurs pour qu'un endpoint en échec ne fasse
// pas crasher la page entière (Suspense + ssr:false = page blanche sinon).
const loadErrors = ref<string[]>([])
async function _safeFetch(label: string, fn: () => Promise<void>) {
  try { await fn() } catch (e: unknown) {
    const err = e as { data?: { detail?: string }; statusCode?: number; message?: string }
    const msg = err?.data?.detail || err?.message || `Erreur ${err?.statusCode ?? '?'}`
    loadErrors.value.push(`${label} : ${msg}`)
    console.warn(`[billing] ${label} failed`, e)
  }
}
await Promise.all([
  _safeFetch('plans', fetchPlans),
  _safeFetch('abonnement', fetchSubscription),
  _safeFetch('factures', fetchInvoices),
])

// Si on revient d'un checkout success, refetch le user (le webhook Stripe
// a peut-être déjà mis à jour le plan côté backend) + toast.
onMounted(async () => {
  if (checkoutResult.value === 'success') {
    toast.success('Paiement confirmé. Bienvenue dans le club !')
    // Petit délai pour laisser le webhook Stripe arriver, puis refetch.
    await new Promise(r => setTimeout(r, 1500))
    await Promise.all([fetchMe(), fetchSubscription()])
  } else if (checkoutResult.value === 'cancel') {
    toast.info('Paiement annulé.')
  }
})

// ─── Actions ─────────────────────────────────────────────────────────────
const isCheckingOut = ref(false)
const isCancelling = ref(false)

async function onUpgrade(plan: PlanName) {
  if (isCheckingOut.value) return
  if (plan === 'free') return // free n'a pas de checkout
  isCheckingOut.value = true
  try {
    // `startCheckout` redirige automatiquement vers Stripe (window.location)
    await startCheckout(plan)
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    toast.error(err.data?.detail || 'Impossible de démarrer le paiement.')
    isCheckingOut.value = false
  }
}

async function onCancel() {
  if (!confirm('Vraiment annuler ton abonnement ? Tu garderas l\'accès jusqu\'à la fin de la période en cours.')) return
  isCancelling.value = true
  try {
    await cancelSubscription()
    toast.success('Abonnement annulé. Accès maintenu jusqu\'à la fin de la période.')
    await fetchSubscription()
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    toast.error(err.data?.detail || 'Impossible d\'annuler.')
  } finally {
    isCancelling.value = false
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────
function percent(used: number, limit: number): string {
  if (!limit) return '0%'
  return `${Math.min(100, Math.max(2, Math.round((used / limit) * 100)))}%`
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

/** Backend renvoie le prix plan en CENTIMES (1900 = 19 €). */
function formatPlanPrice(cents: number | null): string {
  if (cents === null) return 'Sur devis'
  if (cents === 0) return 'Gratuit'
  const euros = cents / 100
  // Pas de décimales si entier (19 € au lieu de 19,00 €)
  const formatted = euros % 1 === 0 ? euros.toString() : euros.toFixed(2)
  return `${formatted} €/mois`
}

function formatMoney(amount: number, currency: string): string {
  const value = (amount || 0) / 100
  try {
    return value.toLocaleString('fr-FR', {
      style: 'currency',
      currency: (currency || 'eur').toUpperCase(),
    })
  } catch {
    return `${value.toFixed(2)} ${(currency || '').toUpperCase()}`
  }
}
</script>
