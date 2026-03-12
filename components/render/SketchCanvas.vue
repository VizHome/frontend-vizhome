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

      <div class="h-6 w-px bg-border" />

      <!-- Rendu IA -->
      <Button
        variant="default"
        size="icon"
        class="h-8 w-8"
        title="Rendu IA depuis le croquis"
        :disabled="isSketchLoading"
        @click="openAiPanel"
      >
        <Loader2 v-if="isSketchLoading" class="h-4 w-4 animate-spin" />
        <Sparkles v-else class="h-4 w-4" />
      </Button>
    </div>

    <!-- Overlay panel IA -->
    <Transition name="fade">
      <div
        v-if="showAiPanel"
        class="absolute inset-0 bg-black/40 backdrop-blur-sm z-20 flex items-center justify-center p-4"
        @click.self="closeAiPanel"
      >
        <div
          class="w-full max-w-2xl rounded-2xl border bg-background shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <div class="flex items-center gap-2">
              <Sparkles class="h-5 w-5 text-primary" />
              <h2 class="text-base font-semibold">
                Rendu IA depuis le croquis
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              @click="closeAiPanel"
            >
              <X class="h-4 w-4" />
            </Button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <!-- Input style hint -->
            <div class="flex gap-2">
              <input
                v-model="styleHint"
                type="text"
                placeholder="Style (ex: photoréaliste, aquarelle, crayonné…)"
                class="flex-1 h-9 rounded-lg border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                variant="default"
                :disabled="isSketchLoading"
                @click="launchSketchRender"
              >
                <Loader2
                  v-if="isSketchLoading"
                  class="h-4 w-4 mr-2 animate-spin"
                />
                <Sparkles v-else class="h-4 w-4 mr-2" />
                Générer le rendu
              </Button>
            </div>

            <!-- Erreur -->
            <div
              v-if="sketchError"
              class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle class="h-4 w-4 shrink-0" />
              {{ sketchError }}
            </div>

            <!-- Résultat avant / après -->
            <div class="grid grid-cols-2 gap-4">
              <!-- Croquis (avant) -->
              <div class="flex flex-col gap-2">
                <span
                  class="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >Croquis</span
                >
                <div
                  class="aspect-video rounded-lg border bg-muted overflow-hidden"
                >
                  <img
                    v-if="sketchPreview"
                    :src="sketchPreview"
                    alt="Croquis"
                    class="w-full h-full object-contain"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-xs text-muted-foreground"
                  >
                    Aucun aperçu
                  </div>
                </div>
              </div>

              <!-- Rendu IA (après) -->
              <div class="flex flex-col gap-2">
                <span
                  class="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                  >Rendu IA</span
                >
                <div
                  class="aspect-video rounded-lg border bg-muted overflow-hidden"
                >
                  <img
                    v-if="sketchResult"
                    :src="sketchResult"
                    alt="Rendu IA"
                    class="w-full h-full object-contain"
                  />
                  <div
                    v-else
                    class="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg"
                  >
                    <Sparkles class="h-6 w-6 text-muted-foreground/50" />
                    <span class="text-xs text-muted-foreground"
                      >Le rendu apparaîtra ici</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-2 px-6 py-4 border-t">
            <Button variant="ghost" @click="closeAiPanel">Fermer</Button>
            <Button
              v-if="sketchResult"
              variant="default"
              @click="downloadSketchResult"
            >
              <Download class="h-4 w-4 mr-2" />
              Télécharger le rendu
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
  AlertCircle,
  Download,
  Eraser,
  Loader2,
  Minus,
  Pencil,
  Plus,
  Redo2,
  Sparkles,
  Trash2,
  Undo2,
  X,
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
  getCanvasDataURL,
} = useSketchCanvas()

const {
  sketchResult,
  isSketchLoading,
  sketchError,
  generateFromSketch,
  clearSketchResult,
} = useAiRender()

// ─── État local panel IA ────────────────────────────────────────────────────
const showAiPanel = ref(false)
const styleHint = ref('')
const sketchPreview = ref<string | null>(null)

const openAiPanel = () => {
  sketchPreview.value = getCanvasDataURL()
  clearSketchResult()
  showAiPanel.value = true
}

const closeAiPanel = () => {
  showAiPanel.value = false
}

const launchSketchRender = async () => {
  const dataUrl = getCanvasDataURL()
  if (!dataUrl) return
  sketchPreview.value = dataUrl
  await generateFromSketch(dataUrl, styleHint.value || undefined)
}

const downloadSketchResult = () => {
  if (!sketchResult.value) return
  const link = document.createElement('a')
  link.download = 'rendu-ia.png'
  link.href = sketchResult.value
  link.click()
}

onMounted(() => {
  if (canvasRef.value) initCanvas(canvasRef.value)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

// ─── Raccourcis clavier ────────────────────────────────────────────────────────
function handleKeydown(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
    e.preventDefault()
    undo()
  }
  if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
    e.preventDefault()
    redo()
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
