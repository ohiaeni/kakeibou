<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <template #fallback>
      <div class="d-flex justify-center align-center" style="height: 100vh;">
        <v-progress-circular indeterminate color="primary" size="64" />
      </div>
    </template>
  </ClientOnly>
</template>
