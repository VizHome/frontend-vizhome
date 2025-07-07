<template>
  <div class="render-container">
    <canvas ref="canvasRef" class="render-canvas"></canvas>

    <!-- Sidebar avec shadcn-vue -->
    <SidebarProvider :default-open="true">
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <!-- En-tête du menu -->
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton class="px-2">
                <div class="flex items-center gap-2">
                  <div
                    class="h-8 w-8 bg-gradient-to-r from-primary to-primary-foreground rounded-lg flex items-center justify-center">
                    <span class="text-sm font-bold text-primary-foreground">VH</span>
                  </div>
                  <div class="group-data-[collapsible=icon]:hidden">
                    <p class="text-sm font-semibold">VizHome</p>
                    <p class="text-xs text-muted-foreground">Rendu 3D interactif</p>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <!-- Contenu du menu -->
        <SidebarContent>
          <!-- Section Vue -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Eye class="h-4 w-4" />
              Vue
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="resetCamera">
                    <RotateCcw class="h-4 w-4" />
                    <span>Réinitialiser la vue</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleWireframe">
                    <Grid3x3 class="h-4 w-4" />
                    <span>{{ wireframe ? 'Solide' : 'Filaire' }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleFullscreen">
                    <Maximize class="h-4 w-4" />
                    <span>Plein écran</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="captureScreenshot">
                    <Camera class="h-4 w-4" />
                    <span>Capture d'écran</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Éclairage -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Sun class="h-4 w-4" />
              Éclairage
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleDayNight">
                    <Moon v-if="isDay" class="h-4 w-4" />
                    <Sun v-else class="h-4 w-4" />
                    <span>{{ isDay ? 'Mode Nuit' : 'Mode Jour' }}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden">
                    <Label class="flex items-center gap-2 text-xs">
                      <Lightbulb class="h-3 w-3" />
                      Intensité lumière
                    </Label>
                    <Slider :min="0" :max="2" :step="0.1" v-model="lightIntensity" @update:model-value="updateLighting"
                      class="w-full" />
                    <div class="text-center text-xs text-muted-foreground">{{ lightIntensity[0] }}</div>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden">
                    <Label class="flex items-center gap-2 text-xs">
                      <Sun class="h-3 w-3" />
                      Angle du soleil
                    </Label>
                    <Slider :min="0" :max="360" :step="1" v-model="sunAngle" @update:model-value="updateSunPosition"
                      class="w-full" />
                    <div class="text-center text-xs text-muted-foreground">{{ sunAngle[0] }}°</div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Couleurs -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Palette class="h-4 w-4" />
              Couleurs
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div class="px-2 py-2 space-y-3 group-data-[collapsible=icon]:hidden">
                    <div class="flex items-center justify-between">
                      <Label class="flex items-center gap-2 text-xs">
                        <Home class="h-3 w-3" />
                        Murs
                      </Label>
                      <Input type="color" v-model="wallColor" @change="updateColors" class="w-8 h-6 p-0 border-0" />
                    </div>
                    <div class="flex items-center justify-between">
                      <Label class="flex items-center gap-2 text-xs">
                        <Triangle class="h-3 w-3" />
                        Toit
                      </Label>
                      <Input type="color" v-model="roofColor" @change="updateColors" class="w-8 h-6 p-0 border-0" />
                    </div>
                    <div class="flex items-center justify-between">
                      <Label class="flex items-center gap-2 text-xs">
                        <DoorOpen class="h-3 w-3" />
                        Porte
                      </Label>
                      <Input type="color" v-model="doorColor" @change="updateColors" class="w-8 h-6 p-0 border-0" />
                    </div>
                    <div class="flex items-center justify-between">
                      <Label class="flex items-center gap-2 text-xs">
                        <Mountain class="h-3 w-3" />
                        Sol
                      </Label>
                      <Input type="color" v-model="groundColor" @change="updateColors" class="w-8 h-6 p-0 border-0" />
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Éléments -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Trees class="h-4 w-4" />
              Éléments
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleTrees" :variant="showTrees ? 'default' : 'outline'">
                    <TreePine class="h-4 w-4" />
                    <span>{{ showTrees ? 'Masquer' : 'Afficher' }} arbres</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleFence" :variant="showFence ? 'default' : 'outline'">
                    <Fence class="h-4 w-4" />
                    <span>{{ showFence ? 'Masquer' : 'Afficher' }} clôture</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="addRandomCloud">
                    <Cloud class="h-4 w-4" />
                    <span>Ajouter nuage</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleGarden" :variant="showGarden ? 'default' : 'outline'">
                    <Flower2 class="h-4 w-4" />
                    <span>{{ showGarden ? 'Masquer' : 'Afficher' }} jardin</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="togglePath" :variant="showPath ? 'default' : 'outline'">
                    <Footprints class="h-4 w-4" />
                    <span>{{ showPath ? 'Masquer' : 'Afficher' }} chemin</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Météo & Effets -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <CloudRain class="h-4 w-4" />
              Météo & Effets
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleRain" :variant="isRaining ? 'default' : 'outline'">
                    <CloudRain class="h-4 w-4" />
                    <span>{{ isRaining ? 'Arrêter' : 'Démarrer' }} pluie</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleSnow" :variant="isSnowing ? 'default' : 'outline'">
                    <Snowflake class="h-4 w-4" />
                    <span>{{ isSnowing ? 'Arrêter' : 'Démarrer' }} neige</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleFog" :variant="showFog ? 'default' : 'outline'">
                    <CloudFog class="h-4 w-4" />
                    <span>{{ showFog ? 'Masquer' : 'Afficher' }} brouillard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="addFireflies">
                    <Sparkles class="h-4 w-4" />
                    <span>Ajouter lucioles</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleSmoke" :variant="showSmoke ? 'default' : 'outline'">
                    <Flame class="h-4 w-4" />
                    <span>{{ showSmoke ? 'Arrêter' : 'Démarrer' }} fumée</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Animations -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Play class="h-4 w-4" />
              Animations
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleDoorAnimation" :variant="doorOpen ? 'default' : 'outline'">
                    <DoorOpen class="h-4 w-4" />
                    <span>{{ doorOpen ? 'Fermer' : 'Ouvrir' }} porte</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleTreeAnimation" :variant="treeAnimation ? 'default' : 'outline'">
                    <Wind class="h-4 w-4" />
                    <span>{{ treeAnimation ? 'Arrêter' : 'Démarrer' }} vent</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleRotateHouse" :variant="rotateHouse ? 'default' : 'outline'">
                    <RotateCw class="h-4 w-4" />
                    <span>{{ rotateHouse ? 'Arrêter' : 'Démarrer' }} rotation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden">
                    <Label class="flex items-center gap-2 text-xs">
                      <Gauge class="h-3 w-3" />
                      Vitesse animation
                    </Label>
                    <Slider :min="0.1" :max="3" :step="0.1" v-model="animationSpeedArray" class="w-full" />
                    <div class="text-center text-xs text-muted-foreground">{{ animationSpeedArray[0] }}x</div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Audio -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Volume2 class="h-4 w-4" />
              Audio
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton @click="toggleAmbientSound" :variant="ambientSound ? 'default' : 'outline'">
                    <Volume2 v-if="ambientSound" class="h-4 w-4" />
                    <VolumeX v-else class="h-4 w-4" />
                    <span>{{ ambientSound ? 'Arrêter' : 'Démarrer' }} sons ambiants</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div class="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden">
                    <Label class="flex items-center gap-2 text-xs">
                      <Volume1 class="h-3 w-3" />
                      Volume
                    </Label>
                    <Slider :min="0" :max="1" :step="0.1" v-model="audioVolumeArray"
                      @update:model-value="updateAudioVolume" class="w-full" />
                    <div class="text-center text-xs text-muted-foreground">{{ Math.round(audioVolumeArray[0] * 100) }}%
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Section Saisons -->
          <SidebarGroup>
            <SidebarGroupLabel>
              <Calendar class="h-4 w-4" />
              Saisons
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
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
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <!-- Panneau d'informations -->
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div class="px-2 py-2 group-data-[collapsible=icon]:hidden">
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
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <!-- Zone de rendu 3D -->
      <SidebarInset class="relative">
        <!-- Bouton pour ouvrir/fermer la sidebar -->
        <div class="absolute top-4 left-4 z-10">
          <SidebarTrigger />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {
  Eye, RotateCcw, Grid3x3, Maximize, Camera, Sun, Moon, Lightbulb, Palette, Home, Triangle,
  DoorOpen, Mountain, Trees, TreePine, Fence, Flower2, Footprints, CloudRain,
  Snowflake, CloudFog, Sparkles, Flame, Play, Wind, RotateCw, Gauge, Volume2, VolumeX,
  Volume1, Calendar, Info, Zap, Cloud
} from 'lucide-vue-next'
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarRail, SidebarTrigger
} from '@/components/ui/sidebar'

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

const updateSunPosition = () => {
  const angle = (sunAngle.value[0] * Math.PI) / 180
  directionalLight.position.x = Math.cos(angle) * 20
  directionalLight.position.z = Math.sin(angle) * 20
}

const updateAudioVolume = () => {
  // Mettre à jour le volume audio avec audioVolumeArray.value[0]
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
</style>