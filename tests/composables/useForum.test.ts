/**
 * Tests pour useForum — chargement catégories, topics paginés, filtres,
 * gestion d'erreur, helper `getCategoryBySlug`.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const MOCK_CATEGORIES = [
  {
    id: 1,
    slug: 'general',
    name: 'Discussion générale',
    description: 'Tout et rien',
    icon: 'message-circle',
    color: 'blue',
    order: 1,
    is_admin_only: false,
    topics_count: 5,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    slug: 'help',
    name: 'Aide',
    description: 'Questions et entraide',
    icon: 'life-buoy',
    color: 'green',
    order: 2,
    is_admin_only: false,
    topics_count: 12,
    created_at: '2024-01-01T00:00:00Z',
  },
]

const MOCK_TOPICS_PAGE = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 10,
      slug: 'hello',
      title: 'Bonjour le monde',
      author: {
        id: 1,
        name: 'Jean',
        avatar_url: '',
        is_staff: false,
      },
      category_slug: 'general',
      category_name: 'Discussion générale',
      is_pinned: false,
      is_locked: false,
      views_count: 100,
      replies_count: 3,
      last_reply_at: '2024-06-01T10:00:00Z',
      created_at: '2024-06-01T08:00:00Z',
      updated_at: '2024-06-01T10:00:00Z',
    },
  ],
}

async function freshForum(apiMock: ReturnType<typeof vi.fn>) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useApi = vi.fn(() => apiMock)
  const mod = await import('~/composables/useForum')
  return mod.useForum()
}

describe('useForum', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loadCategories() peuple categories', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_CATEGORIES)
    const f = await freshForum(apiMock)
    await f.loadCategories()
    expect(f.categories.value).toHaveLength(2)
    expect(f.categories.value[0]!.slug).toBe('general')
  })

  it('loadCategories() ne crash pas en cas d\'erreur (log + early return)', async () => {
    const apiMock = vi.fn().mockRejectedValue(new Error('network'))
    const f = await freshForum(apiMock)
    await expect(f.loadCategories()).resolves.toBeUndefined()
    expect(f.categories.value).toHaveLength(0)
  })

  it('getCategoryBySlug() retourne la catégorie ou undefined', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_CATEGORIES)
    const f = await freshForum(apiMock)
    await f.loadCategories()
    expect(f.getCategoryBySlug('help')?.name).toBe('Aide')
    expect(f.getCategoryBySlug('inexistant')).toBeUndefined()
  })

  it('loadTopics() peuple topics + topicsCount + topicsPage', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_TOPICS_PAGE)
    const f = await freshForum(apiMock)
    await f.loadTopics({ page: 1 })
    expect(f.topics.value).toHaveLength(1)
    expect(f.topicsCount.value).toBe(2)
    expect(f.topicsPage.value).toBe(1)
  })

  it('loadTopics() construit l\'URL avec les filtres', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_TOPICS_PAGE)
    const f = await freshForum(apiMock)
    await f.loadTopics({
      category: 'help',
      search: 'react',
      ordering: '-created_at',
      page: 2,
      pageSize: 10,
    })

    const calledUrl = apiMock.mock.calls[0]![0] as string
    expect(calledUrl).toContain('page=2')
    expect(calledUrl).toContain('page_size=10')
    expect(calledUrl).toContain('category=help')
    expect(calledUrl).toContain('search=react')
    expect(calledUrl).toContain('ordering=-created_at')
  })

  it('loadTopics() : page par défaut = 1', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_TOPICS_PAGE)
    const f = await freshForum(apiMock)
    await f.loadTopics()
    const calledUrl = apiMock.mock.calls[0]![0] as string
    expect(calledUrl).toContain('page=1')
    expect(calledUrl).toContain('page_size=20')
  })

  it('loadTopics() : erreur réseau peuple error.value', async () => {
    const apiMock = vi.fn().mockRejectedValue({
      data: { detail: 'Service indisponible' },
    })
    const f = await freshForum(apiMock)
    await f.loadTopics()
    expect(f.error.value).toBeTruthy()
    expect(f.isLoading.value).toBe(false)
  })

  it('loadTopics() : isLoading toggle correctement', async () => {
    let resolve: (v: unknown) => void = () => {}
    const apiMock = vi.fn(
      () =>
        new Promise(r => {
          resolve = r
        })
    )
    const f = await freshForum(apiMock)
    const p = f.loadTopics()
    expect(f.isLoading.value).toBe(true)
    resolve(MOCK_TOPICS_PAGE)
    await p
    expect(f.isLoading.value).toBe(false)
  })
})
