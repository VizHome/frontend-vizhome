<!--
  CategoryCard — carte cliquable d'une catégorie du forum (vue index).
  Design : bordure visible + bg-card subtil + hover state évident.
-->
<template>
  <NuxtLink
    :to="`/forum/${category.slug}`"
    class="group relative flex gap-3 rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 dark:hover:bg-card/80"
  >
    <div
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset transition-colors"
      :class="iconBgClass"
    >
      <component :is="iconComponent" class="h-5 w-5" :class="iconColorClass" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1.5 mb-0.5">
        <h3
          class="font-semibold text-sm leading-tight group-hover:text-primary transition-colors truncate"
        >
          {{ category.name }}
        </h3>
        <span
          v-if="category.is_admin_only"
          class="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary uppercase tracking-wider"
        >
          Staff
        </span>
      </div>
      <p
        v-if="category.description"
        class="text-xs text-muted-foreground leading-snug line-clamp-2 mb-1.5"
      >
        {{ category.description }}
      </p>
      <p class="text-[11px] text-muted-foreground flex items-center gap-1">
        <MessageSquareIcon class="h-3 w-3" />
        {{ category.topics_count }}
        {{ category.topics_count === 1 ? 'sujet' : 'sujets' }}
      </p>
    </div>
    <ArrowRightIcon
      class="h-4 w-4 text-muted-foreground/40 self-center shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  Bug,
  CircleHelp,
  HelpCircle,
  Lightbulb,
  Megaphone,
  MessageSquareIcon,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

import type { ForumCategory } from '~/composables/useForum'

const props = defineProps<{
  category: ForumCategory
}>()

const ICON_MAP: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  lightbulb: Lightbulb,
  'help-circle': HelpCircle,
  bug: Bug,
  'messages-square': MessagesSquare,
}

const iconComponent = computed(
  () => ICON_MAP[props.category.icon] ?? CircleHelp
)

// Mapping color string → classes Tailwind statiques (pas de concat dynamique
// pour que Tailwind les détecte au build).
const COLOR_BG: Record<string, string> = {
  blue: 'bg-blue-50 dark:bg-blue-950/30 ring-blue-200 dark:ring-blue-900',
  amber: 'bg-amber-50 dark:bg-amber-950/30 ring-amber-200 dark:ring-amber-900',
  green: 'bg-green-50 dark:bg-green-950/30 ring-green-200 dark:ring-green-900',
  red: 'bg-red-50 dark:bg-red-950/30 ring-red-200 dark:ring-red-900',
  slate: 'bg-slate-100 dark:bg-slate-800/40 ring-slate-200 dark:ring-slate-700',
}
const COLOR_FG: Record<string, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  amber: 'text-amber-600 dark:text-amber-400',
  green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
  slate: 'text-slate-600 dark:text-slate-400',
}

const iconBgClass = computed(
  () => COLOR_BG[props.category.color] ?? COLOR_BG.slate
)
const iconColorClass = computed(
  () => COLOR_FG[props.category.color] ?? COLOR_FG.slate
)
</script>
