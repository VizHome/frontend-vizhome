/**
 * useAdminCsvExport — télécharge un endpoint admin en CSV.
 *
 * Le bouton "Export CSV" déclenche un fetch authentifié, récupère le blob,
 * et force le download via un <a download> temporaire. Évite le problème
 * du `window.location` qui ne peut pas envoyer le header `Authorization`.
 */
import { ref } from 'vue'

const isExporting = ref(false)
const exportError = ref<string | null>(null)

export function useAdminCsvExport() {
  const auth = useAuth()
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string

  /**
   * Télécharge `path` (ex: '/admin/users') en CSV.
   * `filename` final du fichier downloaded (sans .csv).
   * `params` query params optionnels (filtres en cours).
   */
  async function exportCsv(
    path: string,
    filename: string,
    params: Record<string, string | undefined> = {},
  ): Promise<void> {
    isExporting.value = true
    exportError.value = null
    try {
      const search = new URLSearchParams({ format: 'csv', page_size: '1000' })
      for (const [k, v] of Object.entries(params)) {
        if (v) search.set(k, v)
      }
      const res = await fetch(`${apiUrl}${path}?${search.toString()}`, {
        headers: {
          Authorization: `Bearer ${auth.tokens.value?.access ?? ''}`,
          Accept: 'text/csv',
        },
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Export échoué (${res.status})`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e: unknown) {
      exportError.value = e instanceof Error ? e.message : 'Export CSV échoué.'
      throw e
    } finally {
      isExporting.value = false
    }
  }

  return { isExporting, exportError, exportCsv }
}
