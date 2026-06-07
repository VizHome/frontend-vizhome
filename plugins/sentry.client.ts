/**
 * Plugin Sentry (browser) - error tracking et tracing côté navigateur.
 *
 * `.client.ts` => exécuté uniquement côté browser (pas en SSR).
 *
 * Pourquoi `@sentry/browser` direct et pas le module `@sentry/nuxt` :
 * le module Nuxt officiel impose une déclaration dans `modules: []` et
 * une config dédiée dans `nuxt.config.ts`. On veut garder la conf Nuxt
 * intouchée (autre chantier), donc on fait une intégration manuelle qui
 * couvre exactement nos besoins (init + Vue error hook).
 *
 * Activation : si `NUXT_PUBLIC_SENTRY_DSN` est défini, Sentry démarre.
 * Sinon le plugin est no-op (utile en dev local sans Sentry).
 *
 * Note : on lit les vars via `import.meta.env.NUXT_PUBLIC_*` car le
 * `runtimeConfig.public` n'expose pas (encore) `sentryDsn`. Nuxt
 * injecte les `NUXT_PUBLIC_*` au build dans `import.meta.env` côté client.
 *
 * Import dynamique : aucun coût bundle si le DSN n'est pas configuré
 * (le code-splitting de Vite isole le SDK dans un chunk séparé). C'est
 * aussi pourquoi le plugin tolère un environnement où le package n'est
 * pas (encore) installé : on log un warning au lieu de planter le boot
 * Nuxt.
 */

// Types minimaux du SDK Sentry. On évite `import type` direct pour ne pas
// imposer la présence du package au typecheck (le package est installé
// runtime via `npm install` après merge, voir docs/OBSERVABILITY.md).
interface SentrySDK {
  init(options: Record<string, unknown>): void
  captureException(err: unknown, ctx?: Record<string, unknown>): void
  browserTracingIntegration(): unknown
  replayIntegration(opts: Record<string, unknown>): unknown
}

interface SentryHint {
  originalException?: unknown
}

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!import.meta.client) return

  const dsn =
    (import.meta.env.NUXT_PUBLIC_SENTRY_DSN as string | undefined)?.trim() || ''
  if (!dsn) return

  const environment =
    (import.meta.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT as string | undefined) ||
    (import.meta.dev ? 'development' : 'production')

  let Sentry: SentrySDK
  try {
    // Import dynamique : le bundler résout le module au build s'il est
    // installé, sinon le `catch` prend le relais. Le ts-ignore tolère
    // un node_modules sans @sentry/browser avant `npm install`.
    // @ts-ignore
    Sentry = (await import('@sentry/browser')) as SentrySDK
  } catch (e) {
    console.warn('[sentry] package non installé, tracking désactivé', e)
    return
  }

  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.1,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    beforeSend(event: unknown, hint: SentryHint) {
      const message =
        (hint.originalException as { message?: string } | undefined)?.message ??
        ''
      // Erreurs cosmétiques sans impact : ne polluent pas Sentry.
      if (message.includes('ResizeObserver loop')) return null
      if (message.includes('Non-Error promise rejection captured')) return null
      return event
    },
  })

  // Capte les erreurs de render Vue (fallback du `Vue.errorHandler`).
  nuxtApp.hook('vue:error', (err) => {
    Sentry.captureException(err)
  })

  // Capte aussi les erreurs Nuxt (App.vue, page errors, etc.).
  nuxtApp.hook('app:error', (err) => {
    Sentry.captureException(err)
  })
})
