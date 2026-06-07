/**
 * Custom Playwright fixtures for VizHome E2E.
 *
 * `authedPage` : a `Page` already logged in as the test user defined by
 * `E2E_USER_EMAIL` / `E2E_USER_PASSWORD`. Tests that need an authenticated
 * session should depend on this fixture rather than re-implementing login.
 *
 * `freeAuthedPage` : same idea, but for a guaranteed free-plan user, used
 * by the paywall scenario.
 *
 * If the env vars are not set, the fixture throws with a clear message so
 * the CI/local user understands what is missing. We deliberately do NOT
 * fall back to anonymous browsing — silent fallbacks make broken auth
 * setups invisible in reports.
 */
import { test as base, type Page } from '@playwright/test'
import { loginAs } from './auth'

interface E2EFixtures {
  authedPage: Page
  freeAuthedPage: Page
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing env var ${name}. Set it in your .env.local.e2e file or CI secrets.`
    )
  }
  return value
}

export const test = base.extend<E2EFixtures>({
  authedPage: async ({ page }, use) => {
    const email = requireEnv('E2E_USER_EMAIL')
    const password = requireEnv('E2E_USER_PASSWORD')
    await loginAs(page, email, password)
    await use(page)
  },

  freeAuthedPage: async ({ page }, use) => {
    const email = requireEnv('E2E_FREE_USER_EMAIL')
    const password = requireEnv('E2E_FREE_USER_PASSWORD')
    await loginAs(page, email, password)
    await use(page)
  },
})

export { expect } from '@playwright/test'
