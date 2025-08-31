<script setup lang="ts">
interface Props {
  icon?: string
  text?: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  disabled?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'elevated',
  size: 'default',
  disabled: false,
  loading: false,
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<template>
  <v-btn
    :color="props.color"
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    :loading="props.loading"
    @click="handleClick"
  >
    <v-icon v-if="props.icon && !props.text" :icon="props.icon" />
    <v-icon v-if="props.icon && props.text" start :icon="props.icon" />
    {{ props.text }}
  </v-btn>
</template>
