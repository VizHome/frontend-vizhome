/**
 * Tests pour useUser — focus sur le mapping DTO API (snake_case)
 * vers le profil UI (camelCase), et la gestion d'état (loading, hydratation).
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

async function freshUser(apiMock: ReturnType<typeof vi.fn>) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useApi = vi.fn(() => apiMock)
  const mod = await import('~/composables/useUser')
  return mod.useUser()
}

const MOCK_ME_RESPONSE = {
  id: 42,
  email: 'jean@example.com',
  pseudo: 'jeand',
  first_name: 'Jean',
  last_name: 'Dupont',
  name: 'Jean Dupont',
  avatar_url: 'https://example.com/avatar.png',
  plan: 'pro' as const,
  is_staff: false,
  is_banned_from_forum: false,
  date_joined: '2024-06-01T10:00:00Z',
  stats: {
    renders_this_month: 12,
    renders_limit: 100,
    total_projects: 3,
    storage_used_bytes: 2 * 1024 ** 3, // 2 GB
    storage_limit_bytes: 10 * 1024 ** 3, // 10 GB
    period_started_at: '2024-06-01T00:00:00Z',
  },
  preferences: {
    theme: 'dark' as const,
    language: 'fr' as const,
    notif_email_render: true,
    notif_email_newsletter: false,
    notif_push_render: true,
    notif_push_mentions: false,
    render_quality: 'high' as const,
    render_format: 'png' as const,
    render_resolution: '2048' as const,
    analytics_enabled: true,
    marketing_enabled: false,
    two_factor_enabled: true,
    reduced_motion: false,
    high_contrast: false,
    font_size: 'medium' as const,
  },
}

describe('useUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('expose des valeurs par défaut avant tout fetch', async () => {
    const apiMock = vi.fn()
    const u = await freshUser(apiMock)
    expect(u.user.value.isLoggedIn).toBe(false)
    expect(u.user.value.email).toBe('')
    expect(u.stats.value.rendersLimit).toBe(5)
    expect(u.preferences.value.theme).toBe('system')
  })

  it('fetchMe() hydrate le profil + stats + préférences', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_ME_RESPONSE)
    const u = await freshUser(apiMock)
    await u.fetchMe()

    expect(u.user.value.id).toBe(42)
    expect(u.user.value.email).toBe('jean@example.com')
    expect(u.user.value.pseudo).toBe('jeand')
    expect(u.user.value.isLoggedIn).toBe(true)
    expect(u.user.value.plan).toBe('pro')

    // Mapping snake_case → camelCase
    expect(u.user.value.isStaff).toBe(false)
    expect(u.user.value.isBannedFromForum).toBe(false)
    expect(u.user.value.joinedAt).toBe('2024-06-01T10:00:00Z')
  })

  it('mappe les stats bytes → gigabytes', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_ME_RESPONSE)
    const u = await freshUser(apiMock)
    await u.fetchMe()
    expect(u.stats.value.storageUsedGb).toBe(2)
    expect(u.stats.value.storageLimitGb).toBe(10)
  })

  it('mappe les préférences snake_case → camelCase', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_ME_RESPONSE)
    const u = await freshUser(apiMock)
    await u.fetchMe()
    expect(u.preferences.value.theme).toBe('dark')
    expect(u.preferences.value.notifEmailRender).toBe(true)
    expect(u.preferences.value.notifEmailNewsletter).toBe(false)
    expect(u.preferences.value.renderQuality).toBe('high')
    expect(u.preferences.value.twoFactorEnabled).toBe(true)
  })

  it('isLoading passe à true pendant fetchMe puis à false', async () => {
    let resolveFetch: (v: unknown) => void = () => {}
    const apiMock = vi.fn(
      () =>
        new Promise(resolve => {
          resolveFetch = resolve
        })
    )
    const u = await freshUser(apiMock)
    const promise = u.fetchMe()
    expect(u.isLoading.value).toBe(true)
    resolveFetch(MOCK_ME_RESPONSE)
    await promise
    expect(u.isLoading.value).toBe(false)
  })

  it('updateProfile() split "name" en first_name/last_name puis re-fetch', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce({}) // PATCH /me/
      .mockResolvedValueOnce(MOCK_ME_RESPONSE) // fetchMe()
    const u = await freshUser(apiMock)
    await u.updateProfile({ name: 'Jean Marie Dupont' })

    expect(apiMock).toHaveBeenNthCalledWith(1, '/me/', {
      method: 'PATCH',
      body: expect.objectContaining({
        first_name: 'Jean',
        last_name: 'Marie Dupont',
      }),
    })
  })
})
