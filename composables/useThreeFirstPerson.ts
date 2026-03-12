/**
 * useThreeFirstPerson — Navigation first-person (PointerLockControls)
 * Toggle avec OrbitControls existant via useThreeScene
 */
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'
import { ref } from 'vue'
import { getCamera, getControls, getRenderer } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let fpControls: PointerLockControls | null = null
const pressedKeys = new Set<string>()

const isFirstPerson = ref(false)
const moveSpeed = ref(5)

// Vélocité locale caméra pour l'inertie (module-level)
let velForward = 0
let velRight = 0
let velUp = 0
const DAMPING = 10 // facteur de décélération frame-rate-independent

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeFirstPerson() {
  const _init = () => {
    if (fpControls) return
    const camera = getCamera()
    const renderer = getRenderer()
    if (!camera || !renderer) return

    fpControls = new PointerLockControls(camera, renderer.domElement)

    document.addEventListener('keydown', e => {
      if (isFirstPerson.value) pressedKeys.add(e.code)
    })
    document.addEventListener('keyup', e => pressedKeys.delete(e.code))

    fpControls.addEventListener('lock', () => {
      isFirstPerson.value = true
    })
    fpControls.addEventListener('unlock', () => {
      if (isFirstPerson.value) disableFirstPerson()
    })
  }

  const enableFirstPerson = () => {
    _init()
    if (!fpControls) return
    const orbitControls = getControls()
    if (orbitControls) orbitControls.enabled = false
    // Focus le canvas avant de demander le pointer lock (user gesture requis)
    getRenderer()?.domElement?.focus()
    fpControls.lock()
    // isFirstPerson.value = true est maintenant géré dans le listener 'lock'
  }

  const disableFirstPerson = () => {
    if (fpControls?.isLocked) fpControls.unlock()
    const orbitControls = getControls()
    if (orbitControls) orbitControls.enabled = true
    isFirstPerson.value = false
    pressedKeys.clear()
    velForward = 0
    velRight = 0
    velUp = 0
  }

  const toggleNavigation = () => {
    if (isFirstPerson.value) disableFirstPerson()
    else enableFirstPerson()
  }

  /** Appeler depuis la boucle d'animation principale */
  const updateFrame = (delta: number) => {
    if (!fpControls?.isLocked) return
    const max = moveSpeed.value

    // Vélocité cible selon les touches actives
    const tFwd =
      (pressedKeys.has('KeyW') || pressedKeys.has('ArrowUp') ? max : 0) -
      (pressedKeys.has('KeyS') || pressedKeys.has('ArrowDown') ? max : 0)
    const tRight =
      (pressedKeys.has('KeyD') || pressedKeys.has('ArrowRight') ? max : 0) -
      (pressedKeys.has('KeyA') || pressedKeys.has('ArrowLeft') ? max : 0)
    const tUp =
      (pressedKeys.has('Space') ? max : 0) -
      (pressedKeys.has('ShiftLeft') ? max : 0)

    // Interpolation exponentielle frame-rate-independent
    const t = 1 - Math.exp(-DAMPING * delta)
    velForward += (tFwd - velForward) * t
    velRight += (tRight - velRight) * t
    velUp += (tUp - velUp) * t

    // Application du mouvement (seuil anti-drift)
    if (Math.abs(velForward) > 0.001) fpControls.moveForward(velForward * delta)
    if (Math.abs(velRight) > 0.001) fpControls.moveRight(velRight * delta)
    const camera = getCamera()
    if (camera && Math.abs(velUp) > 0.001) camera.position.y += velUp * delta
  }

  return {
    isFirstPerson,
    moveSpeed,
    enableFirstPerson,
    disableFirstPerson,
    toggleNavigation,
    updateFrame,
  }
}
