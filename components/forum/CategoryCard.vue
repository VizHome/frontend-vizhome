<!--
  CategoryCard — carte cliquable d'une catégorie du forum (vue index).
  Affiche : icône colorée + nom + description + nombre de topics + badge admin si applicable.
-->
<template>
  <NuxtLink
    :to="`/forum/${category.slug}`"
    class="group flex gap-4 rounded-xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
  >
    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors"
      :class="iconBgClass"
    >
      <component :is="iconComponent" class="h-6 w-6" :class="iconColorClass" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h3 class="font-semibold leading-tight group-hover:text-primary transition-colors">
          {{ category.name }}
        </h3>
        <span
          v-if="category.is_admin_only"
          class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
        >
          Staff
        </span>
      </div>
      <p
        v-if="category.description"
        class="text-sm text-muted-foreground leading-snug mb-2 line-clamp-2"
      >
        {{ category.description }}
      </p>
      <p class="text-xs text-muted-foreground">
        {{ category.topics_count }}
        {{ category.topics_count === 1 ? 'sujet' : 'sujets' }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  Bug,
  CircleHelp,
  HelpCircle,
  Lightbulb,
  Megaphone,
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

// Mapping color string → classes Tailwind (statique, ne pas concaténer dynamiquement)
const COLOR_BG: Record<string, string> = {
  blue: 'bg-blue-100 dark:bg-blue-950/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/60',
  amber: 'bg-amber-100 dark:bg-amber-950/40 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/60',
  green: 'bg-green-100 dark:bg-green-950/40 group-hover:bg-green-200 dark:group-hover:bg-green-900/60',
  red: 'bg-red-100 dark:bg-red-950/40 group-hover:bg-red-200 dark:group-hover:bg-red-900/60',
  slate: 'bg-slate-100 dark:bg-slate-900/40 group-hover:bg-slate-200 dark:group-hover:bg-slate-800/60',
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
