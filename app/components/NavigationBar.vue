<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const theme = useTheme()

const isDarkMode = computed({
  get: () => theme.global.name.value === 'dark',
  set: (value: boolean) => {
    theme.global.name.value = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <v-container>
    <v-app-bar :elevation="1">
      <v-app-bar-title>
        <NuxtLink to="/" style="text-decoration: none; color: inherit;">
          家計簿
        </NuxtLink>
      </v-app-bar-title>
      <v-spacer />

      <v-switch
        v-model="isDarkMode"
        :prepend-icon="'mdi-white-balance-sunny'"
        :append-icon="'mdi-weather-night'"
        color="primary"
        hide-details
        inset
      />
    </v-app-bar>
  </v-container>
</template>
