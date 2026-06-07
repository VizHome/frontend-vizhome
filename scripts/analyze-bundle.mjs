#!/usr/bin/env node
/**
 * scripts/analyze-bundle.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Lance `nuxt build` avec la config `nuxt.config.analyze.ts` (qui ajoute
 * `rollup-plugin-visualizer`) puis affiche un récap CLI des 10 plus gros
 * chunks générés dans `.output/public/_nuxt/`.
 *
 * Usage :
 *   npm run analyze
 *
 * Output :
 *   - `analyze-bundle.html`  (gitignored, ouvrable au navigateur)
 *   - récap top 10 chunks dans la console
 */
import { spawn } from 'node:child_process'
import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUTPUT_NUXT = join(ROOT, '.output', 'public', '_nuxt')
const REPORT = join(ROOT, 'analyze-bundle.html')

// ─── 1. Run `nuxt build` avec ANALYZE=1 et la config dédiée ────────────────
function runBuild() {
  return new Promise((resolvePromise, rejectPromise) => {
    const env = { ...process.env, ANALYZE: '1', NODE_ENV: 'production' }
    const isWin = process.platform === 'win32'
    const cmd = isWin ? 'npx.cmd' : 'npx'
    const args = ['nuxt', 'build', '--config-file', 'nuxt.config.analyze.ts']

    console.log('▸ Running:', cmd, args.join(' '))
    const child = spawn(cmd, args, {
      cwd: ROOT,
      env,
      stdio: 'inherit',
      shell: isWin,
    })
    child.on('exit', code => {
      if (code === 0) resolvePromise()
      else rejectPromise(new Error(`nuxt build exited with code ${code}`))
    })
    child.on('error', rejectPromise)
  })
}

// ─── 2. Scan .output/public/_nuxt pour récupérer les chunks ────────────────
async function listChunks(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const out = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await listChunks(full)))
    } else if (/\.(js|mjs|css)$/.test(entry.name)) {
      const st = await stat(full)
      out.push({ name: entry.name, size: st.size, path: full })
    }
  }
  return out
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function recap() {
  if (!existsSync(OUTPUT_NUXT)) {
    console.warn(`⚠ ${OUTPUT_NUXT} introuvable — build incomplet ?`)
    return
  }
  const all = await listChunks(OUTPUT_NUXT)
  const top = all.sort((a, b) => b.size - a.size).slice(0, 10)
  console.log('\n────────────────────────────────────────────────────────────')
  console.log('  TOP 10 CHUNKS (.output/public/_nuxt)')
  console.log('────────────────────────────────────────────────────────────')
  for (const c of top) {
    const ext = c.name.split('.').pop()
    console.log(`  ${fmt(c.size).padStart(10)}  [${ext.padEnd(3)}]  ${c.name}`)
  }
  const totalJs = all.filter(c => c.name.endsWith('.js') || c.name.endsWith('.mjs'))
    .reduce((sum, c) => sum + c.size, 0)
  const totalCss = all.filter(c => c.name.endsWith('.css'))
    .reduce((sum, c) => sum + c.size, 0)
  console.log('────────────────────────────────────────────────────────────')
  console.log(`  Total JS  : ${fmt(totalJs)}`)
  console.log(`  Total CSS : ${fmt(totalCss)}`)
  console.log('────────────────────────────────────────────────────────────')
  if (existsSync(REPORT)) {
    console.log(`\n✓ Rapport visualizer : ${REPORT}`)
    console.log('  → ouvre ce fichier dans un navigateur pour le treemap interactif\n')
  } else {
    console.warn(`\n⚠ ${REPORT} non généré — vérifier rollup-plugin-visualizer\n`)
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
try {
  await runBuild()
  await recap()
} catch (err) {
  console.error('\n✗ Bundle analysis failed:', err.message)
  process.exit(1)
}
