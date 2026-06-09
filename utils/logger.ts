/**
 * logger - wrapper console qui no-op en production.
 *
 * Pourquoi : `console.log/warn/error` en prod c'est de la pollution
 * (peut leak des infos sensibles, gonfle la console DevTools des users,
 * baisse les perfs sur les browsers low-end). En dev c'est essentiel
 * pour le debug.
 *
 * Usage :
 *   import { logger } from '~/utils/logger'
 *   logger.info('[render] chargement du modèle', model.name)
 *   logger.warn('[billing] checkout failed', error)
 *   logger.error('[auth] login refused', err)
 *
 * Comportement :
 * - En dev (`import.meta.dev === true`) => forward vers console.*
 * - En prod => no-op silencieux (sauf `error` qui reste actif pour
 *   l'observabilité externe via `window.onerror` si configuré)
 *
 * Cette indirection contourne aussi la règle eslint `no-console` :
 * ESLint voit `logger.info(...)` (notre code) au lieu de `console.log(...)`.
 */

type LogFn = (...args: unknown[]) => void

const isDev = typeof import.meta !== 'undefined' && import.meta.dev === true

function dev(fn: LogFn): LogFn {
  return isDev ? fn : noop
}

function noop(): void {
  /* no-op en prod */
}

export const logger = {
  /** Trace de debug fine (dev uniquement). */
  debug: dev((...args) => console.debug(...args)),
  /** Info standard (dev uniquement). */
  info: dev((...args) => console.info(...args)),
  /** Log générique (dev uniquement, équivalent console.log). */
  log: dev((...args) => console.log(...args)),
  /** Warning (dev uniquement). */
  warn: dev((...args) => console.warn(...args)),
  /**
   * Erreur - TOUJOURS forwardée à console.error (même en prod) pour
   * éviter de masquer les pannes en production.
   */
  error: (...args: unknown[]) => {
    console.error(...args)
  },
}

/**
 * Helper si tu veux un logger préfixé pour une feature/module :
 *
 *   const log = scopedLogger('[billing]')
 *   log.info('checkout démarré')   // => "[billing] checkout démarré"
 */
export function scopedLogger(prefix: string) {
  return {
    debug: dev((...args: unknown[]) => console.debug(prefix, ...args)),
    info: dev((...args: unknown[]) => console.info(prefix, ...args)),
    log: dev((...args: unknown[]) => console.log(prefix, ...args)),
    warn: dev((...args: unknown[]) => console.warn(prefix, ...args)),
    error: (...args: unknown[]) => {
      console.error(prefix, ...args)
    },
  }
}
