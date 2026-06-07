/**
 * 05 — Billing page renders without destructive errors.
 *
 * Smoke test : the billing page is a high-traffic settings entry point.
 * It must always render its three main sections even when the user has
 * no subscription / no invoices. Any destructive Alert (Stripe down,
 * backend 500, etc.) is a hard fail.
 */
import { expect, test } from './helpers/fixtures'

test.describe('Billing page', () => {
  test('renders subscription / plans / invoices sections', async ({ authedPage }) => {
    const page = authedPage
    await page.goto('/account/billing')

    // Main page heading.
    await expect(
      page.getByRole('heading', { name: /abonnement.*facturation/i })
    ).toBeVisible()

    // The three CardTitle sections must be visible.
    await expect(page.getByText('Plan actuel', { exact: true })).toBeVisible()
    await expect(
      page.getByText('Plans disponibles', { exact: true })
    ).toBeVisible()
    await expect(page.getByText('Factures', { exact: true })).toBeVisible()
  })

  test('does not display destructive error alerts', async ({ authedPage }) => {
    const page = authedPage
    await page.goto('/account/billing')

    // shadcn-vue Alert with variant="destructive" renders the
    // `Certaines données n'ont pas pu être chargées` block. We check it
    // is NOT visible — implies all three billing endpoints answered OK.
    const destructiveAlert = page.getByText(
      /Certaines données n'ont pas pu être chargées/i
    )
    await expect(destructiveAlert).toHaveCount(0)
  })
})
