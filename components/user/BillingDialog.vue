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

          <!-- Affichage carte (mode lecture) -->
          <div
            v-if="!editingCard"
            class="rounded-xl border bg-muted/40 p-3 flex items-center gap-3"
          >
            <div
              class="flex h-9 w-14 items-center justify-center rounded-md bg-background border text-xs font-bold tracking-wider text-foreground shrink-0"
            >
              {{ cardType }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">
                •••• •••• •••• {{ card.last4 || '——' }}
              </p>
              <p class="text-xs text-muted-foreground">
                Expire {{ card.expiry || '——' }}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              class="shrink-0 h-7 text-xs px-2.5"
              @click="startEditCard"
            >
              Modifier
            </Button>
          </div>

          <!-- Formulaire modification carte -->
          <div
            v-else
            class="rounded-xl border bg-muted/40 p-4 flex flex-col gap-3"
          >
            <p class="text-sm font-medium">Modifier la carte</p>

            <!-- Numéro de carte -->
            <div>
              <Label class="text-xs mb-1 block">Numéro de carte</Label>
              <Input
                v-model="cardForm.number"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                :class="{ 'ring-1 ring-destructive': cardErrors.number }"
                @input="formatCardNumber"
              />
              <p v-if="cardErrors.number" class="mt-1 text-xs text-destructive">
                {{ cardErrors.number }}
              </p>
            </div>

            <div class="flex gap-3">
              <!-- Expiration -->
              <div class="flex-1">
                <Label class="text-xs mb-1 block">Expiration</Label>
                <Input
                  v-model="cardForm.expiry"
                  placeholder="MM/AA"
                  maxlength="5"
                  :class="{ 'ring-1 ring-destructive': cardErrors.expiry }"
                  @input="formatExpiry"
                />
                <p
                  v-if="cardErrors.expiry"
                  class="mt-1 text-xs text-destructive"
                >
                  {{ cardErrors.expiry }}
                </p>
              </div>

              <!-- CVV -->
              <div class="w-24">
                <Label class="text-xs mb-1 block">CVV</Label>
                <Input
                  v-model="cardForm.cvv"
                  placeholder="123"
                  maxlength="4"
                  type="password"
                  :class="{ 'ring-1 ring-destructive': cardErrors.cvv }"
                />
                <p v-if="cardErrors.cvv" class="mt-1 text-xs text-destructive">
                  {{ cardErrors.cvv }}
                </p>
              </div>
            </div>

            <div class="flex gap-2 pt-1">
              <Button size="sm" @click="saveCard">Enregistrer</Button>
              <Button variant="ghost" size="sm" @click="cancelEditCard"
                >Annuler</Button
              >
            </div>
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
                @click="downloadInvoice(invoice)"
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
          @click="cancelSubscription"
        >
          Confirmer l'annulation
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { CalendarClock, Download, Receipt, XCircle } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const open = defineModel<boolean>('open', { default: false })

const { user, planLabel, setUserPlan } = useUser()

const confirmCancelOpen = ref(false)

// ─── Carte bancaire ───────────────────────────────────────────────────────────
const LS_CARD = 'vizhome:billing:card'

function loadCard() {
  if (!import.meta.client) return { last4: '4242', expiry: '12/27' }
  try {
    const raw = localStorage.getItem(LS_CARD)
    if (raw) return JSON.parse(raw) as { last4: string; expiry: string }
  } catch {}
  return { last4: '4242', expiry: '12/27' }
}

const card = ref(loadCard())
const editingCard = ref(false)
const cardForm = reactive({ number: '', expiry: '', cvv: '' })
const cardErrors = reactive({ number: '', expiry: '', cvv: '' })

const cardType = computed(() => {
  const n = cardForm.number.replace(/\s/g, '') || ''
  if (!editingCard.value) return 'VISA' // affichage par défaut
  if (/^4/.test(n)) return 'VISA'
  if (/^5[1-5]/.test(n)) return 'MC'
  if (/^3[47]/.test(n)) return 'AMEX'
  return '····'
})

function startEditCard() {
  cardForm.number = ''
  cardForm.expiry = ''
  cardForm.cvv = ''
  cardErrors.number = ''
  cardErrors.expiry = ''
  cardErrors.cvv = ''
  editingCard.value = true
}

function cancelEditCard() {
  editingCard.value = false
}

function formatCardNumber() {
  let v = cardForm.number.replace(/\D/g, '').slice(0, 16)
  cardForm.number = v.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry() {
  let v = cardForm.expiry.replace(/\D/g, '').slice(0, 4)
  if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2)
  cardForm.expiry = v
}

function saveCard() {
  cardErrors.number = ''
  cardErrors.expiry = ''
  cardErrors.cvv = ''

  const digits = cardForm.number.replace(/\s/g, '')
  let hasError = false

  if (digits.length < 13 || digits.length > 16) {
    cardErrors.number = 'Numéro de carte invalide (13–16 chiffres)'
    hasError = true
  }

  const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(cardForm.expiry)
  if (!expiryMatch) {
    cardErrors.expiry = 'Format requis : MM/AA'
    hasError = true
  } else {
    const month = parseInt(expiryMatch[1], 10)
    const year = 2000 + parseInt(expiryMatch[2], 10)
    const now = new Date()
    if (month < 1 || month > 12) {
      cardErrors.expiry = 'Mois invalide'
      hasError = true
    } else if (
      year < now.getFullYear() ||
      (year === now.getFullYear() && month < now.getMonth() + 1)
    ) {
      cardErrors.expiry = 'Carte expirée'
      hasError = true
    }
  }

  if (cardForm.cvv.length < 3) {
    cardErrors.cvv = 'CVV invalide'
    hasError = true
  }

  if (hasError) return

  const newCard = {
    last4: digits.slice(-4),
    expiry: cardForm.expiry,
  }
  card.value = newCard
  if (import.meta.client) {
    localStorage.setItem(LS_CARD, JSON.stringify(newCard))
  }
  editingCard.value = false
  toast.success('Carte mise à jour.')
}

// ─── Facturation fictive ──────────────────────────────────────────────────────
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

interface Invoice {
  id: number
  description: string
  date: string
  amount: string
  status: string
}

const MOCK_INVOICES: Invoice[] = [
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

function downloadInvoice(invoice: Invoice) {
  if (!import.meta.client) return
  const content = [
    '================================================',
    '                  VIZHOME',
    '           Facture / Reçu de paiement',
    '================================================',
    '',
    `  Description : ${invoice.description}`,
    `  Date        : ${invoice.date}`,
    `  Montant     : ${invoice.amount}`,
    `  Statut      : ${invoice.status}`,
    `  Client      : ${user.value.name}`,
    `  Email       : ${user.value.email}`,
    '',
    '================================================',
    '  Merci pour votre confiance.',
    '================================================',
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `facture-vizhome-${invoice.id}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  toast.success(`Facture téléchargée.`)
}

// ─── Annulation abonnement ────────────────────────────────────────────────────
function cancelSubscription() {
  confirmCancelOpen.value = false
  setUserPlan('free')
  toast.success('Abonnement annulé. Vous êtes maintenant sur le plan Gratuit.')
}
</script>
