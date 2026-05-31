/**
 * useAdminForumMod — liste paginée + filtres pour la modération forum (staff).
 * Réutilise les endpoints forum existants (toggle-pin / toggle-lock / DELETE).
 */
import { ref } from 'vue'

import type { ForumTopicListItem } from './useForum'

interface Paginated<T> {
  count: number
  results: T[]
}

const topics = ref<ForumTopicListItem[]>([])
const count = ref(0)
const page = ref(1)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useAdminForumMod() {
  const api = useApi()

  interface ListOpts {
    page?: number
    pageSize?: number
    category?: string
    search?: string
    ordering?: string
  }

  async function loadTopics(opts: ListOpts = {}): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 25))
      if (opts.category) params.set('category', opts.category)
      if (opts.search) params.set('search', opts.search)
      if (opts.ordering) params.set('ordering', opts.ordering)

      const data = await api<Paginated<ForumTopicListItem>>(
        `/admin/forum/topics?${params.toString()}`
      )
      topics.value = data.results
      count.value = data.count
      page.value = opts.page ?? 1
    } catch (e: unknown) {
      const err = e as { data?: { detail?: string } }
      error.value = err.data?.detail || 'Impossible de charger les topics.'
    } finally {
      isLoading.value = false
    }
  }

  // Actions modération — réutilise les endpoints publics du forum
  async function togglePin(id: number): Promise<boolean> {
    const res = await api<{ is_pinned: boolean }>(
      `/forum/topics/${id}/toggle-pin`,
      { method: 'POST' },
    )
    const t = topics.value.find(x => x.id === id)
    if (t) t.is_pinned = res.is_pinned
    return res.is_pinned
  }

  async function toggleLock(id: number): Promise<boolean> {
    const res = await api<{ is_locked: boolean }>(
      `/forum/topics/${id}/toggle-lock`,
      { method: 'POST' },
    )
    const t = topics.value.find(x => x.id === id)
    if (t) t.is_locked = res.is_locked
    return res.is_locked
  }

  async function deleteTopic(id: number): Promise<void> {
    await api(`/forum/topics/${id}`, { method: 'DELETE' })
    topics.value = topics.value.filter(t => t.id !== id)
    count.value = Math.max(0, count.value - 1)
  }

  return {
    topics, count, page, isLoading, error,
    loadTopics, togglePin, toggleLock, deleteTopic,
  }
}
