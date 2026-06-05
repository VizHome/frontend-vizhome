<!--
  AdminMetricCard — card de métrique réutilisable dans le dashboard admin.
  Affiche : icône colorée + label + valeur principale + (optionnel) delta/sublabel.
-->
<template>
  <div
    class="rounded-xl border bg-card p-4 transition-colors hover:border-primary/30"
  >
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0">
        <p class="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          {{ label }}
        </p>
        <p class="mt-1.5 text-2xl font-bold tracking-tight truncate">
          {{ value }}
        </p>
        <p
          v-if="sublabel"
          class="mt-1 text-xs"
          :class="
            tone === 'success'
              ? 'text-green-600 dark:text-green-400'
              : tone === 'warning'
                ? 'text-amber-600 dark:text-amber-400'
                : tone === 'danger'
                  ? 'text-destructive'
                  : 'text-muted-foreground'
          "
        >
          {{ sublabel }}
        </p>
      </div>
      <div
        v-if="icon"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        :class="iconBgClass"
      >
        <component :is="icon" class="h-4 w-4" :class="iconColorClass" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    sublabel?: string
    icon?: Component
    /** Couleur d'accent (icône + sublabel). Défaut : neutre. */
    tone?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger'
  }>(),
  {
    sublabel: undefined,
    icon: undefined,
    tone: 'neutral',
  },
)

const TONE_BG: Record<string, string> = {
  neutral: 'bg-muted',
  primary: 'bg-primary/10',
  success: 'bg-green-100 dark:bg-green-950/40',
  warning: 'bg-amber-100 dark:bg-amber-950/40',
  danger: 'bg-red-100 dark:bg-red-950/40',
}
const TONE_FG: Record<string, string> = {
  neutral: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-destructive',
}

const iconBgClass = computed(() => TONE_BG[props.tone] ?? TONE_BG.neutral)
const iconColorClass = computed(() => TONE_FG[props.tone] ?? TONE_FG.neutral)
</script>
