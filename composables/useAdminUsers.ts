/**
 * useAdminUsers — Liste paginée + actions de modération sur les users.
 * Staff-only. Endpoints sous /api/v1/admin/users.
 */
import { ref } from 'vue'

export interface AdminUser {
  id: number
  email: string
  first_name: string
  last_name: string
  plan: 'free' | 'pro' | 'enterprise'
  is_active: boolean
  is_staff: boolean
  date_joined: string
  last_login: string | null
  storage_used_bytes: number
  renders_this_month: number
  total_projects: number
}

interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const users = ref<AdminUser[]>([])
const count = ref(0)
const page = ref(1)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAdminUsers() {
  const api = useApi()

  interface ListOpts {
    page?: number
    pageSize?: number
    search?: string
    plan?: string
    is_staff?: boolean
    is_active?: boolean
    ordering?: string
  }

  async function loadUsers(opts: ListOpts = {}): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 25))
      if (opts.search) params.set('search', opts.search)
      if (opts.plan) params.set('plan', opts.plan)
      if (typeof opts.is_staff === 'boolean')
        params.set('is_staff', String(opts.is_staff))
      if (typeof opts.is_active === 'boolean')
        params.set('is_active', String(opts.is_active))
      if (opts.ordering) params.set('ordering', opts.ordering)

      const data = await api<Paginated<AdminUser>>(
        `/admin/users?${params.toString()}`
      )
      users.value = data.results
      count.value = data.count
      page.value = opts.page ?? 1
    } catch (e: unknown) {
      const err = e as { statusCode?: number; data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger les users.'
    } finally {
      isLoading.value = false
    }
  }

  async function updateUser(
    id: number,
    patch: Partial<{ is_active: boolean; is_staff: boolean }>
  ): Promise<AdminUser> {
    const data = await api<AdminUser>(`/admin/users/${id}`, {
      method: 'PATCH',
      body: patch,
    })
    // MAJ locale optimiste
    const idx = users.value.findIndex(u => u.id === id)
    if (idx >= 0) users.value[idx] = { ...users.value[idx], ...data }
    return data
  }

  return {
    users,
    count,
    page,
    isLoading,
    error,
    loadUsers,
    updateUser,
  }
}
