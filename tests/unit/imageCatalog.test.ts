/**
 * Tests pour `lib/imageCatalog.ts` (catalogue d'images centralisé).
 *
 * Couvre les helpers exposés : `getFeatureImage`, `getHeroImage`,
 * `getEmptyStateImage`, `getOgImage`, `isPlaceholder`. Vérifie aussi
 * que les structures de mapping sont bien renseignées.
 */
import { describe, expect, it } from 'vitest'

import {
  EMPTY_STATE_IMAGES,
  FALLBACK_IMAGE,
  FEATURE_IMAGES,
  HERO_IMAGES,
  OG_IMAGES,
  getEmptyStateImage,
  getFeatureImage,
  getHeroImage,
  getOgImage,
  isPlaceholder,
} from '~/lib/imageCatalog'

describe('FEATURE_IMAGES mapping', () => {
  it('contient une entrée par feature page', () => {
    for (const slug of [
      'auto-3d',
      'materials',
      'intelligent-lighting',
      '360-views',
      'collaboration',
      'mobile-apps',
    ]) {
      expect(FEATURE_IMAGES[slug]).toBeDefined()
      expect(FEATURE_IMAGES[slug]!.hero.src).toMatch(/^\//)
      expect(FEATURE_IMAGES[slug]!.illustrations.length).toBeGreaterThan(0)
    }
  })
})

describe('getFeatureImage', () => {
  it("retourne le hero d'une feature connue", () => {
    const img = getFeatureImage('auto-3d', 'hero')
    expect(img.src).toMatch(/auto-3d/)
    expect(img.alt.length).toBeGreaterThan(0)
  })

  it("retourne l'illustration n°i", () => {
    const img = getFeatureImage('auto-3d', 0)
    expect(img.src).toBeTruthy()
  })

  it('retourne le fallback pour une feature inconnue', () => {
    const img = getFeatureImage('inconnue', 'hero')
    expect(img.src).toBe(FALLBACK_IMAGE.src)
  })

  it('retourne le fallback si index hors borne', () => {
    const img = getFeatureImage('auto-3d', 999)
    expect(img.src).toBe(FALLBACK_IMAGE.src)
  })
})

describe('getHeroImage / getOgImage / getEmptyStateImage', () => {
  it('getHeroImage retourne une CatalogImage', () => {
    expect(getHeroImage('homepage').src).toBeTruthy()
  })

  it('getHeroImage retombe sur un fallback pour clé inconnue', () => {
    // @ts-expect-error test runtime fallback
    const img = getHeroImage('inconnu')
    expect(img.src).toBeTruthy()
    expect(img.alt).toBeTruthy()
  })

  it('getOgImage retombe sur un fallback pour clé inconnue', () => {
    // @ts-expect-error test runtime fallback
    const img = getOgImage('inconnu')
    expect(img.src).toBeTruthy()
  })

  it('getEmptyStateImage retombe sur un fallback pour clé inconnue', () => {
    // @ts-expect-error test runtime fallback
    const img = getEmptyStateImage('inconnu')
    expect(img.src).toBeTruthy()
  })
})

describe('isPlaceholder', () => {
  it('détecte les chemins placeholder fallback', () => {
    expect(isPlaceholder(FALLBACK_IMAGE)).toBe(true)
  })

  it('renvoie false pour une vraie image de la galerie', () => {
    const real = HERO_IMAGES.homepage
    if (real && real.src !== FALLBACK_IMAGE.src) {
      expect(isPlaceholder(real)).toBe(false)
    }
  })
})

describe('Structures globales', () => {
  it('HERO_IMAGES a au moins homepage', () => {
    expect(HERO_IMAGES.homepage).toBeDefined()
  })

  it('OG_IMAGES a au moins une clé', () => {
    expect(Object.keys(OG_IMAGES).length).toBeGreaterThan(0)
  })

  it('EMPTY_STATE_IMAGES a au moins une clé', () => {
    expect(Object.keys(EMPTY_STATE_IMAGES).length).toBeGreaterThan(0)
  })
})
