<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <NuxtLayout>
    <v-app>
      <v-main>
        <NavigationBar />
        <NuxtPage />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>
