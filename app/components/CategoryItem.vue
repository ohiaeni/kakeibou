<script setup lang="ts">
// サンプルデータ
const percentage = 65
const categoryName = '食費'
</script>

<template>
  <v-card
    class="mx-auto d-flex flex-column align-center justify-center elevation-2"
    color="surface"
    height="120"
    rounded="lg"
  >
    <v-progress-circular
      :model-value="percentage"
      :size="60"
      :width="8"
      color="primary"
      bg-color="accent"
      class="mb-2"
    >
      <span class="text-body-2 font-weight-bold text-primary">
        {{ percentage }}%
      </span>
    </v-progress-circular>
    <div class="d-flex align-center">
      <v-icon class="mr-1" size="small" color="primary">
        mdi-food
      </v-icon>
      <v-card-title class="text-caption text-center pa-0 text-primary font-weight-medium">
        {{ categoryName }}
      </v-card-title>
    </div>
  </v-card>
</template>
