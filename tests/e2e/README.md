# E2E tests (Playwright)

Smoke + critical-path tests driving the VizHome frontend through a real
Chromium browser.

## Quick start

1. Copy `.env.example.e2e` to `.env.local.e2e` at the repo root and fill in
   the credentials for two test accounts (a normal user and a free-plan user).
   These accounts must already exist in the backend you are pointing at.
2. Make sure both the backend (`:8000`) and the frontend (`:3000`) are
   running locally.
3. Install the Playwright browser binaries (one-time) :

   ```bash
   npm run test:e2e:install
   ```

4. Run the tests :

   ```bash
   npm run test:e2e
   ```

## Interactive debugger

```bash
npm run test:e2e:ui
```

Opens the Playwright UI runner with time-travel debugging, network panel,
and selector picker.

## Prerequisites

- Backend running on `http://localhost:8000` (Django + Postgres + Redis).
- Frontend running on `http://localhost:3000` (`npm run dev` or
  `npm run preview`).
- Two test users seeded in the backend :
  - `E2E_USER_EMAIL` / `E2E_USER_PASSWORD` : any plan, used by most tests.
  - `E2E_FREE_USER_EMAIL` / `E2E_FREE_USER_PASSWORD` : guaranteed free
    plan, used by the paywall test (`04-paywall.spec.ts`).

If those env vars are missing the tests will fail fast with an explicit
error rather than silently skipping — by design.

## Environment file

Playwright reads env vars from the process environment, so you can either :

- Export them in your shell (`export E2E_USER_EMAIL=...`).
- Source `.env.local.e2e` before running : `set -a && source .env.local.e2e && set +a && npm run test:e2e`.
- Use a tool like `dotenv-cli` : `npx dotenv -e .env.local.e2e -- npm run test:e2e`.

`.env.local.e2e` is git-ignored.

## Scope

These tests cover :

- Auth flow (landing CTA → register → logout → re-login).
- Project creation and opening.
- Render page : canvas presence + prompt panel POST to `/renders/`.
- Paywall : Free user sees the upgrade CTA, click triggers backend POST.
- Billing page : sections render, no destructive error alerts.

These tests intentionally do NOT cover :

- Full Three.js / WebGL rendering correctness. Headless Chromium has no
  GPU, scene initialisation is race-prone, and visual diffing is out of
  scope. Use manual QA for visual regressions.
- Stripe Checkout end-to-end. We only assert the frontend dispatches the
  request to the backend.
- AI render completion (would require Celery + an AI worker).
- Multi-browser support : we run Chromium only.

## CI

A workflow stub lives at `.github/workflows/e2e.yml`. It runs on push to
`main` and on manual dispatch. The job is currently `continue-on-error: true`
because the backend seeding step is still a TODO.
