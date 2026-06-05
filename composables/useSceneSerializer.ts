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
   
  const _lighting = useThreeLighting()
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
    // Les modèles 3D sont chargés par la page /render via loadProjectModels().
    // Ensuite appeler restoreModelTransforms(state) pour appliquer les
    // positions/rotations/échelles sauvegardées (qui peuvent différer des
    // transforms initiales stockées côté backend ImportedModel).
  }

  /**
   * À appeler APRÈS loadProjectModels : applique les transforms sauvegardés
   * dans state.models en surchargeant ceux issus du backend ImportedModel.
   *
   * Match par backendId (string) ←→ entry.id (string).
   */
  function restoreModelTransforms(state: SceneState): void {
    const sceneModels =
      (state.models as unknown as Array<{
        id: number | string
        position: { x: number; y: number; z: number }
        rotation: { x: number; y: number; z: number }
        scale: { x: number; y: number; z: number }
      }>) || []

    for (const m of sceneModels) {
      const entry = models.importedModels.value.find(
        e => e.id === String(m.id)
      )
      if (!entry) continue

      entry.position = { ...m.position }
      entry.rotation = { ...m.rotation }
      entry.scale = { ...m.scale }
      entry.model.position.set(m.position.x, m.position.y, m.position.z)
      entry.model.rotation.set(m.rotation.x, m.rotation.y, m.rotation.z)
      entry.model.scale.set(m.scale.x, m.scale.y, m.scale.z)
    }
  }

  return { serialize, restore, restoreModelTransforms }
}
