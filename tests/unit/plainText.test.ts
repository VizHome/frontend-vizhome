/**
 * Tests des helpers de conversion HTML rich text → plain text.
 * Réutilisés dans forum, support, et la création de tickets pour
 * compter la longueur réelle saisie (sans les balises HTML).
 */
import { describe, expect, it } from 'vitest'

function plainTextLength(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim().length
}

describe('plainTextLength', () => {
  it('retourne 0 pour vide', () => {
    expect(plainTextLength('')).toBe(0)
    expect(plainTextLength('   ')).toBe(0)
  })

  it('compte les chars hors balises', () => {
    expect(plainTextLength('<p>hello</p>')).toBe(5)
    // "bold text" = 9 chars, mais les balises remplacées par espace + space
    // entre tags + texte donne "bold  text" = 10 après trim (2 espaces intérieurs)
    expect(plainTextLength('<strong>bold</strong> text')).toBe(10)
  })

  it('gère &nbsp; comme un espace', () => {
    expect(plainTextLength('foo&nbsp;bar')).toBe(7)
  })

  it('multi-balises imbriquées', () => {
    const html = '<div><p>line1</p><ul><li>item1</li><li>item2</li></ul></div>'
    // line1 + item1 + item2 = 5+5+5 = 15 + 2 spaces séparateurs
    expect(plainTextLength(html)).toBeGreaterThanOrEqual(15)
  })

  it('ignore les attributs HTML', () => {
    const html = '<a href="https://very-long-url.example.com">click</a>'
    expect(plainTextLength(html)).toBe(5)
  })
})
