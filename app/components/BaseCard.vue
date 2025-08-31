<script setup lang="ts">
interface Props {
  title?: string
  elevation?: number
  color?: string
  rounded?: string | boolean
  clickable?: boolean
}

interface Emits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  elevation: 1,
  color: 'surface',
  rounded: 'lg',
  clickable: false,
})

const emit = defineEmits<Emits>()

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<template>
  <v-card
    :elevation="props.elevation"
    :color="props.color"
    :rounded="props.rounded"
    :class="{ 'cursor-pointer': props.clickable }"
    :hover="props.clickable"
    @click="handleClick"
  >
    <v-card-title v-if="props.title" class="pb-2">
      {{ props.title }}
    </v-card-title>
    <slot />
  </v-card>
</template>
