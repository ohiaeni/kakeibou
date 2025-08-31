import { ref, computed } from 'vue'

interface User {
  id: number
  email: string
  name: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials extends LoginCredentials {
  name: string
  confirmPassword: string
}

const user = ref<User | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)

  // ログイン処理
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    error.value = null

    try {
      // 実際のAPIコールの代わりにモックデータを使用
      // TODO: 実際のAPIエンドポイントに置き換える
      await new Promise(resolve => setTimeout(resolve, 1000)) // API呼び出しをシミュレート

      // バリデーション（簡易版）
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        user.value = {
          id: 1,
          email: credentials.email,
          name: 'デモユーザー',
        }

        // ローカルストレージに保存
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-user', JSON.stringify(user.value))
        }

        return { success: true }
      }
      else {
        throw new Error('メールアドレスまたはパスワードが正しくありません')
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'ログインに失敗しました'
      return { success: false, error: error.value }
    }
    finally {
      isLoading.value = false
    }
  }

  // ユーザー登録処理
  const register = async (credentials: RegisterCredentials) => {
    isLoading.value = true
    error.value = null

    try {
      // パスワード確認
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('パスワードが一致しません')
      }

      // 実際のAPIコールの代わりにモックデータを使用
      await new Promise(resolve => setTimeout(resolve, 1000))

      user.value = {
        id: Date.now(),
        email: credentials.email,
        name: credentials.name,
      }

      // ローカルストレージに保存
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-user', JSON.stringify(user.value))
      }

      return { success: true }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : '登録に失敗しました'
      return { success: false, error: error.value }
    }
    finally {
      isLoading.value = false
    }
  }

  // ログアウト処理
  const logout = () => {
    user.value = null
    error.value = null

    // ローカルストレージからユーザー情報を削除
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-user')
    }
  }

  // 認証状態の復元
  const initAuth = () => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth-user')
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        }
        catch (err) {
          console.error('ユーザー情報の復元に失敗しました:', err)
          localStorage.removeItem('auth-user')
        }
      }
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    error: readonly(error),
    login,
    register,
    logout,
    initAuth,
  }
}
