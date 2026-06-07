/**
 * Tests pour useProjects — listing paginé, CRUD, état isLoading,
 * mise à jour de la liste après update/remove.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const MOCK_PROJECT_API = {
  id: 1,
  title: 'Maison du futur',
  description: 'Concept architectural',
  thumbnail_url: 'https://cdn.example.com/thumb.jpg',
  is_archived: false,
  models_count: 2,
  created_at: '2024-06-01T10:00:00Z',
  updated_at: '2024-06-02T10:00:00Z',
}

const MOCK_PAGINATED = {
  count: 1,
  next: null,
  previous: null,
  results: [MOCK_PROJECT_API],
}

async function freshProjects(apiMock: ReturnType<typeof vi.fn>) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useApi = vi.fn(() => apiMock)
  const mod = await import('~/composables/useProjects')
  return mod.useProjects()
}

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('load() peuple la liste + totalCount', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const p = await freshProjects(apiMock)
    await p.load()
    expect(p.projects.value).toHaveLength(1)
    expect(p.projects.value[0]!.title).toBe('Maison du futur')
    expect(p.projects.value[0]!.thumbnailUrl).toBe(
      'https://cdn.example.com/thumb.jpg'
    )
    expect(p.totalCount.value).toBe(1)
  })

  it('load() mappe snake_case → camelCase', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const p = await freshProjects(apiMock)
    await p.load()
    expect(p.projects.value[0]!.isArchived).toBe(false)
    expect(p.projects.value[0]!.modelsCount).toBe(2)
    expect(p.projects.value[0]!.createdAt).toBe('2024-06-01T10:00:00Z')
  })

  it('hasMore = false si tout est chargé', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const p = await freshProjects(apiMock)
    await p.load()
    expect(p.hasMore.value).toBe(false)
  })

  it('hasMore = true si totalCount > projects.length', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValue({ ...MOCK_PAGINATED, count: 50 })
    const p = await freshProjects(apiMock)
    await p.load()
    expect(p.hasMore.value).toBe(true)
  })

  it('update() patch local après PATCH backend OK', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce(MOCK_PAGINATED) // load initial
      .mockResolvedValueOnce({}) // PATCH
    const p = await freshProjects(apiMock)
    await p.load()
    await p.update(1, { title: 'Nouveau titre' })
    expect(p.projects.value[0]!.title).toBe('Nouveau titre')
  })

  it('update() retire le PATCH avec is_archived snake_case', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce(MOCK_PAGINATED)
      .mockResolvedValueOnce({})
    const p = await freshProjects(apiMock)
    await p.load()
    await p.update(1, { isArchived: true })

    expect(apiMock).toHaveBeenLastCalledWith('/projects/1', {
      method: 'PATCH',
      body: { is_archived: true },
    })
  })

  it('remove() retire le projet localement + décrémente totalCount', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce(MOCK_PAGINATED)
      .mockResolvedValueOnce({}) // DELETE
    const p = await freshProjects(apiMock)
    await p.load()
    expect(p.totalCount.value).toBe(1)
    await p.remove(1)
    expect(p.projects.value).toHaveLength(0)
    expect(p.totalCount.value).toBe(0)
  })

  it('totalCount ne devient jamais négatif après remove()', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce({ ...MOCK_PAGINATED, count: 0, results: [] })
      .mockResolvedValueOnce({})
    const p = await freshProjects(apiMock)
    await p.load()
    // Note: pas de projet à supprimer, mais on teste la clamp
    await p.remove(999).catch(() => {})
    expect(p.totalCount.value).toBeGreaterThanOrEqual(0)
  })

  it('create() unshift le nouveau projet en tête de liste', async () => {
    const newProject = { ...MOCK_PROJECT_API, id: 2, title: 'Nouveau' }
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce(MOCK_PAGINATED) // load
      .mockResolvedValueOnce({
        ...newProject,
        scene: { data: {}, version: 1, updated_at: '2024-06-03T00:00:00Z' },
        imported_models: [],
        annotations: [],
      })
    const p = await freshProjects(apiMock)
    await p.load()
    await p.create('Nouveau', 'desc')
    expect(p.projects.value[0]!.id).toBe(2)
    expect(p.projects.value[0]!.title).toBe('Nouveau')
    expect(p.totalCount.value).toBe(2)
  })
})
