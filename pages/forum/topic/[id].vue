<template>
  <div class="min-h-[60vh]">
    <!-- Loading skeleton -->
    <div v-if="!topic" class="max-w-3xl mx-auto px-6 py-10 space-y-4">
      <div class="h-8 w-2/3 bg-muted/40 rounded animate-pulse" />
      <div class="h-32 bg-muted/40 rounded animate-pulse" />
    </div>

    <template v-else>
      <!-- Header avec breadcrumb -->
      <section class="border-b py-8 px-6">
        <div class="max-w-3xl mx-auto">
          <nav class="text-sm mb-4 flex items-center gap-2 text-muted-foreground">
            <NuxtLink to="/forum" class="hover:text-foreground transition-colors">
              Forum
            </NuxtLink>
            <ChevronRightIcon class="h-3.5 w-3.5" />
            <NuxtLink
              :to="`/forum/${topic.category_slug}`"
              class="hover:text-foreground transition-colors"
            >
              {{ topic.category_name }}
            </NuxtLink>
          </nav>

          <div class="flex items-start gap-3 mb-4">
            <PinIcon
              v-if="topic.is_pinned"
              class="h-5 w-5 text-amber-500 mt-1.5 shrink-0"
              aria-label="Épinglé"
            />
            <LockIcon
              v-if="topic.is_locked"
              class="h-5 w-5 text-muted-foreground mt-1.5 shrink-0"
              aria-label="Verrouillé"
            />
            <h1 class="text-2xl font-bold leading-tight flex-1">{{ topic.title }}</h1>
          </div>

          <div class="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span class="flex items-center gap-1.5">
              <span
                class="flex h-6 w-6 items-center justify-center rounded-full font-medium text-[10px]"
                :class="topic.author.is_staff
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-primary/10 text-primary'"
              >
                {{ initials(topic.author.name) }}
              </span>
              <span class="text-foreground/80">{{ topic.author.name }}</span>
              <!-- Badge STAFF (texte) au lieu d'icône seule -->
              <span
                v-if="topic.author.is_staff"
                class="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-red-500"
              >
                <ShieldCheckIcon class="h-2.5 w-2.5" />
                Staff
              </span>
              <span
                v-else-if="isTopicOwner"
                class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary"
              >
                Toi
              </span>
            </span>
            <span aria-hidden="true">·</span>
            <time
              :datetime="topic.created_at"
              :title="new Date(topic.created_at).toLocaleString('fr-FR')"
            >
              {{ relativeTime(topic.created_at) }}
              <span class="ml-1 text-muted-foreground/60">
                · {{ new Date(topic.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) }}
              </span>
            </time>
            <template v-if="isTopicEdited">
              <span aria-hidden="true">·</span>
              <span
                class="italic"
                :title="`Édité ${new Date(topic.updated_at).toLocaleString('fr-FR')}`"
              >
                édité
              </span>
            </template>
            <span aria-hidden="true">·</span>
            <span class="flex items-center gap-1">
              <EyeIcon class="h-3 w-3" />
              {{ topic.views_count }}
            </span>
            <span aria-hidden="true">·</span>
            <span class="flex items-center gap-1">
              <MessageSquareIcon class="h-3 w-3" />
              {{ topic.replies_count }}
            </span>

            <!-- Actions owner / staff (édit / supprime / pin / lock) -->
            <span
              v-if="canEditTopic || canDeleteTopic || isStaff"
              class="ml-auto flex items-center gap-2"
            >
              <!-- Actions staff modération -->
              <button
                v-if="isStaff"
                type="button"
                class="hover:text-amber-500 transition-colors flex items-center gap-1"
                :title="topic.is_pinned ? 'Désépingler' : 'Épingler en haut'"
                @click="onTogglePin"
              >
                <PinIcon class="h-3 w-3" />
                {{ topic.is_pinned ? 'Désépingler' : 'Épingler' }}
              </button>
              <button
                v-if="isStaff"
                type="button"
                class="hover:text-foreground transition-colors flex items-center gap-1"
                :title="topic.is_locked ? 'Déverrouiller (autoriser les réponses)' : 'Verrouiller (bloquer les réponses)'"
                @click="onToggleLock"
              >
                <LockIcon class="h-3 w-3" />
                {{ topic.is_locked ? 'Déverrouiller' : 'Verrouiller' }}
              </button>
              <!-- Actions owner -->
              <button
                v-if="canEditTopic && !isEditingTopic"
                type="button"
                class="hover:text-foreground transition-colors flex items-center gap-1"
                :title="topicEditHint"
                @click="startEditTopic"
              >
                <PencilIcon class="h-3 w-3" />
                Éditer
              </button>
              <button
                v-if="canDeleteTopic"
                type="button"
                class="text-destructive/80 hover:text-destructive transition-colors flex items-center gap-1"
                @click="onDeleteTopic"
              >
                <Trash2Icon class="h-3 w-3" />
                Supprimer
              </button>
            </span>
          </div>
        </div>
      </section>

      <!-- Contenu du topic (HTML riche sanitisé via DOMPurify) -->
      <section class="border-b px-6 py-8 bg-muted/20">
        <div class="max-w-3xl mx-auto">
          <!-- Lecture -->
          <ForumContent v-if="!isEditingTopic" :html="topic.content" />

          <!-- Édition inline -->
          <div v-else class="space-y-2">
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
                <CheckIcon class="h-3.5 w-3.5" />
                {{ isSavingTopic ? 'Enregistrement…' : 'Enregistrer' }}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Replies -->
      <section class="px-6 py-8">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-base font-semibold mb-4">
            {{ topic.replies_count }}
            {{ topic.replies_count === 1 ? 'réponse' : 'réponses' }}
          </h2>

          <div
            v-if="forum.replies.value.length === 0"
            class="text-sm text-muted-foreground text-center py-6 border rounded-lg"
          >
            Aucune réponse pour l'instant. Sois le premier à répondre.
          </div>

          <div v-else class="space-y-3">
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
          </div>

          <!-- Form reply -->
          <div class="mt-8">
            <div
              v-if="topic.is_locked"
              class="rounded-lg border border-muted-foreground/20 bg-muted/30 p-4 text-center text-sm text-muted-foreground"
            >
              <LockIcon class="h-4 w-4 inline-block mr-1.5 -mt-0.5" />
              Ce sujet est verrouillé — aucune nouvelle réponse possible.
            </div>

            <div
              v-else-if="!isAuthenticated"
              class="rounded-lg border bg-card p-4 text-center"
            >
              <p class="text-sm text-muted-foreground mb-3">
                Connecte-toi pour répondre.
              </p>
              <Button as-child class="rounded-full">
                <NuxtLink :to="`/auth/login?redirect=/forum/topic/${topic.id}`">
                  Se connecter
                </NuxtLink>
              </Button>
            </div>

            <form
              v-else
              class="space-y-3"
              @submit.prevent="onSubmitReply"
            >
              <Label class="text-sm font-medium">Ta réponse</Label>
              <ForumEditor
                v-model="replyContent"
                placeholder="Écris ta réponse…"
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
                  <SendIcon class="h-3.5 w-3.5" />
                  {{ isSubmitting ? 'Envoi…' : 'Répondre' }}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  CheckIcon,
  ChevronRightIcon,
  EyeIcon,
  LockIcon,
  MessageSquareIcon,
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
  // ssr: false → page rendue uniquement côté client. Évite les mismatches
  // d'hydratation causés par le pattern composable singleton (forum state
  // live recharge sur client) + TipTap qui requiert le DOM browser.
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

// Fenêtre d'édition propriétaire alignée avec backend (15 min)
const TOPIC_EDIT_WINDOW_MS = 15 * 60 * 1000

const isTopicOwner = computed(
  () => !!topic.value && topic.value.author.id === currentUserId.value
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

/** Compte les caractères de texte du HTML rich (sans balises). */
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
</script>
