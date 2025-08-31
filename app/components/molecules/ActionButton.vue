<script setup lang="ts">
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'

const props = defineProps<{
  actionButton: ActionButtonProps
}>()
</script>

<template>
  <div class="d-flex flex-column align-center ga-2">
    <AtomsButton :button="props.actionButton" />
    <span class="text-body-2 text-center">{{ props.actionButton.label }}</span>
  </div>
</template>
