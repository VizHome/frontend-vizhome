// nuxt.config.analyze.ts
// ─────────────────────────────────────────────────────────────────────────────
// Config Nuxt dédiée à l'analyse de bundle.
//
// Utilisation :
//   ANALYZE=1 nuxt build --config-file nuxt.config.analyze.ts
// (déclenché automatiquement via `npm run analyze`)
//
// Cette config étend `nuxt.config.ts` (importée puis fusionnée par
// `defineNuxtConfig`) et y greffe `rollup-plugin-visualizer` côté Vite/Rollup
// pour produire `analyze-bundle.html` à la racine du projet.
//
// On ne touche PAS à `nuxt.config.ts` pour éviter d'embarquer le plugin et la
// dépendance dans les builds prod normaux.
// ─────────────────────────────────────────────────────────────────────────────
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import baseConfig from './nuxt.config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputFile = resolve(__dirname, 'analyze-bundle.html')

// `rollup-plugin-visualizer` retourne un `Plugin` Rollup ; côté Vite ça
// matche `PluginOption`. On cast pour réconcilier les types des deux libs.
const visualizerPlugin = visualizer({
  filename: outputFile,
  template: 'treemap',
  gzipSize: true,
  brotliSize: true,
  open: false,
  title: 'VizHome - Bundle analyzer',
}) as PluginOption

// Spread Vite plugins existants en gardant le bon type côté Nuxt.
const basePlugins
  = ((baseConfig.vite as { plugins?: PluginOption[] })?.plugins ?? [])

export default defineNuxtConfig({
  ...baseConfig,
  // Hook Vite : on récupère la config existante et on ajoute le plugin
  // visualizer. On force `template: 'treemap'` pour un rendu lisible et
  // `gzipSize`/`brotliSize` pour comparer aux seuils Web Vitals.
  vite: {
    ...(baseConfig.vite ?? {}),
    plugins: [...basePlugins, visualizerPlugin],
  },
})
