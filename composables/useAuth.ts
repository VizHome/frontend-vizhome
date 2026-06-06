/**
 * useAuth — Gestion JWT (login, register, refresh, logout, OAuth, 2FA).
 *
 * État partagé via un singleton de module (tokens). L'access token JWT a
 * une durée de vie courte (15 min) ; le refresh permet de le renouveler.
 *
 * Le composable expose aussi le flow OAuth (Google id_token, GitHub code)
 * et le challenge 2FA quand activé sur le compte.
 */
import { computed, ref } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────
export interface JwtTokens {
  access: string
  refresh: string
}

export interface AuthUser {
  id: number
  email: string
  pseudo: string
  first_name: string
  last_name: string
  name: string
  avatar_url: string
  plan: 'free' | 'pro' | 'enterprise'
  is_staff: boolean
  is_banned_from_forum: boolean
  date_joined: string
}

export interface LoginResult {
  require2fa: false
  user: AuthUser
}

export interface Login2faChallenge {
  require2fa: true
  challengeToken: string
  expiresIn: number
}

// ─── Constantes ───────────────────────────────────────────────────────────
const LS_TOKENS = 'vizhome:auth:tokens'

// ─── État singleton ───────────────────────────────────────────────────────
const tokens = ref<JwtTokens | null>(null)
let _initialized = false

// ─── Persistence ──────────────────────────────────────────────────────────
function persist() {
  if (typeof localStorage === 'undefined') return
  if (tokens.value) {
    localStorage.setItem(LS_TOKENS, JSON.stringify(tokens.value))
  } else {
    localStorage.removeItem(LS_TOKENS)
  }
}

function loadFromStorage() {
  if (typeof localStorage === 'undefined') return
  try {
    const raw = localStorage.getItem(LS_TOKENS)
    if (raw) tokens.value = JSON.parse(raw) as JwtTokens
  } catch {
    /* corrupt storage, ignore */
  }
}

// ─── Composable ───────────────────────────────────────────────────────────
export function useAuth() {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl as string

  const isAuthenticated = computed(() => !!tokens.value)

  function init() {
    if (_initialized) return
    _initialized = true
    loadFromStorage()
  }

  async function _post<T>(path: string, body: unknown): Promise<T> {
    return await $fetch<T>(`${apiUrl}${path}`, {
      method: 'POST',
      body: body as Record<string, unknown>,
    })
  }

  // ─── Register ──────────────────────────────────────────────────────────
  async function register(data: {
    email: string
    pseudo: string
    password: string
    password_confirm: string
    first_name?: string
    last_name?: string
  }): Promise<AuthUser> {
    const res = await _post<{ user: AuthUser; access: string; refresh: string }>(
      '/auth/register',
      data
    )
    tokens.value = { access: res.access, refresh: res.refresh }
    persist()
    return res.user
  }

  // ─── Login (avec gestion 2FA) ──────────────────────────────────────────
  async function login(
    email: string,
    password: string
  ): Promise<LoginResult | Login2faChallenge> {
    const res = await _post<
      | { require_2fa: true; challenge_token: string; expires_in: number }
      | { user: AuthUser; access: string; refresh: string }
    >('/auth/login', { email, password })

    if ('require_2fa' in res && res.require_2fa) {
      return {
        require2fa: true,
        challengeToken: res.challenge_token,
        expiresIn: res.expires_in,
      }
    }
    const tokenized = res as { user: AuthUser; access: string; refresh: string }
    tokens.value = { access: tokenized.access, refresh: tokenized.refresh }
    persist()
    return { require2fa: false, user: tokenized.user }
  }

  async function verify2fa(challengeToken: string, code: string): Promise<AuthUser> {
    const res = await _post<{ user: AuthUser; access: string; refresh: string }>(
      '/auth/2fa/verify',
      { challenge_token: challengeToken, code }
    )
    tokens.value = { access: res.access, refresh: res.refresh }
    persist()
    return res.user
  }

  // ─── OAuth ─────────────────────────────────────────────────────────────
  /**
   * Google OAuth — supporte les deux flows :
   * - flow `code` (recommandé, authorization code, identique GitHub) :
   *   loginGoogle({ code, redirectUri })
   * - flow `id_token` (legacy One Tap / SDK SPA) :
   *   loginGoogle({ idToken })
   */
  async function loginGoogle(
    payload: { code: string; redirectUri: string } | { idToken: string },
  ): Promise<AuthUser> {
    const body = 'idToken' in payload
      ? { id_token: payload.idToken }
      : { code: payload.code, redirect_uri: payload.redirectUri }
    const res = await _post<{ user: AuthUser; access: string; refresh: string }>(
      '/auth/oauth/google/exchange',
      body,
    )
    tokens.value = { access: res.access, refresh: res.refresh }
    persist()
    return res.user
  }

  async function loginGithub(code: string, redirectUri: string): Promise<AuthUser> {
    const res = await _post<{ user: AuthUser; access: string; refresh: string }>(
      '/auth/oauth/github/exchange',
      { code, redirect_uri: redirectUri }
    )
    tokens.value = { access: res.access, refresh: res.refresh }
    persist()
    return res.user
  }

  // ─── Refresh ───────────────────────────────────────────────────────────
  async function refreshAccessToken(): Promise<void> {
    if (!tokens.value?.refresh) throw new Error('No refresh token')
    const res = await _post<{ access: string; refresh?: string }>('/auth/refresh', {
      refresh: tokens.value.refresh,
    })
    tokens.value = {
      access: res.access,
      refresh: res.refresh || tokens.value.refresh,
    }
    persist()
  }

  // ─── Logout ────────────────────────────────────────────────────────────
  async function logout(): Promise<void> {
    if (tokens.value) {
      try {
        await $fetch(`${apiUrl}/auth/logout`, {
          method: 'POST',
          body: { refresh: tokens.value.refresh },
          headers: { Authorization: `Bearer ${tokens.value.access}` },
        })
      } catch {
        /* on continue le logout même si le backend refuse */
      }
    }
    tokens.value = null
    persist()
  }

  // ─── Password reset ────────────────────────────────────────────────────
  async function forgotPassword(email: string): Promise<void> {
    await _post('/auth/forgot-password', { email })
  }

  async function resetPassword(
    uid: string,
    token: string,
    password: string,
    passwordConfirm: string
  ): Promise<void> {
    await _post('/auth/reset-password', {
      uid,
      token,
      password,
      password_confirm: passwordConfirm,
    })
  }

  return {
    tokens,
    isAuthenticated,
    init,
    register,
    login,
    verify2fa,
    loginGoogle,
    loginGithub,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
  }
}
