/**
 * useThreeAudio — Son ambiant (Web Audio API)
 */
import { ref } from 'vue'

// ─── État singleton ──────────────────────────────────────────────────────────
let audioContext: AudioContext

const ambientSound = ref(false)
const audioVolumeArray = ref([0.5])

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeAudio() {
  const setupAudio = () => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContext = new AudioContext()
      _createAmbientSound()
    }
  }

  const _createAmbientSound = () => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    oscillator.start()
  }

  const toggleAmbientSound = () => {
    ambientSound.value = !ambientSound.value
    if (!audioContext) return
    if (ambientSound.value) {
      audioContext.resume()
    } else {
      audioContext.suspend()
    }
  }

  const updateAudioVolume = () => {
    // TODO: connecter le gainNode au volume audioVolumeArray.value[0]
  }

  return {
    ambientSound,
    audioVolumeArray,
    setupAudio,
    toggleAmbientSound,
    updateAudioVolume,
  }
}
