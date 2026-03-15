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

        <!-- Comparaison des plans -->
        <div class="flex flex-col gap-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Tous les plans
          </p>
          <div class="flex flex-col gap-2">
            <div
              v-for="plan in PLANS"
              :key="plan.id"
              :class="[
                'rounded-xl border p-3 flex items-center gap-3 transition-colors',
                user.plan === plan.id
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-border bg-muted/30',
              ]"
            >
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
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-medium">{{ plan.label }}</p>
                  <span
                    v-if="user.plan === plan.id"
                    class="text-xs text-primary font-medium"
                    >● Actuel</span
                  >
                </div>
                <p class="text-xs text-muted-foreground truncate">
                  {{ plan.desc }}
                </p>
              </div>
              <p class="text-sm font-semibold shrink-0 tabular-nums">
                {{ plan.price }}
              </p>
            </div>
          </div>
        </div>

        <!-- CTA upgrade si pas enterprise -->
        <div
          v-if="user.plan !== 'enterprise'"
          class="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 flex flex-col gap-3"
        >
          <p class="text-sm font-medium">Passez au niveau supérieur</p>
          <p class="text-xs text-muted-foreground">
            Débloquez plus de rendus, de stockage et des fonctionnalités
            avancées.
          </p>

          <!-- free → pro -->
          <Button
            v-if="user.plan === 'free'"
            class="w-full"
            size="sm"
            :disabled="upgrading"
            @click="upgradeToPro"
          >
            <Zap class="h-4 w-4 mr-2" />
            {{
              upgrading ? 'Mise à niveau…' : 'Passer au plan Pro — 19 €/mois'
            }}
          </Button>

          <!-- pro → enterprise -->
          <div v-else-if="user.plan === 'pro'" class="flex flex-col gap-2">
            <Button
              class="w-full"
              size="sm"
              :disabled="upgrading"
              @click="upgradeToEnterprise"
            >
              <Zap class="h-4 w-4 mr-2" />
              {{ upgrading ? 'Traitement…' : 'Passer au plan Entreprise' }}
            </Button>
            <p class="text-xs text-center text-muted-foreground">
              Notre équipe commerciale vous contactera sous 24 h.
            </p>
          </div>
        </div>
      </div>

      <DialogFooter class="flex-col sm:flex-row gap-2 sm:items-center">
        <button
          v-if="user.plan !== 'free'"
          class="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mr-auto"
          @click="openBilling"
        >
          <CreditCard class="h-3.5 w-3.5" />
          Gérer la facturation
        </button>
        <Button variant="ghost" @click="open = false">Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  Building2,
  CalendarClock,
  CreditCard,
  Rocket,
  Sparkles,
  Zap,
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

// ─── Upgrade free → pro ───────────────────────────────────────────────────────
async function upgradeToPro() {
  upgrading.value = true
  // Simulation d'un appel de paiement (500 ms)
  await new Promise(resolve => setTimeout(resolve, 500))
  setUserPlan('pro')
  upgrading.value = false
  toast.success(
    'Bienvenue sur le plan Pro ! Accédez à 50 rendus/mois et 5 Go de stockage.'
  )
}

// ─── Upgrade pro → enterprise ─────────────────────────────────────────────────
async function upgradeToEnterprise() {
  upgrading.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  setUserPlan('enterprise')
  upgrading.value = false
  toast.success(
    'Plan Entreprise activé. Notre équipe commerciale vous contactera sous 24 h.'
  )
}

// ─── Date de renouvellement fictive ──────────────────────────────────────────
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

const PLANS: {
  id: UserPlan
  label: string
  desc: string
  price: string
  icon: unknown
  iconBg: string
  iconColor: string
}[] = [
  {
    id: 'free',
    label: 'Gratuit',
    desc: '5 rendus/mois · 1 Go stockage',
    price: '0 €/mois',
    icon: Sparkles,
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
  {
    id: 'pro',
    label: 'Pro',
    desc: '50 rendus/mois · 5 Go stockage',
    price: '19 €/mois',
    icon: Rocket,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    id: 'enterprise',
    label: 'Entreprise',
    desc: 'Rendus illimités · Stockage illimité',
    price: 'Sur devis',
    icon: Building2,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
]

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
