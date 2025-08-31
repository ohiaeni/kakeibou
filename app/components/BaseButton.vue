<script setup lang="ts">
interface Props {
  icon?: string
  text?: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  size?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'
  disabled?: boolean
  loading?: boolean
  rounded?: string | boolean
  class?: string
  style?: string
  to?: string
  hoverTranslate?: boolean
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
  rounded: false,
  class: '',
  style: '',
  to: undefined,
  hoverTranslate: false,
})

const emit = defineEmits<Emits>()
const buttonRef = ref<HTMLElement | null>(null)

const handleMouseEnter = (e: MouseEvent) => {
  if (props.hoverTranslate) {
    (e.target as HTMLElement).style.transform = 'translateY(-2px)'
  }
}
const handleMouseLeave = (e: MouseEvent) => {
  if (props.hoverTranslate) {
    (e.target as HTMLElement).style.transform = 'translateY(0)'
  }
}

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<template>
  <v-btn
    ref="buttonRef"
    :color="props.color"
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    :loading="props.loading"
    :icon="props.icon"
    :rounded="props.rounded"
    :class="props.class"
    :style="props.style"
    :to="props.to"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <v-icon v-if="props.icon && !props.text" :icon="props.icon" />
    <v-icon v-if="props.icon && props.text" start :icon="props.icon" />
    <span v-if="props.text">{{ props.text }}</span>
  </v-btn>
</template>
