/**
 * Tests pour useAuth (gestion JWT côté frontend).
 * Pas d'appel réseau testé ici (mocks via setup.ts).
 */
import { describe, expect, it, beforeEach, vi } from 'vitest'

const LS_KEY = 'vizhome:auth:tokens'

async function freshModule() {
  vi.resetModules()
  const mod = await import('~/composables/useAuth')
  return mod.useAuth()
}

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('isAuthenticated = false par défaut', async () => {
    const auth = await freshModule()
    expect(auth.isAuthenticated.value).toBe(false)
  })

  it('init() hydrate les tokens depuis localStorage', async () => {
    localStorage.setItem(LS_KEY, JSON.stringify({ access: 'a', refresh: 'r' }))
    const auth = await freshModule()
    auth.init()
    expect(auth.isAuthenticated.value).toBe(true)
    expect(auth.tokens.value).toEqual({ access: 'a', refresh: 'r' })
  })

  it('init() ignore un localStorage corrompu sans crasher', async () => {
    localStorage.setItem(LS_KEY, '{not-json}')
    const auth = await freshModule()
    expect(() => auth.init()).not.toThrow()
    expect(auth.isAuthenticated.value).toBe(false)
  })
})
