<!--
  TopicCard — carte d'un sujet dans une liste (cat detail, recent topics).
  Affiche : pin/lock badges + titre + auteur + cat + compteurs + last activity.

  Mode `compact` : version dense pour la colonne "Activité récente" de
  l'index forum (pas d'avatar, pas de compteurs droite).
-->
<template>
  <NuxtLink
    :to="`/forum/topic/${topic.id}`"
    class="group flex items-start gap-3 rounded-lg border bg-card p-3 transition-all hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 dark:hover:bg-card/80"
  >
    <!-- Avatar (caché en mode compact) -->
    <div
      v-if="!compact"
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-sm"
    >
      {{ initials(topic.author.name) }}
    </div>

    <div class="flex-1 min-w-0">
      <!-- Titre + badges -->
      <div class="flex items-center gap-1.5 mb-1 flex-wrap">
        <PinIcon
          v-if="topic.is_pinned"
          class="h-3 w-3 text-amber-500 shrink-0"
          aria-label="Sujet épinglé"
        />
        <LockIcon
          v-if="topic.is_locked"
          class="h-3 w-3 text-muted-foreground shrink-0"
          aria-label="Sujet verrouillé"
        />
        <h3
          class="font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2"
          :class="compact ? 'text-sm' : 'text-sm sm:text-[15px]'"
        >
          {{ topic.title }}
        </h3>
      </div>

      <!-- Méta : auteur + cat + dates -->
      <div
        class="flex items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground flex-wrap"
      >
        <span class="flex items-center gap-1">
          <span class="font-medium text-foreground/70">{{
            topic.author.name
          }}</span>
          <ShieldCheckIcon
            v-if="topic.author.is_staff"
            class="h-2.5 w-2.5 text-primary"
            aria-label="Staff"
          />
        </span>
        <span v-if="!hideCategory" aria-hidden="true">·</span>
        <span
          v-if="!hideCategory"
          class="rounded-full bg-muted px-1.5 py-0 text-[10px]"
        >
          {{ topic.category_name }}
        </span>
        <span aria-hidden="true">·</span>
        <span>{{ relativeTime(topic.last_reply_at || topic.created_at) }}</span>
        <!-- En mode compact, on affiche les compteurs inline -->
        <template v-if="compact">
          <span aria-hidden="true">·</span>
          <span class="flex items-center gap-1">
            <MessageSquareIcon class="h-2.5 w-2.5" />
            {{ topic.replies_count }}
          </span>
        </template>
      </div>
    </div>

    <!-- Compteurs droite (mode non-compact uniquement) -->
    <div
      v-if="!compact"
      class="hidden sm:flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0"
    >
      <span class="flex items-center gap-1">
        <MessageSquareIcon class="h-3 w-3" />
        {{ topic.replies_count }}
      </span>
      <span class="flex items-center gap-1">
        <EyeIcon class="h-3 w-3" />
        {{ topic.views_count }}
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  EyeIcon,
  LockIcon,
  MessageSquareIcon,
  PinIcon,
  ShieldCheckIcon,
} from 'lucide-vue-next'

import type { ForumTopicListItem } from '~/composables/useForum'

defineProps<{
  topic: ForumTopicListItem
  hideCategory?: boolean
  /** Mode dense (sans avatar, compteurs inline) pour la colonne "Activité récente". */
  compact?: boolean
}>()

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
