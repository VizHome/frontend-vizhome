<!--
  AdminRendersByStatusChart — donut chart de la distribution des renders par status.
-->
<template>
  <ChartContainer
    :config="config"
    class="h-[260px] w-full"
  >
    <VisSingleContainer
      :data="data"
      :height="260"
    >
      <VisDonut
        :value="(d: StatusBreakdown) => d.count"
        :color="(d: StatusBreakdown) => STATUS_COLORS[d.status] ?? 'hsl(var(--muted-foreground))'"
        :arc-width="32"
        :pad-angle="0.02"
        :central-label="totalLabel"
        :central-sub-label="'Renders'"
      />
    </VisSingleContainer>

    <!-- Légende custom -->
    <div class="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
      <div
        v-for="d in data"
        :key="d.status"
        class="flex items-center gap-1.5"
      >
        <span
          class="inline-block h-2.5 w-2.5 rounded-sm"
          :style="{ backgroundColor: STATUS_COLORS[d.status] }"
        />
        <span class="capitalize text-muted-foreground">{{ d.status }}</span>
        <span class="font-semibold tabular-nums">{{ d.count }}</span>
      </div>
    </div>
  </ChartContainer>
</template>

<script setup lang="ts">
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { computed } from 'vue'

interface StatusBreakdown {
  status: string
  count: number
}

const props = defineProps<{
  breakdown: Record<string, number>
}>()

const STATUS_COLORS: Record<string, string> = {
  pending: '#F59E0B',       // amber-500
  processing: '#3B82F6',    // blue-500
  done: '#22C55E',          // green-500
  failed: '#EF4444',        // red-500
}

const data = computed<StatusBreakdown[]>(() =>
  Object.entries(props.breakdown).map(([status, count]) => ({ status, count }))
)

const totalLabel = computed(() =>
  String(data.value.reduce((sum, d) => sum + d.count, 0))
)

const config = {
  count: { label: 'Renders' },
}
</script>
