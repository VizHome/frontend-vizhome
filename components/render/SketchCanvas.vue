<template>
  <div class="absolute inset-0 bg-white overflow-hidden">
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full touch-none"
      :style="{ cursor: currentTool === 'eraser' ? 'cell' : 'crosshair' }"
      @pointerdown="startDraw"
      @pointermove="draw"
      @pointerup="stopDraw"
      @pointerleave="stopDraw"
    />

    <!-- Toolbar flottante bas-centre -->
    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl border bg-background/90 backdrop-blur-sm shadow-lg px-4 py-2 z-10"
    >
      <!-- Couleur -->
      <input
        v-model="brushColor"
        type="color"
        class="h-8 w-8 cursor-pointer rounded-full border-2 border-border p-0.5 bg-transparent"
        title="Couleur du crayon"
      />

      <div class="h-6 w-px bg-border" />

      <!-- Taille du brush -->
      <div class="flex items-center gap-2 w-28">
        <Minus class="h-3 w-3 text-muted-foreground shrink-0" />
        <input
          v-model.number="brushSize"
          type="range"
          min="2"
          max="40"
          class="flex-1 h-1 accent-primary cursor-pointer"
          title="Taille du trait"
        />
        <Plus class="h-3 w-3 text-muted-foreground shrink-0" />
      </div>

      <div class="h-6 w-px bg-border" />

      <!-- Outil -->
      <Button
        :variant="currentTool === 'pencil' ? 'default' : 'ghost'"
        size="icon"
        class="h-8 w-8"
        title="Crayon"
        @click="currentTool = 'pencil'"
      >
        <Pencil class="h-4 w-4" />
      </Button>
      <Button
        :variant="currentTool === 'eraser' ? 'default' : 'ghost'"
        size="icon"
        class="h-8 w-8"
        title="Gomme"
        @click="currentTool = 'eraser'"
      >
        <Eraser class="h-4 w-4" />
      </Button>

      <div class="h-6 w-px bg-border" />

      <!-- Undo / Redo -->
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        :disabled="!canUndo"
        title="Annuler (Ctrl+Z)"
        @click="undo"
      >
        <Undo2 class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        :disabled="!canRedo"
        title="Rétablir (Ctrl+Y)"
        @click="redo"
      >
        <Redo2 class="h-4 w-4" />
      </Button>

      <div class="h-6 w-px bg-border" />

      <!-- Clear -->
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        title="Tout effacer"
        @click="clear"
      >
        <Trash2 class="h-4 w-4" />
      </Button>

      <!-- Export PNG -->
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        title="Exporter en PNG"
        @click="exportPNG"
      >
        <Download class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  Download,
  Eraser,
  Minus,
  Pencil,
  Plus,
  Redo2,
  Trash2,
  Undo2,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const canvasRef = ref<HTMLCanvasElement>()

const {
  currentTool,
  brushSize,
  brushColor,
  canUndo,
  canRedo,
  initCanvas,
  startDraw,
  draw,
  stopDraw,
  undo,
  redo,
  clear,
  exportPNG,
} = useSketchCanvas()

onMounted(() => {
  if (canvasRef.value) initCanvas(canvasRef.value)
})
</script>
