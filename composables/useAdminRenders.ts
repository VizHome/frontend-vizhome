/**
 * useAdminRenders — Liste paginée des renders, staff-only.
 */
import { ref } from 'vue'

export interface AdminRender {
  id: number
  user_id: number
  user_email: string
  source: 'prompt' | 'sketch' | 'screenshot'
  output_type: '2d' | '3d'
  status: 'pending' | 'processing' | 'done' | 'failed'
  provider: string
  prompt: string
  title: string
  error_message: string
  created_at: string
  updated_at: string
  completed_at: string | null
}

interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const renders = ref<AdminRender[]>([])
const count = ref(0)
const page = ref(1)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAdminRenders() {
  const api = useApi()

  interface ListOpts {
    page?: number
    pageSize?: number
    status?: string
    source?: string
    user_id?: number
    ordering?: string
  }

  async function loadRenders(opts: ListOpts = {}): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 25))
      if (opts.status) params.set('status', opts.status)
      if (opts.source) params.set('source', opts.source)
      if (opts.user_id) params.set('user_id', String(opts.user_id))
      if (opts.ordering) params.set('ordering', opts.ordering)

      const data = await api<Paginated<AdminRender>>(
        `/admin/renders?${params.toString()}`
      )
      renders.value = data.results
      count.value = data.count
      page.value = opts.page ?? 1
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger les renders.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    renders,
    count,
    page,
    isLoading,
    error,
    loadRenders,
  }
}
