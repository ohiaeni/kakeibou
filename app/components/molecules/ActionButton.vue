<script setup lang="ts">
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'

const props = defineProps<{
  actionButton: ActionButtonProps
}>()
</script>

<template>
  <v-row class="d-flex flex-column align-center" dense>
    <v-col cols="auto">
      <AtomsButton :button="props.actionButton" />
    </v-col>
    <v-col cols="auto">
      <span>{{ props.actionButton.label }}</span>
    </v-col>
  </v-row>
</template>
