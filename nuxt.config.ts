// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  // Future flags pour compatibilité
  future: {
    compatibilityVersion: 4,
  },

  // Devtools
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  // Dev server configuration
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },

  // App config — defaults SEO + transitions
  app: {
    head: {
      title: 'VizHome',
      titleTemplate: '%s | VizHome',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'VizHome — De la photo au rendu 3D en 30 secondes. Croquis IA, génération par prompt, éditeur 3D pro.' },
        { name: 'theme-color', content: '#171716' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'VizHome' },
        { property: 'og:title', content: 'VizHome — Rendu 3D par IA' },
        { property: 'og:description', content: 'De la photo au rendu 3D en 30 secondes.' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Preconnect aux services tiers les plus utilisés (perf TTFB OAuth)
        { rel: 'preconnect', href: 'https://accounts.google.com', crossorigin: '' },
      ],
      htmlAttrs: { lang: 'fr' },
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],

  // Configs CSS
  css: ['~/assets/css/tailwind.css'],

  // Performance optimizations
  experimental: {
    payloadExtraction: false,
    viewTransition: true,
    renderJsonPayloads: true,
    typedPages: false,
  },

  // Vite config
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Cold-start dev : pre-bundle les libs lourdes pour éviter le full reload sur 1er hit
      include: [
        '@lucide/vue',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'clsx',
        'lucide-vue-next',
        'reka-ui',
        'tailwind-merge',
        'vue',
        'vue-router',
        'vue-sonner',
      ],
    },
    // CSS plus rapide à parse en dev
    css: { devSourcemap: false },
    // Plus grosse limite pour les big assets (modèles 3D embarqués)
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Form function : Rollup type `manualChunks` comme `ManualChunksFunction`
          // dans les versions récentes (l'objet form fonctionne au runtime mais
          // n'est plus exposé dans les types). Cette fonction donne le même résultat.
          manualChunks(id: string): string | undefined {
            if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/')) {
              return 'vendor-vue'
            }
            if (id.includes('node_modules/reka-ui/')) {
              return 'vendor-ui'
            }
            if (id.includes('node_modules/@tiptap/')) {
              return 'vendor-tiptap'
            }
            return undefined
          },
        },
      },
    },

    vue: {
      script: {
        propsDestructure: true,
        globalTypeFiles: [
          './node_modules/reka-ui/dist/index4.d.ts'
        ]
      },
    },
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
  },

  // Build configuration
  build: {
    transpile: ['three'],
  },

  // Nitro configuration (server)
  nitro: {
    compressPublicAssets: true,
    minify: true,
    // ─── Proxy API → backend Django ─────────────────────────────────────
    // En dev, /api/* est routé vers http://localhost:8000/api/*
    // En prod, défini par NUXT_PUBLIC_API_PROXY_TARGET (Docker = api:8000)
    //
    // Avantages :
    // - Pas de CORS côté browser (même origine)
    // - Cookies same-site fonctionnent naturellement
    // - L'URL d'appel côté frontend devient `/api/v1/...` (relatif), pas
    //   besoin de connaître l'URL absolue du backend
    routeRules: {
      '/api/**': {
        proxy: {
          to: `${process.env.NUXT_API_PROXY_TARGET || 'http://localhost:8000'}/api/**`,
        },
      },
      // Webhooks Stripe — passent aussi par le backend
      '/webhooks/**': {
        proxy: {
          to: `${process.env.NUXT_API_PROXY_TARGET || 'http://localhost:8000'}/webhooks/**`,
        },
      },
      // Healthcheck (utilisé par Docker / load balancers)
      '/health/**': {
        proxy: {
          to: `${process.env.NUXT_API_PROXY_TARGET || 'http://localhost:8000'}/health/**`,
        },
      },
    },
    // Préfetch DNS pour les assets critiques (favicon, etc.)
    prerender: {
      crawlLinks: false,
    },
  },

  // Shadcn
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  // Color mode
  colorMode: {
    fallback: 'light',
    preference: 'system',
    classSuffix: '',
  },

  // Runtime config
  runtimeConfig: {
    public: {
      // URL de l'API — désormais RELATIVE par défaut (proxy Nitro fait le job).
      // Override en prod via NUXT_PUBLIC_API_URL pour pointer ailleurs.
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api/v1',
      // URL du site de documentation (projet docs-vizehome séparé)
      docsUrl: process.env.NUXT_PUBLIC_DOCS_URL || 'http://localhost:3001',
      // OAuth — client IDs publics (les secrets restent côté backend)
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      githubClientId: process.env.NUXT_PUBLIC_GITHUB_CLIENT_ID || '',
    },
  },

  // ESLint configuration
  eslint: {
    config: {
      standalone: true,
    },
  },

  // Router options
  router: {
    options: {
      strict: true,
    },
  },

  // Import auto configuration
  imports: {
    dirs: ['composables/**', 'utils/**', 'lib/**'],
  },

  // Components auto-import
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
