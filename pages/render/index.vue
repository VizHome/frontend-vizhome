<template>
  <div class="render-container">
    <!-- Canvas Three.js — v-show pour ne jamais démissionner le renderer -->
    <canvas
      v-show="currentMode === '3d'"
      ref="canvasRef"
      class="render-canvas"
    />
    <!-- Sidebar (contient RenderModeBar + SketchCanvas + PromptPanel) -->
    <RenderSidebar />
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

const { initThreeJS, animate, setupResizeHandler, setupPerformanceMonitor } =
  useThreeScene(canvasRef)

const { initLighting } = useThreeLighting()
const { initLoaders } = useThreeModels()
const { updateFrame: firstPersonFrame } = useThreeFirstPerson()

// ─── Initialisation lazy (seulement au premier passage en mode 3D) ────────────
const initThree = () => {
  if (threeInitialized) return
  threeInitialized = true
  initThreeJS()
  initLighting()
  initLoaders()
  setupResizeHandler()
  setupPerformanceMonitor()
  animate((delta: number) => {
    firstPersonFrame(delta)
  })
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (currentMode.value === '3d') initThree()
})

watch(currentMode, mode => {
  if (mode === '3d') initThree()
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
