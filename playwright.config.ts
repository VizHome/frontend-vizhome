/**
 * Playwright configuration for VizHome E2E tests.
 *
 * Strategy: we DO NOT auto-start the Nuxt dev server via `webServer` because
 * the backend (Django) must also be running on :8000 for these tests to be
 * meaningful. Starting only the frontend would produce a flood of network
 * errors and false negatives. Instead, the developer (or CI) is expected to:
 *
 *   1. Start the backend (`python manage.py runserver` or docker-compose up).
 *   2. Start the frontend (`npm run dev` or `npm run preview`).
 *   3. Then run `npm run test:e2e`.
 *
 * The base URL is overridable via `PLAYWRIGHT_BASE_URL`, defaulting to the
 * Nuxt dev server on port 3000.
 */
import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests/e2e',

  // Treat anything past this as a runaway test.
  timeout: 30_000,

  // Each `expect()` poll caps at 5s before failing.
  expect: {
    timeout: 5_000,
  },

  // Workers : keep parallelism low locally to avoid auth-state collisions
  // across tests that share the same E2E user, but fan out on CI.
  workers: isCI ? 2 : 1,

  // Fail the build on accidentally committed `test.only(...)`.
  forbidOnly: isCI,

  retries: isCI ? 2 : 0,

  reporter: isCI
    ? [['list'], ['html', { open: 'never' }]]
    : [['list']],

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Default action timeout : keep short to surface UI hangs quickly.
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // Dedicated project with a longer timeout for the render flow, which
      // spins up Three.js + WebGL and is slower to settle than auth pages.
      name: 'chromium-render',
      testMatch: /03-render-flow\.spec\.ts$/,
      timeout: 60_000,
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // We deliberately leave `webServer` undefined : see top-of-file comment.
  webServer: undefined,
})
