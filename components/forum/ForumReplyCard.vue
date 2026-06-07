<!--
  ForumReplyCard — réponse à un topic, rendue en GitHub-style :
  avatar externe (à gauche) + card content (à droite) avec petite flèche pointant
  vers l'avatar. S'intègre dans la timeline du `pages/forum/topic/[id].vue`.

  Features :
  - Badge STAFF (rouge) / Auteur du topic / Toi
  - Date relative + absolue
  - Édition inline (TipTap) + fenêtre 15 min ou staff
  - Marquage solution (auteur du topic ou staff)
  - Bordure verte si is_solution
-->
<template>
  <li class="relative flex gap-4">
    <!-- Avatar externe (au-dessus de la ligne timeline) -->
    <div
      class="z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-medium text-sm border-2 border-background"
      :class="reply.author.is_staff
        ? 'bg-red-500/10 text-red-500'
        : 'bg-primary/10 text-primary'"
      aria-hidden="true"
    >
      {{ initials(reply.author.name) }}
    </div>

    <!-- Carte contenu avec petite flèche pointant vers l'avatar -->
    <div
      class="relative min-w-0 flex-1 rounded-lg border bg-card transition-colors github-arrow-left"
      :class="reply.is_solution
        ? 'border-green-300 bg-green-50/40 dark:border-green-900/50 dark:bg-green-950/10'
        : ''"
    >
      <!-- Header : auteur + badges + date -->
      <header
        class="flex items-center gap-2 border-b bg-muted/30 px-3 py-1.5 text-xs flex-wrap"
        :class="reply.is_solution ? 'border-green-200/70 bg-green-100/40 dark:border-green-900/40 dark:bg-green-950/20' : ''"
      >
        <span class="font-medium text-foreground">{{ reply.author.name }}</span>

        <!-- Badge STAFF -->
        <Badge
          v-if="reply.author.is_staff"
          variant="secondary"
          class="h-5 gap-1 border-0 bg-red-500/10 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-500"
        >
          <ShieldIcon class="size-2.5" />
          Staff
        </Badge>

        <!-- Badge Auteur du topic -->
        <Badge
          v-else-if="isTopicAuthor"
          variant="secondary"
          class="h-5 border-0 bg-primary/10 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
        >
          Auteur
        </Badge>

        <!-- Badge "Toi" -->
        <Badge
          v-else-if="isOwner"
          variant="secondary"
          class="h-5 border-0 bg-muted px-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Toi
        </Badge>

        <span class="text-muted-foreground">
          a commenté
          <time
            :datetime="reply.created_at"
            :title="absoluteDate(reply.created_at)"
          >
            {{ relativeTime(reply.created_at) }}
          </time>
        </span>

        <span
          v-if="isEdited"
          class="text-muted-foreground italic"
          :title="`Édité ${absoluteDate(reply.updated_at)}`"
        >
          · édité
        </span>

        <!-- Badge solution (à droite) -->
        <Badge
          v-if="reply.is_solution"
          variant="secondary"
          class="ml-auto h-5 gap-1 border-0 bg-green-100 px-1.5 text-[10px] font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400"
        >
          <CheckCircle2Icon class="size-3" />
          Solution
        </Badge>

        <!-- Actions menu (à droite, si pas de solution badge) -->
        <DropdownMenu v-if="!reply.is_solution && (canEdit || canDelete || canMarkSolution)">
          <DropdownMenuTrigger as-child>
            <button
              type="button"
              class="ml-auto inline-flex size-6 items-center justify-center rounded-md hover:bg-accent transition-colors"
              aria-label="Actions"
            >
              <MoreHorizontalIcon class="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-44">
            <DropdownMenuItem
              v-if="canMarkSolution"
              class="cursor-pointer text-green-600 dark:text-green-400"
              @click="$emit('toggleSolution', reply)"
            >
              <CheckCircle2Icon class="size-4 mr-2" />
              Marquer solution
            </DropdownMenuItem>
            <DropdownMenuItem
              v-if="canEdit"
              class="cursor-pointer"
              :title="editWindowHint"
              @click="startEdit"
            >
              <PencilIcon class="size-4 mr-2" />
              Éditer
            </DropdownMenuItem>
            <DropdownMenuSeparator v-if="canDelete" />
            <DropdownMenuItem
              v-if="canDelete"
              class="cursor-pointer text-destructive focus:text-destructive"
              @click="$emit('delete', reply)"
            >
              <Trash2Icon class="size-4 mr-2" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <!-- Si solution, action "Retirer solution" séparée -->
        <button
          v-else-if="reply.is_solution && canMarkSolution"
          type="button"
          class="text-[10px] text-green-700/80 hover:text-green-700 dark:text-green-400/80 dark:hover:text-green-400 underline-offset-2 hover:underline"
          @click="$emit('toggleSolution', reply)"
        >
          retirer
        </button>
      </header>

      <!-- Mode lecture -->
      <div v-if="!isEditing" class="px-4 py-3">
        <ForumContent :html="reply.content" />
      </div>

      <!-- Mode édition inline -->
      <div v-else class="px-4 py-3 space-y-2">
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
            <CheckIcon class="size-3.5" />
            {{ isSaving ? 'Enregistrement…' : 'Enregistrer' }}
          </Button>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import {
  CheckCircle2Icon,
  CheckIcon,
  MoreHorizontalIcon,
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
  /** Id de l'auteur du topic — autorise le marquage "solution" */
  topicAuthorId?: number | null
}>()

const emit = defineEmits<{
  delete: [reply: ForumReply]
  updated: [reply: ForumReply]
  toggleSolution: [reply: ForumReply]
}>()

// Peut marquer/démarquer une solution : auteur du topic OU staff
const canMarkSolution = computed(() => {
  if (props.currentUserIsStaff) return true
  return (
    props.currentUserId != null &&
    props.topicAuthorId != null &&
    props.currentUserId === props.topicAuthorId
  )
})

// Auteur du topic (badge spécial)
const isTopicAuthor = computed(
  () => props.topicAuthorId != null && props.reply.author.id === props.topicAuthorId,
)

// ─── Permissions UI (le backend vérifie aussi côté serveur) ──────────────
const EDIT_WINDOW_MS = 15 * 60 * 1000

const isOwner = computed(
  () => props.currentUserId != null && props.currentUserId === props.reply.author.id,
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
  if (props.currentUserIsStaff) return 'Édition staff (sans limite de temps)'
  const created = new Date(props.reply.created_at).getTime()
  const remaining = EDIT_WINDOW_MS - (Date.now() - created)
  const min = Math.max(0, Math.floor(remaining / 60_000))
  return `Édition possible encore ${min} min`
})

const isEdited = computed(() => {
  if (!props.reply.updated_at || !props.reply.created_at) return false
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

<style>
/* Flèche style GitHub : petit triangle blanc à gauche de la carte
   pointant vers l'avatar, avec bordure assortie. */
.github-arrow-left::before,
.github-arrow-left::after {
  content: '';
  position: absolute;
  top: 11px;
  width: 0;
  height: 0;
  border-style: solid;
  pointer-events: none;
}
.github-arrow-left::before {
  left: -8px;
  border-width: 8px 8px 8px 0;
  border-color: transparent hsl(var(--border)) transparent transparent;
}
.github-arrow-left::after {
  left: -7px;
  border-width: 8px 8px 8px 0;
  border-color: transparent hsl(var(--muted) / 0.3) transparent transparent;
}
</style>
