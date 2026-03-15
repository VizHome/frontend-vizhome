/**
 * useThreeMeshSelect — Sélection de mesh par raycasting + assignation de texture
 *
 * Fonctionnement :
 *   - En mode "select", un clic sur le canvas raycast la scène et sélectionne le mesh touché
 *   - Le mesh sélectionné est mis en surbrillance (emissive)
 *   - On peut lui assigner une texture PNG/JPG via file picker
 *   - On peut ajuster roughness/metalness
 *   - On peut appliquer des effets procéduraux (sans image)
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getCamera, getScene } from './useThreeScene'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface SelectedMesh {
  mesh: THREE.Mesh
  name: string
  originalEmissive: THREE.Color
  textureUrl: string | null
}

// ─── Effets procéduraux ───────────────────────────────────────────────────────
export interface MaterialEffect {
  id: string
  label: string
  emoji: string
  apply: (mesh: THREE.Mesh) => void
}

export const MATERIAL_EFFECTS: MaterialEffect[] = [
  {
    id: 'metal',
    label: 'Métal poli',
    emoji: '🪨',
    apply: mesh => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 1.0,
        roughness: 0.05,
      })
      mesh.material = mat
    },
  },
  {
    id: 'glass',
    label: 'Verre',
    emoji: '🔷',
    apply: mesh => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xaaddff,
        metalness: 0,
        roughness: 0,
        transmission: 0.95,
        thickness: 0.5,
        transparent: true,
        opacity: 0.35,
      })
      mesh.material = mat
    },
  },
  {
    id: 'clay',
    label: 'Argile',
    emoji: '🟤',
    apply: mesh => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xc4956a,
        metalness: 0,
        roughness: 1.0,
      })
      mesh.material = mat
    },
  },
  {
    id: 'wireframe',
    label: 'Fil de fer',
    emoji: '🕸️',
    apply: mesh => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
      })
      mesh.material = mat
    },
  },
  {
    id: 'neon',
    label: 'Néon',
    emoji: '💜',
    apply: mesh => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x220044,
        emissive: new THREE.Color(0x9900ff),
        emissiveIntensity: 1.5,
        metalness: 0.3,
        roughness: 0.2,
      })
      mesh.material = mat
    },
  },
  {
    id: 'iridescent',
    label: 'Iridescent',
    emoji: '🌈',
    apply: mesh => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.1,
        iridescence: 1.0,
        iridescenceIOR: 1.8,
      })
      mesh.material = mat
    },
  },
]

// ─── État singleton ──────────────────────────────────────────────────────────
const isMeshSelectMode = ref(false)
const selectedMesh = ref<SelectedMesh | null>(null)
const meshSelectError = ref<string | null>(null)

let _canvas: HTMLCanvasElement | null = null
let _clickHandler: ((e: MouseEvent) => void) | null = null

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeMeshSelect() {
  /** Active/désactive le mode sélection de mesh */
  const toggleMeshSelectMode = (canvas: HTMLCanvasElement) => {
    isMeshSelectMode.value = !isMeshSelectMode.value
    if (isMeshSelectMode.value) {
      _canvas = canvas
      _clickHandler = (e: MouseEvent) => _onCanvasClick(e)
      canvas.addEventListener('click', _clickHandler)
    } else {
      _deselect()
      if (_canvas && _clickHandler) {
        _canvas.removeEventListener('click', _clickHandler)
      }
      _canvas = null
      _clickHandler = null
    }
  }

  /** Désactive proprement le mode sans toggle */
  const disableMeshSelectMode = () => {
    if (!isMeshSelectMode.value) return
    isMeshSelectMode.value = false
    _deselect()
    if (_canvas && _clickHandler) {
      _canvas.removeEventListener('click', _clickHandler)
    }
    _canvas = null
    _clickHandler = null
  }

  const _deselect = () => {
    if (selectedMesh.value) {
      // Restaurer l'emissive d'origine
      const mat = selectedMesh.value.mesh.material
      if (mat && !Array.isArray(mat) && 'emissive' in mat) {
        ;(mat as THREE.MeshStandardMaterial).emissive.copy(
          selectedMesh.value.originalEmissive
        )
      }
      selectedMesh.value = null
    }
  }

  const _onCanvasClick = (e: MouseEvent) => {
    if (!_canvas) return
    const camera = getCamera()
    const scene = getScene()
    if (!camera || !scene) return

    const rect = _canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)

    const intersects = raycaster.intersectObjects(scene.children, true)

    // Ignorer le sol (groundPlane)
    const hit = intersects.find(
      i => i.object.name !== 'groundPlane' && i.object instanceof THREE.Mesh
    )

    if (!hit) {
      _deselect()
      return
    }

    const mesh = hit.object as THREE.Mesh

    // Désélectionner l'ancien
    _deselect()

    // Mémoriser l'emissive d'origine et appliquer surbrillance
    let originalEmissive = new THREE.Color(0x000000)
    if (mesh.material && !Array.isArray(mesh.material)) {
      const mat = mesh.material as THREE.MeshStandardMaterial
      if ('emissive' in mat) {
        originalEmissive = mat.emissive.clone()
        mat.emissive.set(0x333333)
      }
    }

    selectedMesh.value = {
      mesh,
      name: mesh.name || mesh.uuid.slice(0, 8),
      originalEmissive,
      textureUrl: null,
    }
  }

  /** Ouvre un file picker et applique la texture au mesh sélectionné */
  const applyTextureToSelected = () => {
    if (!selectedMesh.value) return
    meshSelectError.value = null

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png,image/jpeg,image/webp'
    input.style.display = 'none'
    document.body.appendChild(input)
    input.onchange = e => {
      if (document.body.contains(input)) document.body.removeChild(input)
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file || !selectedMesh.value) return

      const url = URL.createObjectURL(file)
      const loader = new THREE.TextureLoader()
      loader.load(
        url,
        texture => {
          if (!selectedMesh.value) return
          texture.colorSpace = THREE.SRGBColorSpace
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping

          const mesh = selectedMesh.value.mesh
          if (mesh.material && !Array.isArray(mesh.material)) {
            const mat = mesh.material as THREE.MeshStandardMaterial
            mat.map = texture
            mat.needsUpdate = true
          } else if (Array.isArray(mesh.material)) {
            // Multi-matériaux : appliquer à tous
            mesh.material.forEach(m => {
              const mat = m as THREE.MeshStandardMaterial
              mat.map = texture
              mat.needsUpdate = true
            })
          }
          selectedMesh.value.textureUrl = file.name
        },
        undefined,
        () => {
          meshSelectError.value = 'Impossible de charger la texture'
          URL.revokeObjectURL(url)
        }
      )
    }
    input.addEventListener('cancel', () => {
      if (document.body.contains(input)) document.body.removeChild(input)
    })
    input.click()
  }

  /** Ajuste roughness du mesh sélectionné */
  const setRoughness = (value: number) => {
    if (!selectedMesh.value) return
    const mat = selectedMesh.value.mesh.material
    if (mat && !Array.isArray(mat) && 'roughness' in mat) {
      ;(mat as THREE.MeshStandardMaterial).roughness = value
    }
  }

  /** Ajuste metalness du mesh sélectionné */
  const setMetalness = (value: number) => {
    if (!selectedMesh.value) return
    const mat = selectedMesh.value.mesh.material
    if (mat && !Array.isArray(mat) && 'metalness' in mat) {
      ;(mat as THREE.MeshStandardMaterial).metalness = value
    }
  }

  /** Lit roughness actuelle */
  const getRoughness = (): number => {
    if (!selectedMesh.value) return 0.5
    const mat = selectedMesh.value.mesh.material
    if (mat && !Array.isArray(mat) && 'roughness' in mat) {
      return (mat as THREE.MeshStandardMaterial).roughness
    }
    return 0.5
  }

  /** Lit metalness actuelle */
  const getMetalness = (): number => {
    if (!selectedMesh.value) return 0
    const mat = selectedMesh.value.mesh.material
    if (mat && !Array.isArray(mat) && 'metalness' in mat) {
      return (mat as THREE.MeshStandardMaterial).metalness
    }
    return 0
  }

  /** Applique un effet procédural prédéfini au mesh sélectionné */
  const applyEffectToSelected = (effectId: string) => {
    if (!selectedMesh.value) return
    const effect = MATERIAL_EFFECTS.find(e => e.id === effectId)
    if (!effect) return
    meshSelectError.value = null

    const mesh = selectedMesh.value.mesh
    // Disposer l'ancien matériau si possible
    if (!Array.isArray(mesh.material)) {
      mesh.material.dispose()
    }
    effect.apply(mesh)
    // Réinitialiser la textureUrl (plus de texture image)
    selectedMesh.value.textureUrl = null
  }

  return {
    isMeshSelectMode,
    selectedMesh,
    meshSelectError,
    toggleMeshSelectMode,
    disableMeshSelectMode,
    applyTextureToSelected,
    applyEffectToSelected,
    setRoughness,
    setMetalness,
    getRoughness,
    getMetalness,
  }
}
