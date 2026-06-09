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
      ],
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
