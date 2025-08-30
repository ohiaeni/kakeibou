<template>
  <v-container>
    <v-app-bar :elevation="1">
      <!-- スマホ表示時は中央、PC表示時は左端 -->
      <div class="logo-wrapper">
        <NuxtLink to="/" style="text-decoration: none; color: inherit;">
          <img src="~/assets/logo.png" alt="Logo" class="logo-image">
        </NuxtLink>
      </div>
      <v-spacer />
    </v-app-bar>
  </v-container>
</template>

<style scoped>
.logo-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.logo-image {
  height: 50px;
  display: block;
}

/* PC表示時（768px以上）は左端に */
@media (min-width: 768px) {
  .logo-wrapper {
    width: auto;
    justify-content: flex-start;
    margin-left: 16px;
  }
}
</style>
