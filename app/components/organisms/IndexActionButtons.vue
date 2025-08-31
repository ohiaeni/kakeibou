<script setup lang="ts">
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'
import { MoleculesActionButton } from '#components'

const props = defineProps<{
  actionButtons: ActionButtonProps[]
}>()
</script>

<template>
  <v-container>
    <v-row justify="center" gap="4">
      <MoleculesActionButton
        v-for="(action, index) in props.actionButtons"
        :key="index"
        :action-button="action"
      />
    </v-row>
  </v-container>
</template>
