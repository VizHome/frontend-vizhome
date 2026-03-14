<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <Receipt class="h-5 w-5 text-primary" />
          Facturation
        </DialogTitle>
        <DialogDescription>
          Gérez votre méthode de paiement et consultez vos factures.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-4 py-2">
        <!-- Prochain prélèvement -->
        <div
          v-if="user.plan !== 'free'"
          class="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 flex items-center gap-3"
        >
          <CalendarClock class="h-4 w-4 text-primary shrink-0" />
          <div class="flex-1">
            <p class="text-xs text-muted-foreground">Prochain prélèvement</p>
            <p class="text-sm font-semibold">
              {{ nextBillingAmount }}
              <span class="font-normal text-muted-foreground"
                >le {{ nextBillingDate }}</span
              >
            </p>
          </div>
        </div>

        <!-- Méthode de paiement -->
        <div class="flex flex-col gap-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Méthode de paiement
          </p>
          <div
            class="rounded-xl border bg-muted/40 p-3 flex items-center gap-3"
          >
            <div
              class="flex h-9 w-14 items-center justify-center rounded-md bg-background border text-xs font-bold tracking-wider text-foreground shrink-0"
            >
              VISA
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">
                •••• •••• •••• {{ MOCK_CARD.last4 }}
              </p>
              <p class="text-xs text-muted-foreground">
                Expire {{ MOCK_CARD.expiry }}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              class="shrink-0 h-7 text-xs px-2.5"
            >
              Modifier
            </Button>
          </div>
        </div>

        <!-- Historique des factures -->
        <div class="flex flex-col gap-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Factures récentes
          </p>
          <div class="rounded-xl border overflow-hidden">
            <div
              v-for="(invoice, i) in MOCK_INVOICES"
              :key="invoice.id"
              :class="[
                'flex items-center gap-3 px-3 py-2.5',
                i < MOCK_INVOICES.length - 1 ? 'border-b border-border' : '',
              ]"
            >
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">
                  {{ invoice.description }}
                </p>
                <p class="text-xs text-muted-foreground">{{ invoice.date }}</p>
              </div>
              <span class="shrink-0 text-xs font-medium tabular-nums">{{
                invoice.amount
              }}</span>
              <span
                class="shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold leading-none"
                :class="
                  invoice.status === 'Payé'
                    ? 'bg-green-500/10 text-green-600'
                    : 'bg-amber-500/10 text-amber-600'
                "
                >{{ invoice.status }}</span
              >
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                :title="`Télécharger ${invoice.description}`"
              >
                <Download class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter class="flex-col sm:flex-row gap-2 sm:items-center">
        <!-- Annuler l'abonnement (plan non-free seulement) -->
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
          en cours. Vous serez ensuite basculé sur le plan Gratuit et perdrez
          l'accès aux fonctionnalités avancées.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Conserver mon abonnement</AlertDialogCancel>
        <AlertDialogAction
          class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          @click="confirmCancelOpen = false"
        >
          Confirmer l'annulation
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CalendarClock, Download, Receipt, XCircle } from 'lucide-vue-next'

const open = defineModel<boolean>('open', { default: false })

const { user, planLabel } = useUser()

const confirmCancelOpen = ref(false)

// ─── Données fictives ─────────────────────────────────────────────────────────
const MOCK_CARD = {
  last4: '4242',
  expiry: '12/27',
}

const nextBillingDate = (() => {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})()

const nextBillingAmount = computed(() => {
  if (user.value.plan === 'pro') return '19,00 €'
  if (user.value.plan === 'enterprise') return 'Sur devis'
  return null
})

const MOCK_INVOICES = [
  {
    id: 1,
    description: 'Plan Pro — Février 2026',
    date: '1 févr. 2026',
    amount: '19,00 €',
    status: 'Payé',
  },
  {
    id: 2,
    description: 'Plan Pro — Janvier 2026',
    date: '1 janv. 2026',
    amount: '19,00 €',
    status: 'Payé',
  },
  {
    id: 3,
    description: 'Plan Pro — Décembre 2025',
    date: '1 déc. 2025',
    amount: '19,00 €',
    status: 'Payé',
  },
  {
    id: 4,
    description: 'Plan Pro — Novembre 2025',
    date: '1 nov. 2025',
    amount: '19,00 €',
    status: 'Payé',
  },
]
</script>
