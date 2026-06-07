/**
 * Tests pour useRenderMode :
 * - Mode par défaut = '3d'
 * - Persistance dans localStorage (clé `vizhome:render:mode`)
 * - Hydratation au chargement depuis localStorage
 * - Validation de la valeur lue (whitelist sketch/prompt/3d)
 *
 * Notes :
 * - Singleton de module → `vi.resetModules()` avant chaque test pour
 *   forcer une nouvelle évaluation du module
 * - Promesses awaitées via `await flushPromises()` (watch persist async)
 */
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'

const LS_KEY = 'vizhome:render:mode'

async function freshModule() {
  vi.resetModules()
  const mod = await import('~/composables/useRenderMode')
  return mod.useRenderMode()
}

describe('useRenderMode', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('défaut sur "3d" si localStorage vide', async () => {
    const { currentMode } = await freshModule()
    expect(currentMode.value).toBe('3d')
  })

  it('persiste le mode dans localStorage à chaque setMode', async () => {
    const { setMode } = await freshModule()
    setMode('sketch')
    await nextTick()
    expect(localStorage.getItem(LS_KEY)).toBe('sketch')
    setMode('prompt')
    await nextTick()
    expect(localStorage.getItem(LS_KEY)).toBe('prompt')
  })

  it('hydrate depuis localStorage au boot', async () => {
    localStorage.setItem(LS_KEY, 'prompt')
    const { currentMode } = await freshModule()
    expect(currentMode.value).toBe('prompt')
  })

  it('rejette une valeur invalide en localStorage (fallback "3d")', async () => {
    localStorage.setItem(LS_KEY, 'invalid-mode-xyz')
    const { currentMode } = await freshModule()
    expect(currentMode.value).toBe('3d')
  })
})
