/**
 * useSceneSerializer — Marshalling de l'état Three.js entre les composables
 * useThree* et le JSONField scene.data du backend.
 *
 * Capture côté write :
 *  - position + target de la caméra OrbitControls
 *  - preset d'éclairage actif
 *  - mode de navigation
 *  - météo
 *  - liste des modèles importés (id backend + transform)
 *
 * Restore côté read :
 *  - applique chaque sous-état dans son composable d'origine
 */
import type { SceneState } from './useProjects'

export function useSceneSerializer() {
  const scene = useThreeScene()
  const lighting = useThreeLighting()
  const lightingPresets = useThreeLightingPresets()
  const weather = useThreeWeather()
  const navigation = useThreeNavigation()
  const models = useThreeModels()

  /**
   * Capture l'état courant de tous les composables Three.js dans un objet
   * sérialisable JSON.
   */
  function serialize(): SceneState {
    const camera = scene.getCamera?.()
    const controls = scene.getControls?.()

    const state: SceneState = {}

    if (camera && controls) {
      state.camera = {
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: [controls.target.x, controls.target.y, controls.target.z],
      }
    }

    if (lightingPresets.currentPreset?.value) {
      state.lighting = { preset: lightingPresets.currentPreset.value }
    }

    if (weather.currentWeather?.value) {
      state.weather = weather.currentWeather.value
    }

    if (navigation.currentNavMode?.value) {
      state.navigation = navigation.currentNavMode.value
    }

    // Référence les modèles 3D par leur transform locale.
    // Les fichiers eux-mêmes sont stockés en DB côté backend.
    if (models.importedModels?.value?.length) {
      state.models = models.importedModels.value.map(m => ({
        id: m.id,
        position: { ...m.position },
        rotation: { ...m.rotation },
        scale: { ...m.scale },
      }))
    }

    return state
  }

  /**
   * Applique un SceneState dans les composables Three.js.
   * Doit être appelé APRÈS que la scène Three.js soit initialisée
   * (initThreeJS, initLighting, etc.).
   */
  function restore(state: SceneState): void {
    const camera = scene.getCamera?.()
    const controls = scene.getControls?.()

    if (state.camera && camera && controls) {
      const [px, py, pz] = state.camera.position
      const [tx, ty, tz] = state.camera.target
      camera.position.set(px, py, pz)
      controls.target.set(tx, ty, tz)
      controls.update?.()
    }

    if (state.lighting?.preset && lightingPresets.applyPreset) {
      try {
        lightingPresets.applyPreset(state.lighting.preset)
      } catch {
        /* preset inconnu, ignoré */
      }
    }

    if (state.weather && weather.setWeather) {
      try {
        weather.setWeather(state.weather as never)
      } catch {
        /* météo inconnue, ignorée */
      }
    }

    if (state.navigation && navigation.setNavMode) {
      try {
        navigation.setNavMode(state.navigation)
      } catch {
        /* mode inconnu, ignoré */
      }
    }
    // Note : la restauration des modèles 3D se fait dans la page render via
    // useProjects.currentProject.importedModels (téléchargement depuis MinIO
    // puis appel à useThreeModels._loadFromFile pour chaque modèle).
  }

  return { serialize, restore }
}
