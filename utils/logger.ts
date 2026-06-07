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
 *   l'observabilité Sentry/Datadog si configuré côté window.onerror)
 *
 * Cette indirection contourne aussi la règle eslint `no-console` :
 * ESLint voit `logger.info(...)` (notre code) au lieu de `console.log(...)`.
 *
 * Intégration Sentry :
 * - `logger.error(...)` forwarde toujours vers `console.error` (pas de
 *   régression du comportement historique) ET tente d'envoyer le premier
 *   argument Error à Sentry si le plugin est actif côté browser.
 * - `captureException(err, context?)` est l'API explicite à privilégier
 *   pour pousser une exception sans logguer.
 *
 * Import dynamique de `@sentry/browser` : on évite de bundler le SDK
 * partout où le logger est utilisé. Si Sentry n'est pas init (pas de DSN
 * en dev), `Sentry.captureException` est un no-op côté SDK. Côté SSR,
 * `import.meta.client === false` => on skip totalement.
 */

type LogFn = (...args: unknown[]) => void

const isDev = typeof import.meta !== 'undefined' && import.meta.dev === true
const isClient =
  typeof import.meta !== 'undefined' && import.meta.client === true

function dev(fn: LogFn): LogFn {
  return isDev ? fn : noop
}

function noop(): void {
  /* no-op en prod */
}

/**
 * Forward une erreur à Sentry si dispo côté browser.
 *
 * Import dynamique : pas de coût bundle si Sentry n'est jamais utilisé
 * (tree-shaking + chunk dédié). Le `catch` silencieux évite toute
 * cascade si le SDK n'est pas installé ou échoue à charger.
 */
interface SentrySDKMinimal {
  captureException(err: unknown, ctx?: Record<string, unknown>): void
}

function forwardToSentry(err: unknown, context?: Record<string, unknown>): void {
  if (!isClient) return
  // Import string-literal pour que Vite code-splitte le SDK. Le `catch`
  // couvre le cas où Sentry n'est pas installé (dev local sans DSN).
  // ts-ignore : tolère un node_modules sans @sentry/browser (pré-install).
  // @ts-ignore
  import('@sentry/browser')
    .then((Sentry: SentrySDKMinimal) => {
      if (context) {
        Sentry.captureException(err, { extra: context })
      } else {
        Sentry.captureException(err)
      }
    })
    .catch(() => {
      /* Sentry pas installé / pas init - on ignore */
    })
}

/**
 * Cherche le premier argument exploitable comme exception (Error ou
 * string). Retombe sur la concaténation des args sinon.
 */
function pickError(args: unknown[]): unknown {
  for (const arg of args) {
    if (arg instanceof Error) return arg
  }
  // Pas d'Error trouvé : on renvoie le premier arg s'il est string,
  // sinon on emballe tout dans un Error synthétique.
  if (typeof args[0] === 'string') return new Error(args[0])
  return new Error(args.map((a) => String(a)).join(' '))
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
   * Erreur - TOUJOURS forwardée à console.error (même en prod) et
   * remontée à Sentry si le SDK browser est actif. Évite de masquer
   * les pannes en production.
   */
  error: (...args: unknown[]) => {
    console.error(...args)
    forwardToSentry(pickError(args))
  },
}

/**
 * API explicite pour pousser une exception à Sentry sans logguer en
 * console. Utile dans les `try/catch` métier où le caller décide ce
 * qu'il affiche à l'user.
 *
 * Usage :
 *   try { await doRisky() }
 *   catch (e) { captureException(e, { feature: 'render', projectId }) }
 */
export function captureException(
  err: unknown,
  context?: Record<string, unknown>
): void {
  forwardToSentry(err, context)
}

/**
 * Helper si tu veux un logger préfixé pour une feature/module :
 *
 *   const log = scopedLogger('[billing]')
 *   log.info('checkout démarré')   // → "[billing] checkout démarré"
 */
export function scopedLogger(prefix: string) {
  return {
    debug: dev((...args: unknown[]) => console.debug(prefix, ...args)),
    info: dev((...args: unknown[]) => console.info(prefix, ...args)),
    log: dev((...args: unknown[]) => console.log(prefix, ...args)),
    warn: dev((...args: unknown[]) => console.warn(prefix, ...args)),
    error: (...args: unknown[]) => {
      console.error(prefix, ...args)
      forwardToSentry(pickError(args), { scope: prefix })
    },
  }
}
