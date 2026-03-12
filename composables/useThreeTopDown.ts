/**
 * useThreeTopDown — Mode vue de plan (top-down / orthographique)
 * Reconfigure OrbitControls pour un déplacement map-like (pan + zoom uniquement).
 * Sauvegarde et restaure l'état caméra lors du toggle.
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getCamera, getControls } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let savedCamPos: THREE.Vector3 | null = null
let savedTarget: THREE.Vector3 | null = null
let savedPolarMin = 0
let savedPolarMax = Math.PI
let savedEnableRotate = true

const isTopDown = ref(false)

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeTopDown() {
  const enableTopDown = () => {
    const camera = getCamera()
    const controls = getControls()
    if (!camera || !controls) return

    // Sauvegarde de l'état courant
    savedCamPos = camera.position.clone()
    savedTarget = controls.target.clone()
    savedPolarMin = controls.minPolarAngle
    savedPolarMax = controls.maxPolarAngle
    savedEnableRotate = controls.enableRotate

    // Repositionner la caméra à la verticale du centre de la scène
    const dist = camera.position.distanceTo(controls.target)
    const cx = controls.target.x
    const cz = controls.target.z
    controls.target.set(cx, 0, cz)
    camera.position.set(cx, Math.max(dist, 10), cz)

    // Bloquer en vue du dessus (angle polaire ≈ 0 = caméra au-dessus)
    controls.minPolarAngle = 0
    controls.maxPolarAngle = 0.001
    controls.enableRotate = false

    // Gauche = pan, Milieu = zoom, Droite = pan
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    }
    controls.update()
    isTopDown.value = true
  }

  const disableTopDown = () => {
    const camera = getCamera()
    const controls = getControls()
    if (!camera || !controls) return

    // Restauration complète
    if (savedCamPos) camera.position.copy(savedCamPos)
    if (savedTarget) controls.target.copy(savedTarget)
    controls.minPolarAngle = savedPolarMin
    controls.maxPolarAngle = savedPolarMax
    controls.enableRotate = savedEnableRotate
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    }
    controls.update()
    isTopDown.value = false
  }

  return { isTopDown, enableTopDown, disableTopDown }
}
