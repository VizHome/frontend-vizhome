/**
 * Tests pour `lib/utils.ts` (helper `cn` Tailwind).
 */
import { describe, expect, it } from 'vitest'

import { cn } from '~/lib/utils'

describe('cn', () => {
  it('joint deux classes simples', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('résout les conflits tailwind via twMerge', () => {
    // Une seule largeur reste, la dernière gagne (twMerge).
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('accepte des classes conditionnelles falsy', () => {
    const disabled = false as boolean
    expect(cn('btn', disabled && 'hidden', null, undefined, 'primary')).toBe(
      'btn primary',
    )
  })

  it('accepte des objets (clsx)', () => {
    expect(cn({ 'is-active': true, 'is-disabled': false })).toBe('is-active')
  })

  it('accepte des arrays imbriqués', () => {
    expect(cn(['a', ['b', { c: true }]])).toBe('a b c')
  })
})
