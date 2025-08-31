<script setup lang="ts">
import type { BudgetItemProps } from '~/types/ui/BudgetItemProps'

const props = defineProps<{
  budgetItem: BudgetItemProps
}>()

const emit = defineEmits<{
  click: [id: number]
}>()

const handleClick = () => {
  emit('click', props.budgetItem.id)
}
</script>

<template>
  <div class="cursor-pointer d-flex flex-column align-center" @click="handleClick">
    <AtomsProgressCircular
      :progress-circular="{
        value: props.budgetItem.value,
        amount: props.budgetItem.amount,
        color: props.budgetItem.amount === 0 ? 'grey-lighten-1' : props.budgetItem.color,
      }"
    />
    <div class="mt-2 d-flex align-center justify-center text-caption text-center">
      <v-icon size="14" class="mr-1">
        {{ props.budgetItem.icon }}
      </v-icon>
      <span class="text-truncate">{{ props.budgetItem.label }}</span>
    </div>
  </div>
</template>
