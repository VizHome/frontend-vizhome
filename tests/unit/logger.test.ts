/**
 * Tests pour `utils/logger.ts`.
 *
 * On vérifie le comportement no-op en prod ET les helpers `scopedLogger`.
 * `import.meta.dev` est testable indirectement : par défaut en mode test
 * Vitest, `import.meta.dev` n'est pas défini comme `true` => les méthodes
 * autres que `error` sont no-op et n'appellent pas `console.*`.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { logger, scopedLogger } from '~/utils/logger'

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('expose les méthodes attendues', () => {
    expect(typeof logger.debug).toBe('function')
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.log).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
  })

  it('logger.error appelle console.error (toujours actif)', () => {
    const err = new Error('boom')
    logger.error('[scope]', err)
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenCalledWith('[scope]', err)
  })
})

describe('scopedLogger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('préfixe les messages d\'erreur avec le scope', () => {
    const log = scopedLogger('[billing]')
    const err = new Error('checkout')
    log.error(err)
    expect(console.error).toHaveBeenCalledWith('[billing]', err)
  })

  it('expose la même API que logger', () => {
    const log = scopedLogger('[test]')
    expect(typeof log.debug).toBe('function')
    expect(typeof log.info).toBe('function')
    expect(typeof log.log).toBe('function')
    expect(typeof log.warn).toBe('function')
    expect(typeof log.error).toBe('function')
  })
})
