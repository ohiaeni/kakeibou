<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getAllCategoriesWithBudgets } = useBudgets()

const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())
</script>

<template>
  <div class="w-100">
    <v-row>
      <v-col
        v-for="budgetWithCategory in budgetsWithCategories"
        :key="budgetWithCategory.budget_id"
        cols="4"
        class="pa-1 pa-sm-2 pa-md-3"
      >
        <AtomsBudgetItem
          :id="budgetWithCategory.category.category_id"
          :name="budgetWithCategory.category.name"
          :icon="budgetWithCategory.category.icon"
          :percentage="budgetWithCategory.usage_percentage"
          :amount="budgetWithCategory.amount"
          :color="budgetWithCategory.category.color"
        />
      </v-col>
    </v-row>
  </div>
</template>
