/**
 * Setup global Vitest.
 * - Reset localStorage / sessionStorage entre tests
 * - Stubs des auto-imports Nuxt utilisés indirectement par les composables
 *   (useApi, useRuntimeConfig, etc.) pour les tests unitaires purs.
 *
 * Les tests d'intégration nécessitant un vrai Nuxt context doivent utiliser
 * `// @vitest-environment nuxt` en haut du fichier (et @nuxt/test-utils).
 */
import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => {
  if (typeof localStorage !== 'undefined') localStorage.clear()
  if (typeof sessionStorage !== 'undefined') sessionStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// Polyfill crypto.randomUUID
if (typeof globalThis.crypto?.randomUUID !== 'function') {
  Object.defineProperty(globalThis.crypto || (globalThis.crypto = {} as Crypto), 'randomUUID', {
    value: () => '00000000-0000-4000-8000-000000000000',
    configurable: true,
  })
}

// ─── Stubs Nuxt auto-imports (pour les composables qui utilisent useApi, etc.) ───
const stubFetch = vi.fn().mockResolvedValue({})

// `useApi` retourne une fonction d'appel API
;(globalThis as Record<string, unknown>).useApi = vi.fn(() => stubFetch)

// `useRuntimeConfig` retourne un objet config
;(globalThis as Record<string, unknown>).useRuntimeConfig = vi.fn(() => ({
  public: {
    apiUrl: '/api/v1',
    docsUrl: 'http://localhost:3001',
    googleClientId: '',
    githubClientId: '',
  },
}))

// `$fetch` global Nuxt
;(globalThis as Record<string, unknown>).$fetch = stubFetch
