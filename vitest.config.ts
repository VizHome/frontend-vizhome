import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.nuxt/**',
        '.output/**',
        'dist/**',
        'coverage/**',
        '**/*.config.{js,ts,mjs}',
        '**/*.d.ts',
      ],
    },
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
