<script setup lang="ts">
import type { SuccessSnackbarProps, SuccessSnackbarEmits } from '~/types/ui/SuccessSnackbarProps'

defineProps<SuccessSnackbarProps>()
const emit = defineEmits<SuccessSnackbarEmits>()

const handleClose = () => {
  emit('update:show', false)
}
</script>

<template>
  <v-snackbar
    :model-value="show"
    color="success"
    :timeout="3000"
    location="top"
    @update:model-value="emit('update:show', $event)"
  >
    支出が追加されました
    <template #actions>
      <v-btn
        color="white"
        variant="text"
        @click="handleClose"
      >
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>
