export default defineNuxtRouteMiddleware((to) => {
  // サーバーサイドでは何もしない
  if (import.meta.server) {
    return
  }

  const { isAuthenticated, initAuth } = useAuth()

  // クライアントサイドでのみ実行
  if (import.meta.client) {
    // 認証状態を初期化
    initAuth()

    // 少し遅延を入れてから認証チェックを実行
    nextTick(() => {
      // ログインページは認証不要
      if (to.path === '/login') {
        // 認証済みの場合はダッシュボードにリダイレクト
        if (isAuthenticated.value) {
          navigateTo('/dashboard')
        }
        return
      }

      // 認証が必要なページで未認証の場合はログインページにリダイレクト
      if (!isAuthenticated.value) {
        navigateTo('/login')
      }
    })
  }
})
