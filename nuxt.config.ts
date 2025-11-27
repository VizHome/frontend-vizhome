// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  // Devtools
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
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

  modules: ['@nuxt/eslint', '@nuxt/test-utils', 'shadcn-nuxt', '@nuxtjs/color-mode'],

  // Configs CSS
  css: ['~/assets/css/tailwind.css'],

  // Vite config
  vite: {
    plugins: [tailwindcss()],
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
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    },
  },
})