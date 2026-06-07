/**
 * Middleware `staff` — redirige les non-staff loin du panel admin.
 *
 * Usage : definePageMeta({ middleware: ['auth', 'staff'] })
 * (à combiner avec `auth` qui garantit déjà la connexion).
 */
export default defineNuxtRouteMiddleware(to => {
  const { user } = useUser()
  if (!user.value?.isStaff) {
    return navigateTo('/forum')
  }
  // OK, on laisse passer
  void to
})
