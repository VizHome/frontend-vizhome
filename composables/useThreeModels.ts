/**
 * useThreeModels — Import et gestion de modèles 3D (GLTF/OBJ/FBX)
 */
import * as THREE from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { computed, ref } from 'vue'
import { getCamera, getControls, getScene } from './useThreeScene'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ImportedModel {
  id: string
  name: string
  model: THREE.Group
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
}

// ─── État singleton ──────────────────────────────────────────────────────────
let gltfLoader: GLTFLoader
let objLoader: OBJLoader
let fbxLoader: FBXLoader
let dracoLoader: DRACOLoader

const importedModels = ref<ImportedModel[]>([])
const selectedModelId = ref<string | null>(null)
const isLoadingModel = ref(false)
const modelLoadError = ref<string | null>(null)

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeModels() {
  const selectedModel = computed(() =>
    importedModels.value.find(m => m.id === selectedModelId.value)
  )

  /** Ajuste la caméra pour cadrer tous les modèles (ou un modèle donné) */
  const fitCameraToModels = (target?: THREE.Group) => {
    const camera = getCamera()
    const controls = getControls()
    if (!camera || !controls) return

    // Construire le bounding box global de tous les modèles (ou du modèle cible)
    const box = new THREE.Box3()
    if (target) {
      box.setFromObject(target)
    } else {
      importedModels.value.forEach(m => box.expandByObject(m.model))
    }
    if (box.isEmpty()) return

    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // Distance de vue : on veut le modèle entier visible avec un peu de marge
    const fov = camera.fov * (Math.PI / 180)
    const dist = (maxDim / 2 / Math.tan(fov / 2)) * 1.8

    // Position caméra : légèrement en hauteur et de biais (vue 3/4)
    camera.position.set(
      center.x + dist * 0.6,
      center.y + dist * 0.5,
      center.z + dist * 0.6
    )
    camera.near = dist * 0.01
    camera.far = dist * 10
    camera.updateProjectionMatrix()

    controls.target.copy(center)
    controls.update()
  }

  const initLoaders = () => {
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
    )
    gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    objLoader = new OBJLoader()
    fbxLoader = new FBXLoader()
  }

  const _processLoadedModel = (model: THREE.Group, fileName: string) => {
    const scene = getScene()
    const modelId = Date.now().toString()

    // 1. Calculer le bounding box avant scaling pour normaliser la taille
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = 3 / maxSize
    model.scale.setScalar(scale)

    // 2. Recalculer le bounding box après scaling et centrer sur l'origine
    const boxScaled = new THREE.Box3().setFromObject(model)
    const center = boxScaled.getCenter(new THREE.Vector3())
    model.position.sub(center)
    // Poser le modèle sur le sol (y=0)
    const boxFinal = new THREE.Box3().setFromObject(model)
    model.position.y -= boxFinal.min.y

    model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(model)

    // 3. Recentrer la caméra sur le modèle importé (avec calcul FOV-aware)
    fitCameraToModels(model)

    importedModels.value.push({
      id: modelId,
      name: fileName.split('.')[0] ?? fileName,
      model,
      position: {
        x: model.position.x,
        y: model.position.y,
        z: model.position.z,
      },
      rotation: {
        x: model.rotation.x,
        y: model.rotation.y,
        z: model.rotation.z,
      },
      scale: { x: model.scale.x, y: model.scale.y, z: model.scale.z },
    })
    isLoadingModel.value = false
    selectedModelId.value = modelId
  }

  const _loadGLTF = (buffer: ArrayBuffer, name: string) => {
    gltfLoader.parse(
      buffer,
      '',
      gltf => _processLoadedModel(gltf.scene, name),
      err => {
        console.error('Erreur GLTF:', err)
        modelLoadError.value = 'Erreur lors du chargement du modèle GLTF'
        isLoadingModel.value = false
      }
    )
  }

  const _loadOBJ = (buffer: ArrayBuffer, name: string) => {
    try {
      const text = new TextDecoder().decode(buffer)
      _processLoadedModel(objLoader.parse(text), name)
    } catch (err) {
      console.error('Erreur OBJ:', err)
      modelLoadError.value = 'Erreur lors du chargement du modèle OBJ'
      isLoadingModel.value = false
    }
  }

  const _loadFBX = (buffer: ArrayBuffer, name: string) => {
    try {
      _processLoadedModel(fbxLoader.parse(buffer, ''), name)
    } catch (err) {
      console.error('Erreur FBX:', err)
      modelLoadError.value = 'Erreur lors du chargement du modèle FBX'
      isLoadingModel.value = false
    }
  }

  const _loadFromFile = (file: File) => {
    isLoadingModel.value = true
    modelLoadError.value = null
    const reader = new FileReader()
    reader.onload = event => {
      const buffer = event.target?.result as ArrayBuffer
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (ext === 'glb' || ext === 'gltf') _loadGLTF(buffer, file.name)
      else if (ext === 'obj') _loadOBJ(buffer, file.name)
      else if (ext === 'fbx') _loadFBX(buffer, file.name)
      else {
        modelLoadError.value = 'Format de fichier non supporté'
        isLoadingModel.value = false
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const importModel = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.glb,.gltf,.obj,.fbx'
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) _loadFromFile(file)
    }
    input.click()
  }

  const removeModel = (modelId: string) => {
    const scene = getScene()
    const idx = importedModels.value.findIndex(m => m.id === modelId)
    if (idx !== -1) {
      const entry = importedModels.value[idx]
      if (entry) scene.remove(entry.model)
      importedModels.value.splice(idx, 1)
      if (selectedModelId.value === modelId) selectedModelId.value = null
    }
  }

  const selectModel = (modelId: string) => {
    selectedModelId.value = selectedModelId.value === modelId ? null : modelId
  }

  const updateModelPosition = (axis: 'x' | 'y' | 'z', value: number) => {
    const m = selectedModel.value
    if (m) {
      m.position[axis] = value
      m.model.position[axis] = value
    }
  }

  const updateModelRotation = (axis: 'x' | 'y' | 'z', value: number) => {
    const m = selectedModel.value
    if (m) {
      const rad = (value * Math.PI) / 180
      m.rotation[axis] = rad
      m.model.rotation[axis] = rad
    }
  }

  const updateModelScale = (value: number) => {
    const m = selectedModel.value
    if (m) {
      m.scale.x = m.scale.y = m.scale.z = value
      m.model.scale.setScalar(value)
    }
  }

  return {
    importedModels,
    selectedModelId,
    isLoadingModel,
    modelLoadError,
    selectedModel,
    initLoaders,
    importModel,
    removeModel,
    selectModel,
    updateModelPosition,
    updateModelRotation,
    updateModelScale,
    fitCameraToModels,
  }
}
