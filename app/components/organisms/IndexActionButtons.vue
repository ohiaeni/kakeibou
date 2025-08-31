<script setup lang="ts">
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'
import { MoleculesActionButton } from '#components'

const props = defineProps<{
  actionButtons: ActionButtonProps[]
}>()
</script>

<template>
  <v-container>
    <v-row justify="center" class="ga-4">
      <v-col
        v-for="(action, index) in props.actionButtons"
        :key="index"
        cols="auto"
        class="d-flex justify-center"
      >
        <MoleculesActionButton
          :action-button="action"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
