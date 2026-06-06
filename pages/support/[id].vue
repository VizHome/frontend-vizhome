<template>
  <div class="mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col gap-6">
    <Skeleton v-if="isLoading && !ticket" class="h-20 rounded-xl" />

    <Alert v-else-if="error" variant="destructive">
      <CircleAlertIcon class="size-4" />
      <AlertTitle>Ticket introuvable</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <template v-else-if="ticket">
      <!-- Header (breadcrumb #ID fourni par layout) -->
      <section>
        <h1 class="text-xl font-semibold leading-tight">
          {{ ticket.subject }}
          <span class="text-muted-foreground font-normal ml-1 text-base">#{{ ticket.id }}</span>
        </h1>
        <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <Badge
            variant="secondary"
            :class="STATUS_BADGE_CLASS[ticket.status]"
            class="h-6 gap-1 border-0 px-2 font-semibold uppercase tracking-wider"
          >
            <component :is="STATUS_ICONS[ticket.status]" class="size-3" />
            {{ STATUS_LABELS[ticket.status] }}
          </Badge>
          <Badge
            variant="secondary"
            :class="PRIORITY_BADGE_CLASS[ticket.priority]"
            class="h-6 border-0 px-2 font-semibold uppercase tracking-wider"
          >
            {{ PRIORITY_LABELS[ticket.priority] }}
          </Badge>
          <span class="text-muted-foreground">
            {{ CATEGORY_LABELS[ticket.category] }}
            <span class="text-muted-foreground/60">·</span>
            Ouvert
            <time :title="absoluteDate(ticket.created_at)">
              {{ relativeTime(ticket.created_at) }}
            </time>
            <template v-if="ticket.assignee_pseudo">
              <span class="text-muted-foreground/60">·</span>
              Géré par <strong class="text-foreground font-medium">@{{ ticket.assignee_pseudo }}</strong>
            </template>
          </span>
        </div>
      </section>

      <!-- Thread -->
      <section>
        <ul class="relative flex flex-col gap-4 pt-2 pb-4">
          <span class="absolute left-5 top-6 bottom-6 w-px bg-border" aria-hidden="true" />

          <li
            v-for="m in ticket.messages"
            :key="m.id"
            class="relative flex gap-4"
          >
            <div
              class="z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-medium text-sm border-2 border-background"
              :class="m.from_staff
                ? 'bg-red-500/10 text-red-500'
                : 'bg-primary/10 text-primary'"
              aria-hidden="true"
            >
              {{ initials(m.author?.pseudo || m.author?.name || '?') }}
            </div>
            <div
              class="github-arrow-left relative min-w-0 flex-1 rounded-lg border bg-card"
              :class="m.from_staff ? 'border-red-200/60 dark:border-red-900/30' : ''"
            >
              <header
                class="flex items-center gap-2 border-b bg-muted/30 px-3 py-1.5 text-xs flex-wrap"
              >
                <span class="font-medium text-foreground">
                  {{ m.author?.pseudo || m.author?.name || 'Inconnu' }}
                </span>
                <Badge
                  v-if="m.from_staff"
                  variant="secondary"
                  class="h-5 gap-1 border-0 bg-red-500/10 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-red-500"
                >
                  <ShieldIcon class="size-2.5" />
                  Staff
                </Badge>
                <span class="text-muted-foreground">
                  · <time :title="absoluteDate(m.created_at)">{{ relativeTime(m.created_at) }}</time>
                </span>
              </header>
              <div class="px-4 py-3 text-sm leading-relaxed">
                <!-- Backward compat : si le body ne contient pas de balises HTML
                     (anciens messages plain text), on l'affiche tel quel avec
                     whitespace-pre-wrap. Sinon, ForumContent sanitise via DOMPurify. -->
                <ForumContent v-if="isHtml(m.body)" :html="m.body" />
                <p v-else class="whitespace-pre-wrap">{{ m.body }}</p>
              </div>
            </div>
          </li>

          <!-- Composer reply -->
          <li v-if="ticket.status !== 'closed'" class="relative flex gap-4">
            <div
              class="z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-medium text-sm border-2 border-background bg-primary/10 text-primary"
              aria-hidden="true"
            >
              {{ initials(currentPseudo || 'Toi') }}
            </div>
            <div class="github-arrow-left relative min-w-0 flex-1 rounded-lg border bg-card">
              <header
                class="border-b bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground"
              >
                Ajouter une réponse
              </header>
              <form class="px-4 py-3 flex flex-col gap-2" @submit.prevent="onReply">
                <!-- Éditeur riche TipTap (identique au forum, support images via MinIO) -->
                <ForumEditor
                  v-model="reply"
                  placeholder="Écris ta réponse — formatage, listes, images supportés…"
                  min-height="140px"
                />
                <Alert v-if="replyError" variant="destructive">
                  <CircleAlertIcon class="size-4" />
                  <AlertDescription>{{ replyError }}</AlertDescription>
                </Alert>
                <div class="flex items-center justify-end gap-2">
                  <Button
                    type="submit"
                    class="rounded-full gap-1.5"
                    :disabled="isReplying || replyPlainLength < 2"
                  >
                    <SendIcon class="size-3.5" />
                    {{ isReplying ? 'Envoi…' : 'Répondre' }}
                  </Button>
                </div>
              </form>
            </div>
          </li>

          <!-- Closed state -->
          <li
            v-else
            class="ml-14 rounded-lg border border-muted-foreground/20 bg-muted/30 px-4 py-3 text-center text-sm text-muted-foreground"
          >
            <CircleXIcon class="size-4 inline-block mr-1.5 -mt-0.5" />
            Ce ticket est fermé. Ouvre un nouveau ticket si ton problème persiste.
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  CircleAlertIcon,
  CircleDotIcon,
  CircleCheckIcon,
  CircleXIcon,
  ClockIcon,
  SendIcon,
  ShieldIcon,
} from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import { toast } from 'vue-sonner'

import type { TicketStatus, TicketPriority } from '~/composables/useSupport'

definePageMeta({
  layout: 'support',
  middleware: 'auth',
  ssr: false,
})

const route = useRoute()
const ticketId = computed(() => Number(route.params.id))

const support = useSupport()
const user = useUser()

const ticket = computed(() => support.currentTicket.value)
const isLoading = computed(() => support.isLoading.value)
const error = computed(() => support.error.value)
const currentPseudo = computed(() => user.user.value?.pseudo || user.user.value?.name)

const { STATUS_LABELS, PRIORITY_LABELS, CATEGORY_LABELS } = support

await support.loadTicket(ticketId.value)

useHead(() => ({
  title: ticket.value
    ? `${ticket.value.subject} — Support VizHome`
    : 'Ticket — Support VizHome',
}))

const reply = ref('')
const replyError = ref<string | null>(null)
const isReplying = ref(false)

/** Détecte le HTML pour le rendu rétro-compatible des anciens messages plain text. */
function isHtml(content: string): boolean {
  return /<[a-z][^>]*>/i.test(content || '')
}

/** Compte les chars de texte du HTML rich (sans balises) — sert au disabled bouton. */
function _plainTextLength(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim().length
}
const replyPlainLength = computed(() => _plainTextLength(reply.value))

async function onReply() {
  if (replyPlainLength.value < 2 || isReplying.value || !ticket.value) return
  replyError.value = null
  isReplying.value = true
  try {
    await support.replyToTicket(ticket.value.id, reply.value.trim())
    reply.value = ''
    toast.success('Réponse envoyée.')
  } catch (e: unknown) {
    const err = e as { data?: { detail?: string; body?: string[] } }
    replyError.value =
      err.data?.detail || err.data?.body?.[0] || 'Envoi de la réponse échoué.'
  } finally {
    isReplying.value = false
  }
}

const STATUS_ICONS: Record<TicketStatus, Component> = {
  open: CircleDotIcon,
  pending: ClockIcon,
  resolved: CircleCheckIcon,
  closed: CircleXIcon,
}
const STATUS_BADGE_CLASS: Record<TicketStatus, string> = {
  open: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  resolved: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  closed: 'bg-muted text-muted-foreground',
}
const PRIORITY_BADGE_CLASS: Record<TicketPriority, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-primary/10 text-primary',
  high: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  urgent: 'bg-red-500/10 text-red-700 dark:text-red-400',
}

function initials(name: string): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || '?'
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
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
</script>

<style>
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
