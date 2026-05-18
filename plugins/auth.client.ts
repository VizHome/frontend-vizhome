/**
 * Plugin auth — initialise les tokens depuis le localStorage au boot,
 * puis fetch /me pour hydrater l'état user.
 *
 * `.client.ts` ⇒ exécuté uniquement côté navigateur (pas en SSR).
 */
export default defineNuxtPlugin(async () => {
  const auth = useAuth()
  const { fetchMe } = useUser()

  auth.init()

  if (auth.isAuthenticated.value) {
    try {
      await fetchMe()
    } catch (e) {
      // Refresh expiré ou autre — useApi a déjà déclenché logout()
      console.warn('[auth] échec d\'init de la session :', e)
    }
  }
})
