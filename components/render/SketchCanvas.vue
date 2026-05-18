<template>
  <div class="absolute inset-0 bg-white overflow-hidden">
    <!-- Canvas principal -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full touch-none"
      :style="{ cursor: cursorStyle }"
      @pointerdown="startDraw"
      @pointermove="onPointerMove"
      @pointerup="stopDraw"
      @pointerleave="onPointerLeave"
    />

    <!-- Canvas overlay (preview formes) -->
    <canvas
      ref="overlayRef"
      class="absolute inset-0 w-full h-full touch-none pointer-events-none"
    />

    <!-- Empty state canvas vide -->
    <Transition name="fade">
      <div
        v-if="isEmpty"
        class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-5"
      >
        <Pencil class="h-10 w-10 text-muted-foreground/20 mb-3" />
        <p class="text-sm font-medium text-muted-foreground/40">
          Commencez à dessiner
        </p>
        <p class="text-xs text-muted-foreground/30 mt-1">
          Appuyez sur
          <kbd
            class="px-1 py-0.5 rounded border border-muted-foreground/20 font-mono"
            >?</kbd
          >
          pour les raccourcis
        </p>
      </div>
    </Transition>

    <!-- Tooltip pipette (couleur sous le curseur) -->
    <Transition name="fade-quick">
      <div
        v-if="currentTool === 'eyedropper' && cursorVisible"
        class="pointer-events-none fixed z-50 flex items-center gap-2 rounded-lg border bg-background/95 backdrop-blur-sm shadow-lg px-2.5 py-1.5 text-xs font-mono"
        :style="{ left: `${cursorX + 20}px`, top: `${cursorY - 44}px` }"
      >
        <span
          class="h-4 w-4 rounded-full border border-border shrink-0"
          :style="{ background: eyedropperColor }"
        />
        {{ eyedropperColor }}
      </div>
    </Transition>

    <!-- Toolbar flottante bas-centre -->
    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-2xl border bg-background/90 backdrop-blur-sm shadow-lg px-3 py-2 z-10 flex-wrap max-w-[96vw]"
    >
      <!-- Couleur -->
      <div class="relative flex items-center">
        <label
          class="h-8 w-8 cursor-pointer rounded-full border-2 border-border shadow-sm block shrink-0"
          :style="{ background: brushColor }"
          title="Couleur du crayon"
        >
          <input v-model="brushColor" type="color" class="sr-only" />
        </label>
        <!-- Indicateur eyedropper color -->
        <span
          v-if="currentTool === 'eyedropper'"
          class="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-background shadow"
          :style="{ background: eyedropperColor }"
        />
      </div>

      <div class="h-6 w-px bg-border" />

      <!-- Taille du brush -->
      <div class="flex flex-col items-center gap-0.5" title="Taille du trait">
        <span class="text-[9px] text-muted-foreground leading-none"
          >Taille</span
        >
        <div class="flex items-center gap-1">
          <Minus class="h-2.5 w-2.5 text-muted-foreground shrink-0" />
          <input
            v-model.number="brushSize"
            type="range"
            min="2"
            max="40"
            class="w-20 h-1 accent-primary cursor-pointer"
          />
          <Plus class="h-2.5 w-2.5 text-muted-foreground shrink-0" />
        </div>
      </div>

      <div class="h-6 w-px bg-border" />

      <!-- Opacité -->
      <div class="flex flex-col items-center gap-0.5" title="Opacité du trait">
        <span class="text-[9px] text-muted-foreground leading-none"
          >Opacité</span
        >
        <div class="flex items-center gap-1">
          <Blend class="h-2.5 w-2.5 text-muted-foreground shrink-0" />
          <input
            v-model.number="brushOpacity"
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            class="w-16 h-1 accent-primary cursor-pointer"
          />
        </div>
      </div>

      <div class="h-6 w-px bg-border" />

      <!-- Outils de tracé libre -->
      <ToolButton label="Crayon" shortcut="P">
        <Button
          :variant="currentTool === 'pencil' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'pencil'"
        >
          <Pencil class="h-4 w-4" />
        </Button>
      </ToolButton>
      <ToolButton label="Gomme" shortcut="E">
        <Button
          :variant="currentTool === 'eraser' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'eraser'"
        >
          <Eraser class="h-4 w-4" />
        </Button>
      </ToolButton>

      <div class="h-6 w-px bg-border" />

      <!-- Outils de formes -->
      <ToolButton label="Ligne" shortcut="L">
        <Button
          :variant="currentTool === 'line' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'line'"
        >
          <Minus class="h-4 w-4 rotate-[-45deg]" />
        </Button>
      </ToolButton>
      <ToolButton label="Rectangle" shortcut="R">
        <Button
          :variant="currentTool === 'rect' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'rect'"
        >
          <Square class="h-4 w-4" />
        </Button>
      </ToolButton>
      <ToolButton label="Cercle" shortcut="C">
        <Button
          :variant="currentTool === 'circle' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'circle'"
        >
          <Circle class="h-4 w-4" />
        </Button>
      </ToolButton>

      <!-- Toggle remplissage (visible pour rect/circle) -->
      <Transition name="fade-quick">
        <button
          v-if="currentTool === 'rect' || currentTool === 'circle'"
          class="relative h-8 w-8 flex items-center justify-center rounded-md transition-colors"
          :class="
            fillShape
              ? 'bg-primary/15 text-primary'
              : 'text-muted-foreground hover:bg-accent'
          "
          title="Formes remplies"
          @click="fillShape = !fillShape"
        >
          <PaintBucket class="h-4 w-4" />
        </button>
      </Transition>

      <div class="h-6 w-px bg-border" />

      <!-- Remplissage & pipette -->
      <ToolButton label="Remplissage" shortcut="F">
        <Button
          :variant="currentTool === 'fill' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'fill'"
        >
          <Droplets class="h-4 w-4" />
        </Button>
      </ToolButton>
      <ToolButton label="Pipette" shortcut="I">
        <Button
          :variant="currentTool === 'eyedropper' ? 'default' : 'ghost'"
          size="icon"
          class="h-8 w-8"
          @click="currentTool = 'eyedropper'"
        >
          <Pipette class="h-4 w-4" />
        </Button>
      </ToolButton>

      <div class="h-6 w-px bg-border" />

      <!-- Undo / Redo -->
      <ToolButton label="Annuler" shortcut="Ctrl+Z">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          :disabled="!canUndo"
          @click="undo"
        >
          <Undo2 class="h-4 w-4" />
        </Button>
      </ToolButton>
      <ToolButton label="Rétablir" shortcut="Ctrl+Y">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          :disabled="!canRedo"
          @click="redo"
        >
          <Redo2 class="h-4 w-4" />
        </Button>
      </ToolButton>

      <div class="h-6 w-px bg-border" />

      <!-- Clear -->
      <ToolButton label="Tout effacer">
        <Button variant="ghost" size="icon" class="h-8 w-8" @click="clear">
          <Trash2 class="h-4 w-4" />
        </Button>
      </ToolButton>

      <!-- Export PNG -->
      <ToolButton label="Exporter PNG">
        <Button variant="ghost" size="icon" class="h-8 w-8" @click="exportPNG">
          <Download class="h-4 w-4" />
        </Button>
      </ToolButton>

      <div class="h-6 w-px bg-border" />

      <!-- Rendu IA -->
      <ToolButton label="Rendu IA">
        <Button
          variant="default"
          size="icon"
          class="h-8 w-8"
          :disabled="isSketchLoading"
          @click="openAiPanel"
        >
          <Loader2 v-if="isSketchLoading" class="h-4 w-4 animate-spin" />
          <Sparkles v-else class="h-4 w-4" />
        </Button>
      </ToolButton>

      <div class="h-6 w-px bg-border" />

      <!-- Aide raccourcis -->
      <ToolButton label="Raccourcis" shortcut="?">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          @click="showShortcuts = !showShortcuts"
        >
          <HelpCircle class="h-4 w-4" />
        </Button>
      </ToolButton>
    </div>

    <!-- Modal raccourcis clavier -->
    <Transition name="fade">
      <div
        v-if="showShortcuts"
        class="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-center p-4"
        @click.self="showShortcuts = false"
      >
        <div
          class="w-full max-w-sm rounded-2xl border bg-background shadow-xl flex flex-col overflow-hidden"
        >
          <div class="flex items-center justify-between px-5 py-4 border-b">
            <div class="flex items-center gap-2">
              <HelpCircle class="h-5 w-5 text-primary" />
              <h2 class="text-base font-semibold">Raccourcis clavier</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8"
              @click="showShortcuts = false"
            >
              <X class="h-4 w-4" />
            </Button>
          </div>
          <div class="p-5 flex flex-col gap-2">
            <div
              v-for="sc in SHORTCUTS"
              :key="sc.key"
              class="flex items-center justify-between"
            >
              <span class="text-sm text-muted-foreground">{{ sc.label }}</span>
              <kbd
                class="text-[11px] font-mono bg-muted text-foreground px-2 py-0.5 rounded border leading-none"
                >{{ sc.key }}</kbd
              >
            </div>
          </div>
        </div>
      </div>
    </Transition>

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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  AlertCircle,
  Blend,
  Circle,
  Download,
  Droplets,
  Eraser,
  HelpCircle,
  Loader2,
  Minus,
  PaintBucket,
  Pencil,
  Pipette,
  Plus,
  Redo2,
  Sparkles,
  Square,
  Trash2,
  Undo2,
  X,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const canvasRef = ref<HTMLCanvasElement>()
const overlayRef = ref<HTMLCanvasElement>()

const {
  currentTool,
  brushSize,
  brushColor,
  brushOpacity,
  fillShape,
  canUndo,
  canRedo,
  eyedropperColor,
  isEmpty,
  initCanvas,
  startDraw,
  draw,
  stopDraw,
  undo,
  redo,
  clear,
  exportPNG,
  getCanvasDataURL,
  sampleColorAt,
} = useSketchCanvas()

const {
  sketchResult,
  isSketchLoading,
  sketchError,
  generateFromSketch,
  clearSketchResult,
} = useAiRender()

// ─── Curseur dynamique ────────────────────────────────────────────────────────
const cursorStyle = computed(() => {
  switch (currentTool.value) {
    case 'eraser':
      return 'cell'
    case 'eyedropper':
      return 'crosshair'
    case 'fill':
      return 'copy'
    default:
      return 'crosshair'
  }
})

// ─── Tooltip pipette ──────────────────────────────────────────────────────────
const cursorX = ref(0)
const cursorY = ref(0)
const cursorVisible = ref(false)

const onPointerMove = (e: PointerEvent) => {
  draw(e)
  if (currentTool.value === 'eyedropper') {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
    cursorVisible.value = true
    sampleColorAt(e)
  }
}

const onPointerLeave = (e: PointerEvent) => {
  stopDraw(e)
  cursorVisible.value = false
}

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
  if (canvasRef.value) initCanvas(canvasRef.value, overlayRef.value)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

// ─── Raccourcis clavier ────────────────────────────────────────────────────────
const showShortcuts = ref(false)

const SHORTCUTS = [
  { key: 'P', label: 'Crayon' },
  { key: 'E', label: 'Gomme' },
  { key: 'L', label: 'Ligne' },
  { key: 'R', label: 'Rectangle' },
  { key: 'C', label: 'Cercle / Ellipse' },
  { key: 'F', label: 'Remplissage' },
  { key: 'I', label: 'Pipette' },
  { key: 'Ctrl+Z', label: 'Annuler' },
  { key: 'Ctrl+Y', label: 'Rétablir' },
  { key: '?', label: 'Aide raccourcis' },
]

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
  // Raccourcis outils
  if (!e.ctrlKey && !e.altKey) {
    if (e.key === 'p') currentTool.value = 'pencil'
    if (e.key === 'e') currentTool.value = 'eraser'
    if (e.key === 'l') currentTool.value = 'line'
    if (e.key === 'r') currentTool.value = 'rect'
    if (e.key === 'c') currentTool.value = 'circle'
    if (e.key === 'f') currentTool.value = 'fill'
    if (e.key === 'i') currentTool.value = 'eyedropper'
    if (e.key === '?') showShortcuts.value = !showShortcuts.value
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

.fade-quick-enter-active,
.fade-quick-leave-active {
  transition: opacity 0.15s ease;
}
.fade-quick-enter-from,
.fade-quick-leave-to {
  opacity: 0;
}
</style>
