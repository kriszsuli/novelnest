export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()

  if (!user.value) {
    await fetchUser()
  }

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
