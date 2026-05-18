/**
 * useGallery — Galerie des rendus IA, hydratée depuis le backend.
 *
 * Le backend stocke chaque rendu généré (POST /renders/) en DB. La galerie
 * est juste un listing paginé de ces rendus filtrés sur `status=done`.
 *
 * Signature publique compatible avec la version localStorage précédente :
 * `entries`, `totalCount`, `load`, `removeEntry`, `clearGallery`,
 * `filterBySource` restent identiques. Ajouts : `loadMore`, `refresh`,
 * `prependEntry` (appelé par useAiRender quand un nouveau rendu est prêt).
 */
import { computed, ref } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────
export type GallerySource = 'sketch' | 'prompt' | 'screenshot'

export interface GalleryEntry {
  id: string
  source: GallerySource
  imageUrl: string
  prompt?: string
  styleHint?: string
  createdAt: number
  title?: string
}

// ─── DTO backend ──────────────────────────────────────────────────────────
export interface ApiRender {
  id: number
  source: GallerySource
  output_type: '2d' | '3d'
  prompt: string
  style_hint: string
  title: string
  status: 'pending' | 'processing' | 'done' | 'failed'
  is_terminal: boolean
  result_url: string | null
  input_image_url: string | null
  error_message: string
  provider: string
  created_at: string
  updated_at: string
  completed_at: string | null
}

interface ApiPaginated<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ─── Constantes ───────────────────────────────────────────────────────────
const PAGE_SIZE = 20

// ─── État singleton ───────────────────────────────────────────────────────
const entries = ref<GalleryEntry[]>([])
const totalCount = ref(0)
const isLoading = ref(false)
let _loadedAt: number | null = null

// ─── Mapper DTO → UI ──────────────────────────────────────────────────────
export function toGalleryEntry(r: ApiRender): GalleryEntry {
  return {
    id: String(r.id),
    source: r.source,
    imageUrl: r.result_url || '',
    prompt: r.prompt || undefined,
    styleHint: r.style_hint || undefined,
    createdAt: new Date(r.created_at).getTime(),
    title: r.title || undefined,
  }
}

// ─── Composable ───────────────────────────────────────────────────────────
export function useGallery() {
  const api = useApi()

  const hasMore = computed(() => entries.value.length < totalCount.value)

  /** Charge la 1ère page (reset l'état). À appeler au mount de la page Gallery. */
  async function load(): Promise<void> {
    isLoading.value = true
    try {
      const data = await api<ApiPaginated<ApiRender>>(
        `/renders/?status=done&page=1&page_size=${PAGE_SIZE}`
      )
      entries.value = data.results.map(toGalleryEntry)
      totalCount.value = data.count
      _loadedAt = Date.now()
    } finally {
      isLoading.value = false
    }
  }

  /** Charge si rien en mémoire ou si > 5 min depuis le dernier load. */
  async function loadIfStale(): Promise<void> {
    const stale = !_loadedAt || Date.now() - _loadedAt > 5 * 60 * 1000
    if (entries.value.length === 0 || stale) await load()
  }

  /** Charge la page suivante (append). */
  async function loadMore(): Promise<void> {
    if (!hasMore.value || isLoading.value) return
    isLoading.value = true
    try {
      const nextPage = Math.floor(entries.value.length / PAGE_SIZE) + 1
      const data = await api<ApiPaginated<ApiRender>>(
        `/renders/?status=done&page=${nextPage}&page_size=${PAGE_SIZE}`
      )
      entries.value.push(...data.results.map(toGalleryEntry))
      totalCount.value = data.count
    } finally {
      isLoading.value = false
    }
  }

  /** Reload from scratch — utilisé après actions destructives. */
  const refresh = load

  /**
   * Ajoute un rendu fraîchement terminé en tête de liste (appelé par
   * useAiRender pour refléter le résultat immédiatement, sans re-fetch).
   */
  function prependEntry(entry: GalleryEntry): void {
    if (!entries.value.some(e => e.id === entry.id)) {
      entries.value.unshift(entry)
      totalCount.value += 1
    }
  }

  async function removeEntry(id: string): Promise<void> {
    await api(`/renders/${id}`, { method: 'DELETE' })
    entries.value = entries.value.filter(e => e.id !== id)
    totalCount.value = Math.max(0, totalCount.value - 1)
  }

  /**
   * Supprime TOUS les rendus du user.
   * Charge les pages manquantes d'abord, puis DELETE par chunks de 10.
   */
  async function clearGallery(): Promise<void> {
    while (hasMore.value) await loadMore()

    const ids = entries.value.map(e => e.id)
    const CHUNK = 10
    for (let i = 0; i < ids.length; i += CHUNK) {
      await Promise.all(
        ids.slice(i, i + CHUNK).map(id =>
          api(`/renders/${id}`, { method: 'DELETE' })
        )
      )
    }
    entries.value = []
    totalCount.value = 0
  }

  async function updateTitle(id: string, title: string): Promise<void> {
    await api(`/renders/${id}`, { method: 'PATCH', body: { title } })
    const entry = entries.value.find(e => e.id === id)
    if (entry) entry.title = title
  }

  // ─── Filtres calculés (compat) ─────────────────────────────────────────
  function filterBySource(source: GallerySource | 'all') {
    return computed(() =>
      source === 'all'
        ? entries.value
        : entries.value.filter(e => e.source === source)
    )
  }

  return {
    entries,
    totalCount,
    isLoading,
    hasMore,
    load,
    loadIfStale,
    loadMore,
    refresh,
    prependEntry,
    removeEntry,
    clearGallery,
    updateTitle,
    filterBySource,
  }
}
