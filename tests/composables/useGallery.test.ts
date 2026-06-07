/**
 * Tests pour useGallery — pagination, mapping, prependEntry, removeEntry.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const MOCK_RENDER_API = {
  id: 101,
  source: 'prompt' as const,
  output_type: '3d' as const,
  prompt: 'Maison moderne avec piscine',
  style_hint: 'photorealistic',
  title: 'Test render',
  status: 'done' as const,
  is_terminal: true,
  result_url: 'https://cdn.example.com/r101.png',
  input_image_url: null,
  error_message: '',
  provider: 'gemini',
  created_at: '2024-06-01T12:00:00Z',
  updated_at: '2024-06-01T12:30:00Z',
  completed_at: '2024-06-01T12:30:00Z',
}

const MOCK_PAGINATED = {
  count: 1,
  next: null,
  previous: null,
  results: [MOCK_RENDER_API],
}

async function freshGallery(apiMock: ReturnType<typeof vi.fn>) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useApi = vi.fn(() => apiMock)
  const mod = await import('~/composables/useGallery')
  return { gallery: mod.useGallery(), toGalleryEntry: mod.toGalleryEntry }
}

describe('useGallery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('load() peuple entries + totalCount', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const { gallery } = await freshGallery(apiMock)
    await gallery.load()
    expect(gallery.entries.value).toHaveLength(1)
    expect(gallery.totalCount.value).toBe(1)
  })

  it('load() filtre status=done dans l\'URL', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const { gallery } = await freshGallery(apiMock)
    await gallery.load()
    expect(apiMock).toHaveBeenCalledWith(
      expect.stringContaining('status=done')
    )
  })

  it('toGalleryEntry() mappe id en string + createdAt en timestamp', async () => {
    const apiMock = vi.fn()
    const { toGalleryEntry } = await freshGallery(apiMock)
    const entry = toGalleryEntry(MOCK_RENDER_API)
    expect(entry.id).toBe('101')
    expect(typeof entry.createdAt).toBe('number')
    expect(entry.imageUrl).toBe('https://cdn.example.com/r101.png')
    expect(entry.source).toBe('prompt')
  })

  it('toGalleryEntry() : champs vides → undefined plutôt que ""', async () => {
    const apiMock = vi.fn()
    const { toGalleryEntry } = await freshGallery(apiMock)
    const entry = toGalleryEntry({
      ...MOCK_RENDER_API,
      prompt: '',
      style_hint: '',
      title: '',
    })
    expect(entry.prompt).toBeUndefined()
    expect(entry.styleHint).toBeUndefined()
    expect(entry.title).toBeUndefined()
  })

  it('toGalleryEntry() : result_url null → imageUrl ""', async () => {
    const apiMock = vi.fn()
    const { toGalleryEntry } = await freshGallery(apiMock)
    const entry = toGalleryEntry({ ...MOCK_RENDER_API, result_url: null })
    expect(entry.imageUrl).toBe('')
  })

  it('hasMore = true tant que entries.length < totalCount', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValue({ ...MOCK_PAGINATED, count: 100 })
    const { gallery } = await freshGallery(apiMock)
    await gallery.load()
    expect(gallery.hasMore.value).toBe(true)
  })

  it('loadMore() append à la liste sans reset', async () => {
    const second = { ...MOCK_RENDER_API, id: 102 }
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce({ ...MOCK_PAGINATED, count: 2 })
      .mockResolvedValueOnce({
        count: 2,
        next: null,
        previous: null,
        results: [second],
      })
    const { gallery } = await freshGallery(apiMock)
    await gallery.load()
    await gallery.loadMore()
    expect(gallery.entries.value).toHaveLength(2)
    expect(gallery.entries.value[1]!.id).toBe('102')
  })

  it('loadMore() no-op si pas de hasMore', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const { gallery } = await freshGallery(apiMock)
    await gallery.load()
    expect(gallery.hasMore.value).toBe(false)
    await gallery.loadMore()
    expect(apiMock).toHaveBeenCalledTimes(1) // pas d'appel supplémentaire
  })

  it('prependEntry() ajoute en tête + incrémente totalCount', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_PAGINATED)
    const { gallery, toGalleryEntry } = await freshGallery(apiMock)
    await gallery.load()
    const newEntry = toGalleryEntry({ ...MOCK_RENDER_API, id: 999 })
    gallery.prependEntry(newEntry)
    expect(gallery.entries.value[0]!.id).toBe('999')
    expect(gallery.totalCount.value).toBe(2)
  })
})
