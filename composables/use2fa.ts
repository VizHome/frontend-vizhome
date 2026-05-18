/**
 * use2fa — Activation / désactivation du 2FA TOTP.
 *
 * Flow setup :
 *   1. setup() → renvoie {secret, qrCode, otpauthUri}, NON encore activé
 *   2. user scan le QR code dans son authenticator
 *   3. verifySetup(code) → active le device et le marque comme confirmé
 *
 * Flow disable :
 *   1. user saisit un code TOTP courant
 *   2. disable(code) → supprime le device
 */
import { ref } from 'vue'

export interface TwoFactorSetup {
  secret: string
  qrCode: string // data URI PNG
  otpauthUri: string // otpauth://totp/...
}

// État partagé (singleton)
const setupData = ref<TwoFactorSetup | null>(null)
const isSubmitting = ref(false)

export function use2fa() {
  const api = useApi()

  /** Étape 1 : demande au backend de générer un TOTPDevice non-confirmé. */
  async function setup(): Promise<TwoFactorSetup> {
    isSubmitting.value = true
    try {
      const data = await api<{
        secret: string
        qr_code: string
        otpauth_uri: string
      }>('/me/2fa/setup', { method: 'POST' })
      setupData.value = {
        secret: data.secret,
        qrCode: data.qr_code,
        otpauthUri: data.otpauth_uri,
      }
      return setupData.value
    } finally {
      isSubmitting.value = false
    }
  }

  /** Étape 2 : valide le code TOTP et active le device. */
  async function verifySetup(code: string): Promise<void> {
    isSubmitting.value = true
    try {
      await api('/me/2fa/verify-setup', { method: 'POST', body: { code } })
      setupData.value = null // setup terminé, nettoie l'état
    } finally {
      isSubmitting.value = false
    }
  }

  /** Désactive le 2FA. Requiert un code TOTP courant pour confirmer. */
  async function disable(code: string): Promise<void> {
    isSubmitting.value = true
    try {
      await api('/me/2fa/disable', { method: 'POST', body: { code } })
    } finally {
      isSubmitting.value = false
    }
  }

  /** Annule le setup en cours (avant verify). */
  function cancelSetup(): void {
    setupData.value = null
  }

  return {
    setupData,
    isSubmitting,
    setup,
    verifySetup,
    disable,
    cancelSetup,
  }
}
