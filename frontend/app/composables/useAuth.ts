export const useAuth = () => {
  const user = useState('user', () => null)

  const fetchUser = async () => {
    try {
      user.value = await $fetch('/api/auth/me')
    } catch {
      user.value = null
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/login')
  }

  return { user, fetchUser, logout }
}
