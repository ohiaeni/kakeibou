<script setup lang="ts">
import type { SuccessSnackbarEmits } from '~/types/ui/SuccessSnackbarEmits'
import type { SuccessSnackbarProps } from '~/types/ui/SuccessSnackbarProps'

const props = defineProps<SuccessSnackbarProps>()
const emits = defineEmits<SuccessSnackbarEmits>()

const handleClose = () => {
  emits('update:show', false)
}
</script>

<template>
  <v-snackbar
    :model-value="props.show"
    color="success"
    :timeout="2000"
    location="top"
    @update:model-value="emits('update:show', $event)"
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
