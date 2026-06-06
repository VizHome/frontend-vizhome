/**
 * useForum — Forum communautaire (categories, topics, replies).
 *
 * Pattern singleton : les refs sont déclarés au niveau module → partagés
 * entre toutes les instances. Cohérent avec useAuth / useProjects / etc.
 *
 * Backend : Django DRF sous /api/v1/forum/ (voir bruno/07-Forum/).
 *
 * Lecture publique (pas de JWT requis pour GET). Écriture auth (POST/PATCH/DELETE).
 */
import { ref } from 'vue'

// ─── Types alignés sur les serializers DRF ────────────────────────────────
export interface ForumAuthor {
  id: number
  name: string
  avatar_url: string
  is_staff: boolean
}

export interface ForumCategory {
  id: number
  slug: string
  name: string
  description: string
  icon: string
  color: string
  order: number
  is_admin_only: boolean
  topics_count: number
  created_at: string
}

export interface ForumTopicListItem {
  id: number
  slug: string
  title: string
  author: ForumAuthor
  category_slug: string
  category_name: string
  is_pinned: boolean
  is_locked: boolean
  views_count: number
  replies_count: number
  last_reply_at: string | null
  created_at: string
  updated_at: string
}

export interface ForumTopicDetail extends ForumTopicListItem {
  content: string
  category: number
}

export interface ForumReply {
  id: number
  topic: number
  author: ForumAuthor
  content: string
  is_solution: boolean
  created_at: string
  updated_at: string
}

interface Paginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ─── État partagé (singleton) ─────────────────────────────────────────────
const categories = ref<ForumCategory[]>([])
const topics = ref<ForumTopicListItem[]>([])
const topicsCount = ref(0)
const topicsPage = ref(1)
const currentTopic = ref<ForumTopicDetail | null>(null)
const replies = ref<ForumReply[]>([])
const repliesCount = ref(0)
const isLoading = ref(false)
const error = ref<string | null>(null)

// ─── Composable ───────────────────────────────────────────────────────────
export function useForum() {
  const api = useApi()

  // ─── Catégories ─────────────────────────────────────────────────────────
  async function loadCategories(): Promise<void> {
    try {
      const data = await api<ForumCategory[]>('/forum/categories')
      categories.value = data
    } catch (e) {
      console.warn('[useForum] loadCategories failed', e)
    }
  }

  function getCategoryBySlug(slug: string): ForumCategory | undefined {
    return categories.value.find(c => c.slug === slug)
  }

  // ─── Topics ─────────────────────────────────────────────────────────────
  interface ListTopicsOpts {
    category?: string
    search?: string
    ordering?: string
    page?: number
    pageSize?: number
  }

  async function loadTopics(opts: ListTopicsOpts = {}): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const params = new URLSearchParams()
      params.set('page', String(opts.page ?? 1))
      params.set('page_size', String(opts.pageSize ?? 20))
      if (opts.category) params.set('category', opts.category)
      if (opts.search) params.set('search', opts.search)
      if (opts.ordering) params.set('ordering', opts.ordering)

      const data = await api<Paginated<ForumTopicListItem>>(
        `/forum/topics?${params.toString()}`
      )
      topics.value = data.results
      topicsCount.value = data.count
      topicsPage.value = opts.page ?? 1
    } catch (e) {
      error.value = _formatError(e) ?? 'Impossible de charger les topics.'
    } finally {
      isLoading.value = false
    }
  }

  async function loadTopic(id: number): Promise<ForumTopicDetail | null> {
    isLoading.value = true
    error.value = null
    try {
      const data = await api<ForumTopicDetail>(`/forum/topics/${id}`)
      currentTopic.value = data
      return data
    } catch (e) {
      error.value = _formatError(e) ?? 'Topic introuvable.'
      return null
    } finally {
      isLoading.value = false
    }
  }

  async function createTopic(input: {
    category: number
    title: string
    content: string
  }): Promise<ForumTopicDetail> {
    const data = await api<ForumTopicDetail>('/forum/topics', {
      method: 'POST',
      body: input,
    })
    return data
  }

  async function updateTopic(
    id: number,
    patch: Partial<{ title: string; content: string }>
  ): Promise<ForumTopicDetail> {
    const data = await api<ForumTopicDetail>(`/forum/topics/${id}`, {
      method: 'PATCH',
      body: patch,
    })
    if (currentTopic.value?.id === id) currentTopic.value = data
    return data
  }

  async function deleteTopic(id: number): Promise<void> {
    await api(`/forum/topics/${id}`, { method: 'DELETE' })
    topics.value = topics.value.filter(t => t.id !== id)
    if (currentTopic.value?.id === id) currentTopic.value = null
  }

  // ─── Replies ────────────────────────────────────────────────────────────
  async function loadReplies(
    topicId: number,
    page = 1,
    pageSize = 50
  ): Promise<void> {
    try {
      const data = await api<Paginated<ForumReply>>(
        `/forum/topics/${topicId}/replies?page=${page}&page_size=${pageSize}`
      )
      replies.value = data.results
      repliesCount.value = data.count
    } catch (e) {
      console.warn('[useForum] loadReplies failed', e)
      replies.value = []
      repliesCount.value = 0
    }
  }

  async function createReply(
    topicId: number,
    content: string
  ): Promise<ForumReply> {
    const data = await api<ForumReply>(`/forum/topics/${topicId}/replies`, {
      method: 'POST',
      body: { content },
    })
    replies.value.push(data)
    repliesCount.value++
    // MAJ optimiste des compteurs du topic courant
    if (currentTopic.value?.id === topicId) {
      currentTopic.value.replies_count++
      currentTopic.value.last_reply_at = data.created_at
    }
    return data
  }

  async function updateReply(id: number, content: string): Promise<ForumReply> {
    const data = await api<ForumReply>(`/forum/replies/${id}`, {
      method: 'PATCH',
      body: { content },
    })
    const idx = replies.value.findIndex(r => r.id === id)
    if (idx >= 0) replies.value[idx] = data
    return data
  }

  async function deleteReply(id: number): Promise<void> {
    await api(`/forum/replies/${id}`, { method: 'DELETE' })
    replies.value = replies.value.filter(r => r.id !== id)
    repliesCount.value = Math.max(0, repliesCount.value - 1)
    if (currentTopic.value) {
      currentTopic.value.replies_count = Math.max(
        0,
        currentTopic.value.replies_count - 1
      )
    }
  }

  // ─── Actions modération (staff / owner du topic) ────────────────────
  async function toggleTopicPin(topicId: number): Promise<boolean> {
    const res = await api<{ is_pinned: boolean }>(
      `/forum/topics/${topicId}/toggle-pin`,
      { method: 'POST' },
    )
    if (currentTopic.value?.id === topicId) {
      currentTopic.value.is_pinned = res.is_pinned
    }
    return res.is_pinned
  }

  async function toggleTopicLock(topicId: number): Promise<boolean> {
    const res = await api<{ is_locked: boolean }>(
      `/forum/topics/${topicId}/toggle-lock`,
      { method: 'POST' },
    )
    if (currentTopic.value?.id === topicId) {
      currentTopic.value.is_locked = res.is_locked
    }
    return res.is_locked
  }

  async function toggleReplySolution(replyId: number): Promise<boolean> {
    const res = await api<{ is_solution: boolean }>(
      `/forum/replies/${replyId}/toggle-solution`,
      { method: 'POST' },
    )
    // Une seule solution acceptée par topic : unset les autres côté UI aussi
    if (res.is_solution) {
      replies.value = replies.value.map(r => ({
        ...r,
        is_solution: r.id === replyId,
      }))
    } else {
      const idx = replies.value.findIndex(r => r.id === replyId)
      const target = idx >= 0 ? replies.value[idx] : undefined
      if (target) target.is_solution = false
    }
    return res.is_solution
  }

  return {
    // state
    categories,
    topics,
    topicsCount,
    topicsPage,
    currentTopic,
    replies,
    repliesCount,
    isLoading,
    error,
    // categories
    loadCategories,
    getCategoryBySlug,
    // topics
    loadTopics,
    loadTopic,
    createTopic,
    updateTopic,
    deleteTopic,
    // replies
    loadReplies,
    createReply,
    updateReply,
    deleteReply,
    // modération
    toggleTopicPin,
    toggleTopicLock,
    toggleReplySolution,
  }
}

// ─── Helper ───────────────────────────────────────────────────────────────
function _formatError(err: unknown): string | null {
  if (!err) return null
  const e = err as {
    data?: { detail?: string; code?: string; non_field_errors?: string[] }
    statusCode?: number
  }
  if (e.statusCode === 403 && e.data?.code === 'category_locked')
    return e.data.detail || 'Seul le staff peut poster dans cette catégorie.'
  if (e.statusCode === 403 && e.data?.code === 'topic_locked')
    return 'Ce topic est verrouillé — aucune nouvelle réponse possible.'
  if (e.data?.detail) return e.data.detail
  if (e.data?.non_field_errors?.[0]) return e.data.non_field_errors[0]
  return null
}
