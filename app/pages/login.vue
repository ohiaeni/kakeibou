<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false,
})

const { login, isLoading, error } = useAuth()
const router = useRouter()

const form = ref({
  email: 'demo@example.com',
  password: 'password',
})

const showPassword = ref(false)
const showRegisterMode = ref(false)
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const handleLogin = async () => {
  const result = await login(form.value)
  if (result.success) {
    router.push('/dashboard')
  }
}

const handleRegister = async () => {
  const { register } = useAuth()
  const result = await register(registerForm.value)
  if (result.success) {
    router.push('/dashboard')
  }
}

const toggleMode = () => {
  showRegisterMode.value = !showRegisterMode.value
  // フォームをリセット
  form.value = { email: 'demo@example.com', password: 'password' }
  registerForm.value = { name: '', email: '', password: '', confirmPassword: '' }
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
          >
            <v-card class="pa-6" elevation="8">
              <v-card-title class="text-h4 text-center mb-6">
                <img src="~/assets/img/logo.png" alt="Logo" style="height: 100px;">
              </v-card-title>

              <!-- ログインフォーム -->
              <div v-if="!showRegisterMode">
                <v-card-subtitle class="text-h6 text-center mb-4">
                  ログイン
                </v-card-subtitle>

                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="form.email"
                    label="メールアドレス"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    class="mb-3"
                    required
                  />

                  <v-text-field
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    label="パスワード"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    variant="outlined"
                    class="mb-4"
                    required
                    @click:append-inner="showPassword = !showPassword"
                  />

                  <v-alert
                    v-if="error"
                    type="error"
                    variant="tonal"
                    class="mb-4"
                  >
                    {{ error }}
                  </v-alert>

                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="isLoading"
                    class="mb-4"
                  >
                    ログイン
                  </v-btn>

                  <v-divider class="mb-4" />

                  <v-btn
                    variant="text"
                    color="primary"
                    block
                    @click="toggleMode"
                  >
                    アカウントをお持ちでない方はこちら
                  </v-btn>
                </v-form>
              </div>

              <!-- 登録フォーム -->
              <div v-else>
                <v-card-subtitle class="text-h6 text-center mb-4">
                  アカウント作成
                </v-card-subtitle>

                <v-form @submit.prevent="handleRegister">
                  <v-text-field
                    v-model="registerForm.name"
                    label="お名前"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    class="mb-3"
                    required
                  />

                  <v-text-field
                    v-model="registerForm.email"
                    label="メールアドレス"
                    type="email"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    class="mb-3"
                    required
                  />

                  <v-text-field
                    v-model="registerForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    label="パスワード"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    variant="outlined"
                    class="mb-3"
                    required
                    @click:append-inner="showPassword = !showPassword"
                  />

                  <v-text-field
                    v-model="registerForm.confirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    label="パスワード（確認）"
                    prepend-inner-icon="mdi-lock-check"
                    variant="outlined"
                    class="mb-4"
                    required
                  />

                  <v-alert
                    v-if="error"
                    type="error"
                    variant="tonal"
                    class="mb-4"
                  >
                    {{ error }}
                  </v-alert>

                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="isLoading"
                    class="mb-4"
                  >
                    アカウント作成
                  </v-btn>

                  <v-divider class="mb-4" />

                  <v-btn
                    variant="text"
                    color="primary"
                    block
                    @click="toggleMode"
                  >
                    ログインはこちら
                  </v-btn>
                </v-form>
              </div>

              <!-- デモアカウント情報 -->
              <v-card-text class="text-center mt-4">
                <v-chip
                  color="info"
                  variant="tonal"
                  size="small"
                  class="mb-2"
                >
                  デモアカウント
                </v-chip>
                <div class="text-caption text-medium-emphasis">
                  Email: demo@example.com<br>
                  Password: password
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
