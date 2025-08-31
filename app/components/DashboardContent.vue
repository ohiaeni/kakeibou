<script setup lang="ts">
interface DashboardCard {
  title: string
  value: string
  icon: string
  color: string
}

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
  year: number
  month: number
  dashboardCards: DashboardCard[]
  totalProgress: number
  monthElapsed: number
  budgetsWithCategories: BudgetWithCategory[]
  overBudgetCategories: BudgetWithCategory[]
  topExpenseCategory: BudgetWithCategory | null | undefined
  totalBudget: number
  recentExpenses: unknown[]
}

interface Emits {
  (e: 'open-expense-modal'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleOpenExpenseModal = () => {
  emit('open-expense-modal')
}
</script>

<template>
  <div>
    <!-- ヘッダー -->
    <DashboardHeader :year="props.year" :month="props.month" />

    <!-- 概要カード -->
    <DashboardSummaryCards :cards="props.dashboardCards" />

    <!-- 予算vs支出の全体進捗 -->
    <BudgetProgressCard
      :total-progress="props.totalProgress"
      :month-elapsed="props.monthElapsed"
    />

    <!-- 統計セクション -->
    <DashboardStatistics
      :budgets-with-categories="props.budgetsWithCategories"
      :over-budget-categories="props.overBudgetCategories"
      :total-progress="props.totalProgress"
      :month-elapsed="props.monthElapsed"
      :top-expense-category="props.topExpenseCategory"
      :total-budget="props.totalBudget"
    />

    <!-- 最近の支出リスト -->
    <RecentExpensesCard
      :recent-expenses="props.recentExpenses as any"
      @open-expense-modal="handleOpenExpenseModal"
    />
  </div>
</template>
