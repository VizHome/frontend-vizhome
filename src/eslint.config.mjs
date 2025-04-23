// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/v-on-event-hyphenation': ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': 'warn',
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
  },
  ignores: ['node_modules', '.nuxt', 'dist', '.output','components/ui'],
})
