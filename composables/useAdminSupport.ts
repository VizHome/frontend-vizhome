/**
 * useAdminSupport — Liste paginée de tous les tickets pour le staff.
 * Endpoint : /api/v1/admin/support/tickets
 */
import { ref } from 'vue'

import type {
  SupportTicketDetail,
  SupportTicketListItem,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from './useSupport'

interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const tickets = ref<SupportTicketListItem[]>([])
const count = ref(0)
const page = ref(1)
const isLoading = ref(false)

export function useAdminSupport() {
  const api = useApi()

  interface ListOpts {
    page?: number
    pageSize?: number
    status?: TicketStatus | 'all'
    priority?: TicketPriority | 'all'
    category?: TicketCategory | 'all'
    search?: string
    unassigned?: boolean
  }

  async function loadTickets(opts: ListOpts = {}): Promise<void> {
    isLoading.value = true
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 25))
      if (opts.status && opts.status !== 'all') params.set('status', opts.status)
      if (opts.priority && opts.priority !== 'all') params.set('priority', opts.priority)
      if (opts.category && opts.category !== 'all') params.set('category', opts.category)
      if (opts.search) params.set('search', opts.search)
      if (opts.unassigned) params.set('unassigned', 'true')

      const data = await api<Paginated<SupportTicketListItem>>(
        `/admin/support/tickets?${params.toString()}`,
      )
      tickets.value = data.results
      count.value = data.count
      page.value = opts.page ?? 1
    } finally {
      isLoading.value = false
    }
  }

  /** Staff modifie status/priority/assignee d'un ticket. */
  async function updateTicketStatus(
    id: number,
    patch: { status?: TicketStatus; priority?: TicketPriority; assignee?: number | null },
  ): Promise<SupportTicketDetail> {
    return api<SupportTicketDetail>(`/support/tickets/${id}`, {
      method: 'PATCH',
      body: patch,
    })
  }

  return { tickets, count, page, isLoading, loadTickets, updateTicketStatus }
}
