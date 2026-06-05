// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt(prettierConfig)
  // ─── Règles personnalisées ────────────────────────────────────────────
  .override('nuxt/vue/rules', {
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // Désactiver les règles obsolètes
      'no-new-symbol': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  })
  // ─── Ignore globaux : composants shadcn-vue auto-générés ──────────────
  // On les met à jour via `npx shadcn-vue add`, leurs warnings upstream
  // (vue/require-default-prop, no-explicit-any) ne sont pas notre dette.
  .append({
    ignores: [
      'components/ui/**',
    ],
  })
