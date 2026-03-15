<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <CreditCard class="h-5 w-5 text-primary" />
          Abonnement
        </DialogTitle>
        <DialogDescription>
          Votre plan actuel et les options disponibles.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-4 py-2">
        <!-- Plan actuel -->
        <div
          class="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex items-center gap-4"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0"
          >
            <component :is="currentPlanIcon" class="h-6 w-6 text-primary" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="font-semibold text-sm">Plan {{ planLabel }}</p>
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                :class="planBadgeClass"
                >Actuel</span
              >
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">
              {{ currentPlanDesc }}
            </p>
            <div v-if="renewalDate" class="flex items-center gap-1.5 mt-2">
              <CalendarClock
                class="h-3.5 w-3.5 text-muted-foreground shrink-0"
              />
              <p class="text-xs text-muted-foreground">
                Renouvellement le
                <span class="font-medium text-foreground">{{
                  renewalDate
                }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Comparaison des plans — cliquables -->
        <div class="flex flex-col gap-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Changer de plan
          </p>
          <div class="flex flex-col gap-2">
            <button
              v-for="plan in PLANS"
              :key="plan.id"
              :disabled="user.plan === plan.id || upgrading"
              :class="[
                'rounded-xl border p-3 flex items-center gap-3 transition-all text-left w-full',
                user.plan === plan.id
                  ? 'border-primary/60 bg-primary/5 ring-1 ring-primary/30 cursor-default'
                  : 'border-border bg-muted/30 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm cursor-pointer',
                upgrading && user.plan !== plan.id
                  ? 'opacity-50 cursor-not-allowed'
                  : '',
              ]"
              @click="user.plan !== plan.id && requestPlanChange(plan.id)"
            >
              <!-- Icône -->
              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                :class="plan.iconBg"
              >
                <component
                  :is="plan.icon"
                  class="h-4 w-4"
                  :class="plan.iconColor"
                />
              </div>

              <!-- Infos -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-medium">{{ plan.label }}</p>
                  <span
                    v-if="user.plan === plan.id"
                    class="text-xs text-primary font-medium"
                    >● Actuel</span
                  >
                  <span
                    v-else-if="isDowngrade(plan.id)"
                    class="text-[10px] text-muted-foreground border border-border rounded-full px-1.5 py-0.5 leading-none"
                    >Rétrograder</span
                  >
                </div>
                <p class="text-xs text-muted-foreground truncate">
                  {{ plan.desc }}
                </p>
              </div>

              <!-- Prix -->
              <p class="text-sm font-semibold shrink-0 tabular-nums">
                {{ plan.price }}
              </p>

              <!-- Chevron si non-actuel -->
              <ChevronRight
                v-if="user.plan !== plan.id"
                class="h-4 w-4 shrink-0 text-muted-foreground"
              />
            </button>
          </div>
        </div>
      </div>

      <DialogFooter class="flex-col sm:flex-row gap-2 sm:items-center">
        <!-- Résiliation -->
        <button
          v-if="user.plan !== 'free'"
          class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors mr-auto"
          @click="requestCancel"
        >
          <XCircle class="h-3.5 w-3.5" />
          Résilier l'abonnement
        </button>
        <button
          v-if="user.plan !== 'free'"
          class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          @click="openBilling"
        >
          <CreditCard class="h-3.5 w-3.5" />
          Gérer la facturation
        </button>
        <Button variant="ghost" @click="open = false">Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- ── AlertDialog : confirmation changement de plan ─────────────────────── -->
  <AlertDialog :open="confirmOpen" @update:open="confirmOpen = $event">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ confirmTitle }}
        </AlertDialogTitle>
        <AlertDialogDescription as="div">
          <span class="block mb-3">{{ confirmDescription }}</span>

          <!-- Liste des risques -->
          <ul v-if="confirmRisks.length" class="space-y-1.5">
            <li
              v-for="risk in confirmRisks"
              :key="risk"
              class="flex items-start gap-2 text-sm"
            >
              <AlertTriangle
                class="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5"
              />
              <span>{{ risk }}</span>
            </li>
          </ul>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="confirmOpen = false"
          >Annuler</AlertDialogCancel
        >
        <AlertDialogAction
          :class="
            confirmIsDestructive
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : ''
          "
          @click="confirmAction"
        >
          {{
            confirmIsDestructive
              ? 'Confirmer la résiliation'
              : 'Confirmer le changement'
          }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  ChevronRight,
  CreditCard,
  Rocket,
  Sparkles,
  XCircle,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import type { UserPlan } from '~/composables/useUser'

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ 'open-billing': [] }>()

const { user, planLabel, setUserPlan } = useUser()

const upgrading = ref(false)

function openBilling() {
  open.value = false
  emit('open-billing')
}

// ─── Définition des plans ─────────────────────────────────────────────────────
const PLANS: {
  id: UserPlan
  label: string
  desc: string
  price: string
  icon: unknown
  iconBg: string
  iconColor: string
  perks: string[] // avantages de ce plan (pour calculer les pertes)
}[] = [
  {
    id: 'free',
    label: 'Gratuit',
    desc: '5 rendus/mois · 1 Go stockage',
    price: '0 €/mois',
    icon: Sparkles,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
    perks: ['5 rendus/mois', '1 Go de stockage'],
  },
  {
    id: 'pro',
    label: 'Pro',
    desc: '50 rendus/mois · 5 Go stockage',
    price: '19 €/mois',
    icon: Rocket,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    perks: [
      '50 rendus/mois',
      '5 Go de stockage',
      "Résolutions jusqu'à 4096 px",
      'Export multi-format (PNG, JPG, WebP)',
      'Support prioritaire',
    ],
  },
  {
    id: 'enterprise',
    label: 'Entreprise',
    desc: 'Rendus illimités · Stockage illimité',
    price: 'Sur devis',
    icon: Building2,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    perks: [
      'Rendus illimités',
      'Stockage illimité',
      "Résolutions jusqu'à 4096 px",
      'Export multi-format',
      'Support dédié 24 h/24',
      'Accès API',
      'Gestion multi-utilisateurs',
    ],
  },
]

// ─── Helpers plan ─────────────────────────────────────────────────────────────
const PLAN_RANK: Record<UserPlan, number> = { free: 0, pro: 1, enterprise: 2 }

function isDowngrade(target: UserPlan): boolean {
  return PLAN_RANK[target] < PLAN_RANK[user.value.plan]
}

function planChangeLabel(target: UserPlan): string {
  if (isDowngrade(target)) {
    const t = PLANS.find(p => p.id === target)!
    return `Rétrograder → ${t.label}`
  }
  if (target === 'pro') return 'Passer au Pro'
  if (target === 'enterprise') return "Passer à l'Entreprise"
  return 'Choisir'
}

/** Calcule la liste des avantages perdus en passant de `from` à `to`. */
function computeRisks(from: UserPlan, to: UserPlan): string[] {
  const fromPlan = PLANS.find(p => p.id === from)!
  const toPlan = PLANS.find(p => p.id === to)!
  // Avantages présents dans `from` mais absents dans `to`
  return fromPlan.perks
    .filter(perk => !toPlan.perks.includes(perk))
    .map(perk => `Perte de : ${perk}`)
}

// ─── Modale de confirmation ───────────────────────────────────────────────────
const confirmOpen = ref(false)
const confirmTitle = ref('')
const confirmDescription = ref('')
const confirmRisks = ref<string[]>([])
const confirmIsDestructive = ref(false)
const pendingPlan = ref<UserPlan | null>(null)

function requestPlanChange(target: UserPlan) {
  const targetPlan = PLANS.find(p => p.id === target)!
  const downgrade = isDowngrade(target)
  pendingPlan.value = target

  confirmIsDestructive.value = downgrade || target === 'free'

  if (downgrade) {
    confirmTitle.value = `Rétrograder vers le plan ${targetPlan.label} ?`
    confirmDescription.value = `Vous perdrez l'accès aux avantages suivants dès la fin de la période en cours :`
    confirmRisks.value = computeRisks(user.value.plan, target)
  } else {
    confirmTitle.value = `Passer au plan ${targetPlan.label} ?`
    confirmDescription.value =
      target === 'enterprise'
        ? 'Notre équipe commerciale vous contactera sous 24 h pour finaliser votre abonnement Entreprise.'
        : `Vous serez facturé ${targetPlan.price} à compter de maintenant.`
    confirmRisks.value = []
  }

  confirmOpen.value = true
}

function requestCancel() {
  pendingPlan.value = 'free'
  confirmIsDestructive.value = true
  confirmTitle.value = 'Résilier votre abonnement ?'
  confirmDescription.value = `Votre plan ${planLabel.value} restera actif jusqu'à la fin de la période en cours. Vous perdrez ensuite l'accès aux avantages suivants :`
  confirmRisks.value = computeRisks(user.value.plan, 'free')
  confirmOpen.value = true
}

async function confirmAction() {
  confirmOpen.value = false
  if (!pendingPlan.value) return

  upgrading.value = true
  await new Promise(resolve => setTimeout(resolve, 400))
  const target = pendingPlan.value
  setUserPlan(target)
  upgrading.value = false
  pendingPlan.value = null

  const targetLabel = PLANS.find(p => p.id === target)!.label
  if (target === 'free') {
    toast.success(
      'Abonnement résilié. Vous êtes maintenant sur le plan Gratuit.'
    )
  } else if (target === 'enterprise') {
    toast.success(
      'Plan Entreprise activé. Notre équipe vous contacte sous 24 h.'
    )
  } else {
    toast.success(`Plan ${targetLabel} activé.`)
  }
}

// ─── Computed affichage ───────────────────────────────────────────────────────
const renewalDate = computed(() => {
  if (user.value.plan === 'free') return null
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const currentPlanIcon = computed(
  () => PLANS.find(p => p.id === user.value.plan)?.icon ?? Sparkles
)

const currentPlanDesc = computed(
  () => PLANS.find(p => p.id === user.value.plan)?.desc ?? ''
)

const planBadgeClass = computed(() => {
  const classes: Record<UserPlan, string> = {
    free: 'bg-muted text-muted-foreground',
    pro: 'bg-primary/15 text-primary',
    enterprise: 'bg-amber-500/15 text-amber-600',
  }
  return classes[user.value.plan]
})
</script>
