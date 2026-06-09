import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

/**
 * Config Vitest pour les tests UNITAIRES purs (composables, helpers).
 * Environnement `jsdom` pour les APIs browser-like (localStorage,
 * sessionStorage, crypto). N'instancie pas un Nuxt complet.
 *
 * Pour tester un composant Vue avec injection Nuxt (auto-imports,
 * `useRoute`, etc.), créer un fichier `*.nuxt.test.ts` et mettre
 * `// @vitest-environment nuxt` en haut — Vitest utilise alors
 * `@nuxt/test-utils/config` pour ce fichier.
 */
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // `tests/e2e/**` sont des tests Playwright (`@playwright/test`) qui
    // ne doivent PAS être exécutés par Vitest. Sans cette exclusion,
    // Vitest scan les `*.spec.ts` du dossier et plante avec
    // "Playwright Test did not expect test.describe() to be called here".
    // Les E2E se lancent via `npm run test:e2e` (cf package.json).
    exclude: [
      '**/node_modules/**',
      '**/.nuxt/**',
      '**/.output/**',
      'tests/e2e/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'lcov', 'html'],
      // `all: true` => les fichiers JAMAIS chargés par un test apparaissent
      // quand même dans le rapport (avec 0 % couvert). Sans ça, Sonar voit
      // "0% global" car le lcov.info ne liste que les composables testés.
      // Avec `all: true`, on a une vraie photo du périmètre couvert.
      // (le type discriminant entre v8/istanbul providers n'est pas
      //  parfaitement typé en 4.x, on annote pour rester clean côté tsc).
      // @ts-expect-error v8 provider accepte `all` au runtime
      all: true,
      include: [
        'composables/**/*.ts',
        'utils/**/*.ts',
        'lib/**/*.ts',
        'plugins/**/*.ts',
        'middleware/**/*.ts',
        'server/**/*.ts',
      ],
      exclude: [
        'node_modules/**',
        '.nuxt/**',
        '.output/**',
        'dist/**',
        'coverage/**',
        '**/*.config.{js,ts,mjs}',
        '**/*.d.ts',
        'tests/**',
        // Composants UI auto-importés par shadcn-vue (testés en E2E)
        'components/ui/**',
        // Composables Three.js : tester un canvas WebGL en jsdom n'a pas
        // d'intérêt (mocks lourds, faux positifs). Couverts en E2E.
        'composables/useThree*.ts',
        'composables/useSketchCanvas.ts',
        // Composables Admin (UI seulement, peu de logique pure)
        'composables/useAdmin*.ts',
        // Composables 2FA / Support / Contact / AiRender / SSE : helpers
        // de wiring, déjà couverts indirectement via les pages en E2E.
        'composables/use2fa.ts',
        'composables/useSupport.ts',
        'composables/useContact.ts',
        'composables/useAiRender.ts',
        'composables/useSSE.ts',
        // Server endpoints Nitro : couverts par les E2E Playwright.
        'server/**',
        // Middlewares : route guards triviaux, couvert E2E.
        'middleware/**',
        // Plugins client (bootstrap auth, etc.) : effet de bord global.
        'plugins/**',
      ],
      // Seuils planchers : on commence prudent pour ne pas bloquer la CI
      // tout en ayant un point de mire. À monter dans les prochaines PRs
      // au fur et à mesure que la couverture progresse.
      thresholds: {
        statements: 40,
        branches: 30,
        functions: 30,
        lines: 40,
      },
    },
    // Alias pour résoudre les imports `~/`
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
