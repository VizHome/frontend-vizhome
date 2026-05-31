<!--
  ForumReplyCard — réponse à un topic (vue détail topic).

  Features :
  - Badge STAFF (rouge) si auteur.is_staff
  - Badge "Toi" si auteur === currentUserId
  - Date relative (titre = date complète)
  - Bouton "Éditer" si owner+fenêtre 15 min OU staff
  - Bouton "Supprimer" si owner+fenêtre OU staff
  - Mode édition inline avec ForumEditor (toggle interne)
  - Badge "édité" si updated_at > created_at (>30s tolérance horloge)
-->
<template>
  <article
    class="flex gap-3 rounded-lg border bg-card p-4 transition-colors"
    :class="reply.is_solution ? 'border-green-200 bg-green-50/30 dark:border-green-900/50 dark:bg-green-950/10' : ''"
  >
    <!-- Avatar — couleur staff différenciée -->
    <div
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-medium text-sm"
      :class="reply.author.is_staff
        ? 'bg-red-500/10 text-red-500'
        : 'bg-primary/10 text-primary'"
    >
      {{ initials(reply.author.name) }}
    </div>

    <div class="flex-1 min-w-0">
      <!-- Header : auteur + badges + date -->
      <div class="flex items-center gap-2 mb-1.5 flex-wrap text-xs">
        <span class="font-medium text-foreground">{{ reply.author.name }}</span>

        <!-- Badge STAFF (modo VizHome) -->
        <span
          v-if="reply.author.is_staff"
          class="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-red-500"
        >
          <ShieldIcon class="h-2.5 w-2.5" />
          Staff
        </span>

        <!-- Badge "Toi" (auteur connecté) -->
        <span
          v-else-if="isOwner"
          class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary"
        >
          Toi
        </span>

        <span class="text-muted-foreground">·</span>
        <time
          :datetime="reply.created_at"
          class="text-muted-foreground"
          :title="absoluteDate(reply.created_at)"
        >
          {{ relativeTime(reply.created_at) }}
        </time>

        <!-- Badge édité -->
        <template v-if="isEdited">
          <span class="text-muted-foreground">·</span>
          <span
            class="text-muted-foreground italic"
            :title="`Édité ${absoluteDate(reply.updated_at)}`"
          >
            édité
          </span>
        </template>

        <!-- Badge solution (à droite) -->
        <span
          v-if="reply.is_solution"
          class="ml-auto flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-950/40 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400"
        >
          <CheckCircle2Icon class="h-3 w-3" />
          Solution
        </span>
      </div>

      <!-- Mode lecture (HTML sanitisé) -->
      <ForumContent v-if="!isEditing" :html="reply.content" />

      <!-- Mode édition inline -->
      <div v-else class="mt-2 space-y-2">
        <ForumEditor v-model="editedHtml" min-height="120px" />
        <div
          v-if="editError"
          class="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-1.5 text-xs text-destructive"
        >
          {{ editError }}
        </div>
        <div class="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="h-8"
            :disabled="isSaving"
            @click="cancelEdit"
          >
            Annuler
          </Button>
          <Button
            type="button"
            size="sm"
            class="h-8 gap-1.5 rounded-full"
            :disabled="isSaving || !hasMeaningfulChange"
            @click="saveEdit"
          >
            <CheckIcon class="h-3.5 w-3.5" />
            {{ isSaving ? 'Enregistrement…' : 'Enregistrer' }}
          </Button>
        </div>
      </div>

      <!-- Actions (mode lecture uniquement) -->
      <div
        v-if="!isEditing && (canEdit || canDelete)"
        class="mt-3 flex items-center gap-2 text-xs"
      >
        <button
          v-if="canEdit"
          type="button"
          class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          :title="editWindowHint"
          @click="startEdit"
        >
          <PencilIcon class="h-3 w-3" />
          Éditer
        </button>
        <span v-if="canEdit && canDelete" class="text-muted-foreground">·</span>
        <button
          v-if="canDelete"
          type="button"
          class="text-destructive/80 hover:text-destructive transition-colors flex items-center gap-1"
          @click="$emit('delete', reply)"
        >
          <Trash2Icon class="h-3 w-3" />
          Supprimer
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  CheckCircle2Icon,
  CheckIcon,
  PencilIcon,
  ShieldIcon,
  Trash2Icon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

import type { ForumReply } from '~/composables/useForum'

const props = defineProps<{
  reply: ForumReply
  currentUserId?: number | null
  currentUserIsStaff?: boolean
}>()

const emit = defineEmits<{
  delete: [reply: ForumReply]
  updated: [reply: ForumReply]
}>()

// ─── Permissions UI (le backend vérifie aussi côté serveur) ──────────────
// Fenêtre alignée sur EDIT_WINDOW_MINUTES backend (15 min)
const EDIT_WINDOW_MS = 15 * 60 * 1000

const isOwner = computed(
  () => props.currentUserId != null && props.currentUserId === props.reply.author.id
)

const isWithinEditWindow = computed(() => {
  const created = new Date(props.reply.created_at).getTime()
  return Date.now() - created <= EDIT_WINDOW_MS
})

const canEdit = computed(() => {
  if (props.currentUserIsStaff) return true
  return isOwner.value && isWithinEditWindow.value
})

const canDelete = computed(() => canEdit.value)

const editWindowHint = computed(() => {
  if (props.currentUserIsStaff) return "Édition staff (sans limite de temps)"
  const created = new Date(props.reply.created_at).getTime()
  const remaining = EDIT_WINDOW_MS - (Date.now() - created)
  const min = Math.max(0, Math.floor(remaining / 60_000))
  return `Édition possible encore ${min} min`
})

const isEdited = computed(() => {
  if (!props.reply.updated_at || !props.reply.created_at) return false
  // Tolérance 30s : auto_now vs auto_now_add ne coïncident pas exactement à la création
  return (
    new Date(props.reply.updated_at).getTime() -
      new Date(props.reply.created_at).getTime() >
    30_000
  )
})

// ─── Édition inline ──────────────────────────────────────────────────────
const isEditing = ref(false)
const editedHtml = ref('')
const editError = ref<string | null>(null)
const isSaving = ref(false)

const hasMeaningfulChange = computed(() => {
  return (
    editedHtml.value.trim() !== props.reply.content.trim()
    && plainTextLength(editedHtml.value) >= 2
  )
})

function startEdit() {
  editedHtml.value = props.reply.content
  editError.value = null
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  editedHtml.value = ''
  editError.value = null
}

async function saveEdit() {
  if (!hasMeaningfulChange.value || isSaving.value) return
  isSaving.value = true
  editError.value = null
  try {
    const forum = useForum()
    const updated = await forum.updateReply(props.reply.id, editedHtml.value)
    isEditing.value = false
    emit('updated', updated)
    toast.success('Réponse mise à jour.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string }; statusCode?: number }
    if (err.statusCode === 403) {
      editError.value =
        err.data?.detail ||
        "Fenêtre d'édition dépassée — seul le staff peut maintenant modifier."
    } else {
      editError.value = err.data?.detail || 'Modification échouée.'
    }
  } finally {
    isSaving.value = false
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────
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

function absoluteDate(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function plainTextLength(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim().length
}
</script>
