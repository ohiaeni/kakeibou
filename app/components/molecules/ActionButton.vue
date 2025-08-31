<script setup lang="ts">
interface Props {
  icon: string
  label: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  to?: string
  labelColor?: string
}

interface Emits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'tonal',
  labelColor: 'text-on-surface',
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="d-flex flex-column align-center ga-3" style="min-width: 100px;">
    <AtomsButton
      :color="props.color"
      :variant="props.variant"
      rounded="xl"
      size="large"
      :icon="props.icon"
      class="elevation-1"
      :style="'width: 70px; height: 70px; transition: all 0.3s ease;'"
      :hover-translate="true"
      :to="props.to"
      @click="handleClick"
    />
    <div class="text-body-2 font-weight-medium text-center" :class="props.labelColor">
      {{ props.label }}
    </div>
  </div>
</template>
