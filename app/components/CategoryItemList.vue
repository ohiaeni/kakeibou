<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getAllCategoriesWithBudgets } = useBudgets()

// 現在の年月の予算一覧を取得（予算未設定も含む9件）
const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="budgetWithCategory in budgetsWithCategories"
        :key="budgetWithCategory.budget_id"
        cols="4"
      >
        <CategoryItem
          :id="budgetWithCategory.category.category_id"
          :name="budgetWithCategory.category.name"
          :icon="budgetWithCategory.category.icon"
          :percentage="budgetWithCategory.usage_percentage"
          :color="budgetWithCategory.category.color"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
