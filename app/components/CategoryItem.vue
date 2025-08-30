<script setup lang="ts">
interface Props {
  percentage: number
  categoryName: string
  icon: string
  color?: string
}

defineProps<Props>()
</script>

<template>
  <v-card
    class="mx-auto d-flex flex-column align-center justify-center elevation-1"
    color="surface"
    height="120"
    rounded="lg"
  >
    <v-progress-circular
      :model-value="percentage"
      :size="60"
      :width="6"
      color="primary"
      bg-color="white"
      class="mb-2"
    >
      <span class="text-body-2 font-weight-medium text-on-surface">
        {{ percentage }}%
      </span>
    </v-progress-circular>
    <div class="d-flex align-center">
      <v-icon class="mr-1" size="small" color="on-surface-variant">
        {{ icon }}
      </v-icon>
      <v-card-title class="text-caption text-center pa-0 text-on-surface font-weight-medium">
        {{ categoryName }}
      </v-card-title>
    </div>
  </v-card>
</template>
