<!--
  ForumTimelineEvent — petite ligne d'événement inline dans la timeline d'un topic
  (style GitHub : icône ronde + texte court).
-->
<template>
  <li class="relative flex items-center gap-3 py-1">
    <span
      class="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border bg-background"
      :class="tone === 'amber'
        ? 'text-amber-500'
        : tone === 'green'
          ? 'text-green-600 dark:text-green-400'
          : 'text-muted-foreground'"
    >
      <component :is="icon" class="size-4" />
    </span>
    <p class="text-xs text-muted-foreground">
      <slot />
    </p>
  </li>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  tone?: 'amber' | 'green' | 'neutral'
}>()
</script>
