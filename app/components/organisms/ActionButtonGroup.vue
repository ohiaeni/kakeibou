<script setup lang="ts">
interface ActionItem {
  icon: string
  label: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  to?: string
  labelColor?: string
  onClick?: () => void
}

interface Props {
  actions: ActionItem[]
}

interface Emits {
  (e: 'action-click', action: ActionItem, index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleActionClick = (action: ActionItem, index: number) => {
  if (action.onClick) {
    action.onClick()
  }
  emit('action-click', action, index)
}
</script>

<template>
  <div class="d-flex justify-center align-center ga-6 ga-sm-8 ga-md-10 mb-8 mb-sm-10 mb-md-12 pa-6 pa-sm-8 pa-md-10">
    <MoleculesActionButton
      v-for="(action, index) in props.actions"
      :key="index"
      :icon="action.icon"
      :label="action.label"
      :color="action.color"
      :variant="action.variant"
      :to="action.to"
      :label-color="action.labelColor"
      @click="handleActionClick(action, index)"
    />
  </div>
</template>
