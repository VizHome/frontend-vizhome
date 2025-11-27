// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettierConfig from 'eslint-config-prettier'

export default withNuxt(
  // Configuration globale
  {
    // Fichiers à ignorer
    ignores: [
      'dist/**',
      'node_modules/**',
      '.nuxt/**',
      '.output/**',
      'coverage/**',
      '*.min.js',
      '*.d.ts',
      'public/**',
      'build/**',
      'static/**',
    ],
    rules: {
      // Désactiver les règles dépréciées
      'no-new-symbol': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Configuration pour les fichiers TypeScript et Vue
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    rules: {
      // Règles générales de qualité de code
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // Désactivé car géré par @typescript-eslint
      'no-undef': 'off', // Désactivé car géré par TypeScript
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',

      // Règles spécifiques à Vue (sans conflits avec Prettier)
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/v-bind-style': ['error', 'shorthand'],
      'vue/v-on-style': ['error', 'shorthand'],
      'vue/order-in-components': 'error',
      'vue/this-in-template': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-unused-vars': 'error',
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',
      'vue/no-duplicate-attributes': 'error',
      'vue/no-parsing-error': 'error',
      'vue/no-reserved-keys': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-if': 'error',
      'vue/valid-v-model': 'error',
      'vue/valid-v-show': 'error',

      // Règles TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // Règles d'importation
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off', // Géré par TypeScript
      'import/named': 'off', // Géré par TypeScript
      'import/default': 'off', // Géré par TypeScript
      'import/namespace': 'off', // Géré par TypeScript
    },
  },

  // Désactiver les règles ESLint qui entrent en conflit avec Prettier
  prettierConfig,

  // Configuration spécifique pour les fichiers Vue
  {
    files: ['**/*.vue'],
    rules: {
      // Règles spécifiques aux composants Vue
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue'],
          shouldMatchCase: true,
        },
      ],
      'vue/no-boolean-default': 'error',
      'vue/no-duplicate-attr-inheritance': 'error',
      'vue/no-empty-component-block': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-potential-component-option-typo': 'error',
      'vue/no-reserved-component-names': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue/valid-next-tick': 'error',
    },
  },

  // Configuration pour les fichiers de configuration
  {
    files: ['*.config.{js,ts,mjs}', '*.config.*.{js,ts,mjs}'],
    rules: {
      'no-console': 'off',
      'import/no-default-export': 'off',
    },
  },

  // Configuration pour les fichiers de test
  {
    files: ['**/*.test.{js,ts,vue}', '**/*.spec.{js,ts,vue}', '**/tests/**'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/one-component-per-file': 'off',
    },
  },

  // Configuration pour les pages et layouts Nuxt
  {
    files: ['pages/**/*.vue', 'layouts/**/*.vue', 'error.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // Configuration pour les composables et utilitaires
  {
    files: [
      'composables/**/*.{js,ts}',
      'utils/**/*.{js,ts}',
      'lib/**/*.{js,ts}',
    ],
    rules: {
      'import/prefer-default-export': 'off',
    },
  }
)
