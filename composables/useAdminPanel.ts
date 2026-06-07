/**
 * useAdminPanel — Client du dashboard admin (staff only).
 *
 * Le backend expose un endpoint consolidé qui retourne TOUTES les
 * métriques en un seul appel — évite N round-trips depuis le frontend.
 *
 * Auth : nécessite un user `is_staff=true` (sinon 403 côté backend).
 */
import { ref } from 'vue'

// ─── Types alignés sur AdminOverviewView (apps/admin_panel/views.py) ─────
export interface AdminOverviewUsers {
  total: number
  new_today: number
  new_this_week: number
  new_this_month: number
  by_plan: Record<string, number>
  two_factor_enabled: number
  staff_count: number
  recent: Array<{
    id: number
    email: string
    first_name: string
    last_name: string
    plan: string
    is_staff: boolean
    date_joined: string
  }>
}

export interface AdminOverviewSessions {
  total_active: number
  unique_users_active: number
}

export interface AdminOverviewRenders {
  total: number
  this_month: number
  by_status: Record<string, number>
  by_source: Record<string, number>
  success_rate: number | null
  recent: Array<{
    id: number
    status: string
    source: string
    output_type: string
    provider: string
    created_at: string
    user__email: string
  }>
}

export interface AdminOverviewProjects {
  total: number
  archived: number
  with_scene: number
  avg_models_per_project: number
}

export interface AdminOverviewStorage {
  total_bytes: number
  top_users: Array<{
    id: number
    email: string
    plan: string
    bytes: number
  }>
}

export interface AdminOverviewBilling {
  paying_users: number
  mrr_eur: number
  mrr_cents: number
  by_plan: Record<string, number>
}

export interface AdminOverviewForum {
  categories: number
  topics: number
  replies: number
  uploads_total: number
  uploads_orphan: number
  pinned_topics: number
  locked_topics: number
  recent_topics: Array<{
    id: number
    title: string
    created_at: string
    replies_count: number
    views_count: number
    is_pinned: boolean
    is_locked: boolean
    author__email: string
    category__name: string
  }>
}

export interface AdminOverviewSystem {
  gemini_configured: boolean
  stripe_configured: boolean
  google_oauth_configured: boolean
  github_oauth_configured: boolean
  minio_configured: boolean
  otel_configured: boolean
  render_provider: string
}

export interface AdminOverview {
  generated_at: string
  users: AdminOverviewUsers
  sessions: AdminOverviewSessions
  renders: AdminOverviewRenders
  projects: AdminOverviewProjects
  storage: AdminOverviewStorage
  billing: AdminOverviewBilling
  forum: AdminOverviewForum
  system: AdminOverviewSystem
}

// ─── État singleton ──────────────────────────────────────────────────────
const overview = ref<AdminOverview | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const lastFetchedAt = ref<number>(0)

export function useAdminPanel() {
  const api = useApi()

  async function loadOverview(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await api<AdminOverview>('/admin/overview')
      overview.value = data
      lastFetchedAt.value = Date.now()
    } catch (e: unknown) {
      const err = e as { statusCode?: number; data?: { detail?: string } }
      if (err.statusCode === 403) {
        error.value = 'Accès réservé au staff.'
      } else if (err.statusCode === 401) {
        error.value = 'Session expirée — reconnecte-toi.'
      } else {
        error.value = err.data?.detail || 'Impossible de charger le dashboard.'
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    overview,
    isLoading,
    error,
    lastFetchedAt,
    loadOverview,
  }
}

// ─── Helpers de formatage (réutilisables dans les composants admin) ──────

/** Formate un nombre d'octets en MB/GB/TB lisible. */
export function formatBytes(bytes: number): string {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1)
  return `${(bytes / k ** i).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`
}

/** Formate un timestamp ISO en relatif (il y a X min/h/j). */
export function relativeTime(iso: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return "à l'instant"
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`
  if (s < 86_400) return `il y a ${Math.floor(s / 3600)} h`
  if (s < 604_800) return `il y a ${Math.floor(s / 86_400)} j`
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
}
