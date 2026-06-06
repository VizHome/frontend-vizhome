/**
 * useAdminTimeline — séries temporelles pour les graphiques admin.
 * Endpoint /api/v1/admin/timeline, staff-only.
 */
import { ref } from 'vue'

export interface UsersPerDay {
  date: string
  count: number
}

export interface RendersPerDay {
  date: string
  pending: number
  processing: number
  done: number
  failed: number
}

export interface ForumActivityPerDay {
  date: string
  topics: number
  replies: number
}

export interface AdminTimeline {
  days: number
  start: string
  end: string
  users_per_day: UsersPerDay[]
  renders_per_day: RendersPerDay[]
  renders_status_breakdown: Record<string, number>
  forum_activity_per_day: ForumActivityPerDay[]
}

const timeline = ref<AdminTimeline | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAdminTimeline() {
  const api = useApi()

  async function loadTimeline(days = 30): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const data = await api<AdminTimeline>(`/admin/timeline?days=${days}`)
      timeline.value = data
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger les statistiques.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    timeline,
    isLoading,
    error,
    loadTimeline,
  }
}
