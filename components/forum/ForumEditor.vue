<!--
  ForumEditor — éditeur WYSIWYG TipTap pour les posts du forum.

  Output : HTML (via v-model). À sanitiser côté affichage via ForumContent.

  Usage :
    <ForumEditor v-model="content" placeholder="Ta réponse…" min-height="200px" />

  Features :
  - Texte : bold, italic, strike, code inline
  - Structure : H2/H3, listes (puces + numérotées), citations, blocs de code
  - Alignement : gauche / centre / droite / justifié
  - Liens (auto-link sur paste)
  - Images via URL (upload backend MinIO en phase 2)
  - Emojis natifs (juste taper 😀 ou utiliser le picker OS)
  - Undo / redo (Ctrl+Z / Ctrl+Shift+Z)
-->
<template>
  <div
    class="rounded-lg border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring transition-shadow"
  >
    <!-- Toggle Édition / Aperçu + hint markdown -->
    <div
      class="flex items-center justify-between border-b bg-muted/40 px-2 py-1.5"
    >
      <div class="flex items-center gap-0.5">
        <button
          type="button"
          :class="tabClass(mode === 'edit')"
          @click="mode = 'edit'"
        >
          <PencilIcon class="h-3.5 w-3.5" />
          Édition
        </button>
        <button
          type="button"
          :class="tabClass(mode === 'preview')"
          @click="mode = 'preview'"
        >
          <EyeIcon class="h-3.5 w-3.5" />
          Aperçu
        </button>
      </div>
      <span class="hidden sm:inline text-[10px] text-muted-foreground pr-1.5">
        Markdown :
        <code class="font-mono">**gras**</code>,
        <code class="font-mono">*italique*</code>,
        <code class="font-mono">## titre</code>,
        <code class="font-mono">- liste</code>,
        <code class="font-mono">`code`</code>
      </span>
    </div>

    <!-- Toolbar (mode édition uniquement) -->
    <div
      v-if="editor && mode === 'edit'"
      class="flex flex-wrap items-center gap-0.5 border-b bg-muted/30 px-2 py-1.5"
    >
      <!-- Groupe : formatage texte -->
      <ToolbarButton
        :is-active="editor.isActive('bold')"
        title="Gras (Ctrl+B)"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <BoldIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('italic')"
        title="Italique (Ctrl+I)"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <ItalicIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('strike')"
        title="Barré"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <StrikethroughIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('code')"
        title="Code inline"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <CodeIcon class="h-4 w-4" />
      </ToolbarButton>

      <div class="mx-1 h-5 w-px bg-border" />

      <!-- Groupe : structure -->
      <ToolbarButton
        :is-active="editor.isActive('heading', { level: 2 })"
        title="Titre H2"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <Heading2Icon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('heading', { level: 3 })"
        title="Titre H3"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <Heading3Icon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('bulletList')"
        title="Liste à puces"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <ListIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('orderedList')"
        title="Liste numérotée"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <ListOrderedIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('blockquote')"
        title="Citation"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <QuoteIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive('codeBlock')"
        title="Bloc de code"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <CodeXmlIcon class="h-4 w-4" />
      </ToolbarButton>

      <div class="mx-1 h-5 w-px bg-border" />

      <!-- Groupe : alignement -->
      <ToolbarButton
        :is-active="editor.isActive({ textAlign: 'left' })"
        title="Aligner à gauche"
        @click="editor.chain().focus().setTextAlign('left').run()"
      >
        <AlignLeftIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive({ textAlign: 'center' })"
        title="Centrer"
        @click="editor.chain().focus().setTextAlign('center').run()"
      >
        <AlignCenterIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive({ textAlign: 'right' })"
        title="Aligner à droite"
        @click="editor.chain().focus().setTextAlign('right').run()"
      >
        <AlignRightIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :is-active="editor.isActive({ textAlign: 'justify' })"
        title="Justifier"
        @click="editor.chain().focus().setTextAlign('justify').run()"
      >
        <AlignJustifyIcon class="h-4 w-4" />
      </ToolbarButton>

      <div class="mx-1 h-5 w-px bg-border" />

      <!-- Groupe : médias -->
      <ToolbarButton
        :is-active="editor.isActive('link')"
        title="Ajouter un lien"
        @click="onAddLink"
      >
        <LinkIcon class="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        :disabled="isUploadingImage"
        :title="isUploadingImage ? 'Upload en cours…' : 'Insérer une image (cliquer ou glisser-déposer)'"
        @click="onPickImage"
      >
        <Loader2Icon v-if="isUploadingImage" class="h-4 w-4 animate-spin" />
        <ImageIcon v-else class="h-4 w-4" />
      </ToolbarButton>
      <!-- Input file caché — déclenché par le bouton image -->
      <input
        ref="fileInputRef"
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        class="hidden"
        @change="onFileSelected"
      />

      <div class="ml-auto flex items-center gap-0.5">
        <ToolbarButton
          :disabled="!editor.can().undo()"
          title="Annuler (Ctrl+Z)"
          @click="editor.chain().focus().undo().run()"
        >
          <Undo2Icon class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          :disabled="!editor.can().redo()"
          title="Rétablir (Ctrl+Shift+Z)"
          @click="editor.chain().focus().redo().run()"
        >
          <Redo2Icon class="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>

    <!-- Zone d'édition (cachée en mode preview) -->
    <EditorContent
      v-show="mode === 'edit'"
      :editor="editor"
      class="forum-editor-content prose prose-sm dark:prose-invert max-w-none px-4 py-3 focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[var(--editor-min-h)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground/60 [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      :style="{ '--editor-min-h': minHeight }"
    />

    <!-- Mode preview : rend le HTML via ForumContent (sanitisé) -->
    <div
      v-if="mode === 'preview'"
      class="px-4 py-3"
      :style="{ minHeight }"
    >
      <ForumContent
        v-if="hasContent"
        :html="modelValue"
      />
      <p v-else class="text-sm text-muted-foreground italic">
        Aperçu vide — écris quelque chose dans l'onglet Édition.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  CodeXmlIcon,
  EyeIcon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  Loader2Icon,
  PencilIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  Undo2Icon,
} from 'lucide-vue-next'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

// ─── Setup lowlight pour la coloration syntaxique des codeBlock ──────────
const lowlight = createLowlight()
lowlight.register('bash', bash)
lowlight.register('shell', bash)
lowlight.register('javascript', javascript)
lowlight.register('js', javascript)
lowlight.register('typescript', typescript)
lowlight.register('ts', typescript)
lowlight.register('python', python)
lowlight.register('py', python)
lowlight.register('json', json)
lowlight.register('xml', xml)
lowlight.register('html', xml)

// ─── Props / Emits ───────────────────────────────────────────────────────
const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    minHeight?: string
  }>(),
  {
    placeholder: 'Écris ici…',
    minHeight: '180px',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// ─── Editor ──────────────────────────────────────────────────────────────
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      // On override codeBlock plus bas avec lowlight pour la coloration
      codeBlock: false,
      heading: { levels: [2, 3] },
    }),
    CodeBlockLowlight.configure({ lowlight }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      linkOnPaste: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        class: 'text-primary underline hover:text-primary/80',
      },
    }),
    Image.configure({
      inline: false,
      allowBase64: false,
      HTMLAttributes: {
        class: 'rounded-lg border max-w-full h-auto',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  onUpdate: ({ editor: e }) => {
    emit('update:modelValue', e.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'min-h-[var(--editor-min-h)]',
    },
    // Intercepte le paste pour détecter les images du clipboard (screenshots, etc.)
    handlePaste: (_view, event) => {
      const items = event.clipboardData?.items
      if (!items) return false
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            event.preventDefault()
            uploadAndInsert(file)
            return true
          }
        }
      }
      return false
    },
    // Intercepte le drag-drop pour upload direct
    handleDrop: (_view, event) => {
      const files = event.dataTransfer?.files
      if (!files || files.length === 0) return false
      const image = Array.from(files).find(f => f.type.startsWith('image/'))
      if (image) {
        event.preventDefault()
        uploadAndInsert(image)
        return true
      }
      return false
    },
  },
})

// Sync externe (v-model) → éditeur, sans casser le curseur
watch(
  () => props.modelValue,
  newValue => {
    if (!editor.value) return
    const current = editor.value.getHTML()
    if (newValue !== current) {
      editor.value.commands.setContent(newValue || '', false)
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// ─── Actions toolbar ─────────────────────────────────────────────────────
function onAddLink() {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href as string | undefined
  const url = window.prompt('URL du lien (laisser vide pour retirer)', previousUrl ?? 'https://')
  if (url === null) return // Annulé
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

// ─── Toggle Édition / Aperçu ─────────────────────────────────────────────
const mode = ref<'edit' | 'preview'>('edit')

const hasContent = computed(() => {
  const html = props.modelValue || ''
  return (
    html
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim().length > 0
  )
})

function tabClass(active: boolean): string {
  return [
    'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
    active
      ? 'bg-background text-foreground shadow-sm border'
      : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
  ].join(' ')
}

// ─── Upload image (backend MinIO via /forum/upload-image) ────────────────
const fileInputRef = ref<HTMLInputElement | null>(null)
const isUploadingImage = ref(false)

function onPickImage() {
  fileInputRef.value?.click()
}

function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploadAndInsert(file)
  // Reset pour permettre de re-sélectionner le même fichier ensuite
  input.value = ''
}

async function uploadAndInsert(file: File) {
  if (!editor.value) return
  if (!file.type.startsWith('image/')) {
    toast.error('Seules les images sont supportées.')
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Image trop volumineuse (max 5 MB).')
    return
  }

  isUploadingImage.value = true
  try {
    const api = useApi()
    const form = new FormData()
    form.append('file', file)
    const res = await api<{ url: string; filename: string }>(
      '/forum/upload-image',
      { method: 'POST', body: form }
    )
    editor.value.chain().focus().setImage({ src: res.url, alt: res.filename }).run()
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string }; statusCode?: number }
    if (err.statusCode === 401) {
      toast.error('Connexion expirée — reconnecte-toi.')
    } else {
      toast.error(err.data?.detail || 'Upload de l\'image échoué.')
    }
  } finally {
    isUploadingImage.value = false
  }
}
</script>

<script lang="ts">
// ─── ToolbarButton (composant inline factor) ─────────────────────────────
// Petit composant ré-utilisé pour chaque bouton de toolbar.
// Défini ici pour éviter un fichier séparé.
import { defineComponent, h } from 'vue'

export const ToolbarButton = defineComponent({
  name: 'ToolbarButton',
  props: {
    isActive: { type: Boolean, default: false },
    title: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          title: props.title,
          'aria-label': props.title,
          disabled: props.disabled,
          class: [
            'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            props.isActive
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground/70 hover:bg-accent hover:text-accent-foreground',
          ],
          onClick: (e: MouseEvent) => {
            e.preventDefault()
            if (!props.disabled) emit('click', e)
          },
        },
        slots.default?.()
      )
  },
})
</script>

<style>
/* CSS plain (sans @apply) pour rester compatible Tailwind 4 sans avoir
   à configurer @reference dans chaque SFC. Utilise les CSS vars
   shadcn-vue (--muted, --primary, --muted-foreground) déjà définies
   dans assets/css/tailwind.css. */

.forum-editor-content .ProseMirror pre {
  border-radius: 0.5rem;
  background-color: rgb(9 9 11);          /* zinc-950 */
  color: rgb(244 244 245);                /* zinc-100 */
  padding: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
}

.forum-editor-content .ProseMirror code:not(pre code) {
  border-radius: 0.25rem;
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.25rem;
  font-size: 0.9em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.forum-editor-content .ProseMirror blockquote {
  border-left: 4px solid hsl(var(--primary) / 0.4);
  padding-left: 1rem;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.forum-editor-content .ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}
.forum-editor-content .ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.forum-editor-content .ProseMirror h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.forum-editor-content .ProseMirror h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0.75rem;
  margin-bottom: 0.375rem;
}

.forum-editor-content .ProseMirror img {
  margin: 0.75rem 0;
  max-width: 100%;
  height: auto;
}
</style>
