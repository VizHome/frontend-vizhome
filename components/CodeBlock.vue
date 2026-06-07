<!--
  CodeBlock — bloc de code avec coloration syntaxique (highlight.js) + bouton copier.

  Usage :
    <CodeBlock language="bash" code="docker compose up -d" />
    <CodeBlock language="typescript" filename="useApi.ts" :code="snippet" />

  Langages supportés (registered dans le script) :
    bash/shell · typescript/ts · javascript/js · python/py · json · yaml/yml
    vue (HTML+JS+CSS) · sql · http
  Tout autre langage → fallback en texte plain (pas d'erreur).
-->
<template>
  <div
    class="relative my-4 overflow-hidden rounded-lg border bg-zinc-950 dark:bg-zinc-900 dark:border-zinc-800"
  >
    <!-- Header avec filename / language + bouton copy -->
    <div
      v-if="filename || displayLanguage || true"
      class="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2"
    >
      <div class="flex items-center gap-2 min-w-0">
        <span
          v-if="filename"
          class="truncate text-xs font-mono text-zinc-300"
        >
          {{ filename }}
        </span>
        <span
          v-if="displayLanguage"
          class="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono uppercase text-zinc-400"
        >
          {{ displayLanguage }}
        </span>
      </div>
      <button
        type="button"
        class="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
        :aria-label="copied ? 'Code copié' : 'Copier le code'"
        @click="onCopy"
      >
        <CheckIcon v-if="copied" class="h-3.5 w-3.5 text-green-400" />
        <CopyIcon v-else class="h-3.5 w-3.5" />
        <span>{{ copied ? 'Copié' : 'Copier' }}</span>
      </button>
    </div>

    <!-- Code (highlight.js stylise les .hljs-* tokens) -->
    <pre
      class="overflow-x-auto p-4 text-[13px] leading-relaxed"
    ><code ref="codeRef" :class="`hljs language-${normalizedLanguage}`">{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { computed, onMounted, ref, watch } from 'vue'

import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import python from 'highlight.js/lib/languages/python'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

// Theme github-dark — bundlé en CSS via le @import dans assets/css/tailwind.css
// (ajouté lors de l'install du composant). Sinon utiliser un <link> CDN.

// ─── Registration (idempotente) ───────────────────────────────────────────
if (!hljs.getLanguage('bash')) hljs.registerLanguage('bash', bash)
if (!hljs.getLanguage('shell')) hljs.registerLanguage('shell', shell)
if (!hljs.getLanguage('javascript')) hljs.registerLanguage('javascript', javascript)
if (!hljs.getLanguage('typescript')) hljs.registerLanguage('typescript', typescript)
if (!hljs.getLanguage('json')) hljs.registerLanguage('json', json)
if (!hljs.getLanguage('python')) hljs.registerLanguage('python', python)
if (!hljs.getLanguage('yaml')) hljs.registerLanguage('yaml', yaml)
if (!hljs.getLanguage('xml')) hljs.registerLanguage('xml', xml)
if (!hljs.getLanguage('sql')) hljs.registerLanguage('sql', sql)
if (!hljs.getLanguage('plaintext')) hljs.registerLanguage('plaintext', plaintext)

// Alias courants
hljs.registerAliases(['ts'], { languageName: 'typescript' })
hljs.registerAliases(['js'], { languageName: 'javascript' })
hljs.registerAliases(['py'], { languageName: 'python' })
hljs.registerAliases(['yml'], { languageName: 'yaml' })
hljs.registerAliases(['html', 'vue'], { languageName: 'xml' })
hljs.registerAliases(['sh'], { languageName: 'bash' })

// ─── Props ────────────────────────────────────────────────────────────────
const props = defineProps<{
  code: string
  language?: string
  filename?: string
}>()

const codeRef = ref<HTMLElement | null>(null)
const copied = ref(false)

const normalizedLanguage = computed(() => {
  const lang = (props.language || 'plaintext').toLowerCase()
  return hljs.getLanguage(lang) ? lang : 'plaintext'
})

// Affiché dans le header : la valeur orginale du user si fournie, sinon rien
const displayLanguage = computed(() => props.language?.toLowerCase() || '')

// ─── Highlight ────────────────────────────────────────────────────────────
function applyHighlight() {
  if (!codeRef.value) return
  // hljs.highlightElement mute les warnings et applique data-highlighted="yes"
  // — on enlève ce flag pour pouvoir re-highlight si la prop code change.
  codeRef.value.removeAttribute('data-highlighted')
  hljs.highlightElement(codeRef.value)
}

onMounted(applyHighlight)
watch(() => [props.code, props.language], applyHighlight)

// ─── Copy ─────────────────────────────────────────────────────────────────
async function onCopy() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    // Fallback si Clipboard API indisponible (HTTPS requis sur certains navigateurs)
    const ta = document.createElement('textarea')
    ta.value = props.code
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  }
}
</script>
