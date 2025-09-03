<script setup lang="ts">
import type { BudgetWithCategory } from '~/composables/useBudgets'

interface Props {
  budgetsWithCategories: BudgetWithCategory[]
}

const props = defineProps<Props>()
</script>

<template>
  <v-card class="pa-6 mb-6" elevation="2">
    <h2 class="text-h6 font-weight-bold mb-4">
      カテゴリ別予算
    </h2>
    <v-row>
      <v-col
        v-for="budget in props.budgetsWithCategories.slice(0, 6)"
        :key="budget.budgetId"
        cols="12"
        sm="6"
        md="4"
      >
        <div class="d-flex align-center justify-space-between pa-3 border rounded">
          <div class="d-flex align-center">
            <v-icon
              size="24"
              :color="budget.category.color"
              class="mr-3"
            >
              {{ budget.category.icon }}
            </v-icon>
            <div>
              <div class="text-body-2 font-weight-medium">
                {{ budget.category.name }}
              </div>
              <div class="text-caption text-grey-darken-1">
                ¥{{ budget.currentExpense.toLocaleString() }} / ¥{{ budget.amount.toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="text-right">
            <div
              class="text-body-2 font-weight-bold"
              :class="budget.usagePercentage > 100 ? 'text-error' : budget.usagePercentage > 80 ? 'text-warning' : 'text-success'"
            >
              {{ Math.round(budget.usagePercentage) }}%
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
