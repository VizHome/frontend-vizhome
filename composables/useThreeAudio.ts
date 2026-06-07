/**
 * useThreeAudio — Son ambiant (Web Audio API)
 *
 * Pattern : on garde une référence module-level au `gainNode` afin que
 * `updateAudioVolume()` puisse en modifier la valeur après que le slider
 * `audioVolumeArray` a changé. Le volume du slider est borné [0, 1].
 *
 * Quand le son est activé (`ambientSound = true`), le gain monte au niveau
 * du slider. Quand il est coupé, on remet le gain à 0 sans suspendre le
 * contexte (le suspend/resume forcé empêchait le slider de fonctionner).
 */
import { ref, watch } from 'vue'

// ─── État singleton ──────────────────────────────────────────────────────────
let audioContext: AudioContext | null = null
let gainNode: GainNode | null = null

const ambientSound = ref(false)
const audioVolumeArray = ref([0.5])

// Durée du fade en/out (ms) — évite les clics audio brutaux.
const FADE_MS = 80

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeAudio() {
  const setupAudio = () => {
    if (audioContext) return // déjà initialisé (singleton)
    if (typeof window === 'undefined' || !window.AudioContext) return

    audioContext = new AudioContext()
    _createAmbientSound()
    // Watch sur le slider : applique automatiquement le nouveau volume
    // au gainNode quand le user bouge le curseur.
    watch(audioVolumeArray, () => updateAudioVolume(), { deep: true })
  }

  const _createAmbientSound = () => {
    if (!audioContext) return
    const oscillator = audioContext.createOscillator()
    gainNode = audioContext.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
    // Démarre muet — le toggle l'active si nécessaire.
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    oscillator.start()
  }

  const toggleAmbientSound = () => {
    ambientSound.value = !ambientSound.value
    if (!audioContext || !gainNode) return
    if (ambientSound.value) {
      // Resume si jamais le contexte avait été suspendu par le browser
      // (Chrome suspend les contexts non-user-initiated).
      audioContext.resume().catch(() => { /* ignore */ })
      _setGain(audioVolumeArray.value[0] ?? 0.5)
    }
    else {
      _setGain(0)
    }
  }

  /**
   * Applique `audioVolumeArray.value[0]` au gainNode (avec fade pour éviter
   * les clics). Si le son est désactivé, ne touche à rien (le slider doit
   * pouvoir être déplacé sans réactiver le son tout seul).
   */
  const updateAudioVolume = () => {
    if (!ambientSound.value) return
    _setGain(audioVolumeArray.value[0] ?? 0.5)
  }

  function _setGain(value: number): void {
    if (!audioContext || !gainNode) return
    // Clamp [0, 1] pour éviter saturation.
    const clamped = Math.max(0, Math.min(1, value))
    const now = audioContext.currentTime
    gainNode.gain.cancelScheduledValues(now)
    gainNode.gain.setValueAtTime(gainNode.gain.value, now)
    gainNode.gain.linearRampToValueAtTime(clamped, now + FADE_MS / 1000)
  }

  return {
    ambientSound,
    audioVolumeArray,
    setupAudio,
    toggleAmbientSound,
    updateAudioVolume,
  }
}
