/**
 * useUser — Profil + stats + préférences + sessions, hydratés depuis le backend.
 *
 * La signature publique du composable est compatible avec la version localStorage
 * précédente pour ne pas casser les dialogs/components existants. Les méthodes
 * de mutation (updateProfile, updatePreferences, revokeSession) appellent
 * désormais l'API REST plutôt que d'écrire dans localStorage.
 *
 * Le fetch initial se fait via le plugin `auth.client.ts` au boot de l'app.
 */
import { computed, ref } from 'vue'

// ─── Types (conservés identiques pour rétro-compatibilité UI) ───────────────
export type UserPlan = 'free' | 'pro' | 'enterprise'
export type AppLanguage = 'fr' | 'en' | 'es' | 'de'
export type RenderQuality = 'draft' | 'standard' | 'high'
export type RenderFormat = 'png' | 'jpg' | 'webp'

export interface UserProfile {
  id: number | null
  name: string
  email: string
  avatarUrl: string
  plan: UserPlan
  isLoggedIn: boolean
  isStaff: boolean
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
  theme: 'light' | 'dark' | 'system'
  language: AppLanguage
  notifEmailRender: boolean
  notifEmailNewsletter: boolean
  notifPushRender: boolean
  notifPushMentions: boolean
  renderQuality: RenderQuality
  renderFormat: RenderFormat
  renderResolution: '1024' | '2048' | '4096'
  analyticsEnabled: boolean
  marketingEnabled: boolean
  twoFactorEnabled: boolean
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

// ─── DTOs serveur (snake_case) ──────────────────────────────────────────────
interface ApiUserStats {
  renders_this_month: number
  renders_limit: number
  total_projects: number
  storage_used_bytes: number
  storage_limit_bytes: number
  period_started_at: string
}

interface ApiUserPreferences {
  theme: UserPreferences['theme']
  language: AppLanguage
  notif_email_render: boolean
  notif_email_newsletter: boolean
  notif_push_render: boolean
  notif_push_mentions: boolean
  render_quality: RenderQuality
  render_format: RenderFormat
  render_resolution: UserPreferences['renderResolution']
  analytics_enabled: boolean
  marketing_enabled: boolean
  two_factor_enabled: boolean
  reduced_motion: boolean
  high_contrast: boolean
  font_size: UserPreferences['fontSize']
}

interface ApiMe {
  id: number
  email: string
  first_name: string
  last_name: string
  name: string
  avatar_url: string
  plan: UserPlan
  is_staff: boolean
  date_joined: string
  stats: ApiUserStats
  preferences: ApiUserPreferences
}

interface ApiSession {
  id: number
  device_name: string
  user_agent: string
  ip_address: string | null
  location: string
  created_at: string
  last_active: string
  is_active: boolean
  is_current: boolean
}

// ─── Valeurs par défaut (avant fetch) ───────────────────────────────────────
const DEFAULT_PROFILE: UserProfile = {
  id: null,
  name: '',
  email: '',
  avatarUrl: '',
  plan: 'free',
  isLoggedIn: false,
  isStaff: false,
  joinedAt: '',
}

const DEFAULT_STATS: UserStats = {
  rendersThisMonth: 0,
  rendersLimit: 5,
  totalProjects: 0,
  storageUsedGb: 0,
  storageLimitGb: 1,
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

// ─── État singleton ─────────────────────────────────────────────────────────
const user = ref<UserProfile>({ ...DEFAULT_PROFILE })
const stats = ref<UserStats>({ ...DEFAULT_STATS })
const preferences = ref<UserPreferences>({ ...DEFAULT_PREFERENCES })
const sessions = ref<ActiveSession[]>([])
const isLoading = ref(false)

// ─── Mappers DTO ↔ UI ───────────────────────────────────────────────────────
function mapStats(api: ApiUserStats): UserStats {
  return {
    rendersThisMonth: api.renders_this_month,
    rendersLimit: api.renders_limit,
    totalProjects: api.total_projects,
    storageUsedGb: +(api.storage_used_bytes / 1024 ** 3).toFixed(2),
    storageLimitGb: +(api.storage_limit_bytes / 1024 ** 3).toFixed(2),
  }
}

function mapPreferences(api: ApiUserPreferences): UserPreferences {
  return {
    theme: api.theme,
    language: api.language,
    notifEmailRender: api.notif_email_render,
    notifEmailNewsletter: api.notif_email_newsletter,
    notifPushRender: api.notif_push_render,
    notifPushMentions: api.notif_push_mentions,
    renderQuality: api.render_quality,
    renderFormat: api.render_format,
    renderResolution: api.render_resolution,
    analyticsEnabled: api.analytics_enabled,
    marketingEnabled: api.marketing_enabled,
    twoFactorEnabled: api.two_factor_enabled,
    reducedMotion: api.reduced_motion,
    highContrast: api.high_contrast,
    fontSize: api.font_size,
  }
}

function preferencesToApi(p: Partial<UserPreferences>): Partial<ApiUserPreferences> {
  const out: Partial<ApiUserPreferences> = {}
  if (p.theme !== undefined) out.theme = p.theme
  if (p.language !== undefined) out.language = p.language
  if (p.notifEmailRender !== undefined) out.notif_email_render = p.notifEmailRender
  if (p.notifEmailNewsletter !== undefined) out.notif_email_newsletter = p.notifEmailNewsletter
  if (p.notifPushRender !== undefined) out.notif_push_render = p.notifPushRender
  if (p.notifPushMentions !== undefined) out.notif_push_mentions = p.notifPushMentions
  if (p.renderQuality !== undefined) out.render_quality = p.renderQuality
  if (p.renderFormat !== undefined) out.render_format = p.renderFormat
  if (p.renderResolution !== undefined) out.render_resolution = p.renderResolution
  if (p.analyticsEnabled !== undefined) out.analytics_enabled = p.analyticsEnabled
  if (p.marketingEnabled !== undefined) out.marketing_enabled = p.marketingEnabled
  if (p.twoFactorEnabled !== undefined) out.two_factor_enabled = p.twoFactorEnabled
  if (p.reducedMotion !== undefined) out.reduced_motion = p.reducedMotion
  if (p.highContrast !== undefined) out.high_contrast = p.highContrast
  if (p.fontSize !== undefined) out.font_size = p.fontSize
  return out
}

function iconTypeFromUserAgent(ua: string): ActiveSession['iconType'] {
  if (/iPad/.test(ua)) return 'tablet'
  if (/iPhone|Android/.test(ua)) return 'smartphone'
  return 'monitor'
}

// ─── Composable ─────────────────────────────────────────────────────────────
export function useUser() {
  const api = useApi()

  async function fetchMe(): Promise<void> {
    isLoading.value = true
    try {
      const data = await api<ApiMe>('/me/')
      user.value = {
        id: data.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatar_url,
        plan: data.plan,
        isLoggedIn: true,
        isStaff: !!data.is_staff,
        joinedAt: data.date_joined,
      }
      stats.value = mapStats(data.stats)
      preferences.value = mapPreferences(data.preferences)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSessions(): Promise<void> {
    const data = await api<{ results: ApiSession[] }>('/me/sessions')
    sessions.value = data.results.map(s => ({
      id: String(s.id),
      name: s.device_name || 'Appareil inconnu',
      location: s.location || s.ip_address || 'Localisation inconnue',
      lastActive: s.last_active,
      isCurrent: s.is_current,
      iconType: iconTypeFromUserAgent(s.user_agent),
    }))
  }

  async function updateProfile(data: {
    name?: string
    avatarUrl?: string
  }): Promise<void> {
    const body: Record<string, string> = {}
    if (data.name !== undefined) {
      const parts = data.name.trim().split(/\s+/)
      body.first_name = parts[0] || ''
      body.last_name = parts.slice(1).join(' ')
    }
    if (data.avatarUrl !== undefined) body.avatar_url = data.avatarUrl

    await api('/me/', { method: 'PATCH', body })
    await fetchMe()
  }

  async function updatePreferences(data: Partial<UserPreferences>): Promise<void> {
    const body = preferencesToApi(data)
    const updated = await api<ApiUserPreferences>('/me/preferences', {
      method: 'PATCH',
      body,
    })
    preferences.value = mapPreferences(updated)
  }

  async function changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await api('/me/change-password', {
      method: 'POST',
      body: {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirm: newPassword,
      },
    })
  }

  async function revokeSession(id: string): Promise<void> {
    await api(`/me/sessions/${id}`, { method: 'DELETE' })
    sessions.value = sessions.value.filter(s => s.id !== id)
  }

  async function logout(): Promise<void> {
    const auth = useAuth()
    await auth.logout()
    // Reset état local
    user.value = { ...DEFAULT_PROFILE }
    stats.value = { ...DEFAULT_STATS }
    preferences.value = { ...DEFAULT_PREFERENCES }
    sessions.value = []
    await navigateTo('/auth/login')
  }

  // ─── Computed (inchangés) ──────────────────────────────────────────────
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
      Math.round(
        (stats.value.storageUsedGb / Math.max(1, stats.value.storageLimitGb)) * 100
      )
    )
  )

  const rendersPercent = computed(() =>
    Math.min(
      100,
      Math.round(
        (stats.value.rendersThisMonth / Math.max(1, stats.value.rendersLimit)) * 100
      )
    )
  )

  // ─── Compatibilité avec l'ancien API local ─────────────────────────────
  /** @deprecated le plan est géré par le backend via Stripe — appel ignoré côté serveur */
  function setUserPlan(plan: UserPlan) {
    user.value = { ...user.value, plan }
  }

  /** @deprecated les compteurs sont incrémentés côté backend après chaque render */
  function incrementRenderCount() {
    stats.value = {
      ...stats.value,
      rendersThisMonth: stats.value.rendersThisMonth + 1,
    }
  }

  return {
    // état
    user,
    stats,
    preferences,
    sessions,
    isLoading,
    // computed
    initials,
    planLabel,
    storagePercent,
    rendersPercent,
    // actions
    fetchMe,
    fetchSessions,
    updateProfile,
    updatePreferences,
    changePassword,
    revokeSession,
    logout,
    // compat
    setUserPlan,
    incrementRenderCount,
  }
}
