/**
 * useAdminBilling — subscriptions actives + invoices récentes Stripe (staff-only).
 */
import { ref } from 'vue'

export interface AdminSubscription {
  id: string
  user_id: number | null
  user_email: string
  status: string
  current_period_end: string | null
  cancel_at_period_end: boolean
  created: string | null
}

export interface AdminInvoice {
  id: string
  number: string
  user_email: string
  amount_paid: number
  currency: string
  status: string
  created: string | null
  hosted_invoice_url: string
  invoice_pdf: string
}

interface ListResponse<T> {
  count: number
  results: T[]
  mode?: string
  detail?: string
}

const subscriptions = ref<AdminSubscription[]>([])
const invoices = ref<AdminInvoice[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const stripeMode = ref<string>('ok')

export function useAdminBilling() {
  const api = useApi()

  async function loadAll(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const [subs, invs] = await Promise.all([
        api<ListResponse<AdminSubscription>>('/admin/subscriptions'),
        api<ListResponse<AdminInvoice>>('/admin/invoices'),
      ])
      subscriptions.value = subs.results
      invoices.value = invs.results
      stripeMode.value = subs.mode || invs.mode || 'ok'
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger les données billing.'
    } finally {
      isLoading.value = false
    }
  }

  return { subscriptions, invoices, isLoading, error, stripeMode, loadAll }
}
