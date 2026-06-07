/**
 * 01 — Auth flow.
 *
 * Covers the public marketing entry point + a full register / logout / login
 * cycle. Uses a freshly generated email per run so the test is idempotent
 * even when the backend keeps the previous accounts.
 */
import { expect, test } from '@playwright/test'
import {
  loginAs,
  logout,
  makeRandomCredentials,
  registerNewUser,
} from './helpers/auth'

test.describe('Auth flow', () => {
  test('landing page shows hero CTA leading to register', async ({ page }) => {
    await page.goto('/')

    // The hero contains a primary CTA for guests pointing at /auth/register.
    const ctaLink = page
      .getByRole('link', { name: /commencer gratuitement/i })
      .first()
    await expect(ctaLink).toBeVisible()

    await ctaLink.click()
    await expect(page).toHaveURL(/\/auth\/register$/)
    await expect(
      page.getByRole('heading', { name: /créer un compte/i })
    ).toBeVisible()
  })

  test('register a new account redirects to /render', async ({ page }) => {
    const creds = makeRandomCredentials()
    await registerNewUser(page, creds)

    await expect(page).toHaveURL(/\/render/)
  })

  test('logout then re-login with same credentials', async ({ page }) => {
    const creds = makeRandomCredentials()

    // Step 1 : create the account.
    await registerNewUser(page, creds)
    await expect(page).toHaveURL(/\/render/)

    // Step 2 : log out.
    await logout(page)

    // Step 3 : log back in with the same credentials. We accept either a
    // direct redirect to /render or to the login page first if logout
    // routes us back to the marketing site.
    await loginAs(page, creds.email, creds.password)
    await expect(page).toHaveURL(/\/render/)
  })
})
