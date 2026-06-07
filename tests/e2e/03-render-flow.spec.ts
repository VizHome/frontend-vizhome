/**
 * 03 — Render flow (prompt panel).
 *
 * The full Three.js + WebGL pipeline cannot be exercised reliably in a
 * headless browser (no GPU, race-prone canvas sizing). What we CAN verify :
 *
 *   - The `/render` page loads with a `<canvas>` element present.
 *   - Switching to the "prompt" mode displays the PromptPanel.
 *   - Filling and submitting the prompt triggers a POST to `/renders/`.
 *
 * We deliberately do NOT wait for the render to actually complete : that
 * would require Celery + AI backend + storage which is well out of scope
 * for a smoke test. Intercepting the network request is enough to prove
 * the wiring up to the backend boundary.
 */
import { expect, test } from './helpers/fixtures'

test.describe('Render flow', () => {
  test('canvas is rendered on /render', async ({ authedPage }) => {
    const page = authedPage
    await page.goto('/render')
    // The Three.js canvas is always mounted but may be hidden via v-show
    // when the active mode is not "3d". Either way, the element exists.
    const canvas = page.locator('canvas').first()
    await expect(canvas).toBeAttached()
  })

  test('prompt panel accepts input and dispatches a render request', async ({
    authedPage,
  }) => {
    const page = authedPage

    // Capture the outgoing POST /renders/ request triggered by clicking
    // "Générer". We listen BEFORE navigating to avoid missing fast races.
    const renderRequestPromise = page.waitForRequest(
      (req) => req.url().includes('/renders') && req.method() === 'POST',
      { timeout: 20_000 }
    )

    await page.goto('/render')

    // Switch to prompt mode via the RenderModeBar. The button label is
    // "Prompt" or contains "prompt" depending on the i18n state.
    const promptModeButton = page.getByRole('button', { name: /prompt/i })
    if ((await promptModeButton.count()) > 0) {
      await promptModeButton.first().click()
    } else {
      // Fallback : the mode is selectable via a tab role in some refactors.
      await page.getByRole('tab', { name: /prompt/i }).first().click()
    }

    // The textarea has a placeholder that starts with "Ex:" — robust
    // because it's used by the SUGGESTIONS-driven UI.
    const promptInput = page.getByPlaceholder(/^Ex:/)
    await expect(promptInput).toBeVisible()
    await promptInput.fill('Modern interior')

    // Submit.
    const generateButton = page.getByRole('button', { name: /^générer$/i })
    await expect(generateButton).toBeEnabled()
    await generateButton.click()

    // We expect the network call to happen. If the backend is unreachable
    // the test will fail here with a clear timeout, which is the right
    // signal — better than a green test that silently skips the assertion.
    const request = await renderRequestPromise
    expect(request.method()).toBe('POST')
    const body = request.postDataJSON() as Record<string, unknown> | null
    if (body) {
      // The payload should at minimum echo back the prompt we typed.
      expect(JSON.stringify(body)).toContain('Modern interior')
    }
  })
})
