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
  }

  const toggleNavigation = () => {
    if (isFirstPerson.value) disableFirstPerson()
    else enableFirstPerson()
  }

  /** Appeler depuis la boucle d'animation principale */
  const updateFrame = (delta: number) => {
    if (!fpControls?.isLocked) return
    const speed = moveSpeed.value * delta
    if (pressedKeys.has('KeyW') || pressedKeys.has('ArrowUp'))
      fpControls.moveForward(speed)
    if (pressedKeys.has('KeyS') || pressedKeys.has('ArrowDown'))
      fpControls.moveForward(-speed)
    if (pressedKeys.has('KeyA') || pressedKeys.has('ArrowLeft'))
      fpControls.moveRight(-speed)
    if (pressedKeys.has('KeyD') || pressedKeys.has('ArrowRight'))
      fpControls.moveRight(speed)
    const camera = getCamera()
    if (camera) {
      if (pressedKeys.has('Space')) camera.position.y += speed
      if (pressedKeys.has('ShiftLeft')) camera.position.y -= speed
    }
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
