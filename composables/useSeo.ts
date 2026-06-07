/**
 * `useSeo` — wrapper unifié au-dessus de `useHead` pour gérer le SEO des
 * pages publiques (marketing + legal).
 *
 * Génère en un appel :
 *  - `<title>` (le suffixe « | VizHome » est ajouté via `app.head.titleTemplate`
 *    dans `nuxt.config.ts`, ne pas le ré-ajouter ici).
 *  - `<meta name="description">`
 *  - Open Graph complet (`og:title`, `og:description`, `og:url`, `og:type`,
 *    `og:image` quand fourni)
 *  - Twitter Cards (`summary_large_image` quand `ogImage` présent,
 *    `summary` sinon)
 *  - `<link rel="canonical">` calculé depuis `useRequestURL()`
 *  - Optionnellement un script `application/ld+json` (Schema.org) si
 *    `jsonLd` est fourni.
 *
 * Convention : pas de tirets cadratins dans les descriptions (signature IA
 * bannie par le projet). Utiliser `:`, `,`, `|` ou `>`.
 *
 * @example
 * ```ts
 * useSeo({
 *   title: 'Génération 3D par IA',
 *   description: 'Convertissez photos et descriptions en scènes 3D en moins de 30 secondes.',
 *   ogImage: '/images/generate/image_generate.png',
 * })
 * ```
 */

export interface UseSeoOptions {
  /**
   * Titre de la page, sans le suffixe « | VizHome » qui est ajouté
   * automatiquement par `app.head.titleTemplate`.
   */
  title: string

  /**
   * Meta description (idéal : 120 à 160 caractères, unique par page).
   */
  description: string

  /**
   * URL absolue ou relative d'une image Open Graph (ratio 1.91:1 recommandé).
   * Si fournie, active la Twitter Card `summary_large_image`.
   */
  ogImage?: string

  /**
   * Type Open Graph. Défaut : `website`.
   * Valeurs courantes : `website`, `article`, `product`.
   */
  type?: 'website' | 'article' | 'product' | 'profile'

  /**
   * Objet JSON-LD (Schema.org). Sérialisé tel quel dans un script
   * `application/ld+json`. À fournir uniquement quand pertinent (page
   * d'accueil, page produit, FAQ…).
   */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Domaine de production utilisé pour construire les URLs absolues quand
 * `useRequestURL()` retourne un hôte local (dev, SSR Docker).
 */
const PROD_ORIGIN = 'https://vizhome.fr'

/**
 * Construit une URL absolue à partir d'une URL relative ou absolue.
 *
 * - URL absolue (commence par `http`) : retournée telle quelle.
 * - URL relative : préfixée par l'origine courante en prod, ou par
 *   `PROD_ORIGIN` quand on est en local (les hôtes `localhost`/`127.0.0.1`
 *   ne sont pas utiles pour Open Graph).
 */
function toAbsoluteUrl(path: string, origin: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const base = /localhost|127\.0\.0\.1/.test(origin) ? PROD_ORIGIN : origin
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`
}

export function useSeo(options: UseSeoOptions): void {
  const { title, description, ogImage, type = 'website', jsonLd } = options

  const url = useRequestURL()
  const origin = url.origin
  const canonical = toAbsoluteUrl(url.pathname, origin)
  const absoluteImage = ogImage ? toAbsoluteUrl(ogImage, origin) : undefined

  const meta: Array<{ name?: string, property?: string, content: string }> = [
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: canonical },
    // Twitter
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  if (absoluteImage) {
    meta.push(
      { property: 'og:image', content: absoluteImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: absoluteImage },
    )
  } else {
    meta.push({ name: 'twitter:card', content: 'summary' })
  }

  const script: Array<{ type: string, innerHTML: string }> = []
  if (jsonLd) {
    script.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    })
  }

  useHead({
    title,
    meta,
    link: [{ rel: 'canonical', href: canonical }],
    script,
  })
}
