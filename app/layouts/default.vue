<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, logout, isAuthenticated } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-app-bar :elevation="1">
          <div class="d-flex justify-center justify-md-start align-center h-100">
            <NuxtLink to="/" style="text-decoration: none; color: inherit;">
              <img
                src="~/assets/img/logo.png"
                alt="Logo"
                class="d-block pl-5"
                style="height: 50px;"
              >
            </NuxtLink>
          </div>
          <v-spacer />

          <!-- ユーザー情報とログアウト -->
          <ClientOnly>
            <div v-if="isAuthenticated" class="d-flex align-center">
              <v-chip
                color="primary"
                variant="tonal"
                class="me-3"
                prepend-icon="mdi-account"
              >
                {{ user?.name }}
              </v-chip>

              <v-btn
                icon="mdi-logout"
                variant="text"
                size="small"
                @click="handleLogout"
              >
                <v-icon>mdi-logout</v-icon>
                <v-tooltip activator="parent" location="bottom">
                  ログアウト
                </v-tooltip>
              </v-btn>
            </div>
          </ClientOnly>
        </v-app-bar>
      </v-container>
      <slot />
    </v-main>
  </v-app>
</template>
