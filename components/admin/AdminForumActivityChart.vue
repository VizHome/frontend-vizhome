<!--
  AdminForumActivityChart — bar chart (stacked) topics + replies par jour.
-->
<template>
  <ChartContainer
    :config="config"
    class="h-[260px] w-full"
  >
    <VisXYContainer
      :data="data"
      :margin="{ top: 10, right: 16, bottom: 24, left: 32 }"
      :height="260"
    >
      <VisStackedBar
        :x="(d, i) => i"
        :y="[(d: any) => d.topics, (d: any) => d.replies]"
        :color="['hsl(var(--primary))', 'hsl(var(--muted-foreground))']"
        :bar-padding="0.25"
      />
      <VisAxis
        type="x"
        :tick-format="formatXTick"
        :grid-line="false"
        :num-ticks="6"
        label-fonts-size="11"
      />
      <VisAxis
        type="y"
        :tick-format="(v: number) => Math.round(v).toString()"
        :grid-line="true"
        :num-ticks="4"
        label-fonts-size="11"
      />
    </VisXYContainer>

    <!-- Légende custom -->
    <div class="mt-3 flex items-center justify-center gap-4 text-xs">
      <div class="flex items-center gap-1.5">
        <span class="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
        <span class="text-muted-foreground">Topics</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="inline-block h-2.5 w-2.5 rounded-sm bg-muted-foreground" />
        <span class="text-muted-foreground">Réponses</span>
      </div>
    </div>
  </ChartContainer>
</template>

<script setup lang="ts">
import { VisAxis, VisStackedBar, VisXYContainer } from '@unovis/vue'

import type { ForumActivityPerDay } from '~/composables/useAdminTimeline'

const props = defineProps<{
  data: ForumActivityPerDay[]
}>()

const config = {
  topics: { label: 'Topics', color: 'hsl(var(--primary))' },
  replies: { label: 'Réponses', color: 'hsl(var(--muted-foreground))' },
}

function formatXTick(i: number): string {
  const point = props.data[Math.round(i)]
  if (!point) return ''
  return new Date(point.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}
</script>
