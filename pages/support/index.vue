<template>
  <div class="mx-auto max-w-4xl px-4 sm:px-6 py-8 flex flex-col gap-6">
    <!-- Header simple (le layout fournit déjà titre "Centre de support" + CTA Nouveau) -->
    <h1 class="text-xl font-semibold tracking-tight">Mes tickets</h1>

    <Alert v-if="error">
      <CircleAlertIcon class="size-4" />
      <AlertTitle>Impossible de charger tes tickets</AlertTitle>
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <div v-if="isLoading && tickets.length === 0" class="flex flex-col gap-3">
      <Skeleton v-for="i in 3" :key="i" class="h-20 rounded-xl" />
    </div>

    <Card v-else-if="tickets.length === 0" class="bg-muted/20">
      <CardContent class="py-10 text-center">
        <MessageCircleQuestionIcon class="mx-auto size-10 text-muted-foreground mb-3" />
        <p class="text-sm font-medium mb-1">Aucun ticket pour l'instant</p>
        <p class="text-xs text-muted-foreground mb-4">
          Si tu rencontres un problème ou as une question, ouvre un ticket — on
          te répondra rapidement.
        </p>
        <Button as-child class="rounded-full gap-1.5">
          <NuxtLink to="/support/new">
            <PlusIcon class="size-4" />
            Ouvrir mon premier ticket
          </NuxtLink>
        </Button>
      </CardContent>
    </Card>

    <ul v-else class="flex flex-col gap-2">
      <li v-for="t in tickets" :key="t.id">
        <NuxtLink
          :to="`/support/${t.id}`"
          class="flex items-start gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-muted/30"
        >
          <component
            :is="STATUS_ICONS[t.status]"
            class="size-5 shrink-0 mt-0.5"
            :class="STATUS_COLORS[t.status]"
          />
          <div class="min-w-0 flex-1">
            <p class="flex items-center gap-2 text-sm font-medium">
              <span class="truncate">{{ t.subject }}</span>
              <span class="text-muted-foreground/70 font-normal">#{{ t.id }}</span>
            </p>
            <p class="mt-0.5 text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <Badge
                variant="secondary"
                :class="STATUS_BADGE_CLASS[t.status]"
                class="h-5 border-0 px-1.5 text-[10px] font-semibold uppercase tracking-wider"
              >
                {{ STATUS_LABELS[t.status] }}
              </Badge>
              <span>{{ CATEGORY_LABELS[t.category] }}</span>
              <span class="text-muted-foreground/60">·</span>
              <span>
                {{ t.messages_count }}
                {{ t.messages_count === 1 ? 'message' : 'messages' }}
              </span>
              <span class="text-muted-foreground/60">·</span>
              <time>
                Maj {{ relativeTime(t.last_message_at || t.updated_at) }}
              </time>
              <span
                v-if="t.last_message_from_staff && t.status !== 'closed'"
                class="ml-1 inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
              >
                <CornerDownLeftIcon class="size-2.5" />
                Nouvelle réponse staff
              </span>
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  CircleAlertIcon,
  CircleDotIcon,
  CircleCheckIcon,
  CircleXIcon,
  ClockIcon,
  CornerDownLeftIcon,
  MessageCircleQuestionIcon,
  PlusIcon,
} from 'lucide-vue-next'
import type { Component } from 'vue'

import type { TicketStatus } from '~/composables/useSupport'

definePageMeta({
  layout: 'support',
  middleware: 'auth',
  ssr: false,
})

useHead({ title: 'Mes tickets — VizHome Support' })

const { tickets, isLoading, error, loadTickets, STATUS_LABELS, CATEGORY_LABELS } = useSupport()

await loadTickets()

const STATUS_ICONS: Record<TicketStatus, Component> = {
  open: CircleDotIcon,
  pending: ClockIcon,
  resolved: CircleCheckIcon,
  closed: CircleXIcon,
}
const STATUS_COLORS: Record<TicketStatus, string> = {
  open: 'text-green-600 dark:text-green-400',
  pending: 'text-amber-500',
  resolved: 'text-blue-500',
  closed: 'text-muted-foreground',
}
const STATUS_BADGE_CLASS: Record<TicketStatus, string> = {
  open: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  resolved: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  closed: 'bg-muted text-muted-foreground',
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
