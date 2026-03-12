/**
 * useThreeNavigation — Gestionnaire central des modes de navigation 3D
 * Orchestre Orbite / First-person / Top-down / Visite guidée.
 * Un seul mode actif à la fois ; désactive proprement le précédent
 * avant d'activer le suivant.
 */
import { ref } from 'vue'

export type NavMode = 'orbit' | 'firstperson' | 'topdown' | 'tour'

// ─── État singleton ──────────────────────────────────────────────────────────
const navMode = ref<NavMode>('orbit')

// ─── Composable ──────────────────────────────────────────────────────────────
export function useThreeNavigation() {
  const {
    enableFirstPerson,
    disableFirstPerson,
    moveSpeed,
    updateFrame: fpFrame,
  } = useThreeFirstPerson()

  const { enableTopDown, disableTopDown } = useThreeTopDown()

  const {
    startTour,
    stopTour,
    isTourActive,
    isPlaying,
    tourProgress,
    tourDuration,
    togglePlayPause,
    updateFrame: tourFrame,
  } = useThreeTour()

  /** Désactive proprement le mode actuellement actif. */
  const _disableAll = () => {
    if (navMode.value === 'firstperson') disableFirstPerson()
    else if (navMode.value === 'topdown') disableTopDown()
    else if (navMode.value === 'tour') stopTour()
  }

  /**
   * Change de mode de navigation.
   * Désactive le mode courant puis active le nouveau.
   */
  const setNavMode = (mode: NavMode) => {
    _disableAll()
    navMode.value = mode
    if (mode === 'firstperson') enableFirstPerson()
    else if (mode === 'topdown') enableTopDown()
    else if (mode === 'tour') startTour()
  }

  /** À appeler depuis la boucle d'animation principale (onFrame). */
  const updateFrame = (delta: number) => {
    fpFrame(delta)
    tourFrame(delta)
  }

  return {
    navMode,
    setNavMode,
    // First-person
    moveSpeed,
    // Tour
    isTourActive,
    isPlaying,
    tourProgress,
    tourDuration,
    togglePlayPause,
    // Boucle d'animation
    updateFrame,
  }
}
