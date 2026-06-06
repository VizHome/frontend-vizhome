/**
 * useSupport — Gestion des tickets de support côté utilisateur.
 *
 * État partagé (singleton module-level) : liste, ticket courant, messages.
 * Endpoints sous `/api/v1/support/`.
 */
import { ref } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketCategory =
  | 'technical'
  | 'billing'
  | 'account'
  | 'feature'
  | 'other'

export interface SupportAuthor {
  id: number
  name: string
  pseudo: string
  is_staff: boolean
}

export interface SupportMessage {
  id: number
  author: SupportAuthor | null
  from_staff: boolean
  body: string
  created_at: string
}

export interface SupportTicketListItem {
  id: number
  subject: string
  category: TicketCategory
  status: TicketStatus
  priority: TicketPriority
  user_email: string
  user_pseudo: string
  assignee_pseudo: string | null
  messages_count: number
  last_message_at: string | null
  last_message_from_staff: boolean
  created_at: string
  updated_at: string
  closed_at: string | null
}

export interface SupportTicketDetail extends SupportTicketListItem {
  messages: SupportMessage[]
}

interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ─── État singleton ───────────────────────────────────────────────────────
const tickets = ref<SupportTicketListItem[]>([])
const ticketsCount = ref(0)
const currentTicket = ref<SupportTicketDetail | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

// ─── Composable ───────────────────────────────────────────────────────────
export function useSupport() {
  const api = useApi()

  async function loadTickets(opts: { page?: number; pageSize?: number } = {}) {
    isLoading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 20))
      const data = await api<Paginated<SupportTicketListItem>>(
        `/support/tickets?${params.toString()}`,
      )
      tickets.value = data.results
      ticketsCount.value = data.count
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger les tickets.'
    } finally {
      isLoading.value = false
    }
  }

  async function loadTicket(id: number): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      currentTicket.value = await api<SupportTicketDetail>(`/support/tickets/${id}`)
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Ticket introuvable.'
      currentTicket.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function createTicket(payload: {
    subject: string
    category: TicketCategory
    priority: TicketPriority
    body: string
  }): Promise<SupportTicketDetail> {
    const ticket = await api<SupportTicketDetail>('/support/tickets', {
      method: 'POST',
      body: payload,
    })
    tickets.value = [ticket, ...tickets.value]
    ticketsCount.value += 1
    return ticket
  }

  async function replyToTicket(id: number, body: string): Promise<SupportMessage> {
    const msg = await api<SupportMessage>(`/support/tickets/${id}/messages`, {
      method: 'POST',
      body: { body },
    })
    if (currentTicket.value && currentTicket.value.id === id) {
      currentTicket.value.messages.push(msg)
      currentTicket.value.messages_count += 1
      currentTicket.value.last_message_at = msg.created_at
      currentTicket.value.last_message_from_staff = msg.from_staff
      // Réouverture côté UI si user répond après résolu
      if (currentTicket.value.status === 'resolved' && !msg.from_staff) {
        currentTicket.value.status = 'pending'
      }
    }
    return msg
  }

  // Helpers labels FR pour les enums (réutilisés dans les pages)
  const STATUS_LABELS: Record<TicketStatus, string> = {
    open: 'Ouvert',
    pending: 'En cours',
    resolved: 'Résolu',
    closed: 'Fermé',
  }
  const PRIORITY_LABELS: Record<TicketPriority, string> = {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Haute',
    urgent: 'Urgente',
  }
  const CATEGORY_LABELS: Record<TicketCategory, string> = {
    technical: 'Problème technique',
    billing: 'Facturation',
    account: 'Compte / accès',
    feature: 'Demande de fonctionnalité',
    other: 'Autre',
  }

  return {
    tickets, ticketsCount, currentTicket, isLoading, error,
    loadTickets, loadTicket, createTicket, replyToTicket,
    STATUS_LABELS, PRIORITY_LABELS, CATEGORY_LABELS,
  }
}
