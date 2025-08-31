<script setup lang="ts">
interface Props {
  value: number
  size?: number
  width?: number
  color?: string
  bgColor?: string
  displayText?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 75,
  width: 18,
  color: 'primary',
  bgColor: 'white',
})
</script>

<template>
  <v-progress-circular
    :model-value="props.value"
    :size="props.size"
    :width="props.width"
    :color="props.color"
    :bg-color="props.bgColor"
  >
    <span class="text-caption font-weight-medium text-on-surface">
      {{ props.displayText }}
    </span>
  </v-progress-circular>
</template>
