<!--
  ForumContent — affichage du contenu HTML d'un topic ou d'une reply.

  Sécurité : passe par DOMPurify (isomorphic, SSR-safe) pour retirer tout
  HTML potentiellement dangereux (scripts, iframes, event handlers, etc.).

  Styling : Tailwind Typography (prose) + overrides cohérents avec
  ForumEditor.

  Usage :
    <ForumContent :html="topic.content" />
-->
<template>
  <!-- `sanitizedHtml` est déjà filtré par DOMPurify avec whitelist stricte de tags + attrs. -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="forum-content prose prose-sm dark:prose-invert max-w-none break-words" v-html="sanitizedHtml" />
</template>

<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'
import { computed } from 'vue'

const props = defineProps<{
  html: string
}>()

// Whitelist conservatrice : que des tags et attributs nécessaires au forum.
// On garde : structure (h2, h3, p, br, hr), formatage (strong, em, s, code, u),
// listes (ul, ol, li), citations (blockquote), code (pre, code), liens (a),
// images (img), span avec data-text-align pour l'alignement TipTap.
const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'h2', 'h3', 'p', 'br', 'hr',
    'strong', 'em', 's', 'code', 'u',
    'ul', 'ol', 'li',
    'blockquote',
    'pre',
    'a', 'img',
    'span', 'div',
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel',         // liens
    'src', 'alt', 'title',           // images
    'class', 'style',                // alignement + styles inline
    'data-text-align',
  ],
  // Autorise les liens externes mais pas javascript:
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|ftp):|\/[^/]|#)/i,
  ADD_ATTR: ['target'],              // évite que DOMPurify retire target=_blank
}

const sanitizedHtml = computed(() => {
  if (!props.html) return ''
  // Force tous les liens externes à s'ouvrir dans un nouvel onglet + noopener
  const dirty = props.html.replace(
    /<a\s+([^>]*?)href="(https?:\/\/[^"]+)"([^>]*?)>/gi,
    '<a $1href="$2" target="_blank" rel="noopener noreferrer"$3>'
  )
  return DOMPurify.sanitize(dirty, SANITIZE_CONFIG)
})
</script>

<style>
/* CSS plain (sans @apply) — compat Tailwind 4 sans @reference par SFC.
   Mêmes valeurs que ForumEditor pour cohérence visuelle. */

.forum-content pre {
  border-radius: 0.5rem;
  background-color: rgb(9 9 11);
  color: rgb(244 244 245);
  padding: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
}

.forum-content code:not(pre code) {
  border-radius: 0.25rem;
  background-color: hsl(var(--muted));
  padding: 0.125rem 0.25rem;
  font-size: 0.9em;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.forum-content blockquote {
  border-left: 4px solid hsl(var(--primary) / 0.4);
  padding-left: 1rem;
  font-style: italic;
  color: hsl(var(--muted-foreground));
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.forum-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}
.forum-content ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.forum-content h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.forum-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 0.75rem;
  margin-bottom: 0.375rem;
}

.forum-content a {
  color: hsl(var(--primary));
  text-decoration: underline;
}
.forum-content a:hover {
  color: hsl(var(--primary) / 0.8);
}

.forum-content img {
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
  max-width: 100%;
  height: auto;
  margin: 0.75rem 0;
}

/* Alignement TipTap : respecte le style="text-align: …" injecté. */
.forum-content [style*="text-align: center"] {
  text-align: center;
}
.forum-content [style*="text-align: right"] {
  text-align: right;
}
.forum-content [style*="text-align: justify"] {
  text-align: justify;
}
</style>
