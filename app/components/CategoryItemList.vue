<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getAllCategoriesWithBudgets } = useBudgets()

// 現在の年月の予算一覧を取得（予算未設定も含む9件）
const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())
</script>

<template>
  <div class="category-list-container">
    <v-row>
      <v-col
        v-for="budgetWithCategory in budgetsWithCategories"
        :key="budgetWithCategory.budget_id"
        cols="4"
        sm="4"
        md="4"
        lg="4"
        xl="4"
      >
        <CategoryItem
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

<style scoped>
.category-list-container {
  width: 100%;
  padding: 0;
}

/* モバイル表示の最適化 */
@media (max-width: 599px) {
  .category-list-container :deep(.v-col) {
    padding: 6px;
  }
}

/* タブレット表示の最適化 */
@media (min-width: 600px) and (max-width: 959px) {
  .category-list-container :deep(.v-col) {
    padding: 8px;
  }
}

/* デスクトップ表示の最適化 */
@media (min-width: 960px) {
  .category-list-container :deep(.v-col) {
    padding: 12px;
  }
}
</style>
