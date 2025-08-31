<script setup lang="ts">
import { useDashboard } from '~/composables/useDashboard'

const {
  showExpenseModal,
  showSuccessMessage,
  currentYear,
  currentMonth,
  dashboardCards,
  totalProgress,
  monthElapsed,
  budgetsWithCategories,
  overBudgetCategories,
  topExpenseCategory,
  totalBudget,
  recentExpenses,
  openExpenseModal,
  handleExpenseSaved,
} = useDashboard()
</script>

<template>
  <v-container>
    <DashboardContent
      :year="currentYear"
      :month="currentMonth"
      :dashboard-cards="dashboardCards"
      :total-progress="totalProgress"
      :month-elapsed="monthElapsed"
      :budgets-with-categories="budgetsWithCategories"
      :over-budget-categories="overBudgetCategories"
      :top-expense-category="topExpenseCategory"
      :total-budget="totalBudget"
      :recent-expenses="recentExpenses"
      @open-expense-modal="openExpenseModal"
    />

    <!-- 支出追加モーダル -->
    <ExpenseAddModal
      v-model="showExpenseModal"
      @saved="handleExpenseSaved"
    />

    <!-- 成功メッセージ -->
    <SuccessSnackbar
      v-model="showSuccessMessage"
      message="支出を追加しました"
    />
  </v-container>
</template>
