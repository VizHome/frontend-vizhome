<template>
  <!--
    `fixed` (et non `absolute`) : la barre est ancrée au viewport. Avec
    `absolute`, elle se positionnait à 50% du container ; si la page débordait
    horizontalement (canvas trop large, etc.), la barre partait hors écran à
    droite. `w-max` + `flex-nowrap` garantissent qu'elle ne s'empile jamais
    verticalement même dans un contexte compressé.
  -->
  <div
    class="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-nowrap items-center gap-1 w-max rounded-full border bg-background/80 backdrop-blur-sm shadow-lg px-2 py-1.5"
  >
    <!-- Logo -->
    <NuxtLink
      to="/"
      class="px-3 opacity-80 hover:opacity-100 transition-opacity"
    >
      <AppLogo />
    </NuxtLink>

    <div class="h-5 w-px bg-border/50 mx-1" />

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
