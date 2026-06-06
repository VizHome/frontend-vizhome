/**
 * useRenderMode — Mode actif de la page render
 * Singleton de module : 'sketch' | 'prompt' | '3d'
 *
 * Persisté dans localStorage (`vizhome:render:mode`) pour survivre aux
 * refresh. Sans ça, le mode repasse toujours à '3d' au reload, ce qui
 * surprend le user qui avait choisi sketch / prompt — il voit alors le
 * bandeau ProjectTopBar ("Projets" / "Sauvegarder comme…") apparaître
 * sans l'avoir demandé.
 */
import { ref, watch } from 'vue'

export type RenderMode = 'sketch' | 'prompt' | '3d'

const VALID_MODES: readonly RenderMode[] = ['sketch', 'prompt', '3d'] as const
const LS_KEY = 'vizhome:render:mode'
const DEFAULT_MODE: RenderMode = '3d'

// ─── Hydratation depuis localStorage (au chargement du module) ───────────
function _readPersistedMode(): RenderMode {
  if (typeof localStorage === 'undefined') return DEFAULT_MODE
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw && (VALID_MODES as readonly string[]).includes(raw)) {
      return raw as RenderMode
    }
  } catch {
    /* localStorage indisponible / corrompu — fallback défaut */
  }
  return DEFAULT_MODE
}

// ─── État singleton (module-level) ───────────────────────────────────────
const currentMode = ref<RenderMode>(_readPersistedMode())

// Persiste à chaque changement (côté client uniquement)
if (typeof localStorage !== 'undefined') {
  watch(currentMode, mode => {
    try {
      localStorage.setItem(LS_KEY, mode)
    } catch {
      /* quota / mode privé — ignore */
    }
  })
}

// ─── Composable ──────────────────────────────────────────────────────────
export function useRenderMode() {
  const setMode = (mode: RenderMode) => {
    currentMode.value = mode
  }

  return {
    currentMode,
    setMode,
  }
}
