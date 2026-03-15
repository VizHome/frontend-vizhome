/**
 * useUser — Singleton utilisateur avec persistence localStorage
 */
import { ref, computed, watch } from 'vue'

export type UserPlan = 'free' | 'pro' | 'enterprise'
export type AppLanguage = 'fr' | 'en' | 'es' | 'de'
export type RenderQuality = 'draft' | 'standard' | 'high'
export type RenderFormat = 'png' | 'jpg' | 'webp'

export interface UserProfile {
  name: string
  email: string
  avatarUrl: string
  plan: UserPlan
  isLoggedIn: boolean
  joinedAt: string
}

export interface UserStats {
  rendersThisMonth: number
  rendersLimit: number
  totalProjects: number
  storageUsedGb: number
  storageLimitGb: number
}

export interface UserPreferences {
  // Apparence
  theme: 'light' | 'dark' | 'system'
  // Langue
  language: AppLanguage
  // Notifications
  notifEmailRender: boolean
  notifEmailNewsletter: boolean
  notifPushRender: boolean
  notifPushMentions: boolean
  // Qualité de rendu
  renderQuality: RenderQuality
  renderFormat: RenderFormat
  renderResolution: '1024' | '2048' | '4096'
  // Confidentialité
  analyticsEnabled: boolean
  marketingEnabled: boolean
  // Sécurité
  twoFactorEnabled: boolean
  // Accessibilité
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
}

export interface ActiveSession {
  id: string
  name: string
  location: string
  lastActive: string
  isCurrent: boolean
  iconType: 'monitor' | 'smartphone' | 'tablet'
}

// ─── Valeurs par défaut ───────────────────────────────────────────────────────
const DEFAULT_PROFILE: UserProfile = {
  name: 'Jean Dupont',
  email: 'jean@exemple.fr',
  avatarUrl: 'https://i.pravatar.cc/150?img=23',
  plan: 'pro',
  isLoggedIn: true,
  joinedAt: '2024-03-01',
}

const DEFAULT_STATS: UserStats = {
  rendersThisMonth: 12,
  rendersLimit: 50,
  totalProjects: 5,
  storageUsedGb: 1.2,
  storageLimitGb: 5,
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'fr',
  notifEmailRender: true,
  notifEmailNewsletter: false,
  notifPushRender: true,
  notifPushMentions: false,
  renderQuality: 'standard',
  renderFormat: 'png',
  renderResolution: '2048',
  analyticsEnabled: true,
  marketingEnabled: false,
  twoFactorEnabled: false,
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
}

// ─── Clés localStorage ────────────────────────────────────────────────────────
const LS_PROFILE = 'vizhome:user:profile'
const LS_STATS = 'vizhome:user:stats'
const LS_PREFS = 'vizhome:user:preferences'
const LS_SESSIONS = 'vizhome:user:sessions'

// ─── Helpers localStorage ─────────────────────────────────────────────────────
function lsGet<T>(key: string, fallback: T): T {
  if (!import.meta.client) return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return { ...fallback, ...JSON.parse(raw) } as T
  } catch {
    return fallback
  }
}

function lsSet(key: string, value: unknown) {
  if (!import.meta.client) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota dépassé ou mode privé
  }
}

// ─── Détection de la session courante ────────────────────────────────────────
function detectCurrentSession(): ActiveSession {
  const ua = import.meta.client ? navigator.userAgent : ''
  let name = 'Navigateur inconnu'
  let iconType: ActiveSession['iconType'] = 'monitor'

  if (/iPhone|iPad/.test(ua)) {
    iconType = /iPad/.test(ua) ? 'tablet' : 'smartphone'
    const browser = /CriOS/.test(ua)
      ? 'Chrome'
      : /FxiOS/.test(ua)
        ? 'Firefox'
        : 'Safari'
    name = `${browser} — ${/iPad/.test(ua) ? 'iPad' : 'iPhone'}`
  } else if (/Android/.test(ua)) {
    iconType = 'smartphone'
    const browser = /Chrome/.test(ua)
      ? 'Chrome'
      : /Firefox/.test(ua)
        ? 'Firefox'
        : 'Navigateur'
    name = `${browser} — Android`
  } else if (/Windows/.test(ua)) {
    const browser = /Edg/.test(ua)
      ? 'Edge'
      : /Chrome/.test(ua)
        ? 'Chrome'
        : /Firefox/.test(ua)
          ? 'Firefox'
          : 'Navigateur'
    name = `${browser} — Windows`
  } else if (/Mac/.test(ua)) {
    const browser = /Chrome/.test(ua)
      ? 'Chrome'
      : /Firefox/.test(ua)
        ? 'Firefox'
        : 'Safari'
    name = `${browser} — Mac`
  } else if (/Linux/.test(ua)) {
    const browser = /Chrome/.test(ua)
      ? 'Chrome'
      : /Firefox/.test(ua)
        ? 'Firefox'
        : 'Navigateur'
    name = `${browser} — Linux`
  }

  return {
    id: 'current',
    name,
    location: 'Session actuelle',
    lastActive: 'Maintenant',
    isCurrent: true,
    iconType,
  }
}

// ─── Initialisation des sessions ─────────────────────────────────────────────
function initSessions(): ActiveSession[] {
  const stored: ActiveSession[] = lsGet<ActiveSession[]>(LS_SESSIONS, [])
  const current = detectCurrentSession()

  // Remplacer/insérer la session courante en tête
  const others = stored.filter(s => !s.isCurrent)
  return [current, ...others]
}

// ─── État singleton ───────────────────────────────────────────────────────────
const user = ref<UserProfile>(lsGet(LS_PROFILE, DEFAULT_PROFILE))
const stats = ref<UserStats>(lsGet(LS_STATS, DEFAULT_STATS))
const preferences = ref<UserPreferences>(lsGet(LS_PREFS, DEFAULT_PREFERENCES))
const sessions = ref<ActiveSession[]>(
  import.meta.client ? initSessions() : [detectCurrentSession()]
)

// ─── Watchers de persistence ──────────────────────────────────────────────────
if (import.meta.client) {
  watch(user, val => lsSet(LS_PROFILE, val), { deep: true })
  watch(stats, val => lsSet(LS_STATS, val), { deep: true })
  watch(preferences, val => lsSet(LS_PREFS, val), { deep: true })
  watch(
    sessions,
    val => {
      // Ne persister que les sessions non-courantes (la courante est recréée à chaque chargement)
      lsSet(
        LS_SESSIONS,
        val.filter(s => !s.isCurrent)
      )
    },
    { deep: true }
  )
}

// ─── Composable ───────────────────────────────────────────────────────────────
export function useUser() {
  const initials = computed(() => {
    const parts = user.value.name.trim().split(' ')
    return parts
      .slice(0, 2)
      .map(p => p[0]?.toUpperCase() ?? '')
      .join('')
  })

  const planLabel = computed<string>(() => {
    const labels: Record<UserPlan, string> = {
      free: 'Gratuit',
      pro: 'Pro',
      enterprise: 'Entreprise',
    }
    return labels[user.value.plan]
  })

  const storagePercent = computed(() =>
    Math.min(
      100,
      Math.round((stats.value.storageUsedGb / stats.value.storageLimitGb) * 100)
    )
  )

  const rendersPercent = computed(() =>
    Math.min(
      100,
      Math.round(
        (stats.value.rendersThisMonth / stats.value.rendersLimit) * 100
      )
    )
  )

  const updateProfile = (
    data: Partial<Pick<UserProfile, 'name' | 'email' | 'avatarUrl'>>
  ) => {
    user.value = { ...user.value, ...data }
  }

  const updatePreferences = (data: Partial<UserPreferences>) => {
    preferences.value = { ...preferences.value, ...data }
  }

  /**
   * Change le plan de l'utilisateur et ajuste les limites des stats en conséquence.
   */
  const setUserPlan = (plan: UserPlan) => {
    user.value = { ...user.value, plan }
    // Mettre à jour les limites selon le plan
    if (plan === 'free') {
      stats.value = {
        ...stats.value,
        rendersLimit: 5,
        storageLimitGb: 1,
      }
    } else if (plan === 'pro') {
      stats.value = {
        ...stats.value,
        rendersLimit: 50,
        storageLimitGb: 5,
      }
    } else if (plan === 'enterprise') {
      stats.value = {
        ...stats.value,
        rendersLimit: 9999,
        storageLimitGb: 999,
      }
    }
  }

  /**
   * Révoque une session par son id. La session courante ne peut pas être révoquée.
   */
  const revokeSession = (id: string) => {
    if (id === 'current') return
    sessions.value = sessions.value.filter(s => s.id !== id)
  }

  /**
   * Incrémente le compteur de rendus du mois (utilisé par le pipeline IA).
   */
  const incrementRenderCount = () => {
    stats.value = {
      ...stats.value,
      rendersThisMonth: stats.value.rendersThisMonth + 1,
    }
  }

  const logout = () => {
    user.value.isLoggedIn = false
  }

  return {
    user,
    stats,
    preferences,
    sessions,
    initials,
    planLabel,
    storagePercent,
    rendersPercent,
    updateProfile,
    updatePreferences,
    setUserPlan,
    revokeSession,
    incrementRenderCount,
    logout,
  }
}
