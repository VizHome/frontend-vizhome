/**
 * useSSE : helper générique pour consommer un endpoint Server-Sent Events
 * exposé par Django, avec un Bearer JWT.
 *
 * Pourquoi pas `EventSource` natif ?
 * ----------------------------------
 * Le `EventSource` standard du navigateur ne permet PAS d'envoyer de
 * headers personnalisés (cf. spec WHATWG). Or notre backend lit le JWT
 * dans `Authorization: Bearer ...`. On utilise donc `event-source-polyfill`
 * qui accepte un objet `headers`. L'import est dynamique pour rester
 * SSR-safe (le polyfill touche au DOM).
 *
 * Usage :
 *   const sse = useSSE<{ status: string }>(
 *     () => `/renders/${id.value}/events`,
 *     {
 *       onMessage: (data) => console.log(data.status),
 *       onError: (e) => console.warn(e),
 *     }
 *   )
 *   // sse.close() pour fermer manuellement
 */
import { onScopeDispose, ref } from 'vue'
import type { Ref } from 'vue'

// ─── Types polyfill ──────────────────────────────────────────────────────
// Surface minimum dont on a besoin pour `EventSourcePolyfill`. Le paquet
// `event-source-polyfill` ne fournit pas ses propres types ; on garde
// une description souple (`Function | null`) pour éviter les frictions de
// signature `this` entre EventSource natif et le polyfill.
interface EventSourceLike {
  onopen: ((ev: Event) => void) | null
  onmessage: ((ev: { data: string }) => void) | null
  onerror: ((ev: Event) => void) | null
  close(): void
}

type EventSourcePolyfillCtor = new (
  url: string,
  init?: { headers?: Record<string, string>, withCredentials?: boolean },
) => EventSourceLike

// ─── Types ────────────────────────────────────────────────────────────────
export interface SSEOptions<T> {
  /** Callback déclenché à chaque événement `data:` reçu. */
  onMessage: (data: T) => void
  /** Callback erreur (réseau, JSON malformé, etc.). */
  onError?: (err: Event) => void
  /** Callback ouverture de connexion. */
  onOpen?: () => void
}

export interface SSEHandle {
  isConnected: Ref<boolean>
  error: Ref<string | null>
  /** Ferme la connexion (idempotent). */
  close: () => void
}

// ─── Composable ───────────────────────────────────────────────────────────
/**
 * Ouvre une connexion SSE authentifiée. La connexion est fermée
 * automatiquement en `onScopeDispose` (Vue 3) si tu ne le fais pas.
 *
 * @param url URL relative ou fonction renvoyant l'URL (utile si elle
 *            dépend d'un `ref`). Si l'URL résolue est vide, la connexion
 *            n'est pas ouverte.
 * @param options Callbacks `onMessage` (obligatoire), `onError`, `onOpen`.
 */
export function useSSE<T = unknown>(
  url: string | (() => string),
  options: SSEOptions<T>,
): SSEHandle {
  const isConnected = ref(false)
  const error = ref<string | null>(null)

  let source: EventSourceLike | null = null
  let closed = false

  function _resolveUrl(): string {
    return typeof url === 'function' ? url() : url
  }

  function _absoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path
    const config = useRuntimeConfig()
    const base = (config.public.apiUrl as string) || ''
    if (!base) return path
    return base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`)
  }

  async function _connect(): Promise<void> {
    if (closed) return
    if (typeof window === 'undefined') return // SSR safe

    const resolved = _resolveUrl()
    if (!resolved) return

    const auth = useAuth()
    const token = auth.tokens.value?.access ?? ''

    // Import dynamique : SSR-safe + le polyfill n'est touché que côté client.
    // On cast l'export sur notre `Ctor` pour rester typé côté caller.
    const mod = await import('event-source-polyfill')
    const Ctor = (mod as unknown as { EventSourcePolyfill: EventSourcePolyfillCtor })
      .EventSourcePolyfill

    if (closed) return // peut avoir été fermé pendant l'await

    const headers: Record<string, string> = {}
    if (token) headers.Authorization = `Bearer ${token}`

    // Capture la nouvelle instance dans une const locale narrow puis stocke.
    // Ça évite des accès `source.foo` ambigus pour TS (qui ne sait pas que
    // `source` reste non-null entre les setters synchrones suivants).
    const instance: EventSourceLike = new Ctor(_absoluteUrl(resolved), { headers })

    instance.onopen = () => {
      isConnected.value = true
      error.value = null
      options.onOpen?.()
    }
    instance.onmessage = (ev) => {
      try {
        const parsed = JSON.parse(ev.data) as T
        options.onMessage(parsed)
      }
      catch (e) {
        error.value = (e as Error).message || 'Réponse SSE non parsable'
      }
    }
    instance.onerror = (ev) => {
      isConnected.value = false
      error.value = 'Connexion SSE interrompue'
      options.onError?.(ev)
    }

    source = instance
  }

  function close(): void {
    closed = true
    isConnected.value = false
    if (source) {
      source.close()
      source = null
    }
  }

  // Cleanup automatique
  onScopeDispose(close)

  // Lance la connexion (fire-and-forget : on remonte les erreurs via `error`)
  void _connect().catch((e: unknown) => {
    error.value = (e as Error)?.message || 'Erreur ouverture SSE'
  })

  return { isConnected, error, close }
}
