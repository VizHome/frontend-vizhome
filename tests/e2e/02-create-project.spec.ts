/**
 * 02 — Create project.
 *
 * Drives the /projects page : create a project via the "Nouveau projet"
 * dialog, confirm it appears in the grid, then open it and confirm we
 * end up on /render with the right `?project=` query.
 */
import { expect, test } from './helpers/fixtures'

test.describe('Create project', () => {
  test('creates a project and finds it in the listing', async ({ authedPage }) => {
    const page = authedPage
    await page.goto('/projects')

    const title = `Projet E2E ${Date.now().toString(36)}`
    const description = 'Created by Playwright E2E suite'

    await page.getByRole('button', { name: /nouveau projet/i }).click()

    // Dialog is now open. Fill the form.
    await page.getByLabel(/titre/i).fill(title)
    await page.getByLabel(/description/i).fill(description)

    // Submit. The "Créer et ouvrir" button navigates to /render with the
    // freshly created project id, so we wait for that URL change.
    await Promise.all([
      page.waitForURL(/\/render\?project=\d+/, { timeout: 15_000 }),
      page.getByRole('button', { name: /créer et ouvrir/i }).click(),
    ])

    // Go back to /projects and check the project is now in the listing.
    await page.goto('/projects')
    await expect(page.getByText(title, { exact: false }).first()).toBeVisible()
  })

  test('opens an existing project from the grid', async ({ authedPage }) => {
    const page = authedPage
    await page.goto('/projects')

    // We piggy-back on the test above to ensure at least one project exists.
    // If none is visible (e.g. running this test in isolation), create one
    // inline so the test stays independent.
    const firstProjectTitle = page
      .locator('h3.font-semibold')
      .first()

    if ((await firstProjectTitle.count()) === 0) {
      const title = `Projet inline ${Date.now().toString(36)}`
      await page.getByRole('button', { name: /nouveau projet/i }).click()
      await page.getByLabel(/titre/i).fill(title)
      await Promise.all([
        page.waitForURL(/\/render\?project=\d+/, { timeout: 15_000 }),
        page.getByRole('button', { name: /créer et ouvrir/i }).click(),
      ])
      await page.goto('/projects')
    }

    await firstProjectTitle.click()
    await expect(page).toHaveURL(/\/render\?project=\d+/)
  })
})
