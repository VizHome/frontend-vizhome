/**
 * Auth helpers for E2E tests.
 *
 * These helpers drive the real login/register UI rather than seeding tokens
 * directly into localStorage. The reason: we want to exercise the full
 * vee-validate + useAuth flow, which is the most fragile area of the app.
 *
 * If a future refactor introduces a `signInProgrammatically()` shortcut, we
 * can swap the body of `loginAs` without touching the spec files.
 */
import { expect, type Page } from '@playwright/test'

export interface RegisterPayload {
  email: string
  pseudo: string
  password: string
  firstName?: string
  lastName?: string
}

/**
 * Fills the /auth/login form and waits for the post-login redirect.
 * Throws if the redirect to `/render` does not happen within the timeout
 * (e.g. invalid credentials, backend down, 2FA challenge unexpected).
 */
export async function loginAs(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto('/auth/login')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Mot de passe', { exact: true }).fill(password)
  await page.getByRole('button', { name: /se connecter/i }).click()
  await page.waitForURL(/\/render/, { timeout: 15_000 })
}

/**
 * Fills the /auth/register form with the provided payload and waits for
 * the post-register redirect to `/render`.
 */
export async function registerNewUser(
  page: Page,
  payload: RegisterPayload
): Promise<void> {
  await page.goto('/auth/register')

  const firstName = payload.firstName ?? 'Test'
  const lastName = payload.lastName ?? 'User'

  await page.getByLabel('Prénom').fill(firstName)
  await page.getByLabel('Nom', { exact: true }).fill(lastName)
  await page.getByLabel(/Pseudo/).fill(payload.pseudo)
  await page.getByLabel('Email').fill(payload.email)

  // Two password fields. We disambiguate via the `id` attribute exposed by
  // the form (`password` vs `confirmPassword`) since both share the same
  // accessible label start.
  await page.locator('#password').fill(payload.password)
  await page.locator('#confirmPassword').fill(payload.password)

  // The terms checkbox is required by the validator. shadcn-vue Checkbox
  // is a button under the hood, so we click the associated label.
  await page.locator('label[for="terms"]').click()

  await page.getByRole('button', { name: /s'inscrire/i }).click()
  await page.waitForURL(/\/render/, { timeout: 20_000 })
}

/**
 * Opens the UserNav dropdown and clicks "Déconnexion".
 * Tolerant: if no UserNav is visible (already logged out), no-op.
 */
export async function logout(page: Page): Promise<void> {
  // The UserNav avatar trigger is typically a button with role="button".
  // We open the dropdown by clicking the avatar.
  const avatarTrigger = page.getByRole('button', { name: /menu utilisateur|user menu|avatar/i })
  if ((await avatarTrigger.count()) === 0) {
    // Fallback: hit /auth/logout via direct navigation if exposed, else just clear.
    await page.evaluate(() => localStorage.removeItem('vizhome:auth:tokens'))
    return
  }
  await avatarTrigger.first().click()
  const logoutItem = page.getByRole('menuitem', { name: /déconnexion|se déconnecter|logout/i })
  await expect(logoutItem).toBeVisible()
  await logoutItem.click()
  await page.waitForURL(/\/(auth\/login|$)/, { timeout: 10_000 })
}

/**
 * Builds a random email + pseudo pair safe to use for a fresh registration.
 * Uses the run's current timestamp to keep things human-readable in test
 * reports while staying unique enough to avoid collisions on retries.
 */
export function makeRandomCredentials(): RegisterPayload {
  const stamp = Date.now().toString(36)
  const rand = Math.random().toString(36).slice(2, 6)
  return {
    email: `e2e+${stamp}${rand}@vizhome.test`,
    pseudo: `e2e${stamp}${rand}`.slice(0, 30),
    password: 'TestPassword!234',
    firstName: 'E2E',
    lastName: 'Runner',
  }
}
