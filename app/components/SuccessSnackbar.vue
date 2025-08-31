<script setup lang="ts">
interface Props {
  modelValue: boolean
  message?: string
  color?: string
  timeout?: number
  location?: 'top' | 'bottom' | 'center'
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  message: '操作が完了しました',
  color: 'success',
  timeout: 3000,
  location: 'top',
})

const emit = defineEmits<Emits>()

const handleClose = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <v-snackbar
    :model-value="props.modelValue"
    :color="props.color"
    :timeout="props.timeout"
    :location="props.location"
    @update:model-value="emit('update:modelValue', $event)"
  >
    {{ props.message }}
    <template #actions>
      <BaseButton
        color="white"
        variant="text"
        text="閉じる"
        @click="handleClose"
      />
    </template>
  </v-snackbar>
</template>
