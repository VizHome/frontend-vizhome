/**
 * useThreeElements — Arbres, clôture, jardin, chemin, nuages, saisons
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getScene } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let treesGroup: THREE.Group
let fenceGroup: THREE.Group
let cloudsGroup: THREE.Group
let gardenGroup: THREE.Group
let pathGroup: THREE.Group

const showTrees = ref(false)
const showFence = ref(false)
const showGarden = ref(false)
const showPath = ref(false)
const currentSeason = ref('spring')
const treeAnimation = ref(false)

type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter'

const SEASONS: Record<
  SeasonKey,
  {
    treeColor: number
    groundColor: number
    gradientTop: string
    gradientBottom: string
  }
> = {
  spring: {
    treeColor: 0x90ee90,
    groundColor: 0x90ee90,
    gradientTop: '#e6f3ff',
    gradientBottom: '#b3d9ff',
  },
  summer: {
    treeColor: 0x228b22,
    groundColor: 0x32cd32,
    gradientTop: '#ffffff',
    gradientBottom: '#87ceeb',
  },
  autumn: {
    treeColor: 0xffa500,
    groundColor: 0xdaa520,
    gradientTop: '#fff8dc',
    gradientBottom: '#daa520',
  },
  winter: {
    treeColor: 0x708090,
    groundColor: 0xe0e0e0,
    gradientTop: '#f0f8ff',
    gradientBottom: '#778899',
  },
}

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeElements() {
  const createOptionalElements = () => {
    const scene = getScene()

    treesGroup = new THREE.Group()
    _createTrees()
    scene.add(treesGroup)

    fenceGroup = new THREE.Group()
    _createFence()
    scene.add(fenceGroup)

    cloudsGroup = new THREE.Group()
    scene.add(cloudsGroup)

    gardenGroup = new THREE.Group()
    _createGarden()
    scene.add(gardenGroup)

    pathGroup = new THREE.Group()
    _createPath()
    scene.add(pathGroup)

    // Masquer par défaut
    treesGroup.visible = false
    fenceGroup.visible = false
    gardenGroup.visible = false
    pathGroup.visible = false
  }

  const _createTrees = () => {
    const positions: [number, number, number][] = [
      [-8, 0, -5],
      [8, 0, -8],
      [-10, 0, 5],
      [10, 0, 8],
      [5, 0, -10],
    ]
    positions.forEach(pos => {
      const tree = new THREE.Group()
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 2),
        new THREE.MeshLambertMaterial({ color: 0x8b4513 })
      )
      trunk.position.y = 1
      trunk.castShadow = true
      tree.add(trunk)
      const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 8, 8),
        new THREE.MeshLambertMaterial({ color: 0x228b22 })
      )
      leaves.position.y = 2.5
      leaves.castShadow = true
      leaves.name = 'leaves'
      tree.add(leaves)
      tree.position.set(...pos)
      treesGroup.add(tree)
    })
  }

  const _createFence = () => {
    const h = 1.5
    const w = 0.1
    const spacing = 2
    const addPost = (x: number, z: number) => {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, w),
        new THREE.MeshLambertMaterial({ color: 0x8b4513 })
      )
      post.position.set(x, h / 2, z)
      post.castShadow = true
      fenceGroup.add(post)
    }
    for (let x = -12; x <= 12; x += spacing) {
      if (Math.abs(x) > 4) {
        addPost(x, -12)
        addPost(x, 12)
      }
    }
    for (let z = -12; z <= 12; z += spacing) {
      addPost(-12, z)
      addPost(12, z)
    }
  }

  const _createGarden = () => {
    const positions: [number, number, number][] = [
      [-4, 0, -2],
      [-3, 0, -1],
      [-2, 0, -2],
      [4, 0, -1],
      [3, 0, -2],
      [2, 0, -1],
    ]
    positions.forEach(pos => {
      const flower = new THREE.Group()
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.5),
        new THREE.MeshLambertMaterial({ color: 0x228b22 })
      )
      stem.position.y = 0.25
      flower.add(stem)
      const petal = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 6, 6),
        new THREE.MeshLambertMaterial({
          color: Math.random() > 0.5 ? 0xff69b4 : 0xffd700,
        })
      )
      petal.position.y = 0.5
      flower.add(petal)
      flower.position.set(...pos)
      gardenGroup.add(flower)
    })
  }

  const _createPath = () => {
    const stoneGeo = new THREE.BoxGeometry(0.8, 0.1, 0.8)
    const stoneMat = new THREE.MeshLambertMaterial({ color: 0x808080 })
    for (let i = 0; i < 10; i++) {
      const stone = new THREE.Mesh(stoneGeo, stoneMat)
      stone.position.set(0, 0.05, 5 - i * 1.2)
      stone.rotation.y = Math.random() * 0.5
      pathGroup.add(stone)
    }
  }

  const toggleTrees = () => {
    showTrees.value = !showTrees.value
    treesGroup.visible = showTrees.value
  }

  const toggleFence = () => {
    showFence.value = !showFence.value
    fenceGroup.visible = showFence.value
  }

  const toggleGarden = () => {
    showGarden.value = !showGarden.value
    gardenGroup.visible = showGarden.value
  }

  const togglePath = () => {
    showPath.value = !showPath.value
    pathGroup.visible = showPath.value
  }

  const addRandomCloud = () => {
    const cloud = new THREE.Mesh(
      new THREE.SphereGeometry(2, 8, 8),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      })
    )
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

  const toggleTreeAnimation = () => {
    treeAnimation.value = !treeAnimation.value
  }

  const changeSeason = () => {
    const season = SEASONS[currentSeason.value as SeasonKey]
    if (!season) return
    const scene = getScene()

    // Fond saisonnier
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, season.gradientTop)
    gradient.addColorStop(1, season.gradientBottom)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    scene.background = new THREE.CanvasTexture(canvas)

    // Couleur des feuilles
    treesGroup.traverse(child => {
      if (child instanceof THREE.Mesh && child.name === 'leaves') {
        const mat = child.material as THREE.MeshLambertMaterial
        mat.color.setHex(season.treeColor)
      }
    })

    // Couleur du sol
    scene.traverse(child => {
      if (child instanceof THREE.Mesh && child.name === 'ground') {
        const mat = child.material as THREE.MeshLambertMaterial
        mat.color.setHex(season.groundColor)
      }
    })
  }

  /** Appeler depuis la boucle d'animation */
  const updateFrame = (_delta: number, elapsed: number) => {
    if (!treesGroup || !cloudsGroup) return
    // Vent dans les arbres
    if (treeAnimation.value) {
      treesGroup.children.forEach((tree, i) => {
        tree.rotation.z = Math.sin(elapsed * 2 + i) * 0.1
      })
    }
    // Déplacement des nuages
    cloudsGroup.children.forEach(cloud => {
      cloud.position.x += 0.01
      if (cloud.position.x > 25) cloud.position.x = -25
    })
  }

  return {
    showTrees,
    showFence,
    showGarden,
    showPath,
    currentSeason,
    treeAnimation,
    createOptionalElements,
    toggleTrees,
    toggleFence,
    toggleGarden,
    togglePath,
    addRandomCloud,
    toggleTreeAnimation,
    changeSeason,
    updateFrame,
  }
}
