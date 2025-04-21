// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // Compatibility date
  compatibilityDate: '2024-11-01',

  // Devtools
  devtools: { 
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  // Modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-typed-router',
    '@vueuse/nuxt',
  ],

  // Configs CSS
  css: ['~/assets/css/tailwind.css'],

  // Vite config
  vite: {
    plugins: [
      tailwindcss(),
    ],
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
  colorMode:{
    fallback:'light',
    preference:'system',
    classSuffix:'',
  },
})