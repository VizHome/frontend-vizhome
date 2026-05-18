/**
 * Middleware auth — redirige vers /auth/login si l'utilisateur n'est pas
 * authentifié. À appliquer via `definePageMeta({ middleware: 'auth' })`.
 *
 * Conserve l'URL d'origine dans le query param `?redirect=` pour ramener
 * l'utilisateur où il était après le login.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }
})
