/**
 * useThreeLighting — Lumières, cycle jour/nuit, angle du soleil
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getScene } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let directionalLight: THREE.DirectionalLight
let ambientLight: THREE.AmbientLight

const isDay = ref(true)
const lightIntensity = ref([0.8])
const sunAngle = ref([45])

// ─── Utilitaire interne ──────────────────────────────────────────────────────
function createGradientTexture(
  top: string,
  bottom: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, top)
  gradient.addColorStop(1, bottom)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  return new THREE.CanvasTexture(canvas)
}

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeLighting() {
  const initLighting = () => {
    const scene = getScene()

    ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 20, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)
  }

  const toggleDayNight = () => {
    isDay.value = !isDay.value
    const scene = getScene()
    if (isDay.value) {
      scene.background = createGradientTexture('#ffffff', '#808080')
      ambientLight.intensity = 0.4
      directionalLight.color.setHex(0xffffff)
    } else {
      scene.background = createGradientTexture('#404040', '#000000')
      ambientLight.intensity = 0.1
      directionalLight.color.setHex(0x4169e1)
    }
  }

  const updateLighting = () => {
    if (directionalLight)
      directionalLight.intensity = lightIntensity.value[0] ?? 0.8
  }

  const updateSunPosition = () => {
    if (!directionalLight) return
    const angle = ((sunAngle.value[0] ?? 45) * Math.PI) / 180
    directionalLight.position.x = Math.cos(angle) * 20
    directionalLight.position.z = Math.sin(angle) * 20
  }

  const getDirectionalLight = () => directionalLight
  const getAmbientLight = () => ambientLight

  return {
    isDay,
    lightIntensity,
    sunAngle,
    initLighting,
    toggleDayNight,
    updateLighting,
    updateSunPosition,
    getDirectionalLight,
    getAmbientLight,
  }
}
