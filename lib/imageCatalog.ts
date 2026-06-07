/**
 * Catalogue centralisé des images marketing/produit de VizHome.
 *
 * Stratégie :
 * - Centraliser tous les usages d'images dans un seul endroit
 * - Permettre de swap une URL en 1 endroit au lieu de 20
 * - Préparer le terrain pour des variantes (light/dark, AVIF/WebP, srcset)
 * - Documenter le `alt` descriptif en français à côté du `src`
 *
 * Convention de nommage des fichiers :
 *   /images/features/<slug>/hero.webp
 *   /images/features/<slug>/illustration-<n>.webp
 *   /images/marketing/<page>/hero.webp
 *   /images/empty-states/<key>.webp
 *
 * Ces fichiers n'existent pas encore tant que le générateur d'images n'a pas
 * produit les visuels (cf. `docs/IMAGE_PROMPTS.md`). En attendant, le helper
 * `getFeatureImage` retombe sur le fallback existant `/images/generate/image_generate.png`.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type ImageFormat = 'avif' | 'webp'

export interface CatalogImage {
  /** Chemin absolu depuis `public/` (ex: `/images/features/auto-3d/hero.webp`). */
  src: string
  /** Texte alternatif descriptif en français (jamais générique). */
  alt: string
  /** Largeur intrinsèque en pixels (utile pour `width` attr + layout shift). */
  width?: number
  /** Hauteur intrinsèque en pixels. */
  height?: number
  /** Variantes srcset pour AVIF/WebP si disponibles. */
  srcset?: Partial<Record<ImageFormat, string>>
}

export interface FeatureImageSet {
  /** Image principale en haut de la page feature (16:9 généralement). */
  hero: CatalogImage
  /** 4 à 6 illustrations secondaires utilisées dans les sections. */
  illustrations: CatalogImage[]
}

// ─── Fallback global ────────────────────────────────────────────────────────

/**
 * Image utilisée tant qu'un visuel cible n'a pas été généré.
 * Ce fichier existe déjà dans `public/images/generate/`.
 */
export const FALLBACK_IMAGE: CatalogImage = {
  src: '/images/generate/image_generate.png',
  alt: 'Illustration générique d\'un rendu 3D intérieur produit par VizHome',
  width: 1920,
  height: 1080,
}

// ─── Helpers de construction ────────────────────────────────────────────────

function featureHero(slug: string, alt: string): CatalogImage {
  return {
    src: `/images/features/${slug}/hero.webp`,
    alt,
    width: 1920,
    height: 1080,
  }
}

function featureIllustration(slug: string, index: number, alt: string): CatalogImage {
  return {
    src: `/images/features/${slug}/illustration-${index}.webp`,
    alt,
    width: 1280,
    height: 960,
  }
}

// ─── Catalogue des pages features ───────────────────────────────────────────

export const FEATURE_IMAGES: Record<string, FeatureImageSet> = {
  'auto-3d': {
    hero: featureHero(
      'auto-3d',
      'Vue cinématique d\'un salon scandinave généré automatiquement en 3D depuis un croquis 2D',
    ),
    illustrations: [
      featureIllustration('auto-3d', 1, 'Croquis 2D simple d\'un plan de salon avec lignes au crayon'),
      featureIllustration('auto-3d', 2, 'Étape intermédiaire : plan converti en maillage 3D filaire'),
      featureIllustration('auto-3d', 3, 'Rendu 3D photoréaliste final d\'une chambre épurée'),
      featureIllustration('auto-3d', 4, 'Comparaison avant/après : photo de pièce vide à gauche, rendu 3D meublé à droite'),
      featureIllustration('auto-3d', 5, 'Détail macro d\'un canapé en lin texturé dans un séjour ensoleillé'),
    ],
  },
  'materials': {
    hero: featureHero(
      'materials',
      'Bibliothèque de matériaux PBR : bois, marbre, lin et béton ciré présentés sur des panneaux flottants',
    ),
    illustrations: [
      featureIllustration('materials', 1, 'Échantillon de parquet chêne clair avec veines naturelles'),
      featureIllustration('materials', 2, 'Mur en béton ciré gris avec léger grain et reflets doux'),
      featureIllustration('materials', 3, 'Plan de travail en marbre blanc veiné avec finition mate'),
      featureIllustration('materials', 4, 'Tissu lin beige plié avec ombres tombantes naturelles'),
      featureIllustration('materials', 5, 'Bibliothèque de tuiles texturées présentée en grille sur fond clair'),
    ],
  },
  'intelligent-lighting': {
    hero: featureHero(
      'intelligent-lighting',
      'Même séjour rendu en trois ambiances lumineuses différentes : matin, après-midi, soir',
    ),
    illustrations: [
      featureIllustration('intelligent-lighting', 1, 'Salle à manger baignée d\'une lumière dorée de fin d\'après-midi'),
      featureIllustration('intelligent-lighting', 2, 'Chambre en ambiance nocturne avec lampes d\'appoint chaudes'),
      featureIllustration('intelligent-lighting', 3, 'Cuisine éclairée par une grande baie vitrée orientée nord'),
      featureIllustration('intelligent-lighting', 4, 'Schéma de positionnement de lampes intelligentes dans un plan vu de dessus'),
      featureIllustration('intelligent-lighting', 5, 'Détail d\'un rayon de soleil traversant un rideau en lin'),
    ],
  },
  '360-views': {
    hero: featureHero(
      '360-views',
      'Vue panoramique équirectangulaire 360 degrés d\'un loft contemporain avec mezzanine',
    ),
    illustrations: [
      featureIllustration('360-views', 1, 'Interface de navigation 360 avec hotspots cliquables dans un séjour'),
      featureIllustration('360-views', 2, 'Vue immersive depuis le centre d\'une chambre parentale'),
      featureIllustration('360-views', 3, 'Aperçu d\'un casque VR posé sur un bureau bois clair'),
      featureIllustration('360-views', 4, 'Mini-carte de navigation entre plusieurs pièces d\'un appartement'),
      featureIllustration('360-views', 5, 'Capture d\'une visite virtuelle visualisée sur tablette tactile'),
    ],
  },
  'collaboration': {
    hero: featureHero(
      'collaboration',
      'Trois designers et un client annotant un même rendu 3D sur un grand écran tactile partagé',
    ),
    illustrations: [
      featureIllustration('collaboration', 1, 'Bulles de commentaires ancrées sur un mur dans un rendu 3D de cuisine'),
      featureIllustration('collaboration', 2, 'Curseurs nommés de plusieurs utilisateurs sur un même plan 3D'),
      featureIllustration('collaboration', 3, 'Comparaison côte à côte de deux versions d\'un salon validées par un client'),
      featureIllustration('collaboration', 4, 'Historique de versions affiché en colonne à côté d\'un rendu de chambre'),
      featureIllustration('collaboration', 5, 'Notification de partage de projet sur un écran d\'ordinateur portable'),
    ],
  },
  'mobile-apps': {
    hero: featureHero(
      'mobile-apps',
      'Smartphone et tablette posés sur une table en bois affichant l\'éditeur 3D VizHome',
    ),
    illustrations: [
      featureIllustration('mobile-apps', 1, 'Capture d\'écran de l\'app mobile montrant la galerie de projets'),
      featureIllustration('mobile-apps', 2, 'Édition tactile d\'un meuble en 3D depuis une tablette'),
      featureIllustration('mobile-apps', 3, 'Scan d\'une pièce réelle avec la caméra arrière du téléphone'),
      featureIllustration('mobile-apps', 4, 'Synchronisation entre l\'app mobile et l\'éditeur desktop illustrée par une flèche'),
      featureIllustration('mobile-apps', 5, 'Notification push d\'un rendu terminé sur écran de verrouillage'),
    ],
  },
}

// ─── Hero images des pages marketing ────────────────────────────────────────

export const HERO_IMAGES = {
  homepage: {
    src: '/images/marketing/homepage/hero.webp',
    alt: 'Rendu 3D photoréaliste d\'un salon contemporain lumineux servant de hero VizHome',
    width: 1920,
    height: 1080,
  },
  pricing: {
    src: '/images/marketing/pricing/hero.webp',
    alt: 'Composition abstraite de cubes 3D bois et lin symbolisant les paliers tarifaires VizHome',
    width: 1600,
    height: 900,
  },
  about: {
    src: '/images/marketing/about/hero.webp',
    alt: 'Équipe VizHome en réunion devant un grand écran affichant un rendu 3D d\'appartement',
    width: 1600,
    height: 900,
  },
  contact: {
    src: '/images/marketing/contact/hero.webp',
    alt: 'Bureau minimaliste avec un ordinateur affichant un rendu VizHome et une plante verte',
    width: 1600,
    height: 900,
  },
  features: {
    src: '/images/marketing/features/hero.webp',
    alt: 'Collage des six fonctionnalités majeures de VizHome présentées en mosaïque',
    width: 1600,
    height: 900,
  },
} as const satisfies Record<string, CatalogImage>

// ─── Empty states ───────────────────────────────────────────────────────────

export const EMPTY_STATE_IMAGES = {
  emptyGallery: {
    src: '/images/empty-states/gallery.webp',
    alt: 'Cadres vides flottants évoquant une galerie de rendus encore vide',
    width: 800,
    height: 600,
  },
  emptyProjects: {
    src: '/images/empty-states/projects.webp',
    alt: 'Maquette miniature d\'une maison en attente sur un plan blanc',
    width: 800,
    height: 600,
  },
  emptyForum: {
    src: '/images/empty-states/forum.webp',
    alt: 'Bulle de discussion vide posée sur un fond crème texturé',
    width: 800,
    height: 600,
  },
  emptyNotifications: {
    src: '/images/empty-states/notifications.webp',
    alt: 'Cloche silencieuse posée sur un socle clair sans aucune notification',
    width: 800,
    height: 600,
  },
  emptySearch: {
    src: '/images/empty-states/search.webp',
    alt: 'Loupe posée sur un plan blanc évoquant une recherche sans résultat',
    width: 800,
    height: 600,
  },
  error404: {
    src: '/images/empty-states/error-404.webp',
    alt: 'Plan d\'une maison fragmentée évoquant une page introuvable',
    width: 800,
    height: 600,
  },
} as const satisfies Record<string, CatalogImage>

// ─── Open Graph (réseaux sociaux) ───────────────────────────────────────────

export const OG_IMAGES = {
  default: {
    src: '/images/og/default.webp',
    alt: 'VizHome : rendu 3D par IA',
    width: 1200,
    height: 630,
  },
  pricing: {
    src: '/images/og/pricing.webp',
    alt: 'Tarifs VizHome',
    width: 1200,
    height: 630,
  },
  features: {
    src: '/images/og/features.webp',
    alt: 'Fonctionnalités VizHome',
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, CatalogImage>

// ─── Helpers d'accès ────────────────────────────────────────────────────────

/**
 * Récupère l'image hero d'une feature, ou une illustration par son index 0-based.
 * Retombe sur `FALLBACK_IMAGE` si le slug ou l'index est inconnu.
 *
 * @example
 *   getFeatureImage('auto-3d', 'hero')        // hero de la page auto-3d
 *   getFeatureImage('auto-3d', 0)             // première illustration
 *   getFeatureImage('inconnu', 'hero')        // fallback
 */
export function getFeatureImage(
  slug: string,
  kind: 'hero' | number,
): CatalogImage {
  const set = FEATURE_IMAGES[slug]
  if (!set) {
    return FALLBACK_IMAGE
  }
  if (kind === 'hero') {
    return set.hero
  }
  const illustration = set.illustrations[kind]
  return illustration ?? FALLBACK_IMAGE
}

/**
 * Récupère un hero marketing par sa clé (homepage, pricing, etc.).
 */
export function getHeroImage(key: keyof typeof HERO_IMAGES): CatalogImage {
  return HERO_IMAGES[key] ?? FALLBACK_IMAGE
}

/**
 * Récupère une image d'empty state par sa clé.
 */
export function getEmptyStateImage(
  key: keyof typeof EMPTY_STATE_IMAGES,
): CatalogImage {
  return EMPTY_STATE_IMAGES[key] ?? FALLBACK_IMAGE
}

/**
 * Récupère une image Open Graph par sa clé.
 */
export function getOgImage(key: keyof typeof OG_IMAGES): CatalogImage {
  return OG_IMAGES[key] ?? OG_IMAGES.default
}

/**
 * Retourne `true` si l'image cible n'a pas encore été générée (= pointe vers
 * un chemin `/images/features/...` qui n'existe peut-être pas encore).
 * Utile pour afficher un badge "preview" pendant le sprint de génération.
 */
export function isPlaceholder(image: CatalogImage): boolean {
  return image.src === FALLBACK_IMAGE.src
}
