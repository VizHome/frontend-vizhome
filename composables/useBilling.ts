/**
 * useBilling — Plans publics, état d'abonnement, Checkout Stripe, factures.
 *
 * Le backend gère toute la logique Stripe (création de Customer, Checkout
 * Session, webhooks). Le frontend se contente d'afficher l'état + déclencher
 * les redirections vers Stripe.
 */
import { computed, ref } from 'vue'

// ─── Types publics ────────────────────────────────────────────────────────
export type PlanName = 'free' | 'pro' | 'enterprise'

export interface Plan {
  name: PlanName
  label: string
  description: string
  /** Centimes EUR / mois, null si gratuit ou sur devis */
  priceEur: number | null
  rendersLimit: number
  storageLimitBytes: number
  isBillable: boolean
}

export interface Subscription {
  hasSubscription: boolean
  plan: PlanName
  status: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

export interface Invoice {
  id: string
  number: string | null
  amountPaid: number // cents
  currency: string
  status: string
  created: string
  hostedInvoiceUrl: string | null
  invoicePdf: string | null
}

export interface PaymentMethod {
  id: string
  brand: string
  last4: string
  expMonth: number
  expYear: number
}

// ─── DTOs backend ─────────────────────────────────────────────────────────
interface ApiPlan {
  name: PlanName
  label: string
  description: string
  price_eur: number | null
  renders_limit: number
  storage_limit_bytes: number
  is_billable: boolean
}

interface ApiSubscription {
  has_subscription: boolean
  plan: PlanName
  status: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
}

interface ApiInvoice {
  id: string
  number: string | null
  amount_paid: number
  currency: string
  status: string
  created: string
  hosted_invoice_url: string | null
  invoice_pdf: string | null
}

interface ApiPaymentMethod {
  id: string
  brand: string
  last4: string
  exp_month: number
  exp_year: number
}

// ─── État singleton ───────────────────────────────────────────────────────
const plans = ref<Plan[]>([])
const subscription = ref<Subscription | null>(null)
const invoices = ref<Invoice[]>([])
const paymentMethods = ref<PaymentMethod[]>([])
// État d'erreur partagé — permet aux pages billing d'afficher un Alert
// destructive cohérent (cf. pattern existant dans useProjects, useGallery,
// useForum, useSupport, useAdmin*).
const isLoading = ref(false)
const error = ref<string | null>(null)

function setError(err: unknown, fallback: string): void {
  const e = err as { data?: { detail?: string }, statusCode?: number }
  error.value = e?.data?.detail ?? fallback
}

// ─── Composable ───────────────────────────────────────────────────────────
export function useBilling() {
  const api = useApi()
  const config = useRuntimeConfig()

  // ─── Plans (public, pas d'auth) ────────────────────────────────────────
  async function fetchPlans(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      // Cet endpoint est public — pas besoin de token
      const data = await $fetch<ApiPlan[]>(`${config.public.apiUrl}/billing/plans`)
      plans.value = data.map(p => ({
        name: p.name,
        label: p.label,
        description: p.description,
        priceEur: p.price_eur,
        rendersLimit: p.renders_limit,
        storageLimitBytes: p.storage_limit_bytes,
        isBillable: p.is_billable,
      }))
    }
    catch (err) {
      setError(err, 'Impossible de charger les plans tarifaires.')
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  // ─── Subscription ──────────────────────────────────────────────────────
  async function fetchSubscription(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await api<ApiSubscription>('/me/subscription')
      subscription.value = {
        hasSubscription: data.has_subscription,
        plan: data.plan,
        status: data.status,
        currentPeriodEnd: data.current_period_end,
        cancelAtPeriodEnd: data.cancel_at_period_end,
      }
    }
    catch (err) {
      setError(err, 'Impossible de récupérer votre abonnement.')
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Lance le Checkout Stripe pour passer sur `plan`.
   * Redirige le navigateur vers Stripe (returns void).
   */
  async function startCheckout(plan: 'pro' | 'enterprise'): Promise<void> {
    error.value = null
    try {
      const res = await api<{ checkout_url: string; session_id: string }>(
        '/me/subscription/checkout',
        { method: 'POST', body: { plan } }
      )
      // Redirection vers Stripe — l'utilisateur revient sur /account/billing après
      if (import.meta.client) {
        window.location.href = res.checkout_url
      }
    }
    catch (err) {
      setError(err, 'Le checkout Stripe est temporairement indisponible.')
      throw err
    }
  }

  /** Annule l'abonnement à la fin de la période en cours. */
  async function cancelSubscription(): Promise<void> {
    error.value = null
    try {
      await api('/me/subscription/cancel', { method: 'POST' })
      await fetchSubscription()
    }
    catch (err) {
      setError(err, "L'annulation a échoué. Réessayez plus tard.")
      throw err
    }
  }

  // ─── Invoices ──────────────────────────────────────────────────────────
  async function fetchInvoices(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await api<ApiInvoice[]>('/me/invoices')
      invoices.value = data.map(i => ({
        id: i.id,
        number: i.number,
        amountPaid: i.amount_paid,
        currency: i.currency,
        status: i.status,
        created: i.created,
        hostedInvoiceUrl: i.hosted_invoice_url,
        invoicePdf: i.invoice_pdf,
      }))
    }
    catch (err) {
      setError(err, 'Impossible de charger les factures.')
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  // ─── Payment methods ───────────────────────────────────────────────────
  async function fetchPaymentMethods(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await api<ApiPaymentMethod[]>('/me/payment-methods')
      paymentMethods.value = data.map(pm => ({
        id: pm.id,
        brand: pm.brand,
        last4: pm.last4,
        expMonth: pm.exp_month,
        expYear: pm.exp_year,
      }))
    }
    catch (err) {
      setError(err, 'Impossible de charger les moyens de paiement.')
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  // ─── Computed utilitaires ──────────────────────────────────────────────
  const formattedAmount = computed(() => (cents: number, currency = 'eur') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100)
  })

  function getPlan(name: PlanName): Plan | undefined {
    return plans.value.find(p => p.name === name)
  }

  return {
    // état
    plans,
    subscription,
    invoices,
    paymentMethods,
    isLoading,
    error,
    // actions
    fetchPlans,
    fetchSubscription,
    startCheckout,
    cancelSubscription,
    fetchInvoices,
    fetchPaymentMethods,
    // helpers
    formattedAmount,
    getPlan,
  }
}
