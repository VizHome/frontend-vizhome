/**
 * 04 — Paywall (free plan).
 *
 * Logs in as a guaranteed-free user and asserts the billing page shows
 * the "Free" plan badge plus an upgrade CTA. We stop short of actually
 * opening Stripe Checkout (that would leave the test browsing checkout.
 * stripe.com, which is out of scope) but we DO assert the click triggers
 * an outbound POST to the backend billing endpoint.
 */
import { expect, test } from './helpers/fixtures'

test.describe('Paywall on free plan', () => {
  test('displays Free plan badge and upgrade CTA', async ({ freeAuthedPage }) => {
    const page = freeAuthedPage
    await page.goto('/account/billing')

    // The "Plan actuel" card always shows a badge with the plan name.
    // For a free user it must read "Free" (case-insensitive, the badge
    // is uppercase-styled via CSS).
    await expect(
      page.getByText(/free/i).first()
    ).toBeVisible()

    const upgradeButton = page.getByRole('button', { name: /passer sur pro|choisir ce plan/i })
    await expect(upgradeButton.first()).toBeVisible()
  })

  test('clicking upgrade triggers a checkout request', async ({ freeAuthedPage }) => {
    const page = freeAuthedPage
    await page.goto('/account/billing')

    const checkoutRequestPromise = page.waitForRequest(
      (req) =>
        (req.url().includes('/billing/checkout') ||
          req.url().includes('/billing/subscribe') ||
          req.url().includes('/checkout')) &&
        req.method() === 'POST',
      { timeout: 10_000 }
    )

    const upgradeButton = page
      .getByRole('button', { name: /passer sur pro/i })
      .first()
    await upgradeButton.click()

    // We expect the frontend to POST to the backend to obtain the Stripe
    // session URL. If it never fires, this fails with a timeout — desired.
    const req = await checkoutRequestPromise.catch(() => null)
    expect(req, 'expected a POST to the backend billing endpoint').not.toBeNull()
  })
})
