<template>
  <div
    class="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full border bg-background/80 backdrop-blur-sm shadow-lg px-2 py-1.5"
  >
    <Button
      v-for="mode in modes"
      :key="mode.id"
      :variant="currentMode === mode.id ? 'default' : 'ghost'"
      size="sm"
      class="rounded-full gap-2 px-4"
      @click="setMode(mode.id)"
    >
      <component :is="mode.icon" class="h-4 w-4" />
      <span class="text-sm font-medium">{{ mode.label }}</span>
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { Box, Pencil, Sparkles } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { currentMode, setMode } = useRenderMode()

const modes = [
  { id: 'sketch' as const, label: 'Croquis 2D', icon: Pencil },
  { id: 'prompt' as const, label: 'Prompt IA', icon: Sparkles },
  { id: '3d' as const, label: '3D Pro', icon: Box },
]
</script>
