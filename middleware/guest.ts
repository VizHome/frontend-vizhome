/**
 * Middleware guest — redirige les utilisateurs DÉJÀ connectés loin des
 * pages /auth/login, /auth/register, etc.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated.value) {
    const redirect = (to.query.redirect as string) || '/render'
    return navigateTo(redirect)
  }
})
