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
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-[10px]"
              >
                {{ initials(topic.author.name) }}
              </span>
              <span class="text-foreground/80">{{ topic.author.name }}</span>
              <ShieldCheckIcon
                v-if="topic.author.is_staff"
                class="h-3 w-3 text-primary"
                aria-label="Staff"
              />
            </span>
            <span aria-hidden="true">·</span>
            <time
              :datetime="topic.created_at"
              :title="new Date(topic.created_at).toLocaleString('fr-FR')"
            >
              {{ relativeTime(topic.created_at) }}
            </time>
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

            <!-- Actions owner / staff -->
            <span
              v-if="canEditTopic"
              class="ml-auto flex items-center gap-2"
            >
              <span aria-hidden="true">·</span>
              <button
                type="button"
                class="hover:text-foreground transition-colors"
                @click="onDeleteTopic"
              >
                Supprimer le sujet
              </button>
            </span>
          </div>
        </div>
      </section>

      <!-- Contenu du topic -->
      <section class="border-b px-6 py-8 bg-muted/20">
        <div class="max-w-3xl mx-auto">
          <article
            class="text-sm leading-relaxed whitespace-pre-wrap break-words"
          >
            {{ topic.content }}
          </article>
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
              @delete="onDeleteReply"
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
              <Label for="reply" class="text-sm font-medium">Ta réponse</Label>
              <textarea
                id="reply"
                v-model="replyContent"
                rows="5"
                placeholder="Écris ta réponse… (Ctrl+Entrée pour envoyer)"
                class="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                @keydown.ctrl.enter="onSubmitReply"
                @keydown.meta.enter="onSubmitReply"
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
                  :disabled="isSubmitting || replyContent.trim().length < 2"
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
  ChevronRightIcon,
  EyeIcon,
  LockIcon,
  MessageSquareIcon,
  PinIcon,
  SendIcon,
  ShieldCheckIcon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'forum' })

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
const canEditTopic = computed(() => {
  if (!topic.value || !isAuthenticated.value) return false
  return isStaff.value || topic.value.author.id === currentUserId.value
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

async function onSubmitReply() {
  if (!topic.value || replyContent.value.trim().length < 2 || isSubmitting.value) return
  isSubmitting.value = true
  replyError.value = null
  try {
    await forum.createReply(topic.value.id, replyContent.value.trim())
    replyContent.value = ''
    toast.success('Réponse publiée.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; code?: string } }
    replyError.value = err?.data?.detail || 'Impossible de publier la réponse.'
  } finally {
    isSubmitting.value = false
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
