<script setup lang="ts">
import type { BudgetItemProps } from '~/types/ui/BudgetItemProps'

const props = defineProps<{
  budgetItems: BudgetItemProps[]
}>()

const emit = defineEmits<{
  budgetItemClick: [id: number]
}>()

const handleBudgetItemClick = (id: number) => {
  emit('budgetItemClick', id)
}
</script>

<template>
  <v-row class="w-100 mb-4">
    <v-col
      v-for="budgetItem in props.budgetItems"
      :key="budgetItem.id"
      cols="4"
      sm="4"
      md="4"
    >
      <v-card
        class="d-flex flex-column align-center justify-center cursor-pointer elevation-1 pa-3"
        color="surface"
        rounded="lg"
        hover
        height="120"
      >
        <MoleculesBudgetItem
          :budget-item="budgetItem"
          @click="handleBudgetItemClick"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
