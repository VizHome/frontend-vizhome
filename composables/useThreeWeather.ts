/**
 * useThreeWeather — Pluie, neige, brouillard, fumée, lucioles
 */
import * as THREE from 'three'
import { computed, ref } from 'vue'
import { getScene } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let particleSystem: THREE.Points | null = null
let firefliesGroup: THREE.Group
let smokeGroup: THREE.Group
let raindropVelocities: number[] = []
let snowflakeVelocities: number[] = []

const isRaining = ref(false)
const isSnowing = ref(false)
const showFog = ref(false)
const showSmoke = ref(false)

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeWeather() {
  const currentWeather = computed(() => {
    if (isRaining.value) return 'Pluie'
    if (isSnowing.value) return 'Neige'
    if (showFog.value) return 'Brouillard'
    return 'Ensoleillé'
  })

  const initWeatherGroups = () => {
    const scene = getScene()
    firefliesGroup = new THREE.Group()
    scene.add(firefliesGroup)
    smokeGroup = new THREE.Group()
    scene.add(smokeGroup)
  }

  const _createRainSystem = () => {
    const scene = getScene()
    const count = 1000
    const positions = new Float32Array(count * 3)
    raindropVelocities = []
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * 20 + 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      raindropVelocities.push(Math.random() * 0.5 + 0.5)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleSystem = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: 0x87ceeb, size: 0.1 })
    )
    scene.add(particleSystem)
  }

  const _createSnowSystem = () => {
    const scene = getScene()
    const count = 500
    const positions = new Float32Array(count * 3)
    snowflakeVelocities = []
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * 20 + 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      snowflakeVelocities.push(Math.random() * 0.1 + 0.05)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleSystem = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })
    )
    scene.add(particleSystem)
  }

  const _removeParticleSystem = () => {
    if (particleSystem) {
      getScene().remove(particleSystem)
      particleSystem = null
    }
  }

  const toggleRain = () => {
    isRaining.value = !isRaining.value
    if (isRaining.value) {
      if (isSnowing.value) toggleSnow()
      _createRainSystem()
    } else {
      _removeParticleSystem()
    }
  }

  const toggleSnow = () => {
    isSnowing.value = !isSnowing.value
    if (isSnowing.value) {
      if (isRaining.value) toggleRain()
      _createSnowSystem()
    } else {
      _removeParticleSystem()
    }
  }

  const toggleFog = () => {
    showFog.value = !showFog.value
    const scene = getScene()
    scene.fog = showFog.value ? new THREE.Fog(0x87ceeb, 10, 50) : null
  }

  const addFireflies = () => {
    const geo = new THREE.SphereGeometry(0.05, 8, 8)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.8,
    })
    for (let i = 0; i < 10; i++) {
      const firefly = new THREE.Mesh(geo, mat)
      firefly.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 5 + 1,
        (Math.random() - 0.5) * 20
      )
      firefliesGroup.add(firefly)
    }
  }

  const toggleSmoke = () => {
    showSmoke.value = !showSmoke.value
    if (showSmoke.value) {
      const geo = new THREE.SphereGeometry(0.2, 8, 8)
      const mat = new THREE.MeshBasicMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.3,
      })
      for (let i = 0; i < 5; i++) {
        const smoke = new THREE.Mesh(geo, mat)
        smoke.position.set(1.5, 7 + i * 0.5, 1.5)
        smokeGroup.add(smoke)
      }
    } else {
      smokeGroup.clear()
    }
  }

  /** Appeler depuis la boucle d'animation */
  const updateFrame = (elapsed: number, animationSpeed: number) => {
    // Particules (pluie / neige)
    if (particleSystem) {
      const posAttr = particleSystem.geometry.attributes['position'] as
        | THREE.BufferAttribute
        | undefined
      if (posAttr) {
        const positions = posAttr.array as Float32Array
        const velocities = isRaining.value
          ? raindropVelocities
          : snowflakeVelocities
        for (let i = 0; i < positions.length; i += 3) {
          const vel = velocities[i / 3] ?? 0
          const cur = positions[i + 1] ?? 0
          positions[i + 1] =
            cur - vel * animationSpeed < 0 ? 20 : cur - vel * animationSpeed
        }
        posAttr.needsUpdate = true
      }
    }
    // Lucioles
    if (firefliesGroup) {
      firefliesGroup.children.forEach((firefly, idx) => {
        const mesh = firefly as THREE.Mesh
        mesh.position.x += Math.sin(elapsed + idx) * 0.01
        mesh.position.z += Math.cos(elapsed + idx) * 0.01
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = 0.5 + Math.sin(elapsed * 5 + idx) * 0.3
      })
    }
    // Fumée
    if (showSmoke.value && smokeGroup) {
      smokeGroup.children.forEach((smoke, idx) => {
        smoke.position.x += Math.sin(elapsed + idx) * 0.01
        smoke.position.y += 0.005
        smoke.scale.addScalar(0.001)
        if (smoke.position.y > 12) {
          smoke.position.y = 7
          smoke.scale.set(1, 1, 1)
        }
      })
    }
  }

  return {
    isRaining,
    isSnowing,
    showFog,
    showSmoke,
    currentWeather,
    initWeatherGroups,
    toggleRain,
    toggleSnow,
    toggleFog,
    addFireflies,
    toggleSmoke,
    updateFrame,
  }
}
