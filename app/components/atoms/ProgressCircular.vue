<script setup lang="ts">
import type { ProgressCircularProps } from '~/types/ui/ProgressCircularProps'

const props = defineProps<{
  progressCircular: ProgressCircularProps
}>()
</script>

<template>
  <v-progress-circular
    :model-value="props.progressCircular.value"
    :size="80"
    :width="18"
    :color="props.progressCircular.amount === 0 ? 'grey-lighten-1' : props.progressCircular.color"
    bg-color="white"
  >
    <span class="text-caption font-weight-bold">
      {{ props.progressCircular.amount === 0 ? '未設定' : `${props.progressCircular.value}%` }}
    </span>
  </v-progress-circular>
</template>
