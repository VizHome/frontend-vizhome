/**
 * Tests pour useBilling — subscription, checkout, factures, gestion d'erreur.
 *
 * `fetchPlans()` utilise `$fetch` directement (endpoint public, sans token),
 * les autres méthodes passent par `useApi()`.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const MOCK_SUBSCRIPTION = {
  has_subscription: true,
  plan: 'pro' as const,
  status: 'active',
  current_period_end: '2025-01-01T00:00:00Z',
  cancel_at_period_end: false,
}

const MOCK_PLANS = [
  {
    name: 'free' as const,
    label: 'Gratuit',
    description: 'Pour découvrir',
    price_eur: 0,
    renders_limit: 5,
    storage_limit_bytes: 1024 ** 3,
    is_billable: false,
  },
  {
    name: 'pro' as const,
    label: 'Pro',
    description: 'Pour les créateurs',
    price_eur: 29,
    renders_limit: 200,
    storage_limit_bytes: 50 * 1024 ** 3,
    is_billable: true,
  },
]

async function freshBilling(apiMock: ReturnType<typeof vi.fn>) {
  vi.resetModules()
  ;(globalThis as Record<string, unknown>).useApi = vi.fn(() => apiMock)
  const mod = await import('~/composables/useBilling')
  return mod.useBilling()
}

describe('useBilling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchSubscription() mappe snake_case → camelCase', async () => {
    const apiMock = vi.fn().mockResolvedValue(MOCK_SUBSCRIPTION)
    const b = await freshBilling(apiMock)
    await b.fetchSubscription()

    expect(b.subscription.value).toEqual({
      hasSubscription: true,
      plan: 'pro',
      status: 'active',
      currentPeriodEnd: '2025-01-01T00:00:00Z',
      cancelAtPeriodEnd: false,
    })
  })

  it('fetchSubscription() : isLoading toggle correctement', async () => {
    let resolve: (v: unknown) => void = () => {}
    const apiMock = vi.fn(
      () =>
        new Promise(r => {
          resolve = r
        })
    )
    const b = await freshBilling(apiMock)
    const p = b.fetchSubscription()
    expect(b.isLoading.value).toBe(true)
    resolve(MOCK_SUBSCRIPTION)
    await p
    expect(b.isLoading.value).toBe(false)
  })

  it('fetchSubscription() en cas d\'erreur expose `error.value`', async () => {
    const apiMock = vi
      .fn()
      .mockRejectedValue({ statusCode: 500, data: { detail: 'Stripe down' } })
    const b = await freshBilling(apiMock)
    await expect(b.fetchSubscription()).rejects.toBeDefined()
    expect(b.error.value).toBe('Stripe down')
  })

  it('startCheckout() POST /me/subscription/checkout avec le plan choisi', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValue({ checkout_url: 'https://stripe', session_id: 'sess' })
    const b = await freshBilling(apiMock)
    // Mock window.location pour ne pas casser jsdom
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    })
    await b.startCheckout('pro')

    expect(apiMock).toHaveBeenCalledWith('/me/subscription/checkout', {
      method: 'POST',
      body: { plan: 'pro' },
    })
  })

  it('cancelSubscription() refetch après annulation', async () => {
    const apiMock = vi
      .fn()
      .mockResolvedValueOnce({}) // POST cancel
      .mockResolvedValueOnce({ ...MOCK_SUBSCRIPTION, cancel_at_period_end: true })
    const b = await freshBilling(apiMock)
    await b.cancelSubscription()

    expect(apiMock).toHaveBeenNthCalledWith(1, '/me/subscription/cancel', {
      method: 'POST',
    })
    expect(b.subscription.value?.cancelAtPeriodEnd).toBe(true)
  })

  it('fetchPlans() utilise $fetch direct (endpoint public)', async () => {
    const fetchMock = vi.fn().mockResolvedValue(MOCK_PLANS)
    ;(globalThis as Record<string, unknown>).$fetch = fetchMock
    const apiMock = vi.fn()
    const b = await freshBilling(apiMock)
    await b.fetchPlans()

    expect(b.plans.value).toHaveLength(2)
    expect(b.plans.value[0]!.name).toBe('free')
    expect(b.plans.value[1]!.priceEur).toBe(29)
    expect(b.plans.value[1]!.isBillable).toBe(true)
  })

  it('formattedAmount() formate les centimes en EUR', async () => {
    const apiMock = vi.fn()
    const b = await freshBilling(apiMock)
    expect(b.formattedAmount.value(2900)).toMatch(/29,00/)
  })

  it('getPlan() retourne undefined si plan inconnu', async () => {
    const fetchMock = vi.fn().mockResolvedValue(MOCK_PLANS)
    ;(globalThis as Record<string, unknown>).$fetch = fetchMock
    const apiMock = vi.fn()
    const b = await freshBilling(apiMock)
    await b.fetchPlans()
    expect(b.getPlan('pro')?.label).toBe('Pro')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(b.getPlan('xxx' as any)).toBeUndefined()
  })
})
