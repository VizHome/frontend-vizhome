<!--
  ReplyCard — réponse à un topic (vue détail topic).
  Affiche : avatar + auteur + date + contenu (newlines préservés).
-->
<template>
  <article
    class="flex gap-3 rounded-lg border bg-card p-4"
    :class="reply.is_solution ? 'border-green-200 bg-green-50/30 dark:border-green-900/50 dark:bg-green-950/10' : ''"
  >
    <!-- Avatar -->
    <div
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-sm"
    >
      {{ initials(reply.author.name) }}
    </div>

    <div class="flex-1 min-w-0">
      <!-- Header : auteur + date + indicateur solution -->
      <div class="flex items-center gap-2 mb-1.5 flex-wrap text-xs">
        <span class="font-medium text-foreground">{{ reply.author.name }}</span>
        <ShieldCheckIcon
          v-if="reply.author.is_staff"
          class="h-3 w-3 text-primary"
          aria-label="Staff"
        />
        <span class="text-muted-foreground">·</span>
        <time
          :datetime="reply.created_at"
          class="text-muted-foreground"
          :title="new Date(reply.created_at).toLocaleString('fr-FR')"
        >
          {{ relativeTime(reply.created_at) }}
        </time>
        <span
          v-if="reply.is_solution"
          class="ml-auto flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-950/40 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400"
        >
          <CheckCircle2Icon class="h-3 w-3" />
          Solution
        </span>
      </div>

      <!-- Contenu (préserve les sauts de ligne) -->
      <div class="text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground/90">
        {{ reply.content }}
      </div>

      <!-- Actions owner / staff (édit / supprime) -->
      <div
        v-if="canEdit"
        class="mt-3 flex items-center gap-2 text-xs"
      >
        <button
          type="button"
          class="text-muted-foreground hover:text-foreground transition-colors"
          @click="$emit('edit', reply)"
        >
          Éditer
        </button>
        <span class="text-muted-foreground">·</span>
        <button
          type="button"
          class="text-destructive/80 hover:text-destructive transition-colors"
          @click="$emit('delete', reply)"
        >
          Supprimer
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { CheckCircle2Icon, ShieldCheckIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import type { ForumReply } from '~/composables/useForum'

const props = defineProps<{
  reply: ForumReply
  currentUserId?: number | null
  currentUserIsStaff?: boolean
}>()

defineEmits<{
  edit: [reply: ForumReply]
  delete: [reply: ForumReply]
}>()

const canEdit = computed(() => {
  if (props.currentUserIsStaff) return true
  return props.currentUserId === props.reply.author.id
})

function initials(name: string): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')
}

function relativeTime(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = Date.now() - d.getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return "à l'instant"
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`
  if (s < 86_400) return `il y a ${Math.floor(s / 3600)} h`
  if (s < 604_800) return `il y a ${Math.floor(s / 86_400)} j`
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}
</script>
