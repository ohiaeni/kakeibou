<script setup lang="ts">
interface Props {
  icon: string
  name: string
  color?: string
  isActive?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="d-flex align-center ga-1 flex-shrink-0">
    <v-icon
      class="flex-shrink-0"
      size="small"
      :color="props.isActive ? props.color : 'grey-lighten-1'"
    >
      {{ props.icon }}
    </v-icon>
    <div
      class="text-caption font-weight-medium text-center"
      :class="props.isActive ? 'text-on-surface' : 'text-grey-lighten-1'"
    >
      {{ props.name }}
    </div>
  </div>
</template>
