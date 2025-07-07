// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // Vue.js règles
    "vue/multi-word-component-names": "error",
    "vue/no-multiple-template-root": "off", // Vue 3 permet les fragments
    "vue/attribute-hyphenation": ["error", "always"],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/v-on-event-hyphenation": ["error", "always"],
    "vue/custom-event-name-casing": ["error", "camelCase"],
    "vue/define-macros-order": "error",
    "vue/define-props-declaration": "error",
    "vue/html-button-has-type": "error",
    "vue/html-comment-content-spacing": "error",
    "vue/no-boolean-default": "error",
    "vue/no-duplicate-attr-inheritance": "error",
    "vue/no-empty-component-block": "error",
    "vue/no-multiple-objects-in-class": "error",
    "vue/no-potential-component-option-typo": "error",
    "vue/no-required-prop-with-default": "error",
    "vue/no-static-inline-styles": "error",
    "vue/no-this-in-before-route-enter": "error",
    "vue/no-undef-components": "error",
    "vue/no-undef-properties": "error",
    "vue/no-unused-properties": "error",
    "vue/no-unused-refs": "error",
    "vue/no-useless-v-bind": "error",
    "vue/padding-line-between-blocks": "error",
    "vue/prefer-separate-static-class": "error",
    "vue/prefer-true-attribute-shorthand": "error",
    "vue/require-macro-variable-name": "error",
    "vue/v-for-delimiter-style": "error",
    "vue/valid-define-options": "error",

    // JavaScript/TypeScript règles générales
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "prefer-const": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
    "template-curly-spacing": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-arrow-callback": "error",
    "arrow-spacing": "error",
    "generator-star-spacing": "error",

    // Style de code
    semi: ["error", "never"],
    quotes: ["error", "single"],
    indent: ["error", 2], // 2 espaces pour une meilleure lisibilité
    "comma-dangle": ["error", "always-multiline"],
    "arrow-parens": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],

    // TypeScript règles (si disponibles)
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",

    // Import/Export règles
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-duplicates": "error",
    "import/no-cycle": "error",

    // Sécurité et qualité
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    radix: "error",

    // Promesses et async/await
    "prefer-promise-reject-errors": "error",
    "require-await": "error",
    "no-async-promise-executor": "error",
    "no-await-in-loop": "warn",
    "no-promise-executor-return": "error",

    // Nuxt règles spécifiques
    "nuxt/prefer-import-meta": "error",
  },

  ignores: [
    "node_modules",
    ".nuxt",
    "dist",
    ".output",
    "components/ui",
    "coverage",
    "*.min.js",
    "public",
    ".vscode",
    ".idea",
    "auto-imports.d.ts",
    "components.d.ts",
  ],
});
