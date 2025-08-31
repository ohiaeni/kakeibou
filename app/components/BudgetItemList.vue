<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getAllCategoriesWithBudgets } = useBudgets()
const router = useRouter()

const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())

const handleBudgetItemClick = (categoryId: number) => {
  router.push(`/budget/${categoryId}`)
}
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
        <BudgetItem
          :id="budgetWithCategory.category.category_id"
          :name="budgetWithCategory.category.name"
          :icon="budgetWithCategory.category.icon"
          :percentage="budgetWithCategory.usage_percentage"
          :amount="budgetWithCategory.amount"
          :color="budgetWithCategory.category.color"
          @click="handleBudgetItemClick"
        />
      </v-col>
    </v-row>
  </div>
</template>
