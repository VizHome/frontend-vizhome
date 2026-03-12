/**
 * useGallery — Galerie des rendus 2D générés
 * Singleton de module : persistance localStorage, partagé entre tous les composants
 */
import { ref, computed } from 'vue'

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

const STORAGE_KEY = 'vizhome_gallery'
const MAX_ENTRIES = 100

// ─── État singleton ──────────────────────────────────────────────────────────
const entries = ref<GalleryEntry[]>([])
let _loaded = false

// ─── Composable ──────────────────────────────────────────────────────────────
export function useGallery() {
  const load = () => {
    if (_loaded || typeof localStorage === 'undefined') return
    _loaded = true
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) entries.value = JSON.parse(raw) as GalleryEntry[]
    } catch {
      entries.value = []
    }
  }

  const _persist = () => {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
  }

  const addEntry = (entry: Omit<GalleryEntry, 'id' | 'createdAt'>) => {
    load()
    const newEntry: GalleryEntry = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
    }
    entries.value.unshift(newEntry)
    if (entries.value.length > MAX_ENTRIES) entries.value.splice(MAX_ENTRIES)
    _persist()
    return newEntry
  }

  const removeEntry = (id: string) => {
    entries.value = entries.value.filter(e => e.id !== id)
    _persist()
  }

  const clearGallery = () => {
    entries.value = []
    _persist()
  }

  const updateTitle = (id: string, title: string) => {
    const entry = entries.value.find(e => e.id === id)
    if (entry) {
      entry.title = title
      _persist()
    }
  }

  // Filtres calculés
  const filterBySource = (source: GallerySource | 'all') =>
    computed(() =>
      source === 'all'
        ? entries.value
        : entries.value.filter(e => e.source === source)
    )

  const totalCount = computed(() => entries.value.length)

  return {
    entries,
    totalCount,
    load,
    addEntry,
    removeEntry,
    clearGallery,
    updateTitle,
    filterBySource,
  }
}
