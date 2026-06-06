/**
 * useApi — Wrapper $fetch authentifié vers le backend Django.
 *
 * Injecte automatiquement le Bearer JWT, et retry une fois en cas de 401
 * (en tentant un refresh du token). En cas d'échec, déconnecte l'utilisateur.
 *
 * Usage :
 *   const api = useApi()
 *   const profile = await api<UserProfile>('/me/')
 *   const projects = await api('/projects/', { method: 'POST', body: { title: 'X' } })
 */
import type { FetchOptions } from 'ofetch'

// Surcharge typée légère : on contourne le typage `NitroFetchRequest` de Nuxt
// (avec sa route table inférée qui crée des unions énormes → TS2321/TS2345
// sur `$fetch<T>(path, ...)` quand `typedPages` est activé). Notre wrapper
// appelle l'API Django ; les routes Nuxt ne sont pas concernées.
const safeFetch = $fetch as <X = unknown>(
  path: string,
  options?: FetchOptions,
) => Promise<X>

export function useApi() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string

  async function apiFetch<T = unknown>(
    path: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const auth = useAuth()

    const performRequest = async (): Promise<T> => {
      const headers = new Headers(options.headers as HeadersInit | undefined)
      if (auth.tokens.value?.access) {
        headers.set('Authorization', `Bearer ${auth.tokens.value.access}`)
      }
      return await safeFetch<T>(path, {
        ...options,
        baseURL: apiUrl,
        headers,
      })
    }

    try {
      return await performRequest()
    } catch (err: unknown) {
      const statusCode = (err as { statusCode?: number; status?: number })?.statusCode
        ?? (err as { status?: number })?.status
      const has401 = statusCode === 401

      // 401 + refresh dispo → tente un refresh puis retry une seule fois
      if (has401 && auth.tokens.value?.refresh) {
        try {
          await auth.refreshAccessToken()
          return await performRequest()
        } catch {
          await auth.logout()
          throw err
        }
      }
      throw err
    }
  }

  return apiFetch
}
