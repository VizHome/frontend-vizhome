/**
 * useAiRender : génération IA via le backend Django.
 *
 * Pipeline async :
 *   1. POST /renders/ → 202 + render { id, status: 'pending' }
 *   2. ouverture d'un flux SSE sur /renders/{id}/events
 *   3. on prepend l'entry dans useGallery dès que status === 'done'
 *
 * Pourquoi SSE et plus de polling ?
 * ---------------------------------
 * L'ancien polling 2s pendant 3min coûtait 90 requêtes par génération (drain
 * batterie mobile + trafic inutile). Le SSE pousse uniquement les transitions
 * d'état, et survit à un refresh de page grâce à la persistance localStorage
 * de `currentRenderId` (clé `vizhome:current_render_id`).
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

// ─── Constantes ───────────────────────────────────────────────────────────
const LS_CURRENT_RENDER = 'vizhome:current_render_id'
const SSE_MAX_WAIT_MS = 5 * 60 * 1000 // garde-fou côté client (5 min)

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

// Render en cours (persisté en localStorage pour survivre au refresh)
const currentRenderId = ref<number | null>(null)
let _activeSseClose: (() => void) | null = null
let _mountedOnce = false

// ─── Helpers persistance ─────────────────────────────────────────────────
function _persistCurrent(id: number | null): void {
  if (typeof window === 'undefined') return
  try {
    if (id === null) window.localStorage.removeItem(LS_CURRENT_RENDER)
    else window.localStorage.setItem(LS_CURRENT_RENDER, String(id))
  } catch {
    /* quota plein ou storage désactivé : on continue silencieusement */
  }
  currentRenderId.value = id
}

function _readPersisted(): number | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LS_CURRENT_RENDER)
    if (!raw) return null
    const parsed = Number.parseInt(raw, 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null
  } catch {
    return null
  }
}

// ─── SSE wait helper ─────────────────────────────────────────────────────
/**
 * Ouvre un flux SSE sur `/renders/{id}/events` et résout dès la transition
 * vers un état terminal (`done` | `failed`).
 *
 * Si l'API publique de useSSE renvoie une erreur de connexion, on rejette.
 */
function _waitForTerminalViaSSE(
  api: ReturnType<typeof useApi>,
  id: number
): Promise<ApiRender> {
  return new Promise((resolve, reject) => {
    let settled = false
    let handle: { close: () => void } | null = null

    const timeoutId = window.setTimeout(() => {
      if (settled) return
      settled = true
      handle?.close()
      reject(new Error('Génération trop longue, abandon'))
    }, SSE_MAX_WAIT_MS)

    handle = useSSE<{
      id?: number
      status: ApiRender['status']
      is_terminal?: boolean
      error?: string
      result_url?: string | null
      timeout?: boolean
    }>(`/renders/${id}/events`, {
      onMessage: async (event) => {
        if (settled) return
        if (event.timeout) {
          settled = true
          window.clearTimeout(timeoutId)
          handle?.close()
          reject(new Error('Génération trop longue, abandon'))
          return
        }
        if (!event.is_terminal) return

        settled = true
        window.clearTimeout(timeoutId)
        handle?.close()

        // On refetch le détail complet pour avoir tous les champs (provider,
        // input_image_url, completed_at, etc.) que le payload SSE n'inclut pas.
        try {
          const detail = await api<ApiRender>(`/renders/${id}`)
          resolve(detail)
        } catch (err) {
          reject(err)
        }
      },
      onError: () => {
        if (settled) return
        // Une erreur SSE n'est pas forcément fatale (reco possible), mais
        // pour éviter de bloquer l'UI on retombe sur un fetch direct.
        settled = true
        window.clearTimeout(timeoutId)
        handle?.close()
        api<ApiRender>(`/renders/${id}`)
          .then(resolve)
          .catch(reject)
      },
    })

    _activeSseClose = () => handle?.close()
  })
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

  // ─── Finalize : commun aux 3 modes ─────────────────────────────────────
  function _applyTerminal(
    finished: ApiRender,
    mode: 'prompt' | 'sketch'
  ): void {
    if (finished.status === 'failed') {
      const msg = finished.error_message || 'La génération a échoué.'
      if (mode === 'prompt') error.value = msg
      else sketchError.value = msg
      return
    }

    if (mode === 'prompt') {
      result.value = finished.result_url
      _prependToHistory({
        id: String(finished.id),
        prompt: finished.prompt,
        outputType: finished.output_type,
        createdAt: new Date(finished.created_at).getTime(),
        imageUrl: finished.result_url,
      })
      if (finished.result_url && finished.output_type === '2d') {
        gallery.prependEntry(toGalleryEntry(finished))
      }
    } else {
      sketchResult.value = finished.result_url
      if (finished.result_url) {
        gallery.prependEntry(toGalleryEntry(finished))
      }
    }
  }

  // ─── Génération texte → image ──────────────────────────────────────────
  async function generate(): Promise<void> {
    if (!prompt.value.trim() || isLoading.value) return
    isLoading.value = true
    error.value = null
    result.value = null

    try {
      const created = await api<ApiRender>('/renders/', {
        method: 'POST',
        body: {
          source: 'prompt',
          output_type: outputType.value,
          prompt: prompt.value,
        },
      })
      _persistCurrent(created.id)

      const finished = await _waitForTerminalViaSSE(api, created.id)
      _applyTerminal(finished, 'prompt')
    } catch (err: unknown) {
      error.value = _formatError(err) ?? 'Erreur lors de la génération'
    } finally {
      isLoading.value = false
      _persistCurrent(null)
      _activeSseClose = null
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
      _persistCurrent(created.id)

      const finished = await _waitForTerminalViaSSE(api, created.id)
      _applyTerminal(finished, 'sketch')
    } catch (err: unknown) {
      sketchError.value = _formatError(err) ?? 'Erreur lors de la génération'
    } finally {
      isSketchLoading.value = false
      _persistCurrent(null)
      _activeSseClose = null
    }
  }

  function clearSketchResult(): void {
    sketchResult.value = null
    sketchError.value = null
  }

  /** Stoppe le SSE en cours (le job backend continue, mais on n'attend plus). */
  function cancelCurrentGeneration(): void {
    _activeSseClose?.()
    _activeSseClose = null
    isLoading.value = false
    isSketchLoading.value = false
    _persistCurrent(null)
  }

  // ─── Reconnect après refresh ───────────────────────────────────────────
  /**
   * Si le user refresh la page pendant un render en cours, on retrouve son
   * id en localStorage et on rouvre un SSE pour récupérer le résultat. La
   * détection du `mode` (prompt vs sketch) se fait via la `source` du render
   * récupéré depuis l'API.
   */
  async function reconnectInFlight(): Promise<void> {
    const persistedId = _readPersisted()
    if (!persistedId) return

    let detail: ApiRender
    try {
      detail = await api<ApiRender>(`/renders/${persistedId}`)
    } catch {
      _persistCurrent(null)
      return
    }

    if (detail.is_terminal) {
      // Déjà terminé pendant le refresh : on applique le résultat directement
      _persistCurrent(null)
      const mode: 'prompt' | 'sketch' =
        detail.source === 'prompt' ? 'prompt' : 'sketch'
      _applyTerminal(detail, mode)
      return
    }

    // Encore en cours : on rouvre un flux SSE
    const mode: 'prompt' | 'sketch' =
      detail.source === 'prompt' ? 'prompt' : 'sketch'
    if (mode === 'prompt') isLoading.value = true
    else isSketchLoading.value = true
    currentRenderId.value = persistedId

    try {
      const finished = await _waitForTerminalViaSSE(api, persistedId)
      _applyTerminal(finished, mode)
    } catch (err) {
      const msg = _formatError(err) ?? 'Erreur lors de la génération'
      if (mode === 'prompt') error.value = msg
      else sketchError.value = msg
    } finally {
      if (mode === 'prompt') isLoading.value = false
      else isSketchLoading.value = false
      _persistCurrent(null)
      _activeSseClose = null
    }
  }

  // Au premier appel côté client, on tente la reconnexion en background.
  if (!_mountedOnce && typeof window !== 'undefined') {
    _mountedOnce = true
    void reconnectInFlight()
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
    reconnectInFlight,
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
