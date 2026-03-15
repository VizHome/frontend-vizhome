/**
 * useThreeModels — Import et gestion de modèles 3D (GLTF/OBJ/FBX/STL)
 */
import * as THREE from 'three'
import { TransformControls } from 'three/addons/controls/TransformControls.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { computed, ref } from 'vue'
import { getCamera, getControls, getRenderer, getScene } from './useThreeScene'

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
let mtlLoader: MTLLoader
let fbxLoader: FBXLoader
let stlLoader: STLLoader
let dracoLoader: DRACOLoader
let transformCtrl: TransformControls | null = null

const importedModels = ref<ImportedModel[]>([])
const selectedModelId = ref<string | null>(null)
const isLoadingModel = ref(false)
const modelLoadError = ref<string | null>(null)
const transformMode = ref<'translate' | 'rotate' | 'scale'>('translate')

// OBJ : fichier en attente de confirmation de mode d'import
const pendingOBJFile = ref<File | null>(null)

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

    const fov = camera.fov * (Math.PI / 180)
    const dist = (maxDim / 2 / Math.tan(fov / 2)) * 1.8

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

  /**
   * Initialise les TransformControls Three.js.
   * Doit être appelé après initThreeJS().
   */
  const initTransformControls = () => {
    const camera = getCamera()
    const renderer = getRenderer()
    const scene = getScene()
    const orbitControls = getControls()
    if (!camera || !renderer || !scene) return
    if (transformCtrl) return // déjà initialisé (singleton)

    transformCtrl = new TransformControls(camera, renderer.domElement)
    transformCtrl.setMode(transformMode.value)

    // Synchroniser position/rotation/scale dans la ref à chaque changement
    transformCtrl.addEventListener('change', () => {
      const entry = importedModels.value.find(
        m => m.id === selectedModelId.value
      )
      if (!entry || !transformCtrl?.object) return
      const obj = transformCtrl.object
      entry.position.x = obj.position.x
      entry.position.y = obj.position.y
      entry.position.z = obj.position.z
      entry.rotation.x = obj.rotation.x
      entry.rotation.y = obj.rotation.y
      entry.rotation.z = obj.rotation.z
      entry.scale.x = obj.scale.x
      entry.scale.y = obj.scale.y
      entry.scale.z = obj.scale.z
    })

    // Désactiver OrbitControls pendant le drag pour éviter les conflits
    transformCtrl.addEventListener('dragging-changed', (event: any) => {
      if (orbitControls) orbitControls.enabled = !event.value
    })

    scene.add(transformCtrl.getHelper())
  }

  /** Change le mode de transform (translate / rotate / scale) */
  const setTransformMode = (mode: 'translate' | 'rotate' | 'scale') => {
    transformMode.value = mode
    transformCtrl?.setMode(mode)
  }

  /** Affiche ou masque le helper des TransformControls (pour les captures) */
  const setTransformVisible = (visible: boolean) => {
    if (!transformCtrl) return
    const helper = transformCtrl.getHelper()
    if (helper) helper.visible = visible
  }

  const initLoaders = () => {
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
    )
    gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    mtlLoader = new MTLLoader()
    objLoader = new OBJLoader()
    fbxLoader = new FBXLoader()
    stlLoader = new STLLoader()
  }

  const _processLoadedModel = (model: THREE.Group, fileName: string) => {
    const scene = getScene()
    const modelId = Date.now().toString()

    // 1. Normaliser la taille
    const box = new THREE.Box3().setFromObject(model)
    if (box.isEmpty()) {
      modelLoadError.value =
        'Le modèle ne contient pas de géométrie visible (OBJ vide ou sans faces)'
      isLoadingModel.value = false
      return
    }
    const size = box.getSize(new THREE.Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = 3 / maxSize
    model.scale.setScalar(scale)

    // 2. Centrer et poser au sol
    const boxScaled = new THREE.Box3().setFromObject(model)
    const center = boxScaled.getCenter(new THREE.Vector3())
    model.position.sub(center)
    const boxFinal = new THREE.Box3().setFromObject(model)
    model.position.y -= boxFinal.min.y

    // 3. Offset automatique si d'autres modèles existent déjà
    //    → placer le nouveau à droite du bounding box global existant
    if (importedModels.value.length > 0) {
      const globalBox = new THREE.Box3()
      importedModels.value.forEach(m => globalBox.expandByObject(m.model))
      const newBox = new THREE.Box3().setFromObject(model)
      const newHalfX = (newBox.max.x - newBox.min.x) / 2
      // Décaler en X : bord droit du global + gap 1 + demi-largeur du nouveau
      model.position.x = globalBox.max.x + 1 + newHalfX
    }

    model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(model)

    // 4. Recentrer la caméra sur tous les modèles (FOV-aware)
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

    // Attacher immédiatement les TransformControls au nouveau modèle
    if (transformCtrl) transformCtrl.attach(model)
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

  /**
   * Charge un OBJ avec son fichier MTL associé.
   * Les textures référencées dans le MTL sont résolues depuis le blob URL du MTL.
   */
  const _loadOBJWithMTL = (
    objBuffer: ArrayBuffer,
    mtlBuffer: ArrayBuffer,
    name: string
  ) => {
    try {
      const mtlText = new TextDecoder().decode(mtlBuffer)
      const mtlBlob = new Blob([mtlText], { type: 'text/plain' })
      const mtlUrl = URL.createObjectURL(mtlBlob)

      mtlLoader.load(
        mtlUrl,
        materials => {
          materials.preload()
          objLoader.setMaterials(materials)
          const text = new TextDecoder().decode(objBuffer)
          _processLoadedModel(objLoader.parse(text), name)
          URL.revokeObjectURL(mtlUrl)
        },
        undefined,
        () => {
          // Fallback : charger sans matériaux
          console.warn('MTL non chargé, fallback sans matériaux')
          _loadOBJ(objBuffer, name)
          URL.revokeObjectURL(mtlUrl)
        }
      )
    } catch (err) {
      console.error('Erreur OBJ+MTL:', err)
      modelLoadError.value = 'Erreur lors du chargement OBJ+MTL'
      isLoadingModel.value = false
    }
  }

  const _loadSTL = (buffer: ArrayBuffer, name: string) => {
    try {
      const geometry = stlLoader.parse(buffer)
      geometry.computeVertexNormals()
      const material = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.6,
        metalness: 0.1,
      })
      const mesh = new THREE.Mesh(geometry, material)
      const group = new THREE.Group()
      group.add(mesh)
      _processLoadedModel(group, name)
    } catch (err) {
      console.error('Erreur STL:', err)
      modelLoadError.value = 'Erreur lors du chargement du modèle STL'
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

  const _loadFromFile = (file: File, mtlFile?: File) => {
    isLoadingModel.value = true
    modelLoadError.value = null
    const reader = new FileReader()
    reader.onload = event => {
      const buffer = event.target?.result as ArrayBuffer
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (ext === 'glb' || ext === 'gltf') {
        _loadGLTF(buffer, file.name)
      } else if (ext === 'obj') {
        if (mtlFile) {
          const mtlReader = new FileReader()
          mtlReader.onload = mtlEvent => {
            _loadOBJWithMTL(
              buffer,
              mtlEvent.target?.result as ArrayBuffer,
              file.name
            )
          }
          mtlReader.onerror = () => {
            modelLoadError.value = 'Impossible de lire le fichier .mtl'
            isLoadingModel.value = false
          }
          mtlReader.readAsArrayBuffer(mtlFile)
        } else {
          _loadOBJ(buffer, file.name)
        }
      } else if (ext === 'fbx') {
        _loadFBX(buffer, file.name)
      } else if (ext === 'stl') {
        _loadSTL(buffer, file.name)
      } else {
        modelLoadError.value = 'Format non supporté (.glb .gltf .obj .fbx .stl)'
        isLoadingModel.value = false
      }
    }
    reader.onerror = () => {
      modelLoadError.value = 'Impossible de lire le fichier'
      isLoadingModel.value = false
    }
    reader.readAsArrayBuffer(file)
  }

  const importModel = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.glb,.gltf,.obj,.fbx,.stl'
    input.style.display = 'none'
    document.body.appendChild(input)
    input.onchange = e => {
      document.body.removeChild(input)
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const ext = file.name.split('.').pop()?.toLowerCase()
      // Pour les OBJ : afficher la modale de choix dans le panel
      if (ext === 'obj') {
        pendingOBJFile.value = file
        return
      }
      _loadFromFile(file)
    }
    // Nettoyage si l'utilisateur annule sans choisir de fichier
    input.addEventListener('cancel', () => {
      if (document.body.contains(input)) document.body.removeChild(input)
    })
    input.click()
  }

  /** Confirme l'import OBJ avec ou sans MTL (appelé depuis ThreeControls) */
  const confirmOBJImport = (withMtl: boolean) => {
    const file = pendingOBJFile.value
    if (!file) return
    pendingOBJFile.value = null

    if (withMtl) {
      const mtlInput = document.createElement('input')
      mtlInput.type = 'file'
      mtlInput.accept = '.mtl'
      mtlInput.style.display = 'none'
      document.body.appendChild(mtlInput)
      mtlInput.onchange = mtlE => {
        document.body.removeChild(mtlInput)
        const mtlFile = (mtlE.target as HTMLInputElement).files?.[0]
        _loadFromFile(file, mtlFile)
      }
      mtlInput.addEventListener('cancel', () => {
        if (document.body.contains(mtlInput))
          document.body.removeChild(mtlInput)
        // Si l'utilisateur annule la sélection du MTL, charger sans matériaux
        _loadFromFile(file)
      })
      mtlInput.click()
    } else {
      _loadFromFile(file)
    }
  }

  /** Annule l'import OBJ en attente */
  const cancelOBJImport = () => {
    pendingOBJFile.value = null
  }

  const removeModel = (modelId: string) => {
    const scene = getScene()
    const idx = importedModels.value.findIndex(m => m.id === modelId)
    if (idx !== -1) {
      const entry = importedModels.value[idx]
      if (entry) scene.remove(entry.model)
      importedModels.value.splice(idx, 1)
      if (selectedModelId.value === modelId) {
        selectedModelId.value = null
        transformCtrl?.detach()
      }
      // Réinitialiser la caméra si plus aucun modèle
      if (importedModels.value.length === 0) {
        const camera = getCamera()
        const controls = getControls()
        if (camera && controls) {
          camera.position.set(10, 8, 10)
          camera.near = 0.1
          camera.far = 1000
          camera.updateProjectionMatrix()
          controls.target.set(0, 0, 0)
          controls.reset()
        }
      }
    }
  }

  const selectModel = (modelId: string) => {
    // Toggle : si déjà sélectionné → désélectionner
    if (selectedModelId.value === modelId) {
      selectedModelId.value = null
      transformCtrl?.detach()
      return
    }
    selectedModelId.value = modelId
    const entry = importedModels.value.find(m => m.id === modelId)
    if (entry && transformCtrl) {
      transformCtrl.attach(entry.model)
    }
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
    transformMode,
    pendingOBJFile,
    initLoaders,
    initTransformControls,
    importModel,
    confirmOBJImport,
    cancelOBJImport,
    removeModel,
    selectModel,
    updateModelPosition,
    updateModelRotation,
    updateModelScale,
    fitCameraToModels,
    setTransformMode,
    setTransformVisible,
  }
}
