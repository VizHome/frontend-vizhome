<template>
  <div class="render-container">
    <canvas ref="canvasRef" class="render-canvas" />
    <RenderSidebar
      :fps="fps"
      :triangle-count="triangleCount"
      @reset-camera="resetCamera"
      @toggle-fullscreen="toggleFullscreen"
      @capture-screenshot="captureScreenshot"
      @sidebar-toggled="onSidebarToggled"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'

definePageMeta({
  layout: 'none',
})

// ─── Composables (singletons) ────────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement>()

const {
  fps,
  triangleCount,
  animationSpeedArray,
  initThreeJS,
  animate,
  setupResizeHandler,
  setupPerformanceMonitor,
  resetCamera,
  toggleFullscreen,
  captureScreenshot,
  handleResize,
} = useThreeScene(canvasRef)

const { initLighting } = useThreeLighting()
const { createHouse, updateFrame: houseFrame } = useThreeHouse()
const { createOptionalElements, updateFrame: elementsFrame } =
  useThreeElements()
const { initWeatherGroups, updateFrame: weatherFrame } = useThreeWeather()
const { initLoaders } = useThreeModels()
const { setupAudio } = useThreeAudio()

// ─── Initialisation ───────────────────────────────────────────────────────────
onMounted(() => {
  if (typeof window === 'undefined') return

  initThreeJS()
  initLighting()
  createHouse()
  createOptionalElements()
  initWeatherGroups()
  initLoaders()
  setupAudio()
  setupResizeHandler()
  setupPerformanceMonitor()

  animate((delta, elapsed) => {
    const speed = animationSpeedArray.value[0] ?? 1
    houseFrame(delta, speed)
    elementsFrame(delta, elapsed)
    weatherFrame(elapsed, speed)
  })
})

// ─── Événements sidebar ───────────────────────────────────────────────────────
const onSidebarToggled = () => {
  setTimeout(() => handleResize(), 350)
}
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
