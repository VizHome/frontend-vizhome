/**
 * useThreeHouse — Maison procédurale, couleurs, porte, rotation
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getScene } from './useThreeScene'

// ─── État singleton ──────────────────────────────────────────────────────────
let house: THREE.Group
let doorGroup: THREE.Group

const wallColor = ref('#F5DEB3')
const roofColor = ref('#8B4513')
const doorColor = ref('#654321')
const groundColor = ref('#90EE90')
const doorOpen = ref(false)
const wireframe = ref(false)
const rotateHouse = ref(false)

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeHouse() {
  const createHouse = () => {
    const scene = getScene()
    house = new THREE.Group()

    // Sol
    const groundGeometry = new THREE.PlaneGeometry(30, 30)
    const groundMaterial = new THREE.MeshLambertMaterial({
      color: groundColor.value,
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    ground.name = 'ground'
    scene.add(ground)

    // Murs
    const wallGeometry = new THREE.BoxGeometry(6, 4, 6)
    const wallMaterial = new THREE.MeshLambertMaterial({
      color: wallColor.value,
    })
    const walls = new THREE.Mesh(wallGeometry, wallMaterial)
    walls.position.y = 2
    walls.castShadow = true
    walls.name = 'walls'
    house.add(walls)

    // Toit
    const roofGeometry = new THREE.ConeGeometry(4.5, 2, 4)
    const roofMaterial = new THREE.MeshLambertMaterial({
      color: roofColor.value,
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.y = 5
    roof.rotation.y = Math.PI / 4
    roof.castShadow = true
    roof.name = 'roof'
    house.add(roof)

    // Porte animée
    doorGroup = new THREE.Group()
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1)
    const doorMaterial = new THREE.MeshLambertMaterial({
      color: doorColor.value,
    })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(0.5, 1, 3.05)
    door.name = 'door'
    doorGroup.add(door)

    const handleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const handleMaterial = new THREE.MeshLambertMaterial({ color: 0xffd700 })
    const doorHandle = new THREE.Mesh(handleGeometry, handleMaterial)
    doorHandle.position.set(0.8, 1, 3.1)
    doorGroup.add(doorHandle)
    doorGroup.position.set(-0.5, 0, 0)
    house.add(doorGroup)

    // Fenêtres
    const windowGeometry = new THREE.BoxGeometry(1, 1, 0.1)
    const windowMaterial = new THREE.MeshLambertMaterial({ color: 0x87ceeb })
    const frameGeometry = new THREE.BoxGeometry(1.1, 1.1, 0.05)
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 })

    const windowPositions: [number, number, number][] = [
      [-1.5, 2.5, 3.05],
      [1.5, 2.5, 3.05],
    ]
    const framePositions: [number, number, number][] = [
      [-1.5, 2.5, 3.02],
      [1.5, 2.5, 3.02],
    ]
    windowPositions.forEach((pos, i) => {
      const w = new THREE.Mesh(windowGeometry, windowMaterial)
      w.position.set(...pos)
      house.add(w)
      const fPos = framePositions[i]
      if (!fPos) return
      const f = new THREE.Mesh(frameGeometry, frameMaterial)
      f.position.set(...fPos)
      house.add(f)
    })

    // Fenêtre latérale
    const window3 = new THREE.Mesh(windowGeometry, windowMaterial)
    window3.position.set(3.05, 2.5, 0)
    house.add(window3)
    const frame3 = new THREE.Mesh(frameGeometry, frameMaterial)
    frame3.position.set(3.02, 2.5, 0)
    house.add(frame3)

    // Cheminée
    const chimneyGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.8)
    const chimneyMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 })
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
    chimney.position.set(1.5, 6.25, 1.5)
    chimney.castShadow = true
    house.add(chimney)

    scene.add(house)
  }

  const updateColors = () => {
    house.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshLambertMaterial
        if (child.name === 'walls') mat.color.setStyle(wallColor.value)
        else if (child.name === 'roof') mat.color.setStyle(roofColor.value)
        else if (child.name === 'door') mat.color.setStyle(doorColor.value)
      }
    })
    getScene().traverse(child => {
      if (child instanceof THREE.Mesh && child.name === 'ground') {
        const mat = child.material as THREE.MeshLambertMaterial
        mat.color.setStyle(groundColor.value)
      }
    })
  }

  const toggleWireframe = () => {
    wireframe.value = !wireframe.value
    house.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshLambertMaterial
        mat.wireframe = wireframe.value
      }
    })
  }

  const toggleDoorAnimation = () => {
    doorOpen.value = !doorOpen.value
  }

  const toggleRotateHouse = () => {
    rotateHouse.value = !rotateHouse.value
  }

  /** Appeler depuis la boucle d'animation */
  const updateFrame = (deltaTime: number, animationSpeed: number) => {
    if (!doorGroup || !house) return
    // Animation de la porte
    if (doorOpen.value) {
      doorGroup.rotation.y = Math.min(
        doorGroup.rotation.y + deltaTime * 2,
        Math.PI / 2
      )
    } else {
      doorGroup.rotation.y = Math.max(doorGroup.rotation.y - deltaTime * 2, 0)
    }
    // Rotation de la maison
    if (rotateHouse.value) {
      house.rotation.y += deltaTime * animationSpeed * 0.5
    }
  }

  const getHouse = () => house
  const getDoorGroup = () => doorGroup

  return {
    wallColor,
    roofColor,
    doorColor,
    groundColor,
    doorOpen,
    wireframe,
    rotateHouse,
    createHouse,
    updateColors,
    toggleWireframe,
    toggleDoorAnimation,
    toggleRotateHouse,
    updateFrame,
    getHouse,
    getDoorGroup,
  }
}
