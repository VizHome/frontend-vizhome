<template>
  <div class="min-h-[60vh]">
    <!-- Loading skeleton -->
    <div v-if="!topic" class="max-w-4xl mx-auto px-6 py-10 space-y-4">
      <div class="h-8 w-2/3 bg-muted/40 rounded animate-pulse" />
      <div class="h-32 bg-muted/40 rounded animate-pulse" />
    </div>

    <template v-else>
      <!-- ─── Header GitHub-style : titre + meta ────────────────────── -->
      <section class="border-b">
        <div class="max-w-4xl mx-auto px-6 py-6">
          <nav class="text-xs mb-3 flex items-center gap-1.5 text-muted-foreground">
            <NuxtLink to="/forum" class="hover:text-foreground transition-colors">
              Forum
            </NuxtLink>
            <ChevronRightIcon class="size-3" />
            <NuxtLink
              :to="`/forum/${topic.category_slug}`"
              class="hover:text-foreground transition-colors"
            >
              {{ topic.category_name }}
            </NuxtLink>
          </nav>

          <div class="flex items-start gap-3 mb-3">
            <h1 class="text-2xl font-semibold leading-tight flex-1">
              {{ topic.title }}
              <span class="text-muted-foreground font-normal ml-1">
                #{{ topic.id }}
              </span>
            </h1>
          </div>

          <div class="flex flex-wrap items-center gap-2 text-xs">
            <!-- Status pills (Open / Locked / Pinned) -->
            <Badge
              v-if="topic.is_locked"
              variant="secondary"
              class="h-6 gap-1 border-0 bg-muted text-muted-foreground"
            >
              <LockIcon class="size-3" />
              Verrouillé
            </Badge>
            <Badge
              v-else
              variant="secondary"
              class="h-6 gap-1 border-0 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
            >
              <CircleDotIcon class="size-3" />
              Ouvert
            </Badge>
            <Badge
              v-if="topic.is_pinned"
              variant="secondary"
              class="h-6 gap-1 border-0 bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
            >
              <PinIcon class="size-3" />
              Épinglé
            </Badge>

            <span class="text-muted-foreground">
              <strong class="text-foreground font-medium">{{ topic.author.name }}</strong>
              a ouvert ce sujet
              <time
                :datetime="topic.created_at"
                :title="absoluteDate(topic.created_at)"
              >
                {{ relativeTime(topic.created_at) }}
              </time>
              <span class="text-muted-foreground/60">·</span>
              {{ topic.replies_count }} {{ topic.replies_count === 1 ? 'commentaire' : 'commentaires' }}
              <span class="text-muted-foreground/60">·</span>
              {{ topic.views_count }} {{ topic.views_count === 1 ? 'vue' : 'vues' }}
            </span>

            <!-- Actions staff (à droite) -->
            <div class="ml-auto flex items-center gap-1">
              <Button
                v-if="isStaff"
                variant="outline"
                size="sm"
                class="h-7 gap-1 rounded-full text-xs"
                @click="onTogglePin"
              >
                <PinIcon class="size-3" />
                {{ topic.is_pinned ? 'Désépingler' : 'Épingler' }}
              </Button>
              <Button
                v-if="isStaff"
                variant="outline"
                size="sm"
                class="h-7 gap-1 rounded-full text-xs"
                @click="onToggleLock"
              >
                <LockIcon class="size-3" />
                {{ topic.is_locked ? 'Déverrouiller' : 'Verrouiller' }}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── Timeline GitHub-style ──────────────────────────────────── -->
      <section class="py-6">
        <div class="max-w-4xl mx-auto px-6">
          <ul class="relative flex flex-col gap-4 pt-2 pb-4">
            <!-- Ligne verticale derrière la colonne avatar -->
            <span
              class="absolute left-5 top-6 bottom-6 w-px bg-border"
              aria-hidden="true"
            />

            <!-- ── Item 1 : Topic (first post) ─────────────────────── -->
            <li class="relative flex gap-4">
              <!-- Avatar externe -->
              <div
                class="z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-medium text-sm border-2 border-background"
                :class="topic.author.is_staff
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-primary/10 text-primary'"
                aria-hidden="true"
              >
                {{ initials(topic.author.name) }}
              </div>

              <!-- Card content avec arrow notch -->
              <div class="github-arrow-left relative min-w-0 flex-1 rounded-lg border bg-card">
                <header
                  class="flex items-center gap-2 border-b bg-muted/30 px-3 py-1.5 text-xs flex-wrap"
                >
                  <span class="font-medium text-foreground">{{ topic.author.name }}</span>

                  <Badge
                    v-if="topic.author.is_staff"
                    variant="secondary"
                    class="h-5 gap-1 border-0 bg-red-500/10 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-500"
                  >
                    <ShieldCheckIcon class="size-2.5" />
                    Staff
                  </Badge>
                  <Badge
                    v-else
                    variant="secondary"
                    class="h-5 border-0 bg-primary/10 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
                  >
                    Auteur
                  </Badge>

                  <span class="text-muted-foreground">
                    a ouvert
                    <time
                      :datetime="topic.created_at"
                      :title="absoluteDate(topic.created_at)"
                    >
                      {{ relativeTime(topic.created_at) }}
                    </time>
                  </span>

                  <span
                    v-if="isTopicEdited"
                    class="text-muted-foreground italic"
                    :title="`Édité ${absoluteDate(topic.updated_at)}`"
                  >
                    · édité
                  </span>

                  <!-- Actions menu (à droite) -->
                  <DropdownMenu v-if="canEditTopic || canDeleteTopic">
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
                        v-if="canEditTopic && !isEditingTopic"
                        class="cursor-pointer"
                        :title="topicEditHint"
                        @click="startEditTopic"
                      >
                        <PencilIcon class="size-4 mr-2" />
                        Éditer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator v-if="canDeleteTopic" />
                      <DropdownMenuItem
                        v-if="canDeleteTopic"
                        class="cursor-pointer text-destructive focus:text-destructive"
                        @click="onDeleteTopic"
                      >
                        <Trash2Icon class="size-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </header>

                <!-- Lecture -->
                <div v-if="!isEditingTopic" class="px-4 py-3">
                  <ForumContent :html="topic.content" />
                </div>

                <!-- Édition inline -->
                <div v-else class="px-4 py-3 space-y-2">
                  <ForumEditor v-model="editedTopicHtml" min-height="180px" />
                  <div
                    v-if="topicEditError"
                    class="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-1.5 text-xs text-destructive"
                  >
                    {{ topicEditError }}
                  </div>
                  <div class="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      :disabled="isSavingTopic"
                      @click="cancelEditTopic"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      class="gap-1.5 rounded-full"
                      :disabled="isSavingTopic || !hasTopicChange"
                      @click="saveEditTopic"
                    >
                      <CheckIcon class="size-3.5" />
                      {{ isSavingTopic ? 'Enregistrement…' : 'Enregistrer' }}
                    </Button>
                  </div>
                </div>
              </div>
            </li>

            <!-- ── Inline events (pinned / locked / has-solution) ──── -->
            <ForumTimelineEvent
              v-if="topic.is_pinned"
              :icon="PinIcon"
              tone="amber"
            >
              Ce sujet a été <strong class="text-foreground font-medium">épinglé</strong>
              par un modérateur.
            </ForumTimelineEvent>

            <ForumTimelineEvent
              v-if="topic.is_locked"
              :icon="LockIcon"
              tone="neutral"
            >
              Ce sujet est <strong class="text-foreground font-medium">verrouillé</strong>
              — aucune nouvelle réponse possible.
            </ForumTimelineEvent>

            <ForumTimelineEvent
              v-if="solutionReply"
              :icon="CheckCircle2Icon"
              tone="green"
            >
              <strong class="text-foreground font-medium">{{ solutionReply.author.name }}</strong>
              a fourni la solution
              <time :title="absoluteDate(solutionReply.updated_at)">
                {{ relativeTime(solutionReply.updated_at) }}
              </time>
            </ForumTimelineEvent>

            <!-- ── Replies ─────────────────────────────────────────── -->
            <ForumReplyCard
              v-for="reply in forum.replies.value"
              :key="reply.id"
              :reply="reply"
              :current-user-id="currentUserId"
              :current-user-is-staff="isStaff"
              :topic-author-id="topic.author.id"
              @delete="onDeleteReply"
              @toggle-solution="onToggleSolution"
            />

            <!-- ── Composer "Add a comment" ────────────────────────── -->
            <li v-if="!topic.is_locked && isAuthenticated" class="relative flex gap-4">
              <div
                class="z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-medium text-sm border-2 border-background bg-primary/10 text-primary"
                aria-hidden="true"
              >
                {{ initials(user.user.value?.name || 'Toi') }}
              </div>
              <div class="github-arrow-left relative min-w-0 flex-1 rounded-lg border bg-card">
                <header
                  class="border-b bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  Ajouter un commentaire
                </header>
                <form class="px-4 py-3 space-y-3" @submit.prevent="onSubmitReply">
                  <ForumEditor
                    v-model="replyContent"
                    placeholder="Écris ta réponse en markdown ou rich text…"
                    min-height="140px"
                  />
                  <div
                    v-if="replyError"
                    class="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2 text-xs text-destructive"
                  >
                    {{ replyError }}
                  </div>
                  <div class="flex items-center justify-end gap-2">
                    <Button
                      type="submit"
                      :disabled="isSubmitting || plainTextLength(replyContent) < 2"
                      class="rounded-full gap-1.5"
                    >
                      <SendIcon class="size-3.5" />
                      {{ isSubmitting ? 'Envoi…' : 'Commenter' }}
                    </Button>
                  </div>
                </form>
              </div>
            </li>

            <!-- ── Locked state ────────────────────────────────────── -->
            <li
              v-else-if="topic.is_locked"
              class="ml-14 rounded-lg border border-muted-foreground/20 bg-muted/30 px-4 py-3 text-center text-sm text-muted-foreground"
            >
              <LockIcon class="size-4 inline-block mr-1.5 -mt-0.5" />
              Conversation verrouillée — aucune nouvelle réponse possible.
            </li>

            <!-- ── Sign-in prompt ──────────────────────────────────── -->
            <li
              v-else
              class="ml-14 rounded-lg border bg-card px-4 py-3 text-center"
            >
              <p class="text-sm text-muted-foreground mb-2">
                Connecte-toi pour commenter ce sujet.
              </p>
              <Button as-child size="sm" class="rounded-full">
                <NuxtLink :to="`/auth/login?redirect=/forum/topic/${topic.id}`">
                  Se connecter
                </NuxtLink>
              </Button>
            </li>
          </ul>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircle2Icon,
  CheckIcon,
  ChevronRightIcon,
  CircleDotIcon,
  LockIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PinIcon,
  SendIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'forum',
  ssr: false,
})

const route = useRoute()
const router = useRouter()
const topicId = computed(() => Number(route.params.id))

const forum = useForum()
const auth = useAuth()
const user = useUser()

const isAuthenticated = computed(() => !!auth.tokens.value)
const isStaff = computed(() => !!user.user.value?.is_staff)
const currentUserId = computed(() => user.user.value?.id ?? null)

const topic = computed(() => forum.currentTopic.value)

// Première réponse marquée comme solution (s'il y en a une)
const solutionReply = computed(
  () => forum.replies.value.find(r => r.is_solution) ?? null,
)

// Fenêtre d'édition propriétaire alignée avec backend (15 min)
const TOPIC_EDIT_WINDOW_MS = 15 * 60 * 1000

const isTopicOwner = computed(
  () => !!topic.value && topic.value.author.id === currentUserId.value,
)

const isWithinTopicEditWindow = computed(() => {
  if (!topic.value) return false
  const created = new Date(topic.value.created_at).getTime()
  return Date.now() - created <= TOPIC_EDIT_WINDOW_MS
})

const canEditTopic = computed(() => {
  if (!topic.value || !isAuthenticated.value) return false
  if (isStaff.value) return true
  return isTopicOwner.value && isWithinTopicEditWindow.value
})

const canDeleteTopic = computed(() => canEditTopic.value)

const topicEditHint = computed(() => {
  if (!topic.value) return ''
  if (isStaff.value) return 'Édition staff (sans limite de temps)'
  const created = new Date(topic.value.created_at).getTime()
  const remaining = TOPIC_EDIT_WINDOW_MS - (Date.now() - created)
  const min = Math.max(0, Math.floor(remaining / 60_000))
  return `Édition possible encore ${min} min`
})

const isTopicEdited = computed(() => {
  if (!topic.value?.updated_at || !topic.value?.created_at) return false
  return (
    new Date(topic.value.updated_at).getTime() -
      new Date(topic.value.created_at).getTime() >
    30_000
  )
})

// Charge topic + replies en parallèle
await Promise.all([
  forum.loadTopic(topicId.value),
  forum.loadReplies(topicId.value),
])

useHead(() => ({
  title: topic.value
    ? `${topic.value.title} — Forum VizHome`
    : 'Sujet — Forum VizHome',
}))

// ─── Reply form ─────────────────────────────────────────────────────────
const replyContent = ref('')
const replyError = ref<string | null>(null)
const isSubmitting = ref(false)

function plainTextLength(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .length
}

async function onSubmitReply() {
  if (!topic.value || plainTextLength(replyContent.value) < 2 || isSubmitting.value) return
  isSubmitting.value = true
  replyError.value = null
  try {
    await forum.createReply(topic.value.id, replyContent.value)
    replyContent.value = ''
    toast.success('Réponse publiée.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string } }
    replyError.value = err?.data?.detail || 'Impossible de publier la réponse.'
  } finally {
    isSubmitting.value = false
  }
}

// ─── Édition inline du topic ─────────────────────────────────────────────
const isEditingTopic = ref(false)
const editedTopicHtml = ref('')
const topicEditError = ref<string | null>(null)
const isSavingTopic = ref(false)

const hasTopicChange = computed(() => {
  if (!topic.value) return false
  return (
    editedTopicHtml.value.trim() !== topic.value.content.trim()
    && plainTextLength(editedTopicHtml.value) >= 10
  )
})

function startEditTopic() {
  if (!topic.value) return
  editedTopicHtml.value = topic.value.content
  topicEditError.value = null
  isEditingTopic.value = true
}

function cancelEditTopic() {
  isEditingTopic.value = false
  editedTopicHtml.value = ''
  topicEditError.value = null
}

async function saveEditTopic() {
  if (!topic.value || !hasTopicChange.value || isSavingTopic.value) return
  isSavingTopic.value = true
  topicEditError.value = null
  try {
    await forum.updateTopic(topic.value.id, { content: editedTopicHtml.value })
    isEditingTopic.value = false
    toast.success('Sujet mis à jour.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string }; statusCode?: number }
    if (err.statusCode === 403) {
      topicEditError.value =
        err.data?.detail ||
        "Fenêtre d'édition dépassée — seul le staff peut maintenant modifier."
    } else {
      topicEditError.value = err.data?.detail || 'Modification échouée.'
    }
  } finally {
    isSavingTopic.value = false
  }
}

// ─── Delete topic / reply ───────────────────────────────────────────────
async function onDeleteTopic() {
  if (!topic.value) return
  if (!confirm('Supprimer ce sujet ? Cette action est irréversible.')) return
  try {
    await forum.deleteTopic(topic.value.id)
    toast.success('Sujet supprimé.')
    await router.push(`/forum/${topic.value.category_slug}`)
  } catch {
    toast.error('Impossible de supprimer le sujet.')
  }
}

async function onDeleteReply(reply: { id: number }) {
  if (!confirm('Supprimer cette réponse ?')) return
  try {
    await forum.deleteReply(reply.id)
    toast.success('Réponse supprimée.')
  } catch {
    toast.error('Impossible de supprimer la réponse.')
  }
}

// ─── Modération staff (pin / lock topic) ────────────────────────────────
async function onTogglePin() {
  if (!topic.value) return
  try {
    const isPinned = await forum.toggleTopicPin(topic.value.id)
    toast.success(isPinned ? 'Sujet épinglé.' : 'Sujet désépinglé.')
  } catch {
    toast.error("Impossible de modifier l'épinglage.")
  }
}

async function onToggleLock() {
  if (!topic.value) return
  try {
    const isLocked = await forum.toggleTopicLock(topic.value.id)
    toast.success(
      isLocked ? 'Sujet verrouillé.' : 'Sujet déverrouillé.',
    )
  } catch {
    toast.error('Impossible de modifier le verrou.')
  }
}

// ─── Marquer / unmarker une solution (owner du topic ou staff) ──────────
async function onToggleSolution(reply: { id: number }) {
  try {
    const isSolution = await forum.toggleReplySolution(reply.id)
    toast.success(
      isSolution
        ? 'Réponse marquée comme solution.'
        : 'Solution retirée.',
    )
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string } }
    toast.error(err.data?.detail || 'Impossible de modifier la solution.')
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────
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
