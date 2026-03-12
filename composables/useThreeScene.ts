/**
 * useThreeScene — Gestion du cœur de la scène Three.js
 * (renderer, caméra, contrôles, boucle d'animation, redimensionnement)
 *
 * Ce composable est un singleton de module : plusieurs appels retournent
 * les mêmes refs réactives, ce qui permet à RenderSidebar d'y accéder
 * sans prop drilling ni provide/inject.
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { nextTick, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

// ─── État singleton de module ────────────────────────────────────────────────
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let clock: THREE.Clock
let animationId: number

const sidebarCollapsed = ref(false)
const fps = ref(0)
const triangleCount = ref(0)
const animationSpeedArray = ref([1])

// ─── Accesseurs (getters) ────────────────────────────────────────────────────
export const getScene = () => scene
export const getCamera = () => camera
export const getRenderer = () => renderer
export const getControls = () => controls
export const getClock = () => clock

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeScene(canvasRef?: Ref<HTMLCanvasElement | undefined>) {
  const initThreeJS = () => {
    if (!canvasRef?.value) return

    scene = new THREE.Scene()

    // Dégradé de fond par défaut (blanc → gris)
    const bgCanvas = document.createElement('canvas')
    const ctx = bgCanvas.getContext('2d')!
    bgCanvas.width = 512
    bgCanvas.height = 512
    const gradient = ctx.createLinearGradient(0, 0, 0, bgCanvas.height)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(1, '#808080')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, bgCanvas.width, bgCanvas.height)
    scene.background = new THREE.CanvasTexture(bgCanvas)

    const container = canvasRef.value.parentElement
    const width = container?.clientWidth || window.innerWidth
    const height = container?.clientHeight || window.innerHeight

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(10, 8, 10)

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      preserveDrawingBuffer: true,
    })
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1

    clock = new THREE.Clock()
  }

  const handleResize = () => {
    if (!canvasRef?.value || !camera || !renderer) return
    const container = canvasRef.value.parentElement
    if (!container) return
    const rect = container.getBoundingClientRect()
    const width = Math.max(rect.width, 100)
    const height = Math.max(rect.height, 100)
    if (width > 0 && height > 0) {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      renderer.render(scene, camera)
    }
  }

  const toggleSidebarCollapse = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    nextTick(() => setTimeout(handleResize, 350))
  }

  watch(sidebarCollapsed, () => nextTick(handleResize))

  const setupResizeHandler = () => {
    if (typeof ResizeObserver !== 'undefined' && canvasRef?.value) {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === canvasRef.value?.parentElement) handleResize()
        }
      })
      if (canvasRef.value.parentElement)
        observer.observe(canvasRef.value.parentElement)
      onUnmounted(() => observer.disconnect())
    } else {
      window.addEventListener('resize', handleResize)
      onUnmounted(() => window.removeEventListener('resize', handleResize))
    }
  }

  const setupPerformanceMonitor = () => {
    let frameCount = 0
    let lastTime = performance.now()
    const update = () => {
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        fps.value = Math.round((frameCount * 1000) / (now - lastTime))
        frameCount = 0
        lastTime = now
        if (scene) {
          let triangles = 0
          scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
              triangles += child.geometry.attributes.position.count / 3
            }
          })
          triangleCount.value = Math.round(triangles)
        }
      }
      requestAnimationFrame(update)
    }
    update()
  }

  /** Lance la boucle d'animation. onFrame reçoit (deltaTime, elapsedTime). */
  const animate = (onFrame: (delta: number, elapsed: number) => void) => {
    if (animationId) cancelAnimationFrame(animationId) // guard anti-double-boucle (HMR)
    const loop = () => {
      animationId = requestAnimationFrame(loop)
      if (!scene || !camera || !renderer) return
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()
      if (controls?.enabled) controls.update()
      onFrame(delta, elapsed)
      renderer.render(scene, camera)
    }
    loop()
  }

  /** Suspend la boucle d'animation (économie CPU/GPU hors mode 3D). */
  const pauseAnimation = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = 0
    }
  }

  /** Reprend la boucle après une pause — nécessite de rappeler animate(). */
  const resumeAnimation = (
    onFrame: (delta: number, elapsed: number) => void
  ) => {
    if (!animationId) animate(onFrame)
  }

  const resetCamera = () => {
    if (camera && controls) {
      camera.position.set(10, 8, 10)
      controls.reset()
    }
  }

  const toggleFullscreen = () => {
    const el = renderer?.domElement ?? canvasRef?.value
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const captureScreenshot = () => {
    const link = document.createElement('a')
    link.download = 'house-render.png'
    link.href = renderer.domElement.toDataURL()
    link.click()
  }

  onUnmounted(() => {
    if (!canvasRef) return // seul le propriétaire (avec canvasRef) dispose
    if (animationId) cancelAnimationFrame(animationId)
    if (renderer) renderer.dispose()
  })

  return {
    // Accesseurs Three.js
    getScene,
    getCamera,
    getRenderer,
    getControls,
    getClock,
    // État réactif
    sidebarCollapsed,
    fps,
    triangleCount,
    animationSpeedArray,
    // Fonctions
    initThreeJS,
    animate,
    pauseAnimation,
    resumeAnimation,
    handleResize,
    setupResizeHandler,
    setupPerformanceMonitor,
    resetCamera,
    toggleFullscreen,
    captureScreenshot,
    toggleSidebarCollapse,
  }
}
