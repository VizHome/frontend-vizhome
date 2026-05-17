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

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false,
    shim: false,
  },

  // App config
  app: {
    head: {
      title: 'VizHome',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Application VizHome' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
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
    typedPages: true,
  },

  // Vite config
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimisation de build
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-vue': ['vue', 'vue-router'],
            'vendor-ui': ['reka-ui'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'reka-ui'],
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
      // URL de l'API backend Django (préfixe /api/v1)
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
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
