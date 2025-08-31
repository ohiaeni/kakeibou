<script setup lang="ts">
interface Props {
  totalProgress: number
  monthElapsed: number
}

const props = defineProps<Props>()
</script>

<template>
  <v-card class="pa-6 mb-6" elevation="2">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h6 font-weight-bold">
        予算の進捗状況
      </h2>
    </div>
    <div class="d-flex align-center justify-space-between">
      <div class="flex-grow-1 mr-6">
        <v-progress-linear
          :model-value="props.totalProgress"
          height="20"
          rounded
          :color="props.totalProgress > 100 ? 'error' : props.totalProgress > 80 ? 'warning' : 'success'"
        >
          <strong>{{ Math.round(props.totalProgress) }}%</strong>
        </v-progress-linear>
        <div class="text-caption text-grey-darken-1 mt-2">
          月経過率: {{ Math.round(props.monthElapsed) }}%
        </div>
      </div>
    </div>
  </v-card>
</template>
