// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt(prettierConfig).override('nuxt/vue/rules', {
  rules: {
    // Personnalisation des règles
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',

    // Désactiver les règles obsolètes
    'no-new-symbol': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
})
