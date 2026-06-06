/**
 * useAiRender — Génération IA via le backend Django.
 *
 * Pipeline async :
 *   1. POST /renders/ → 202 + render { id, status: 'pending' }
 *   2. polling GET /renders/{id} jusqu'à status terminal (done | failed)
 *   3. on prepend l'entry dans useGallery pour MAJ live de la galerie
 *
 * Signature publique compatible avec les composants existants
 * (PromptPanel, SketchCanvas, ScreenshotRenderPanel).
 */
import { ref } from 'vue'

import { toGalleryEntry, useGallery } from './useGallery'
import type { ApiRender, GallerySource } from './useGallery'



// ─── Types publics ────────────────────────────────────────────────────────
export type AiOutputType = '2d' | '3d'

export interface PromptHistoryEntry {
  id: string
  prompt: string
  outputType: AiOutputType
  createdAt: number
  imageUrl: string | null
}

// ─── État singleton ───────────────────────────────────────────────────────
// Mode prompt
const prompt = ref('')
const outputType = ref<AiOutputType>('2d')
const isLoading = ref(false)
const result = ref<string | null>(null)
const error = ref<string | null>(null)
const promptHistory = ref<PromptHistoryEntry[]>([])

// Mode sketch → IA
const sketchResult = ref<string | null>(null)
const isSketchLoading = ref(false)
const sketchError = ref<string | null>(null)

// Polling : id du render courant + flag de cancellation
const currentRenderId = ref<number | null>(null)
let _pollAborted = false

// ─── Polling helper ───────────────────────────────────────────────────────
const POLL_INTERVAL_MS = 2000
const POLL_MAX_ATTEMPTS = 90 // ≈ 3 min max

async function pollUntilTerminal(
  api: ReturnType<typeof useApi>,
  id: number
): Promise<ApiRender> {
  for (let i = 0; i < POLL_MAX_ATTEMPTS; i++) {
    if (_pollAborted) throw new Error('Polling annulé')
    const r = await api<ApiRender>(`/renders/${id}`)
    if (r.is_terminal) return r
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS))
  }
  throw new Error('Génération trop longue, abandon')
}

// ─── Composable ───────────────────────────────────────────────────────────
export function useAiRender() {
  const api = useApi()
  const gallery = useGallery()

  // ─── Historique des prompts (10 derniers prompts terminés) ─────────────
  async function loadHistory(): Promise<void> {
    try {
      const data = await api<ApiRender[]>('/renders/history')
      promptHistory.value = data.map(r => ({
        id: String(r.id),
        prompt: r.prompt,
        outputType: r.output_type,
        createdAt: new Date(r.created_at).getTime(),
        imageUrl: r.result_url,
      }))
    } catch {
      promptHistory.value = []
    }
  }

  function _prependToHistory(entry: PromptHistoryEntry): void {
    promptHistory.value.unshift(entry)
    if (promptHistory.value.length > 10) promptHistory.value.pop()
  }

  /**
   * Supprime une entrée de l'historique.
   * Accepte soit l'id backend (string), soit le timestamp createdAt (number)
   * pour rétro-compat avec l'ancienne signature.
   */
  async function removeHistoryEntry(key: string | number): Promise<void> {
    let entry: PromptHistoryEntry | undefined
    if (typeof key === 'number') {
      entry = promptHistory.value.find(e => e.createdAt === key)
    } else {
      entry = promptHistory.value.find(e => e.id === key)
    }
    if (!entry) return

    try {
      await api(`/renders/${entry.id}`, { method: 'DELETE' })
    } catch {
      /* silent : on retire quand même côté UI */
    }
    promptHistory.value = promptHistory.value.filter(e => e.id !== entry!.id)
  }

  /** Vide le cache local de l'historique (les rendus restent en galerie). */
  function clearHistory(): void {
    promptHistory.value = []
  }

  function loadFromHistory(entry: PromptHistoryEntry): void {
    prompt.value = entry.prompt
    outputType.value = entry.outputType
    result.value = entry.imageUrl
    error.value = null
  }

  function clearResult(): void {
    result.value = null
    error.value = null
  }

  // ─── Génération texte → image ──────────────────────────────────────────
  async function generate(): Promise<void> {
    if (!prompt.value.trim() || isLoading.value) return
    isLoading.value = true
    error.value = null
    result.value = null
    _pollAborted = false

    try {
      const created = await api<ApiRender>('/renders/', {
        method: 'POST',
        body: {
          source: 'prompt',
          output_type: outputType.value,
          prompt: prompt.value,
        },
      })
      currentRenderId.value = created.id

      const finished = await pollUntilTerminal(api, created.id)

      if (finished.status === 'failed') {
        error.value = finished.error_message || 'La génération a échoué.'
        return
      }

      result.value = finished.result_url
      _prependToHistory({
        id: String(finished.id),
        prompt: finished.prompt,
        outputType: finished.output_type,
        createdAt: new Date(finished.created_at).getTime(),
        imageUrl: finished.result_url,
      })

      // Rendu 2D OK → push live dans la galerie
      if (finished.result_url && finished.output_type === '2d') {
        gallery.prependEntry(toGalleryEntry(finished))
      }
    } catch (err: unknown) {
      error.value = _formatError(err) ?? 'Erreur lors de la génération'
    } finally {
      isLoading.value = false
      currentRenderId.value = null
    }
  }

  // ─── Génération depuis croquis (sketch / screenshot) ────────────────────
  async function generateFromSketch(
    imageBase64: string,
    styleHint?: string,
    source: GallerySource = 'sketch'
  ): Promise<void> {
    if (isSketchLoading.value) return
    isSketchLoading.value = true
    sketchError.value = null
    sketchResult.value = null
    _pollAborted = false

    try {
      const created = await api<ApiRender>('/renders/', {
        method: 'POST',
        body: {
          source,
          output_type: '2d',
          prompt: styleHint || 'Rendu architectural réaliste depuis ce croquis',
          style_hint: styleHint || '',
          sketch_base64: imageBase64,
        },
      })
      currentRenderId.value = created.id

      const finished = await pollUntilTerminal(api, created.id)

      if (finished.status === 'failed') {
        sketchError.value = finished.error_message || 'La génération a échoué.'
        return
      }

      sketchResult.value = finished.result_url

      if (finished.result_url) {
        gallery.prependEntry(toGalleryEntry(finished))
      }
    } catch (err: unknown) {
      sketchError.value = _formatError(err) ?? 'Erreur lors de la génération'
    } finally {
      isSketchLoading.value = false
      currentRenderId.value = null
    }
  }

  function clearSketchResult(): void {
    sketchResult.value = null
    sketchError.value = null
  }

  /** Stoppe le polling en cours (le job backend continue, mais on n'attend plus). */
  function cancelCurrentGeneration(): void {
    _pollAborted = true
    isLoading.value = false
    isSketchLoading.value = false
  }

  return {
    // Mode prompt
    prompt,
    outputType,
    isLoading,
    result,
    error,
    promptHistory,
    loadHistory,
    generate,
    loadFromHistory,
    clearResult,
    // Mode sketch → IA
    sketchResult,
    isSketchLoading,
    sketchError,
    generateFromSketch,
    clearSketchResult,
    // Historique
    removeHistoryEntry,
    clearHistory,
    // Misc
    currentRenderId,
    cancelCurrentGeneration,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────
function _formatError(err: unknown): string | null {
  if (!err) return null
  const e = err as {
    data?: {
      detail?: string
      code?: string
      non_field_errors?: string[]
      [k: string]: unknown
    }
    message?: string
    statusCode?: number
  }

  // 503 : provider IA non configuré (pattern <provider>_unavailable)
  if (e.statusCode === 503 && e.data?.code?.endsWith('_unavailable')) {
    return e.data.detail || 'Service IA temporairement indisponible.'
  }
  if (e.statusCode === 503 && e.data?.detail) return e.data.detail

  // 400 avec code structuré (quota dépassé, etc.)
  if (e.data?.code === 'quota_exceeded') return e.data.detail as string

  // 400 générique : detail > non_field_errors > premier champ
  if (e.statusCode === 400 && e.data) {
    if (e.data.detail) return e.data.detail
    if (e.data.non_field_errors?.[0]) return e.data.non_field_errors[0]
    for (const v of Object.values(e.data)) {
      if (typeof v === 'string') return v
      if (Array.isArray(v) && typeof v[0] === 'string') return v[0]
    }
  }

  if (e.statusCode === 401) return 'Session expirée. Reconnecte-toi.'
  if (e.statusCode === 429) return 'Trop de requêtes, ralentis.'
  return e.message || null
}
