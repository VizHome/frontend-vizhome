<!--
  AdminUsersChart — line chart des nouvelles inscriptions par jour.
  Utilise @unovis/vue (lib derrière shadcn-vue Chart).
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
      <VisLine
        :x="(_d: UsersPerDay, i: number) => i"
        :y="(d: UsersPerDay) => d.count"
        color="hsl(var(--primary))"
        :line-width="2"
      />
      <VisArea
        :x="(_d: UsersPerDay, i: number) => i"
        :y="(d: UsersPerDay) => d.count"
        color="hsl(var(--primary))"
        :opacity="0.12"
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
      <VisTooltip :triggers="tooltipTriggers" />
    </VisXYContainer>
  </ChartContainer>
</template>

<script setup lang="ts">
import { VisArea, VisAxis, VisLine, VisTooltip, VisXYContainer } from '@unovis/vue'
import { Line, Area } from '@unovis/ts'
import { computed } from 'vue'

import type { UsersPerDay } from '~/composables/useAdminTimeline'

const props = defineProps<{
  data: UsersPerDay[]
}>()

const config = {
  count: { label: 'Nouveaux users', color: 'hsl(var(--primary))' },
}

function formatXTick(i: number): string {
  const point = props.data[Math.round(i)]
  if (!point) return ''
  return new Date(point.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
}

const tooltipTriggers = computed(() => ({
  [Line.selectors.line]: (d: UsersPerDay) =>
    `<div class="text-xs font-medium">${new Date(d.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</div>` +
    `<div class="text-sm font-semibold">${d.count} ${d.count > 1 ? 'inscriptions' : 'inscription'}</div>`,
  [Area.selectors.area]: (d: UsersPerDay) =>
    `<div class="text-xs font-medium">${new Date(d.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</div>` +
    `<div class="text-sm font-semibold">${d.count} ${d.count > 1 ? 'inscriptions' : 'inscription'}</div>`,
}))
</script>
