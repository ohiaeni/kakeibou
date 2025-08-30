<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getAllCategoriesWithBudgets } = useBudgets()

// 現在の年月の予算一覧を取得（予算未設定も含む9件）
const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())
</script>

<template>
  <div class="w-100">
    <v-row class="pa-0 ma-0">
      <v-col
        v-for="budgetWithCategory in budgetsWithCategories"
        :key="budgetWithCategory.budget_id"
        cols="4"
        sm="4"
        md="4"
        lg="4"
        xl="4"
        class="pa-1 pa-sm-2 pa-md-3"
      >
        <BudgetItem
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
