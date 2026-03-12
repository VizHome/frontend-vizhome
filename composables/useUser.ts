/**
 * useUser — Singleton stub utilisateur
 * Remplacer par une vraie API d'auth (Nuxt Auth, Supabase, etc.)
 */
import { ref, computed } from 'vue'

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

// ─── État singleton ──────────────────────────────────────────────────────────
const user = ref<UserProfile>({
  name: 'Jean Dupont',
  email: 'jean@exemple.fr',
  avatarUrl: 'https://i.pravatar.cc/150?img=23',
  plan: 'pro',
  isLoggedIn: true,
  joinedAt: '2024-03-01',
})

const stats = ref<UserStats>({
  rendersThisMonth: 12,
  rendersLimit: 50,
  totalProjects: 5,
  storageUsedGb: 1.2,
  storageLimitGb: 5,
})

const preferences = ref<UserPreferences>({
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
})

// ─── Composable ──────────────────────────────────────────────────────────────
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

  const logout = () => {
    user.value.isLoggedIn = false
    // TODO: rediriger vers /auth/login avec navigateTo('/auth/login')
  }

  return {
    user,
    stats,
    preferences,
    initials,
    planLabel,
    storagePercent,
    rendersPercent,
    updateProfile,
    updatePreferences,
    logout,
  }
}
