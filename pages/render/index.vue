<template>
  <div class="render-container">
    <!-- Canvas Three.js — v-show pour ne jamais démissionner le renderer -->
    <canvas
      v-show="currentMode === '3d'"
      ref="canvasRef"
      class="render-canvas"
      tabindex="0"
    />

    <!-- Barre de mode toujours visible -->
    <RenderModeBar />

    <!-- Bulle utilisateur (toujours visible sur /render) -->
    <UserNav />

    <!-- Modes légers montés/démontés à la demande -->
    <SketchCanvas v-if="currentMode === 'sketch'" />
    <PromptPanel v-if="currentMode === 'prompt'" />

    <!-- Overlays et contrôles 3D -->
    <template v-if="currentMode === '3d'">
      <RenderOverlays />
      <ThreeControls />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

definePageMeta({ layout: 'none' })

// ─── Mode actif ───────────────────────────────────────────────────────────────
const { currentMode } = useRenderMode()

// ─── Canvas & composables Three.js ───────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement>()
let threeInitialized = false

const {
  initThreeJS,
  animate,
  pauseAnimation,
  setupResizeHandler,
  setupPerformanceMonitor,
} = useThreeScene(canvasRef)

const { initLighting } = useThreeLighting()
const { initLoaders } = useThreeModels()
const { updateFrame: navFrame, setNavMode } = useThreeNavigation()

// ─── Callback d'animation stocké pour la reprise ──────────────────────────────
const onFrame = (delta: number) => navFrame(delta)

// ─── Initialisation lazy (seulement au premier passage en mode 3D) ────────────
const initThree = () => {
  if (threeInitialized) return
  threeInitialized = true
  initThreeJS()
  initLighting()
  initLoaders()
  setupResizeHandler()
  setupPerformanceMonitor()
  animate(onFrame)
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (currentMode.value === '3d') initThree()
})

watch(currentMode, (mode, prev) => {
  if (mode === '3d') {
    initThree() // no-op si déjà initialisé
    animate(onFrame) // reprend la boucle si elle était en pause
  } else if (prev === '3d') {
    setNavMode('orbit') // nettoie first-person / top-down / tour
    pauseAnimation() // suspend la boucle quand on quitte le mode 3D
  }
})
</script>

<style scoped>
.render-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.render-canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  max-width: none;
  max-height: none;
}
</style>
