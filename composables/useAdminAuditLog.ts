/**
 * useAdminAuditLog — Liste paginée du journal d'actions admin (staff-only).
 */
import { ref } from 'vue'

export interface AdminAuditEntry {
  id: number
  actor: number | null
  actor_email: string
  action: string
  action_label: string
  target_type: string
  target_id: number | null
  target_repr: string
  payload: Record<string, unknown>
  ip_address: string | null
  created_at: string
}

interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const entries = ref<AdminAuditEntry[]>([])
const count = ref(0)
const page = ref(1)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAdminAuditLog() {
  const api = useApi()

  interface ListOpts {
    page?: number
    pageSize?: number
    action?: string
    actor?: string
    target_type?: string
  }

  async function loadEntries(opts: ListOpts = {}): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 30))
      if (opts.action) params.set('action', opts.action)
      if (opts.actor) params.set('actor', opts.actor)
      if (opts.target_type) params.set('target_type', opts.target_type)

      const data = await api<Paginated<AdminAuditEntry>>(
        `/admin/audit-log?${params.toString()}`
      )
      entries.value = data.results
      count.value = data.count
      page.value = opts.page ?? 1
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger l\'audit log.'
    } finally {
      isLoading.value = false
    }
  }

  return { entries, count, page, isLoading, error, loadEntries }
}
