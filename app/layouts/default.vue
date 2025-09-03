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
        </v-app-bar>
      </v-container>
      <slot />
    </v-main>
  </v-app>
</template>
