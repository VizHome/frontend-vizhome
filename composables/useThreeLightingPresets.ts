/**
 * useThreeLightingPresets — Presets d'ambiance lumineuse + saisons
 * S'appuie sur useThreeLighting et getScene
 */
import * as THREE from 'three'
import { ref } from 'vue'
import { getScene } from './useThreeScene'
import { useThreeLighting } from './useThreeLighting'

export type LightPreset = 'morning' | 'noon' | 'sunset' | 'night' | 'studio'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface PresetConfig {
  label: string
  dirColor: number
  dirIntensity: number
  dirPos: { x: number; y: number; z: number }
  ambIntensity: number
  ambColor: number
  bgTop: string
  bgBottom: string
}

export interface SeasonConfig {
  label: string
  ambColor: number
  bgTop: string
  bgBottom: string
}

export const LIGHT_PRESETS: Record<LightPreset, PresetConfig> = {
  morning: {
    label: 'Matin',
    dirColor: 0xffd580,
    dirIntensity: 0.6,
    dirPos: { x: -15, y: 5, z: 2 },
    ambIntensity: 0.3,
    ambColor: 0xfff0d0,
    bgTop: '#ffb347',
    bgBottom: '#87ceeb',
  },
  noon: {
    label: 'Midi',
    dirColor: 0xffffff,
    dirIntensity: 1.0,
    dirPos: { x: 2, y: 20, z: 2 },
    ambIntensity: 0.5,
    ambColor: 0xffffff,
    bgTop: '#ffffff',
    bgBottom: '#87ceeb',
  },
  sunset: {
    label: 'Coucher',
    dirColor: 0xff6b35,
    dirIntensity: 0.5,
    dirPos: { x: 15, y: 3, z: -5 },
    ambIntensity: 0.2,
    ambColor: 0xff8c60,
    bgTop: '#ff6b35',
    bgBottom: '#7b2d8b',
  },
  night: {
    label: 'Nuit',
    dirColor: 0x4169e1,
    dirIntensity: 0.15,
    dirPos: { x: -5, y: 10, z: 5 },
    ambIntensity: 0.05,
    ambColor: 0x192040,
    bgTop: '#0a0a2e',
    bgBottom: '#1a1a4e',
  },
  studio: {
    label: 'Studio',
    dirColor: 0xffffff,
    dirIntensity: 0.8,
    dirPos: { x: 5, y: 10, z: 5 },
    ambIntensity: 0.5,
    ambColor: 0xffffff,
    bgTop: '#404040',
    bgBottom: '#404040',
  },
}

export const SEASON_CONFIGS: Record<Season, SeasonConfig> = {
  spring: {
    label: 'Printemps',
    ambColor: 0xd4f5a0,
    bgTop: '#e8f5e9',
    bgBottom: '#81c784',
  },
  summer: {
    label: 'Été',
    ambColor: 0xffffff,
    bgTop: '#ffffff',
    bgBottom: '#87ceeb',
  },
  autumn: {
    label: 'Automne',
    ambColor: 0xffb74d,
    bgTop: '#fff3e0',
    bgBottom: '#ff8f00',
  },
  winter: {
    label: 'Hiver',
    ambColor: 0xb3e5fc,
    bgTop: '#e3f2fd',
    bgBottom: '#90caf9',
  },
}

// ─── Helpers internes ────────────────────────────────────────────────────────
function createGradientBg(top: string, bottom: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, top)
  gradient.addColorStop(1, bottom)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  return new THREE.CanvasTexture(canvas)
}

// ─── État singleton ──────────────────────────────────────────────────────────
const currentPreset = ref<LightPreset>('noon')
const currentSeason = ref<Season | null>(null)

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeLightingPresets() {
  const { getDirectionalLight, getAmbientLight } = useThreeLighting()

  const applyPreset = (name: LightPreset) => {
    currentPreset.value = name
    currentSeason.value = null
    const cfg = LIGHT_PRESETS[name]
    const scene = getScene()
    const dirLight = getDirectionalLight()
    const ambLight = getAmbientLight()

    if (dirLight) {
      dirLight.color.setHex(cfg.dirColor)
      dirLight.intensity = cfg.dirIntensity
      dirLight.position.set(cfg.dirPos.x, cfg.dirPos.y, cfg.dirPos.z)
    }
    if (ambLight) {
      ambLight.color.setHex(cfg.ambColor)
      ambLight.intensity = cfg.ambIntensity
    }
    scene.fog = null
    scene.background = createGradientBg(cfg.bgTop, cfg.bgBottom)
  }

  const applySeason = (season: Season) => {
    currentSeason.value = season
    const cfg = SEASON_CONFIGS[season]
    const scene = getScene()
    const ambLight = getAmbientLight()

    if (ambLight) {
      ambLight.color.setHex(cfg.ambColor)
    }
    scene.background = createGradientBg(cfg.bgTop, cfg.bgBottom)
  }

  return {
    currentPreset,
    currentSeason,
    LIGHT_PRESETS,
    SEASON_CONFIGS,
    applyPreset,
    applySeason,
  }
}
