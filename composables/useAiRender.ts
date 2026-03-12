/**
 * useAiRender — Génération IA par prompt (2D ou 3D) + rendu depuis croquis
 * L'endpoint /api/render est un stub à remplacer par la vraie API IA
 */
import { ref } from 'vue'

export type AiOutputType = '2d' | '3d'

export interface PromptHistoryEntry {
  prompt: string
  outputType: AiOutputType
  createdAt: number
  imageUrl: string | null
}

const STORAGE_KEY = 'vizhome_prompt_history'

// ─── État singleton ──────────────────────────────────────────────────────────
const prompt = ref('')
const outputType = ref<AiOutputType>('2d')
const isLoading = ref(false)
const result = ref<string | null>(null)
const error = ref<string | null>(null)
const promptHistory = ref<PromptHistoryEntry[]>([])

// ─── État sketch → IA ────────────────────────────────────────────────────────
const sketchResult = ref<string | null>(null)
const isSketchLoading = ref(false)
const sketchError = ref<string | null>(null)

// ─── Composable ──────────────────────────────────────────────────────────────
export function useAiRender() {
  const loadHistory = () => {
    if (typeof localStorage === 'undefined') return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) promptHistory.value = JSON.parse(raw) as PromptHistoryEntry[]
    } catch {
      // Ignorer les erreurs de parsing
    }
  }

  const _saveHistory = () => {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(promptHistory.value.slice(0, 10))
    )
  }

  const generate = async () => {
    if (!prompt.value.trim() || isLoading.value) return
    isLoading.value = true
    error.value = null
    result.value = null

    try {
      const data = await $fetch<{ imageUrl: string | null }>('/api/render', {
        method: 'POST',
        body: { prompt: prompt.value, outputType: outputType.value },
      })
      result.value = data.imageUrl

      promptHistory.value.unshift({
        prompt: prompt.value,
        outputType: outputType.value,
        createdAt: Date.now(),
        imageUrl: data.imageUrl,
      })
      if (promptHistory.value.length > 10) promptHistory.value.pop()
      _saveHistory()
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : 'Erreur lors de la génération'
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Envoie le croquis (base64 PNG) à l'API IA pour un rendu 2D.
   * styleHint permet d'ajouter un style ("photoréaliste", "aquarelle", etc.)
   */
  const generateFromSketch = async (
    imageBase64: string,
    styleHint?: string
  ) => {
    if (isSketchLoading.value) return
    isSketchLoading.value = true
    sketchError.value = null
    sketchResult.value = null

    try {
      const data = await $fetch<{ imageUrl: string | null }>('/api/render', {
        method: 'POST',
        body: {
          prompt: styleHint ?? 'Rendu architectural réaliste depuis ce croquis',
          outputType: '2d' as AiOutputType,
          sketchBase64: imageBase64,
        },
      })
      sketchResult.value = data.imageUrl
    } catch (err: unknown) {
      sketchError.value =
        err instanceof Error ? err.message : 'Erreur lors de la génération'
    } finally {
      isSketchLoading.value = false
    }
  }

  const clearSketchResult = () => {
    sketchResult.value = null
    sketchError.value = null
  }

  const loadFromHistory = (entry: PromptHistoryEntry) => {
    prompt.value = entry.prompt
    outputType.value = entry.outputType
    result.value = entry.imageUrl
    error.value = null
  }

  const clearResult = () => {
    result.value = null
    error.value = null
  }

  return {
    // Prompt
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
    // Sketch → IA
    sketchResult,
    isSketchLoading,
    sketchError,
    generateFromSketch,
    clearSketchResult,
  }
}
