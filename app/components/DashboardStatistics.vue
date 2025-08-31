<script setup lang="ts">
interface BudgetWithCategory {
  budget_id: number
  amount: number
  current_expense: number
  usage_percentage: number
  category: {
    category_id: number
    name: string
    icon: string
    color?: string
  }
}

interface Props {
  budgetsWithCategories: BudgetWithCategory[]
  overBudgetCategories: BudgetWithCategory[]
  totalProgress: number
  monthElapsed: number
  topExpenseCategory: BudgetWithCategory | null | undefined
  totalBudget: number
}

const props = defineProps<Props>()
</script>

<template>
  <v-row>
    <!-- カテゴリ別支出ランキング -->
    <v-col cols="12" lg="6">
      <ExpenseRankingCard :budgets-with-categories="props.budgetsWithCategories" />
    </v-col>

    <!-- アラートとアドバイス -->
    <v-col cols="12" lg="6">
      <AlertsAndAdviceCard
        :over-budget-categories="props.overBudgetCategories"
        :total-progress="props.totalProgress"
        :month-elapsed="props.monthElapsed"
        :top-expense-category="props.topExpenseCategory"
        :total-budget="props.totalBudget"
      />
    </v-col>
  </v-row>
</template>
