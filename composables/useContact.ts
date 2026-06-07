/**
 * useContact — Envoi de messages depuis le formulaire de contact public.
 *
 * Pipeline :
 *   1. Validation côté browser via vee-validate (déjà fait dans contact.vue)
 *   2. POST /api/v1/contact/ → le backend envoie un email à l'équipe
 *   3. Le user reçoit une confirmation (200) ou une erreur (4xx/5xx)
 *
 * Pas d'auth requise (endpoint public mais rate-limited côté backend
 * pour éviter le spam).
 */
import { ref } from 'vue'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  privacy: boolean
  newsletter?: boolean
}

// État partagé (singleton) pour éviter qu'un user envoie 2 fois en parallèle.
const isSending = ref(false)
const lastError = ref<string | null>(null)
const lastSentAt = ref<number | null>(null)

export function useContact() {
  async function send(payload: ContactPayload): Promise<void> {
    if (isSending.value) return
    isSending.value = true
    lastError.value = null

    try {
      const api = useApi()
      // Endpoint public côté backend Django, pas de Bearer requis
      // (mais useApi est OK : il n'ajoute le header que si auth.tokens existe).
      await api('/contact/', {
        method: 'POST',
        body: {
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          privacy_accepted: payload.privacy,
          newsletter_opt_in: payload.newsletter ?? false,
        },
      })
      lastSentAt.value = Date.now()
    }
    catch (err: unknown) {
      const errObj = err as { data?: { detail?: string }, statusCode?: number }
      lastError.value
        = errObj?.data?.detail
          ?? (errObj?.statusCode === 429
            ? 'Trop d\'envois récents. Réessayez dans quelques minutes.'
            : 'Une erreur est survenue. Réessayez plus tard.')
      throw err
    }
    finally {
      isSending.value = false
    }
  }

  return {
    send,
    isSending,
    lastError,
    lastSentAt,
  }
}
