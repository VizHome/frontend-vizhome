/**
 * useThreeAnnotations — Hotspots 3D (pastilles) cliquables sur les meshes
 *
 * Fonctionnement :
 *   - En mode "annotation", un clic sur le canvas place un hotspot (Sprite) à la position exacte du rayhit
 *   - Chaque hotspot peut recevoir un label et une texture à appliquer au mesh ciblé
 *   - Les sprites sont toujours face caméra (billboard natif Three.js)
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getCamera, getScene } from './useThreeScene'

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Annotation {
  id: string
  label: string
  sprite: THREE.Sprite
  targetMesh: THREE.Mesh
  position: THREE.Vector3
  textureFileName: string | null
}

// ─── État singleton ──────────────────────────────────────────────────────────
const isAnnotationMode = ref(false)
const annotations = ref<Annotation[]>([])
const annotationError = ref<string | null>(null)

let _canvas: HTMLCanvasElement | null = null
let _clickHandler: ((e: MouseEvent) => void) | null = null

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Crée la texture canvas du sprite (cercle coloré + bordure blanche) */
const _makeSpriteMaterial = (color = '#6366f1'): THREE.SpriteMaterial => {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Ombre portée
  ctx.shadowColor = 'rgba(0,0,0,0.4)'
  ctx.shadowBlur = 10

  // Cercle principal
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()

  // Bordure blanche
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 8
  ctx.stroke()

  // Point central blanc
  ctx.shadowBlur = 0
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, 10, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  return new THREE.SpriteMaterial({
    map: texture,
    depthTest: false,
    sizeAttenuation: true,
  })
}

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeAnnotations() {
  const toggleAnnotationMode = (canvas: HTMLCanvasElement) => {
    isAnnotationMode.value = !isAnnotationMode.value
    if (isAnnotationMode.value) {
      _canvas = canvas
      _clickHandler = (e: MouseEvent) => _onCanvasClick(e)
      canvas.addEventListener('click', _clickHandler)
    } else {
      if (_canvas && _clickHandler) {
        _canvas.removeEventListener('click', _clickHandler)
      }
      _canvas = null
      _clickHandler = null
    }
  }

  const disableAnnotationMode = () => {
    if (!isAnnotationMode.value) return
    isAnnotationMode.value = false
    if (_canvas && _clickHandler) {
      _canvas.removeEventListener('click', _clickHandler)
    }
    _canvas = null
    _clickHandler = null
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
    const hit = intersects.find(
      i => i.object.name !== 'groundPlane' && i.object instanceof THREE.Mesh
    )
    if (!hit) return

    const id = Date.now().toString()
    const material = _makeSpriteMaterial()
    const sprite = new THREE.Sprite(material)

    // Positionner le sprite légèrement devant la surface (évite le z-fighting)
    const pos = hit.point
      .clone()
      .add(hit.face!.normal.clone().multiplyScalar(0.05))
    sprite.position.copy(pos)

    // Taille du sprite proportionnelle au modèle
    const box = new THREE.Box3().setFromObject(hit.object)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    sprite.scale.setScalar(maxDim * 0.12)

    sprite.name = `annotation-${id}`
    scene.add(sprite)

    annotations.value.push({
      id,
      label: `Matériau ${annotations.value.length + 1}`,
      sprite,
      targetMesh: hit.object as THREE.Mesh,
      position: pos,
      textureFileName: null,
    })
  }

  /** Supprime un hotspot de la scène */
  const removeAnnotation = (id: string) => {
    const scene = getScene()
    const idx = annotations.value.findIndex(a => a.id === id)
    if (idx === -1) return
    const ann = annotations.value[idx]!
    scene.remove(ann.sprite)
    ann.sprite.material.map?.dispose()
    ann.sprite.material.dispose()
    annotations.value.splice(idx, 1)
  }

  /** Ouvre un file picker et applique la texture au mesh ciblé par le hotspot */
  const applyTextureToAnnotation = (id: string) => {
    const ann = annotations.value.find(a => a.id === id)
    if (!ann) return
    annotationError.value = null

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png,image/jpeg,image/webp'
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      const loader = new THREE.TextureLoader()
      loader.load(
        url,
        texture => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping

          const mesh = ann.targetMesh
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(m => {
              const mat = m as THREE.MeshStandardMaterial
              mat.map = texture
              mat.needsUpdate = true
            })
          } else {
            const mat = mesh.material as THREE.MeshStandardMaterial
            mat.map = texture
            mat.needsUpdate = true
          }

          ann.textureFileName = file.name

          // Passer le sprite en vert pour indiquer texture appliquée
          const mat = _makeSpriteMaterial('#22c55e')
          ann.sprite.material.map?.dispose()
          ann.sprite.material.dispose()
          ann.sprite.material = mat
        },
        undefined,
        () => {
          annotationError.value = 'Impossible de charger la texture'
          URL.revokeObjectURL(url)
        }
      )
    }
    input.click()
  }

  /** Met à jour le label d'un hotspot */
  const updateAnnotationLabel = (id: string, label: string) => {
    const ann = annotations.value.find(a => a.id === id)
    if (ann) ann.label = label
  }

  /** Supprime tous les hotspots */
  const clearAnnotations = () => {
    const scene = getScene()
    annotations.value.forEach(ann => {
      scene.remove(ann.sprite)
      ann.sprite.material.map?.dispose()
      ann.sprite.material.dispose()
    })
    annotations.value = []
  }

  return {
    isAnnotationMode,
    annotations,
    annotationError,
    toggleAnnotationMode,
    disableAnnotationMode,
    removeAnnotation,
    applyTextureToAnnotation,
    updateAnnotationLabel,
    clearAnnotations,
  }
}
