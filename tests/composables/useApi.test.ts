/**
 * Tests pour useApi — wrapper $fetch authentifié.
 *
 * Focus :
 *  - Injection automatique du Bearer si token présent
 *  - Pas d'Authorization si pas de token (endpoint public)
 *  - Retry une fois après refresh si 401
 *  - Logout + propagation de l'erreur si le refresh échoue
 *  - Pas de retry si statusCode !== 401
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

interface AuthStub {
  tokens: { value: { access: string; refresh: string } | null }
  refreshAccessToken: ReturnType<typeof vi.fn>
  logout: ReturnType<typeof vi.fn>
}

function makeAuth(tokens: AuthStub['tokens']['value'] = null): AuthStub {
  return {
    tokens: { value: tokens },
    refreshAccessToken: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn().mockResolvedValue(undefined),
  }
}

async function freshApi(
  authStub: AuthStub,
  fetchMock: ReturnType<typeof vi.fn>
) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useAuth = vi.fn(() => authStub)
  ;(globalThis as Record<string, unknown>).$fetch = fetchMock
  ;(globalThis as Record<string, unknown>).useRuntimeConfig = vi.fn(() => ({
    public: { apiUrl: '/api/v1' },
  }))
  const mod = await import('~/composables/useApi')
  return mod.useApi()
}

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('appelle $fetch avec le path tel quel + baseURL apiUrl', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    const api = await freshApi(makeAuth(), fetchMock)
    await api('/me/')

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [path, opts] = fetchMock.mock.calls[0]!
    expect(path).toBe('/me/')
    expect((opts as { baseURL: string }).baseURL).toBe('/api/v1')
  })

  it('ajoute le Bearer si tokens.access existe', async () => {
    const fetchMock = vi.fn().mockResolvedValue({})
    const api = await freshApi(
      makeAuth({ access: 'jwt-abc', refresh: 'ref-xyz' }),
      fetchMock
    )
    await api('/me/')

    const [, opts] = fetchMock.mock.calls[0]!
    const headers = (opts as { headers: Headers }).headers
    expect(headers.get('Authorization')).toBe('Bearer jwt-abc')
  })

  it('n\'ajoute PAS de Bearer si pas de token (endpoint public)', async () => {
    const fetchMock = vi.fn().mockResolvedValue({})
    const api = await freshApi(makeAuth(null), fetchMock)
    await api('/contact/', { method: 'POST', body: {} })

    const [, opts] = fetchMock.mock.calls[0]!
    const headers = (opts as { headers: Headers }).headers
    expect(headers.get('Authorization')).toBeNull()
  })

  it('retry après refresh si 401 + refresh token dispo', async () => {
    const auth = makeAuth({ access: 'expired', refresh: 'ref-ok' })
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce({ statusCode: 401 })
      .mockResolvedValueOnce({ ok: true })

    const api = await freshApi(auth, fetchMock)
    const result = await api('/me/')

    expect(auth.refreshAccessToken).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(result).toEqual({ ok: true })
  })

  it('logout + throw si refresh échoue après 401', async () => {
    const auth = makeAuth({ access: 'expired', refresh: 'ref-bad' })
    auth.refreshAccessToken.mockRejectedValue(new Error('refresh failed'))
    const originalError = { statusCode: 401 }
    const fetchMock = vi.fn().mockRejectedValue(originalError)

    const api = await freshApi(auth, fetchMock)
    await expect(api('/me/')).rejects.toEqual(originalError)
    expect(auth.logout).toHaveBeenCalledTimes(1)
  })

  it('ne retry PAS si 401 mais pas de refresh token', async () => {
    const auth = makeAuth({ access: 'expired', refresh: '' })
    const err = { statusCode: 401 }
    const fetchMock = vi.fn().mockRejectedValue(err)

    const api = await freshApi(auth, fetchMock)
    await expect(api('/me/')).rejects.toEqual(err)
    expect(auth.refreshAccessToken).not.toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledTimes(1) // pas de retry
  })

  it('ne retry PAS si erreur autre que 401', async () => {
    const auth = makeAuth({ access: 'a', refresh: 'r' })
    const err = { statusCode: 500 }
    const fetchMock = vi.fn().mockRejectedValue(err)

    const api = await freshApi(auth, fetchMock)
    await expect(api('/me/')).rejects.toEqual(err)
    expect(auth.refreshAccessToken).not.toHaveBeenCalled()
  })

  it('propage les options (method, body) au $fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({})
    const api = await freshApi(
      makeAuth({ access: 'a', refresh: 'r' }),
      fetchMock
    )
    await api('/projects/', { method: 'POST', body: { title: 'X' } })

    const [, opts] = fetchMock.mock.calls[0]!
    expect((opts as { method: string }).method).toBe('POST')
    expect((opts as { body: { title: string } }).body).toEqual({ title: 'X' })
  })
})
