<template>
  <div class="render-container">
    <canvas ref="canvasRef" class="render-canvas"></canvas>
    <div class="controls">
      <div class="controls-section">
        <h3>Vue</h3>
        <button @click="resetCamera">Réinitialiser la vue</button>
        <button @click="toggleWireframe">{{ wireframe ? 'Solide' : 'Filaire' }}</button>
        <button @click="toggleFullscreen">Plein écran</button>
        <button @click="captureScreenshot">Capture d'écran</button>
      </div>

      <div class="controls-section">
        <h3>Éclairage</h3>
        <button @click="toggleDayNight">{{ isDay ? 'Mode Nuit' : 'Mode Jour' }}</button>
        <div class="slider-group">
          <label>Intensité lumière</label>
          <input type="range" min="0" max="2" step="0.1" v-model="lightIntensity" @input="updateLighting">
        </div>
        <div class="slider-group">
          <label>Angle du soleil</label>
          <input type="range" min="0" max="360" step="1" v-model="sunAngle" @input="updateSunPosition">
        </div>
      </div>

      <div class="controls-section">
        <h3>Couleurs</h3>
        <div class="color-group">
          <label>Murs</label>
          <input type="color" v-model="wallColor" @change="updateColors">
        </div>
        <div class="color-group">
          <label>Toit</label>
          <input type="color" v-model="roofColor" @change="updateColors">
        </div>
        <div class="color-group">
          <label>Porte</label>
          <input type="color" v-model="doorColor" @change="updateColors">
        </div>
        <div class="color-group">
          <label>Sol</label>
          <input type="color" v-model="groundColor" @change="updateColors">
        </div>
      </div>

      <div class="controls-section">
        <h3>Éléments</h3>
        <button @click="toggleTrees">{{ showTrees ? 'Masquer' : 'Afficher' }} arbres</button>
        <button @click="toggleFence">{{ showFence ? 'Masquer' : 'Afficher' }} clôture</button>
        <button @click="addRandomCloud">Ajouter nuage</button>
        <button @click="toggleGarden">{{ showGarden ? 'Masquer' : 'Afficher' }} jardin</button>
        <button @click="togglePath">{{ showPath ? 'Masquer' : 'Afficher' }} chemin</button>
      </div>

      <div class="controls-section">
        <h3>Météo & Effets</h3>
        <button @click="toggleRain">{{ isRaining ? 'Arrêter' : 'Démarrer' }} pluie</button>
        <button @click="toggleSnow">{{ isSnowing ? 'Arrêter' : 'Démarrer' }} neige</button>
        <button @click="toggleFog">{{ showFog ? 'Masquer' : 'Afficher' }} brouillard</button>
        <button @click="addFireflies">Ajouter lucioles</button>
        <button @click="toggleSmoke">{{ showSmoke ? 'Arrêter' : 'Démarrer' }} fumée</button>
      </div>

      <div class="controls-section">
        <h3>Animations</h3>
        <button @click="toggleDoorAnimation">{{ doorOpen ? 'Fermer' : 'Ouvrir' }} porte</button>
        <button @click="toggleTreeAnimation">{{ treeAnimation ? 'Arrêter' : 'Démarrer' }} vent</button>
        <button @click="toggleRotateHouse">{{ rotateHouse ? 'Arrêter' : 'Démarrer' }} rotation</button>
        <div class="slider-group">
          <label>Vitesse animation</label>
          <input type="range" min="0.1" max="3" step="0.1" v-model="animationSpeed">
        </div>
      </div>

      <div class="controls-section">
        <h3>Audio</h3>
        <button @click="toggleAmbientSound">{{ ambientSound ? 'Arrêter' : 'Démarrer' }} sons ambiants</button>
        <div class="slider-group">
          <label>Volume</label>
          <input type="range" min="0" max="1" step="0.1" v-model="audioVolume" @input="updateAudioVolume">
        </div>
      </div>

      <div class="controls-section">
        <h3>Saisons</h3>
        <select v-model="currentSeason" @change="changeSeason">
          <option value="spring">Printemps</option>
          <option value="summer">Été</option>
          <option value="autumn">Automne</option>
          <option value="winter">Hiver</option>
        </select>
      </div>

      <div class="info-panel">
        <h4>Informations</h4>
        <p>FPS: {{ fps }}</p>
        <p>Triangles: {{ triangleCount }}</p>
        <p>Saison: {{ currentSeason }}</p>
        <p>Météo: {{ currentWeather }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

definePageMeta({
  layout: 'none',
})

const canvasRef = ref<HTMLCanvasElement>()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let animationId: number
let house: THREE.Group
let directionalLight: THREE.DirectionalLight
let ambientLight: THREE.AmbientLight

// Variables réactives pour les contrôles
const wireframe = ref(false)
const isDay = ref(true)
const lightIntensity = ref(0.8)
const sunAngle = ref(45)
const wallColor = ref('#F5DEB3')
const roofColor = ref('#8B4513')
const doorColor = ref('#654321')
const groundColor = ref('#90EE90')
const showTrees = ref(false)
const showFence = ref(false)
const showGarden = ref(false)
const showPath = ref(false)

// Nouvelles variables pour les effets
const isRaining = ref(false)
const isSnowing = ref(false)
const showFog = ref(false)
const showSmoke = ref(false)
const doorOpen = ref(false)
const treeAnimation = ref(false)
const rotateHouse = ref(false)
const animationSpeed = ref(1)
const ambientSound = ref(false)
const audioVolume = ref(0.5)
const currentSeason = ref('spring')

// Variables pour les stats
const fps = ref(0)
const triangleCount = ref(0)

// Groupes pour les éléments
let treesGroup: THREE.Group
let fenceGroup: THREE.Group
let cloudsGroup: THREE.Group
let gardenGroup: THREE.Group
let pathGroup: THREE.Group
let particleSystem: THREE.Points
let firefliesGroup: THREE.Group
let smokeGroup: THREE.Group

// Variables pour les animations
let doorGroup: THREE.Group
let clock: THREE.Clock
let raindropVelocities: number[] = []
let snowflakeVelocities: number[] = []

// Variables audio
let audioContext: AudioContext
let audioBuffer: AudioBuffer
let audioSource: AudioBufferSourceNode

// Computed properties
const currentWeather = computed(() => {
  if (isRaining.value) return 'Pluie'
  if (isSnowing.value) return 'Neige'
  if (showFog.value) return 'Brouillard'
  return 'Ensoleillé'
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    initThreeJS()
    createHouse()
    createOptionalElements()
    setupAudio()
    animate()
    setupResizeHandler()
    setupPerformanceMonitor()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (audioContext) {
    audioContext.close()
  }
})

const initThreeJS = () => {
  // Scène
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87CEEB) // Couleur ciel

  // Caméra
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(10, 8, 10)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value!,
    antialias: true,
    preserveDrawingBuffer: true // Pour les captures d'écran
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Contrôles
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1

  // Éclairage
  ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 20, 10)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // Sol
  const groundGeometry = new THREE.PlaneGeometry(30, 30)
  const groundMaterial = new THREE.MeshLambertMaterial({ color: groundColor.value })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.name = 'ground'
  scene.add(ground)

  // Horloge pour les animations
  clock = new THREE.Clock()
}

const createHouse = () => {
  house = new THREE.Group()

  // Murs de la maison
  const wallGeometry = new THREE.BoxGeometry(6, 4, 6)
  const wallMaterial = new THREE.MeshLambertMaterial({ color: wallColor.value })
  const walls = new THREE.Mesh(wallGeometry, wallMaterial)
  walls.position.y = 2
  walls.castShadow = true
  walls.name = 'walls'
  house.add(walls)

  // Toit
  const roofGeometry = new THREE.ConeGeometry(4.5, 2, 4)
  const roofMaterial = new THREE.MeshLambertMaterial({ color: roofColor.value })
  const roof = new THREE.Mesh(roofGeometry, roofMaterial)
  roof.position.y = 5
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  roof.name = 'roof'
  house.add(roof)

  // Porte animée
  doorGroup = new THREE.Group()
  const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1)
  const doorMaterial = new THREE.MeshLambertMaterial({ color: doorColor.value })
  const door = new THREE.Mesh(doorGeometry, doorMaterial)
  door.position.set(0.5, 1, 3.05)
  door.name = 'door'
  doorGroup.add(door)

  // Poignée de porte
  const handleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
  const handleMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 })
  const doorHandle = new THREE.Mesh(handleGeometry, handleMaterial)
  doorHandle.position.set(0.8, 1, 3.1)
  doorGroup.add(doorHandle)

  doorGroup.position.set(-0.5, 0, 0)
  house.add(doorGroup)

  // Fenêtres avec cadres
  const windowGeometry = new THREE.BoxGeometry(1, 1, 0.1)
  const windowMaterial = new THREE.MeshLambertMaterial({ color: 0x87CEEB })
  const frameGeometry = new THREE.BoxGeometry(1.1, 1.1, 0.05)
  const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 })

  // Fenêtre 1 avec cadre
  const window1 = new THREE.Mesh(windowGeometry, windowMaterial)
  window1.position.set(-1.5, 2.5, 3.05)
  house.add(window1)

  const frame1 = new THREE.Mesh(frameGeometry, frameMaterial)
  frame1.position.set(-1.5, 2.5, 3.02)
  house.add(frame1)

  // Fenêtre 2 avec cadre
  const window2 = new THREE.Mesh(windowGeometry, windowMaterial)
  window2.position.set(1.5, 2.5, 3.05)
  house.add(window2)

  const frame2 = new THREE.Mesh(frameGeometry, frameMaterial)
  frame2.position.set(1.5, 2.5, 3.02)
  house.add(frame2)

  // Fenêtre latérale avec cadre
  const window3 = new THREE.Mesh(windowGeometry, windowMaterial)
  window3.position.set(3.05, 2.5, 0)
  house.add(window3)

  const frame3 = new THREE.Mesh(frameGeometry, frameMaterial)
  frame3.position.set(3.02, 2.5, 0)
  house.add(frame3)

  // Cheminée
  const chimneyGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.8)
  const chimneyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
  const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
  chimney.position.set(1.5, 6.25, 1.5)
  chimney.castShadow = true
  house.add(chimney)

  scene.add(house)
}

const createOptionalElements = () => {
  // Groupe d'arbres
  treesGroup = new THREE.Group()
  createTrees()
  scene.add(treesGroup)

  // Groupe de clôture
  fenceGroup = new THREE.Group()
  createFence()
  scene.add(fenceGroup)

  // Groupe de nuages
  cloudsGroup = new THREE.Group()
  scene.add(cloudsGroup)

  // Nouveaux éléments
  gardenGroup = new THREE.Group()
  createGarden()
  scene.add(gardenGroup)

  pathGroup = new THREE.Group()
  createPath()
  scene.add(pathGroup)

  firefliesGroup = new THREE.Group()
  scene.add(firefliesGroup)

  smokeGroup = new THREE.Group()
  scene.add(smokeGroup)

  // Masquer par défaut
  treesGroup.visible = false
  fenceGroup.visible = false
  gardenGroup.visible = false
  pathGroup.visible = false
}

const createTrees = () => {
  const positions = [
    [-8, 0, -5], [8, 0, -8], [-10, 0, 5], [10, 0, 8], [5, 0, -10]
  ]

  positions.forEach(pos => {
    const tree = new THREE.Group()

    // Tronc
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2)
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = 1
    trunk.castShadow = true
    tree.add(trunk)

    // Feuillage
    const leavesGeometry = new THREE.SphereGeometry(1.5, 8, 8)
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 })
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial)
    leaves.position.y = 2.5
    leaves.castShadow = true
    leaves.name = 'leaves'
    tree.add(leaves)

    tree.position.set(pos[0], pos[1], pos[2])
    treesGroup.add(tree)
  })
}

const createFence = () => {
  const fenceHeight = 1.5
  const fenceWidth = 0.1
  const postSpacing = 2

  // Clôture autour de la maison
  for (let x = -12; x <= 12; x += postSpacing) {
    // Clôture avant et arrière
    if (Math.abs(x) > 4) { // Laisser une ouverture devant la maison
      createFencePost(x, 0, -12, fenceHeight, fenceWidth)
      createFencePost(x, 0, 12, fenceHeight, fenceWidth)
    }
  }

  for (let z = -12; z <= 12; z += postSpacing) {
    // Clôture côtés
    createFencePost(-12, 0, z, fenceHeight, fenceWidth)
    createFencePost(12, 0, z, fenceHeight, fenceWidth)
  }
}

const createFencePost = (x: number, y: number, z: number, height: number, width: number) => {
  const postGeometry = new THREE.BoxGeometry(width, height, width)
  const postMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 })
  const post = new THREE.Mesh(postGeometry, postMaterial)
  post.position.set(x, y + height / 2, z)
  post.castShadow = true
  fenceGroup.add(post)
}

const createGarden = () => {
  // Fleurs
  const flowerPositions = [
    [-4, 0, -2], [-3, 0, -1], [-2, 0, -2], [4, 0, -1], [3, 0, -2], [2, 0, -1]
  ]

  flowerPositions.forEach(pos => {
    const flower = new THREE.Group()

    // Tige
    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5)
    const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 })
    const stem = new THREE.Mesh(stemGeometry, stemMaterial)
    stem.position.y = 0.25
    flower.add(stem)

    // Pétales
    const petalGeometry = new THREE.SphereGeometry(0.1, 6, 6)
    const petalMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() > 0.5 ? 0xFF69B4 : 0xFFD700
    })
    const petal = new THREE.Mesh(petalGeometry, petalMaterial)
    petal.position.y = 0.5
    flower.add(petal)

    flower.position.set(pos[0], pos[1], pos[2])
    gardenGroup.add(flower)
  })
}

const createPath = () => {
  // Chemin en pierres
  const stoneGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8)
  const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 })

  for (let i = 0; i < 10; i++) {
    const stone = new THREE.Mesh(stoneGeometry, stoneMaterial)
    stone.position.set(0, 0.05, 5 - i * 1.2)
    stone.rotation.y = Math.random() * 0.5
    pathGroup.add(stone)
  }
}

const createRainSystem = () => {
  const rainGeometry = new THREE.BufferGeometry()
  const rainCount = 1000
  const positions = new Float32Array(rainCount * 3)
  raindropVelocities = []

  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = Math.random() * 20 + 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    raindropVelocities.push(Math.random() * 0.5 + 0.5)
  }

  rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const rainMaterial = new THREE.PointsMaterial({ color: 0x87CEEB, size: 0.1 })
  particleSystem = new THREE.Points(rainGeometry, rainMaterial)
  scene.add(particleSystem)
}

const createSnowSystem = () => {
  const snowGeometry = new THREE.BufferGeometry()
  const snowCount = 500
  const positions = new Float32Array(snowCount * 3)
  snowflakeVelocities = []

  for (let i = 0; i < snowCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = Math.random() * 20 + 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    snowflakeVelocities.push(Math.random() * 0.1 + 0.05)
  }

  snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const snowMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 })
  particleSystem = new THREE.Points(snowGeometry, snowMaterial)
  scene.add(particleSystem)
}

const setupAudio = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    audioContext = new AudioContext()
    // Créer un son ambiant synthétique
    createAmbientSound()
  }
}

const createAmbientSound = () => {
  // Créer un son d'ambiance avec des oscillateurs
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)

  oscillator.start()
}

const setupPerformanceMonitor = () => {
  let frameCount = 0
  let lastTime = performance.now()

  const updateStats = () => {
    frameCount++
    const now = performance.now()

    if (now - lastTime >= 1000) {
      fps.value = Math.round(frameCount * 1000 / (now - lastTime))
      frameCount = 0
      lastTime = now

      // Compter les triangles
      let triangles = 0
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          triangles += child.geometry.attributes.position.count / 3
        }
      })
      triangleCount.value = Math.round(triangles)
    }

    requestAnimationFrame(updateStats)
  }

  updateStats()
}

// Nouvelles fonctions de contrôle
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    canvasRef.value?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const captureScreenshot = () => {
  const link = document.createElement('a')
  link.download = 'house-render.png'
  link.href = renderer.domElement.toDataURL()
  link.click()
}

const updateSunPosition = () => {
  const angle = (sunAngle.value * Math.PI) / 180
  directionalLight.position.x = Math.cos(angle) * 20
  directionalLight.position.z = Math.sin(angle) * 20
}

const toggleRain = () => {
  isRaining.value = !isRaining.value
  if (isRaining.value) {
    if (isSnowing.value) toggleSnow()
    createRainSystem()
  } else {
    if (particleSystem) {
      scene.remove(particleSystem)
      particleSystem = null
    }
  }
}

const toggleSnow = () => {
  isSnowing.value = !isSnowing.value
  if (isSnowing.value) {
    if (isRaining.value) toggleRain()
    createSnowSystem()
  } else {
    if (particleSystem) {
      scene.remove(particleSystem)
      particleSystem = null
    }
  }
}

const toggleFog = () => {
  showFog.value = !showFog.value
  if (showFog.value) {
    scene.fog = new THREE.Fog(0x87CEEB, 10, 50)
  } else {
    scene.fog = null
  }
}

const addFireflies = () => {
  const fireflyGeometry = new THREE.SphereGeometry(0.05, 8, 8)
  const fireflyMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFF00,
    transparent: true,
    opacity: 0.8
  })

  for (let i = 0; i < 10; i++) {
    const firefly = new THREE.Mesh(fireflyGeometry, fireflyMaterial)
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
    createSmokeSystem()
  } else {
    smokeGroup.clear()
  }
}

const createSmokeSystem = () => {
  const smokeGeometry = new THREE.SphereGeometry(0.2, 8, 8)
  const smokeMaterial = new THREE.MeshBasicMaterial({
    color: 0x666666,
    transparent: true,
    opacity: 0.3
  })

  for (let i = 0; i < 5; i++) {
    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial)
    smoke.position.set(1.5, 7 + i * 0.5, 1.5)
    smokeGroup.add(smoke)
  }
}

const toggleDoorAnimation = () => {
  doorOpen.value = !doorOpen.value
}

const toggleTreeAnimation = () => {
  treeAnimation.value = !treeAnimation.value
}

const toggleRotateHouse = () => {
  rotateHouse.value = !rotateHouse.value
}

const toggleAmbientSound = () => {
  ambientSound.value = !ambientSound.value
  if (audioContext) {
    if (ambientSound.value) {
      audioContext.resume()
    } else {
      audioContext.suspend()
    }
  }
}

const updateAudioVolume = () => {
  // Mettre à jour le volume audio
}

const changeSeason = () => {
  const seasons = {
    spring: { treeColor: 0x90EE90, groundColor: 0x90EE90, skyColor: 0x87CEEB },
    summer: { treeColor: 0x228B22, groundColor: 0x32CD32, skyColor: 0x87CEEB },
    autumn: { treeColor: 0xFFA500, groundColor: 0xDAA520, skyColor: 0x87CEEB },
    winter: { treeColor: 0x708090, groundColor: 0xE0E0E0, skyColor: 0x778899 }
  }

  const season = seasons[currentSeason.value]
  scene.background = new THREE.Color(season.skyColor)

  // Mettre à jour les couleurs des arbres
  treesGroup.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name === 'leaves') {
      child.material.color.setHex(season.treeColor)
    }
  })

  // Mettre à jour la couleur du sol
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name === 'ground') {
      child.material.color.setHex(season.groundColor)
    }
  })
}

const toggleGarden = () => {
  showGarden.value = !showGarden.value
  gardenGroup.visible = showGarden.value
}

const togglePath = () => {
  showPath.value = !showPath.value
  pathGroup.visible = showPath.value
}

// Fonctions de contrôle existantes
const toggleWireframe = () => {
  wireframe.value = !wireframe.value
  house.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.wireframe = wireframe.value
    }
  })
}

const toggleDayNight = () => {
  isDay.value = !isDay.value
  if (isDay.value) {
    scene.background = new THREE.Color(0x87CEEB)
    ambientLight.intensity = 0.4
    directionalLight.color.setHex(0xffffff)
  } else {
    scene.background = new THREE.Color(0x191970)
    ambientLight.intensity = 0.1
    directionalLight.color.setHex(0x4169E1)
  }
}

const updateLighting = () => {
  directionalLight.intensity = parseFloat(lightIntensity.value)
}

const updateColors = () => {
  house.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name === 'walls') {
        child.material.color.setStyle(wallColor.value)
      } else if (child.name === 'roof') {
        child.material.color.setStyle(roofColor.value)
      } else if (child.name === 'door') {
        child.material.color.setStyle(doorColor.value)
      }
    }
  })

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.name === 'ground') {
      child.material.color.setStyle(groundColor.value)
    }
  })
}

const toggleTrees = () => {
  showTrees.value = !showTrees.value
  treesGroup.visible = showTrees.value
}

const toggleFence = () => {
  showFence.value = !showFence.value
  fenceGroup.visible = showFence.value
}

const addRandomCloud = () => {
  const cloudGeometry = new THREE.SphereGeometry(2, 8, 8)
  const cloudMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
  })
  const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)

  cloud.position.set(
    (Math.random() - 0.5) * 40,
    15 + Math.random() * 10,
    (Math.random() - 0.5) * 40
  )

  cloud.scale.set(
    1 + Math.random(),
    0.5 + Math.random() * 0.5,
    1 + Math.random()
  )

  cloudsGroup.add(cloud)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  const deltaTime = clock.getDelta()
  const elapsedTime = clock.getElapsedTime()

  controls.update()

  // Animation de la porte
  if (doorOpen.value) {
    doorGroup.rotation.y = Math.min(doorGroup.rotation.y + deltaTime * 2, Math.PI / 2)
  } else {
    doorGroup.rotation.y = Math.max(doorGroup.rotation.y - deltaTime * 2, 0)
  }

  // Animation des arbres (vent)
  if (treeAnimation.value) {
    treesGroup.children.forEach((tree, index) => {
      tree.rotation.z = Math.sin(elapsedTime * 2 + index) * 0.1
    })
  }

  // Rotation de la maison
  if (rotateHouse.value) {
    house.rotation.y += deltaTime * animationSpeed.value * 0.5
  }

  // Animation des particules
  if (particleSystem) {
    const positions = particleSystem.geometry.attributes.position.array
    const velocities = isRaining.value ? raindropVelocities : snowflakeVelocities

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= velocities[i / 3] * animationSpeed.value

      if (positions[i + 1] < 0) {
        positions[i + 1] = 20
      }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true
  }

  // Animation des lucioles
  firefliesGroup.children.forEach((firefly, index) => {
    firefly.position.x += Math.sin(elapsedTime + index) * 0.01
    firefly.position.z += Math.cos(elapsedTime + index) * 0.01
    firefly.material.opacity = 0.5 + Math.sin(elapsedTime * 5 + index) * 0.3
  })

  // Animation de la fumée
  if (showSmoke.value) {
    smokeGroup.children.forEach((smoke, index) => {
      smoke.position.x += Math.sin(elapsedTime + index) * 0.01
      smoke.position.y += 0.005
      smoke.scale.addScalar(0.001)

      if (smoke.position.y > 12) {
        smoke.position.y = 7
        smoke.scale.set(1, 1, 1)
      }
    })
  }

  // Animation des nuages
  cloudsGroup.children.forEach(cloud => {
    cloud.position.x += 0.01
    if (cloud.position.x > 25) {
      cloud.position.x = -25
    }
  })

  renderer.render(scene, camera)
}

const resetCamera = () => {
  if (camera && controls) {
    camera.position.set(10, 8, 10)
    controls.reset()
  }
}

// Gestion du redimensionnement
const setupResizeHandler = () => {
  const handleResize = () => {
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }

  window.addEventListener('resize', handleResize)

  // Nettoyer l'event listener quand le composant est démonté
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
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
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 10px;
  color: white;
  max-height: 80vh;
  overflow-y: auto;
  min-width: 280px;
  backdrop-filter: blur(10px);
}

.controls-section {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.controls-section:last-child {
  border-bottom: none;
}

.controls-section h3 {
  margin: 0 0 10px 0;
  color: #3498db;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.controls button {
  padding: 8px 16px;
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin: 2px;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.controls button:hover {
  background: linear-gradient(45deg, #2980b9, #1f618d);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.controls button:active {
  transform: translateY(0);
}

.slider-group,
.color-group {
  margin: 8px 0;
}

.slider-group label,
.color-group label {
  display: block;
  font-size: 12px;
  margin-bottom: 5px;
  color: #ecf0f1;
}

.slider-group input[type="range"] {
  width: 100%;
  margin: 5px 0;
}

.color-group input[type="color"] {
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.controls select {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 12px;
}

.controls select option {
  background: #2c3e50;
  color: white;
}

.info-panel {
  margin-top: 20px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-size: 11px;
}

.info-panel h4 {
  margin: 0 0 10px 0;
  color: #e74c3c;
  font-size: 12px;
}

.info-panel p {
  margin: 5px 0;
  color: #bdc3c7;
}
</style>