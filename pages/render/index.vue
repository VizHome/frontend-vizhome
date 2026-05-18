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

    <!-- Bandeau projet ouvert + bouton save -->
    <ProjectTopBar
      v-if="currentMode === '3d'"
      @save="openSaveDialog"
    />

    <!-- Modes légers montés/démontés à la demande -->
    <SketchCanvas v-if="currentMode === 'sketch'" />
    <PromptPanel v-if="currentMode === 'prompt'" />

    <!-- Overlays et contrôles 3D -->
    <template v-if="currentMode === '3d'">
      <RenderOverlays />
      <ThreeControls />
    </template>

    <!-- Onboarding première visite -->
    <OnboardingOverlay />

    <!-- Dialog save : crée ou met à jour le projet courant -->
    <SaveProjectDialog v-model:open="saveDialogOpen" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'none', middleware: 'auth' })

const route = useRoute()

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
const { initLoaders, initTransformControls } = useThreeModels()
const { updateFrame: navFrame, setNavMode } = useThreeNavigation()

// ─── Projects : chargement automatique si ?project=N dans l'URL ────────────
const { openProject, closeCurrentProject, currentProject } = useProjects()
const { restore: restoreScene, restoreModelTransforms } = useSceneSerializer()

// ─── Callback d'animation stocké pour la reprise ──────────────────────────────
const onFrame = (delta: number) => navFrame(delta)

// ─── Initialisation lazy ───────────────────────────────────────────────────
const initThree = () => {
  if (threeInitialized) return
  threeInitialized = true
  initThreeJS()
  initLighting()
  initLoaders()
  initTransformControls()
  setupResizeHandler()
  setupPerformanceMonitor()
  animate(onFrame)
}

onMounted(async () => {
  if (typeof window === 'undefined') return
  if (currentMode.value === '3d') initThree()

  // Charge le projet si ?project=N dans l'URL
  const projectIdRaw = route.query.project
  if (projectIdRaw) {
    const projectId = Number(Array.isArray(projectIdRaw) ? projectIdRaw[0] : projectIdRaw)
    if (Number.isFinite(projectId)) {
      try {
        await openProject(projectId)
        // Attend que Three.js soit prêt avant de restaurer
        if (!threeInitialized) initThree()
        // Restauration de l'état + chargement des modèles (asynchrone)
        await new Promise(r => setTimeout(r, 50)) // laisse Three init finir
        restoreScene(currentProject.value?.scene.data || {})
        await loadProjectModels()
        // Applique les transforms sauvegardés (peuvent différer du backend)
        restoreModelTransforms(currentProject.value?.scene.data || {})
        toast.success(`Projet « ${currentProject.value?.title} » chargé.`)
      } catch (e: unknown) {
        const err = e as { statusCode?: number; data?: { detail?: string } }
        if (err?.statusCode === 404) {
          toast.error('Projet introuvable.')
        } else {
          toast.error(err?.data?.detail || 'Impossible de charger le projet.')
        }
      }
    }
  }
})

onBeforeUnmount(() => {
  // Quand on quitte /render, on ferme le projet courant
  closeCurrentProject()
})

watch(currentMode, (mode, prev) => {
  if (mode === '3d') {
    initThree()
    animate(onFrame)
  } else if (prev === '3d') {
    setNavMode('orbit')
    pauseAnimation()
  }
})

// ─── Chargement des modèles depuis MinIO ────────────────────────────────────
async function loadProjectModels() {
  const project = currentProject.value
  if (!project) return
  const { loadFromUrl } = useThreeModels()
  if (!loadFromUrl) {
    // Pas dispo dans cette version d'useThreeModels — fallback silencieux
    return
  }
  for (const m of project.importedModels) {
    if (!m.fileUrl) continue
    try {
      await loadFromUrl(m.fileUrl, m.name, m.mtlFileUrl || undefined, {
        position: m.position,
        rotation: m.rotation,
        scale: m.scale,
        backendId: m.id,
      })
    } catch (e) {
      console.warn(`Échec chargement modèle ${m.name}`, e)
    }
  }
}

// ─── Save dialog ────────────────────────────────────────────────────────────
const saveDialogOpen = ref(false)

function openSaveDialog() {
  saveDialogOpen.value = true
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
