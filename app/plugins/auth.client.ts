export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const { initAuth } = useAuth()
    initAuth()
  }
})
