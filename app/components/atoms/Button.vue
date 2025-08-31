<script setup lang="ts">
import type { ButtonProps } from '~/types/ui/ButtonProps'

const props = defineProps<{
  button: ButtonProps
}>()
</script>

<template>
  <v-btn
    :icon="props.button.icon"
    :color="props.button.color"
    :to="props.button.to"
    variant="elevated"
    size="x-large"
    rounded="lg"
    @click="props.button.onClick"
  />
</template>
