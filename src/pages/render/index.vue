<template>
  <div class="render-container">
    <canvas ref="canvasRef" class="render-canvas"></canvas>

    <!-- Menu latéral avec shadcn-vue -->
    <div :class="['sidebar', { 'sidebar-collapsed': isMenuCollapsed }]">
      <!-- En-tête du menu -->
      <div class="sidebar-header">
        <div v-if="!isMenuCollapsed" class="sidebar-title">
          <h2 class="text-xl font-semibold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            VizHome
          </h2>
          <p class="text-sm text-muted-foreground">Rendu 3D interactif</p>
        </div>
        <Button @click="toggleMenu" variant="ghost" size="sm" class="h-8 w-8 p-0">
          <ChevronLeft v-if="!isMenuCollapsed" class="h-4 w-4" />
          <ChevronRight v-else class="h-4 w-4" />
        </Button>
      </div>

      <!-- Contenu du menu -->
      <ScrollArea class="flex-1 px-2">
        <!-- Section Vue -->
        <Collapsible v-model:open="activeSections.view" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Eye class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Vue</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-1">
            <Button @click="resetCamera" variant="ghost" size="sm" class="w-full justify-start">
              <RotateCcw class="h-4 w-4 mr-2" />
              Réinitialiser la vue
            </Button>
            <Button @click="toggleWireframe" variant="ghost" size="sm" class="w-full justify-start">
              <Grid3x3 class="h-4 w-4 mr-2" />
              {{ wireframe ? 'Solide' : 'Filaire' }}
            </Button>
            <Button @click="toggleFullscreen" variant="ghost" size="sm" class="w-full justify-start">
              <Maximize class="h-4 w-4 mr-2" />
              Plein écran
            </Button>
            <Button @click="captureScreenshot" variant="ghost" size="sm" class="w-full justify-start">
              <Camera class="h-4 w-4 mr-2" />
              Capture d'écran
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Éclairage -->
        <Collapsible v-model:open="activeSections.lighting" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Sun class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Éclairage</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-2">
            <Button @click="toggleDayNight" variant="ghost" size="sm" class="w-full justify-start">
              <Moon v-if="isDay" class="h-4 w-4 mr-2" />
              <Sun v-else class="h-4 w-4 mr-2" />
              {{ isDay ? 'Mode Nuit' : 'Mode Jour' }}
            </Button>

            <Card class="p-3">
              <div class="space-y-2">
                <Label class="flex items-center gap-2 text-sm">
                  <Lightbulb class="h-4 w-4" />
                  Intensité lumière
                </Label>
                <Slider :min="0" :max="2" :step="0.1" v-model="lightIntensity" @update:model-value="updateLighting"
                  class="w-full" />
                <div class="text-center text-xs text-muted-foreground">{{ lightIntensity[0] }}</div>
              </div>
            </Card>

            <Card class="p-3">
              <div class="space-y-2">
                <Label class="flex items-center gap-2 text-sm">
                  <Sun class="h-4 w-4" />
                  Angle du soleil
                </Label>
                <Slider :min="0" :max="360" :step="1" v-model="sunAngle" @update:model-value="updateSunPosition"
                  class="w-full" />
                <div class="text-center text-xs text-muted-foreground">{{ sunAngle[0] }}°</div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Couleurs -->
        <Collapsible v-model:open="activeSections.colors" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Palette class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Couleurs</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-2">
            <Card class="p-3">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <Label class="flex items-center gap-2 text-sm">
                    <Home class="h-4 w-4" />
                    Murs
                  </Label>
                  <Input type="color" v-model="wallColor" @change="updateColors" class="w-12 h-8 p-0 border-0" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="flex items-center gap-2 text-sm">
                    <Triangle class="h-4 w-4" />
                    Toit
                  </Label>
                  <Input type="color" v-model="roofColor" @change="updateColors" class="w-12 h-8 p-0 border-0" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="flex items-center gap-2 text-sm">
                    <DoorOpen class="h-4 w-4" />
                    Porte
                  </Label>
                  <Input type="color" v-model="doorColor" @change="updateColors" class="w-12 h-8 p-0 border-0" />
                </div>
                <div class="flex items-center justify-between">
                  <Label class="flex items-center gap-2 text-sm">
                    <Mountain class="h-4 w-4" />
                    Sol
                  </Label>
                  <Input type="color" v-model="groundColor" @change="updateColors" class="w-12 h-8 p-0 border-0" />
                </div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Éléments -->
        <Collapsible v-model:open="activeSections.elements" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Trees class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Éléments</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-1">
            <Button @click="toggleTrees" :variant="showTrees ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <TreePine class="h-4 w-4 mr-2" />
              {{ showTrees ? 'Masquer' : 'Afficher' }} arbres
            </Button>
            <Button @click="toggleFence" :variant="showFence ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Fence class="h-4 w-4 mr-2" />
              {{ showFence ? 'Masquer' : 'Afficher' }} clôture
            </Button>
            <Button @click="addRandomCloud" variant="ghost" size="sm" class="w-full justify-start">
              <Cloud class="h-4 w-4 mr-2" />
              Ajouter nuage
            </Button>
            <Button @click="toggleGarden" :variant="showGarden ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Flower2 class="h-4 w-4 mr-2" />
              {{ showGarden ? 'Masquer' : 'Afficher' }} jardin
            </Button>
            <Button @click="togglePath" :variant="showPath ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Footprints class="h-4 w-4 mr-2" />
              {{ showPath ? 'Masquer' : 'Afficher' }} chemin
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Météo & Effets -->
        <Collapsible v-model:open="activeSections.weather" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <CloudRain class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Météo & Effets</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-1">
            <Button @click="toggleRain" :variant="isRaining ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <CloudRain class="h-4 w-4 mr-2" />
              {{ isRaining ? 'Arrêter' : 'Démarrer' }} pluie
            </Button>
            <Button @click="toggleSnow" :variant="isSnowing ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Snowflake class="h-4 w-4 mr-2" />
              {{ isSnowing ? 'Arrêter' : 'Démarrer' }} neige
            </Button>
            <Button @click="toggleFog" :variant="showFog ? 'default' : 'ghost'" size="sm" class="w-full justify-start">
              <CloudFog class="h-4 w-4 mr-2" />
              {{ showFog ? 'Masquer' : 'Afficher' }} brouillard
            </Button>
            <Button @click="addFireflies" variant="ghost" size="sm" class="w-full justify-start">
              <Sparkles class="h-4 w-4 mr-2" />
              Ajouter lucioles
            </Button>
            <Button @click="toggleSmoke" :variant="showSmoke ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Flame class="h-4 w-4 mr-2" />
              {{ showSmoke ? 'Arrêter' : 'Démarrer' }} fumée
            </Button>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Animations -->
        <Collapsible v-model:open="activeSections.animations" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Play class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Animations</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-2">
            <Button @click="toggleDoorAnimation" :variant="doorOpen ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <DoorOpen class="h-4 w-4 mr-2" />
              {{ doorOpen ? 'Fermer' : 'Ouvrir' }} porte
            </Button>
            <Button @click="toggleTreeAnimation" :variant="treeAnimation ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Wind class="h-4 w-4 mr-2" />
              {{ treeAnimation ? 'Arrêter' : 'Démarrer' }} vent
            </Button>
            <Button @click="toggleRotateHouse" :variant="rotateHouse ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <RotateCw class="h-4 w-4 mr-2" />
              {{ rotateHouse ? 'Arrêter' : 'Démarrer' }} rotation
            </Button>

            <Card class="p-3">
              <div class="space-y-2">
                <Label class="flex items-center gap-2 text-sm">
                  <Gauge class="h-4 w-4" />
                  Vitesse animation
                </Label>
                <Slider :min="0.1" :max="3" :step="0.1" v-model="animationSpeedArray" class="w-full" />
                <div class="text-center text-xs text-muted-foreground">{{ animationSpeedArray[0] }}x</div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Audio -->
        <Collapsible v-model:open="activeSections.audio" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Volume2 class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Audio</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-2">
            <Button @click="toggleAmbientSound" :variant="ambientSound ? 'default' : 'ghost'" size="sm"
              class="w-full justify-start">
              <Volume2 v-if="ambientSound" class="h-4 w-4 mr-2" />
              <VolumeX v-else class="h-4 w-4 mr-2" />
              {{ ambientSound ? 'Arrêter' : 'Démarrer' }} sons ambiants
            </Button>

            <Card class="p-3">
              <div class="space-y-2">
                <Label class="flex items-center gap-2 text-sm">
                  <Volume1 class="h-4 w-4" />
                  Volume
                </Label>
                <Slider :min="0" :max="1" :step="0.1" v-model="audioVolumeArray" @update:model-value="updateAudioVolume"
                  class="w-full" />
                <div class="text-center text-xs text-muted-foreground">{{ Math.round(audioVolumeArray[0] * 100) }}%
                </div>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <!-- Section Saisons -->
        <Collapsible v-model:open="activeSections.seasons" class="space-y-2">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" class="w-full justify-between px-3 py-2 h-auto"
              :class="{ 'justify-center': isMenuCollapsed }" :disabled="isMenuCollapsed">
              <div class="flex items-center gap-2">
                <Calendar class="h-4 w-4" />
                <span v-if="!isMenuCollapsed">Saisons</span>
              </div>
              <ChevronDown v-if="!isMenuCollapsed" class="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent v-if="!isMenuCollapsed" class="space-y-2">
            <Select v-model="currentSeason" @update:model-value="changeSeason">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Choisir une saison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">🌸 Printemps</SelectItem>
                <SelectItem value="summer">☀️ Été</SelectItem>
                <SelectItem value="autumn">🍂 Automne</SelectItem>
                <SelectItem value="winter">❄️ Hiver</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>
      </ScrollArea>

      <!-- Panneau d'informations -->
      <div v-if="!isMenuCollapsed" class="p-4 border-t">
        <Card class="p-3">
          <div class="flex items-center gap-2 mb-3">
            <Info class="h-4 w-4 text-orange-500" />
            <h4 class="text-sm font-semibold text-orange-500">Informations</h4>
          </div>
          <div class="space-y-2 text-xs text-muted-foreground">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Zap class="h-3 w-3" />
                <span>FPS:</span>
              </div>
              <Badge variant="secondary">{{ fps }}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Triangle class="h-3 w-3" />
                <span>Triangles:</span>
              </div>
              <Badge variant="secondary">{{ triangleCount }}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Calendar class="h-3 w-3" />
                <span>Saison:</span>
              </div>
              <Badge variant="outline">{{ currentSeason }}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Cloud class="h-3 w-3" />
                <span>Météo:</span>
              </div>
              <Badge variant="outline">{{ currentWeather }}</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- Bouton de réduction rapide quand le menu est fermé -->
    <!-- <Button v-if="isMenuCollapsed" @click="toggleMenu" class="fixed top-4 left-4 z-40 h-12 w-12 p-0" size="icon">
      <Menu class="h-5 w-5" />
    </Button> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  Eye, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Grid3x3, Maximize, Camera,
  Sun, Moon, Lightbulb, Palette, Home, Triangle, DoorOpen, Mountain, Trees, TreePine,
  Fence, Flower2, Footprints, CloudRain, Snowflake, CloudFog, Sparkles,
  Flame, Play, Wind, RotateCw, Gauge, Volume2, VolumeX, Volume1, Calendar, Info,
  Zap, Cloud, Menu
} from 'lucide-vue-next'

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
const lightIntensity = ref([0.8])
const sunAngle = ref([45])
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
const animationSpeedArray = ref([1])
const ambientSound = ref(false)
const audioVolumeArray = ref([0.5])
const currentSeason = ref('spring')

// Variables pour les stats
const fps = ref(0)
const triangleCount = ref(0)

// Variables pour le menu
const isMenuCollapsed = ref(false)
const activeSections = ref({
  view: true,
  lighting: false,
  colors: false,
  elements: false,
  weather: false,
  animations: false,
  audio: false,
  seasons: false
})

// Computed properties pour la compatibilité
const animationSpeed = computed({
  get: () => animationSpeedArray.value[0],
  set: (val) => animationSpeedArray.value = [val]
})

const audioVolume = computed({
  get: () => audioVolumeArray.value[0],
  set: (val) => audioVolumeArray.value = [val]
})

// Groupes pour les éléments
let treesGroup: THREE.Group
let fenceGroup: THREE.Group
let cloudsGroup: THREE.Group
let gardenGroup: THREE.Group
let pathGroup: THREE.Group
let particleSystem: THREE.Points
let firefliesGroup: THREE.Group
let smokeGroup: THREE.Group
let doorGroup: THREE.Group
let clock: THREE.Clock
let raindropVelocities: number[] = []
let snowflakeVelocities: number[] = []
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

// Nouvelles fonctions pour le menu
const toggleMenu = () => {
  isMenuCollapsed.value = !isMenuCollapsed.value
}

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
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87CEEB)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(10, 8, 10)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value!,
    antialias: true,
    preserveDrawingBuffer: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1

  ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(10, 20, 10)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  const groundGeometry = new THREE.PlaneGeometry(30, 30)
  const groundMaterial = new THREE.MeshLambertMaterial({ color: groundColor.value })
  const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  ground.name = 'ground'
  scene.add(ground)

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
  directionalLight.intensity = lightIntensity.value[0]
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

/* Sidebar moderne */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  background: hsl(var(--background)) / 0.95;
  backdrop-filter: blur(16px);
  border-right: 1px solid hsl(var(--border));
  z-index: 50;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border));
  min-height: 80px;
}

.sidebar-title h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.sidebar-title p {
  margin: 0;
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 280px;
  }

  .sidebar-collapsed {
    width: 50px;
  }
}
</style>