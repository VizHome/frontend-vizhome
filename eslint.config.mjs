// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

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
      'arrow-spacing': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'eol-last': 'error',
      'no-trailing-spaces': 'error',

      // Règles spécifiques à Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 3,
          multiline: 1,
        },
      ],
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/mustache-interpolation-spacing': ['error', 'always'],
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

      // Règles de formatage
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'no-multi-spaces': 'error',
      'block-spacing': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  },

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
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue/v-on-function-call': ['error', 'never'],
      'vue/valid-next-tick': 'error',
    },
  },

  // Configuration pour les fichiers de configuration
  {
    files: ['*.config.{js,ts,mjs}', '*.config.*.{js,ts,mjs}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
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
