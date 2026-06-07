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
const { currentMode, setMode } = useRenderMode()

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

  const projectIdRaw = route.query.project

  // Ouvrir un projet force le mode 3D — sinon le canvas est `v-show=false`
  // (caché par CSS), Three.js initialise un canvas 0×0, et _processLoadedModel
  // calcule une bounding box vide → modèles invisibles ou erreur silencieuse.
  if (projectIdRaw) {
    setMode('3d')
  }

  if (currentMode.value === '3d') initThree()

  // Charge le projet si ?project=N dans l'URL
  if (projectIdRaw) {
    const projectId = Number(Array.isArray(projectIdRaw) ? projectIdRaw[0] : projectIdRaw)
    if (Number.isFinite(projectId)) {
      try {
        await openProject(projectId)
        // Attend un frame de DOM + Three.js init complet
        if (!threeInitialized) initThree()
        // Deux rAF pour que le canvas v-show=true ait pris ses vraies dimensions
        await new Promise<void>(r => requestAnimationFrame(() => r()))
        await new Promise<void>(r => requestAnimationFrame(() => r()))
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
    logger.warn('[render] useThreeModels.loadFromUrl indisponible')
    return
  }

  const total = project.importedModels.length
  if (total === 0) {
    logger.info('[render] Projet sans modèle 3D')
    return
  }

  logger.info(`[render] Chargement de ${total} modèle(s) depuis MinIO…`)
  let loaded = 0
  let failed = 0
  const errors: string[] = []

  for (const m of project.importedModels) {
    if (!m.fileUrl) {
      logger.warn(`[render] Modèle "${m.name}" sans fileUrl — skip`)
      failed += 1
      errors.push(`${m.name}: pas d'URL`)
      continue
    }
    try {
      logger.info(`[render] → ${m.name} (${m.fileUrl})`)
      await loadFromUrl(m.fileUrl, m.name, m.mtlFileUrl || undefined, {
        position: m.position,
        rotation: m.rotation,
        scale: m.scale,
        backendId: m.id,
      })
      loaded += 1
    } catch (e) {
      failed += 1
      const msg = e instanceof Error ? e.message : String(e)
      errors.push(`${m.name}: ${msg}`)
      logger.error(`[render] Échec chargement modèle "${m.name}"`, e)
    }
  }

  if (failed > 0) {
    toast.error(`${failed}/${total} modèle(s) n'ont pas pu être chargés. Voir console.`)
  } else if (loaded > 0) {
    logger.info(`[render] ✓ ${loaded} modèle(s) chargés.`)
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
