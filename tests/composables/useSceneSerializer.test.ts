/**
 * Tests pour useSceneSerializer — focus sur le mapping NavMode (le seul
 * morceau testable sans Three.js réel) et le round-trip serialize/restore
 * avec composables Three mockés.
 *
 * Three.js entier mockable serait overkill — on stub juste les composables
 * useThree* avec des refs et des fonctions vides pour vérifier que le
 * sérialiseur écrit dans les bons champs.
 */
import { ref } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

interface ThreeStubs {
  scene: {
    getCamera: ReturnType<typeof vi.fn>
    getControls: ReturnType<typeof vi.fn>
  }
  lightingPresets: {
    currentPreset: { value: string | null }
    applyPreset: ReturnType<typeof vi.fn>
  }
  weather: {
    isRaining: { value: boolean }
    isSnowing: { value: boolean }
    showFog: { value: boolean }
    currentWeather: { value: string }
  }
  navigation: {
    navMode: { value: string }
    setNavMode: ReturnType<typeof vi.fn>
  }
  models: {
    importedModels: { value: unknown[] }
  }
}

function makeThreeStubs(): ThreeStubs {
  return {
    scene: {
      getCamera: vi.fn().mockReturnValue({ position: { x: 1, y: 2, z: 3 } }),
      getControls: vi.fn().mockReturnValue({
        target: { x: 0, y: 0, z: 0, set: vi.fn() },
        update: vi.fn(),
      }),
    },
    lightingPresets: {
      currentPreset: ref<string | null>('noon'),
      applyPreset: vi.fn(),
    },
    weather: {
      isRaining: ref(false),
      isSnowing: ref(false),
      showFog: ref(false),
      currentWeather: ref('Ensoleillé'),
    },
    navigation: {
      navMode: ref('orbit'),
      setNavMode: vi.fn(),
    },
    models: {
      importedModels: ref([]),
    },
  }
}

async function freshSerializer(stubs: ThreeStubs) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useThreeScene = vi.fn(() => stubs.scene)
  ;(globalThis as Record<string, unknown>).useThreeLighting = vi.fn(() => ({}))
  ;(globalThis as Record<string, unknown>).useThreeLightingPresets = vi.fn(
    () => stubs.lightingPresets
  )
  ;(globalThis as Record<string, unknown>).useThreeWeather = vi.fn(
    () => stubs.weather
  )
  ;(globalThis as Record<string, unknown>).useThreeNavigation = vi.fn(
    () => stubs.navigation
  )
  ;(globalThis as Record<string, unknown>).useThreeModels = vi.fn(
    () => stubs.models
  )
  const mod = await import('~/composables/useSceneSerializer')
  return mod.useSceneSerializer()
}

describe('useSceneSerializer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('serialize() inclut camera position + target', async () => {
    const stubs = makeThreeStubs()
    const ser = await freshSerializer(stubs)
    const state = ser.serialize()
    expect(state.camera).toBeDefined()
    expect(state.camera?.position).toEqual([1, 2, 3])
    expect(state.camera?.target).toEqual([0, 0, 0])
  })

  it('serialize() : preset éclairage stocké sous lighting.preset', async () => {
    const stubs = makeThreeStubs()
    stubs.lightingPresets.currentPreset.value = 'sunset'
    const ser = await freshSerializer(stubs)
    const state = ser.serialize()
    expect(state.lighting?.preset).toBe('sunset')
  })

  it('serialize() : navMode camelCase → snake_case (firstperson → first_person)', async () => {
    const stubs = makeThreeStubs()
    stubs.navigation.navMode.value = 'firstperson'
    const ser = await freshSerializer(stubs)
    const state = ser.serialize()
    expect(state.navigation).toBe('first_person')
  })

  it('serialize() : topdown → top_down', async () => {
    const stubs = makeThreeStubs()
    stubs.navigation.navMode.value = 'topdown'
    const ser = await freshSerializer(stubs)
    const state = ser.serialize()
    expect(state.navigation).toBe('top_down')
  })

  it('serialize() : orbit / tour inchangés (pas de mapping)', async () => {
    const stubs = makeThreeStubs()
    stubs.navigation.navMode.value = 'tour'
    const ser = await freshSerializer(stubs)
    expect(ser.serialize().navigation).toBe('tour')
  })

  it('restore() : first_person stocké → firstperson runtime', async () => {
    const stubs = makeThreeStubs()
    const ser = await freshSerializer(stubs)
    ser.restore({ navigation: 'first_person' })
    expect(stubs.navigation.setNavMode).toHaveBeenCalledWith('firstperson')
  })

  it('restore() : top_down stocké → topdown runtime', async () => {
    const stubs = makeThreeStubs()
    const ser = await freshSerializer(stubs)
    ser.restore({ navigation: 'top_down' })
    expect(stubs.navigation.setNavMode).toHaveBeenCalledWith('topdown')
  })

  it('restore() : weather "Pluie" → isRaining true, autres reset à false', async () => {
    const stubs = makeThreeStubs()
    stubs.weather.isSnowing.value = true
    stubs.weather.showFog.value = true
    const ser = await freshSerializer(stubs)
    ser.restore({ weather: 'Pluie' })
    expect(stubs.weather.isRaining.value).toBe(true)
    expect(stubs.weather.isSnowing.value).toBe(false)
    expect(stubs.weather.showFog.value).toBe(false)
  })

  it('restore() : weather "Ensoleillé" → tout reste false', async () => {
    const stubs = makeThreeStubs()
    stubs.weather.isRaining.value = true
    const ser = await freshSerializer(stubs)
    ser.restore({ weather: 'Ensoleillé' })
    expect(stubs.weather.isRaining.value).toBe(false)
    expect(stubs.weather.isSnowing.value).toBe(false)
    expect(stubs.weather.showFog.value).toBe(false)
  })

  it('restore() : preset éclairage inconnu ignoré (pas de throw)', async () => {
    const stubs = makeThreeStubs()
    const ser = await freshSerializer(stubs)
    expect(() => ser.restore({ lighting: { preset: 'inconnu' } })).not.toThrow()
    expect(stubs.lightingPresets.applyPreset).not.toHaveBeenCalled()
  })

  it('restore() : preset valide ("morning") appliqué', async () => {
    const stubs = makeThreeStubs()
    const ser = await freshSerializer(stubs)
    ser.restore({ lighting: { preset: 'morning' } })
    expect(stubs.lightingPresets.applyPreset).toHaveBeenCalledWith('morning')
  })
})
