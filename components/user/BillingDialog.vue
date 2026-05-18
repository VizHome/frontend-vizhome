<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <Receipt class="h-5 w-5 text-primary" />
          Facturation
        </DialogTitle>
        <DialogDescription>
          Consultez vos factures et votre moyen de paiement enregistré.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-4 py-2">
        <!-- Prochain prélèvement -->
        <div
          v-if="user.plan !== 'free' && nextRenewalDate"
          class="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-center gap-3"
        >
          <CalendarClock class="h-4 w-4 text-primary shrink-0" />
          <div class="flex-1">
            <p class="text-xs text-muted-foreground">Prochain prélèvement</p>
            <p class="text-sm font-semibold">
              <span class="font-normal text-muted-foreground"
                >le {{ nextRenewalDate }}</span
              >
            </p>
          </div>
        </div>

        <!-- Moyen de paiement (read-only — Stripe gère la modif via Checkout) -->
        <div class="flex flex-col gap-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Moyen de paiement
          </p>

          <div
            v-if="paymentMethods.length > 0"
            class="rounded-xl border bg-muted/40 p-3 flex items-center gap-3"
          >
            <div
              class="flex h-9 w-14 items-center justify-center rounded-md bg-background border text-xs font-bold tracking-wider text-foreground shrink-0 uppercase"
            >
              {{ paymentMethods[0].brand }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">
                •••• •••• •••• {{ paymentMethods[0].last4 }}
              </p>
              <p class="text-xs text-muted-foreground">
                Expire {{ String(paymentMethods[0].expMonth).padStart(2, '0') }}/{{
                  String(paymentMethods[0].expYear).slice(-2)
                }}
              </p>
            </div>
          </div>

          <div
            v-else
            class="rounded-xl border border-dashed bg-muted/20 p-4 text-center text-xs text-muted-foreground"
          >
            Aucun moyen de paiement enregistré. Souscris à un plan pour ajouter
            une carte.
          </div>
        </div>

        <!-- Historique des factures -->
        <div class="flex flex-col gap-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Factures récentes
          </p>

          <div
            v-if="isLoadingInvoices"
            class="flex justify-center py-6 text-muted-foreground"
          >
            <div
              class="h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin"
            />
          </div>

          <div
            v-else-if="invoices.length === 0"
            class="rounded-xl border border-dashed bg-muted/20 p-4 text-center text-xs text-muted-foreground"
          >
            Aucune facture pour le moment.
          </div>

          <div v-else class="rounded-xl border overflow-hidden">
            <div
              v-for="(invoice, i) in invoices"
              :key="invoice.id"
              :class="[
                'flex items-center gap-3 px-3 py-2.5',
                i < invoices.length - 1 ? 'border-b border-border' : '',
              ]"
            >
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">
                  {{ invoice.number || invoice.id }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ formatDate(invoice.created) }}
                </p>
              </div>
              <span class="shrink-0 text-xs font-medium tabular-nums">{{
                formatAmount(invoice.amountPaid, invoice.currency)
              }}</span>
              <span
                class="shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none"
                :class="invoiceStatusClass(invoice.status)"
                >{{ invoiceStatusLabel(invoice.status) }}</span
              >
              <a
                v-if="invoice.invoicePdf"
                :href="invoice.invoicePdf"
                target="_blank"
                rel="noopener"
                class="h-7 w-7 shrink-0 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                title="Télécharger le PDF Stripe"
              >
                <Download class="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter class="flex-col sm:flex-row gap-2 sm:items-center">
        <button
          v-if="user.plan !== 'free'"
          class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors mr-auto"
          @click="confirmCancelOpen = true"
        >
          <XCircle class="h-3.5 w-3.5" />
          Annuler l'abonnement
        </button>
        <Button variant="ghost" @click="open = false">Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- AlertDialog annulation abonnement -->
  <AlertDialog v-model:open="confirmCancelOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Annuler l'abonnement ?</AlertDialogTitle>
        <AlertDialogDescription>
          Votre plan {{ planLabel }} restera actif jusqu'à la fin de la période
          en cours. Vous serez ensuite basculé sur le plan Gratuit.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Conserver mon abonnement</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="cancelSubscription"
        >
          Confirmer l'annulation
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { CalendarClock, Download, Receipt, XCircle } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const open = defineModel<boolean>('open', { default: false })

const { user, planLabel, fetchMe } = useUser()
const billing = useBilling()

const confirmCancelOpen = ref(false)
const isLoadingInvoices = ref(false)

// Aliases réactifs
const invoices = billing.invoices
const paymentMethods = billing.paymentMethods

// Charge les données à l'ouverture
watch(open, async newVal => {
  if (!newVal) return
  isLoadingInvoices.value = true
  try {
    await Promise.all([
      billing.fetchSubscription(),
      billing.fetchInvoices(),
      billing.fetchPaymentMethods(),
    ])
  } catch (e) {
    console.warn('[billing] fetch failed', e)
  } finally {
    isLoadingInvoices.value = false
  }
})

const nextRenewalDate = computed(() => {
  const sub = billing.subscription.value
  if (!sub?.currentPeriodEnd) return null
  return new Date(sub.currentPeriodEnd).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatAmount(cents: number, currency: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

function invoiceStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    paid: 'Payé',
    open: 'En attente',
    void: 'Annulée',
    uncollectible: 'Impayée',
    draft: 'Brouillon',
  }
  return labels[status] || status
}

function invoiceStatusClass(status: string): string {
  if (status === 'paid') return 'bg-green-500/10 text-green-600'
  if (status === 'open') return 'bg-amber-500/10 text-amber-600'
  if (status === 'void' || status === 'uncollectible')
    return 'bg-destructive/10 text-destructive'
  return 'bg-muted text-muted-foreground'
}

async function cancelSubscription() {
  confirmCancelOpen.value = false
  try {
    await billing.cancelSubscription()
    await fetchMe()
    toast.success(
      "Résiliation enregistrée. Ton plan restera actif jusqu'à la fin de la période."
    )
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string } }
    if (err?.data?.code === 'stripe_unavailable') {
      toast.error("Stripe n'est pas configuré sur ce serveur.")
    } else {
      toast.error(err?.data?.detail || "Impossible d'annuler l'abonnement.")
    }
  }
}
</script>
