/**
 * useThreeTour — Visite guidée automatique (caméra le long d'un chemin CatmullRom)
 * Génère un circuit circulaire autour du centre de la scène.
 * Play/pause, durée réglable, progress 0–1.
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getCamera, getControls } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let tourCurve: THREE.CatmullRomCurve3 | null = null
let savedCamPos: THREE.Vector3 | null = null
let savedTarget: THREE.Vector3 | null = null

const isTourActive = ref(false)
const isPlaying = ref(false)
const tourProgress = ref(0) // 0–1 (fraction du circuit)
const tourDuration = ref(30) // secondes pour un tour complet

// ─── Helpers ─────────────────────────────────────────────────────────────────
const buildCircularCurve = (
  center: THREE.Vector3,
  radius: number,
  height: number
): THREE.CatmullRomCurve3 => {
  const N = 16
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    pts.push(
      new THREE.Vector3(
        center.x + Math.cos(a) * radius,
        height,
        center.z + Math.sin(a) * radius
      )
    )
  }
  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5)
}

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeTour() {
  /** Lance la visite depuis la position caméra actuelle. */
  const startTour = () => {
    const camera = getCamera()
    const controls = getControls()
    if (!camera || !controls) return

    savedCamPos = camera.position.clone()
    savedTarget = controls.target.clone()

    const center = controls.target.clone()
    const radius = Math.max(camera.position.distanceTo(center), 10)
    const height = Math.max(camera.position.y, center.y + 3)

    tourCurve = buildCircularCurve(center, radius, height)
    controls.enabled = false // empêche OrbitControls d'overrider la caméra

    tourProgress.value = 0
    isPlaying.value = true
    isTourActive.value = true
  }

  /** Arrête la visite et restaure la caméra. */
  const stopTour = () => {
    const camera = getCamera()
    const controls = getControls()
    if (!camera || !controls) return

    isTourActive.value = false
    isPlaying.value = false
    tourCurve = null

    if (savedCamPos) camera.position.copy(savedCamPos)
    if (savedTarget) controls.target.copy(savedTarget)
    controls.enabled = true
    controls.update()
  }

  const togglePlayPause = () => {
    isPlaying.value = !isPlaying.value
  }

  /** Appeler depuis la boucle d'animation principale. */
  const updateFrame = (delta: number) => {
    if (!isTourActive.value || !isPlaying.value || !tourCurve) return
    const camera = getCamera()
    if (!camera) return

    // Avancement proportionnel à delta et à la durée configurée
    tourProgress.value = (tourProgress.value + delta / tourDuration.value) % 1

    const pos = tourCurve.getPointAt(tourProgress.value)
    // Légère anticipation pour un regard naturel vers l'avant
    const lookAt = tourCurve.getPointAt((tourProgress.value + 0.015) % 1)

    camera.position.copy(pos)
    camera.lookAt(lookAt)
  }

  return {
    isTourActive,
    isPlaying,
    tourProgress,
    tourDuration,
    startTour,
    stopTour,
    togglePlayPause,
    updateFrame,
  }
}
