<template>
  <v-container>
    <v-app-bar :elevation="1">
      <!-- スマホ表示時は中央、PC表示時は左端 -->
      <div class="w-100 w-md-auto d-flex justify-center justify-md-start align-center h-100 ml-md-4">
        <NuxtLink to="/" style="text-decoration: none; color: inherit;">
          <img
            src="~/assets/logo.png"
            alt="Logo"
            class="d-block"
            style="height: 50px;"
          >
        </NuxtLink>
      </div>
      <v-spacer />
    </v-app-bar>
  </v-container>
</template>
