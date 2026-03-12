/**
 * useRenderMode — Mode actif de la page render
 * Singleton de module : 'sketch' | 'prompt' | '3d'
 */
import { ref } from 'vue'

export type RenderMode = 'sketch' | 'prompt' | '3d'

// ─── État singleton ──────────────────────────────────────────────────────────
const currentMode = ref<RenderMode>('3d')

// ─── Composable ──────────────────────────────────────────────────────────────
export function useRenderMode() {
  const setMode = (mode: RenderMode) => {
    currentMode.value = mode
  }

  return {
    currentMode,
    setMode,
  }
}
