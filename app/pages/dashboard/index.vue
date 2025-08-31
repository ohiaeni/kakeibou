<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

// useDashboard.tsから移動したロジック
const { getBudgetsWithCategories, getTotalBudget, getTotalExpense, getBudgetProgress, getExpensesWithCategories } = useBudgets()

// 支出追加モーダルの表示状態
const showExpenseModal = ref(false)
const showSuccessMessage = ref(false)

// 現在の年月
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

// 支出追加モーダルを開く
const openExpenseModal = () => {
  showExpenseModal.value = true
}

// 支出が保存された時の処理
const handleExpenseSaved = () => {
  showSuccessMessage.value = true
}

// 予算データを取得
const budgetsWithCategories = computed(() => getBudgetsWithCategories(currentYear, currentMonth))

// 合計金額を計算
const totalBudget = computed(() => getTotalBudget(currentYear, currentMonth))
const totalExpense = computed(() => getTotalExpense(currentYear, currentMonth))
const totalRemaining = computed(() => totalBudget.value - totalExpense.value)
const totalProgress = computed(() => getBudgetProgress(currentYear, currentMonth))

// 最近の支出リスト（最新5件）
const recentExpenses = computed(() => getExpensesWithCategories(currentYear, currentMonth, 5))

// 月の経過率（日付ベース）
const monthElapsed = computed(() => {
  const today = new Date()
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const currentDay = today.getDate()
  return Math.round((currentDay / daysInMonth) * 100)
})

// ダッシュボードカード用のデータ
const dashboardCards = computed(() => [
  {
    title: '今月の予算',
    value: `¥${totalBudget.value.toLocaleString()}`,
    icon: 'mdi-wallet',
    color: 'primary',
  },
  {
    title: '今月の支出',
    value: `¥${totalExpense.value.toLocaleString()}`,
    icon: 'mdi-cash-minus',
    color: 'error',
  },
  {
    title: '残り予算',
    value: `¥${totalRemaining.value.toLocaleString()}`,
    icon: 'mdi-piggy-bank',
    color: totalRemaining.value >= 0 ? 'success' : 'error',
  },
  {
    title: '使用率',
    value: `${totalProgress.value}%`,
    icon: 'mdi-chart-pie',
    color: totalProgress.value > 100 ? 'error' : totalProgress.value > 80 ? 'warning' : 'success',
  },
])

// Expense Modal functions (inlined from ExpenseAddModal)
const internalModalValue = computed({
  get: () => showExpenseModal.value,
  set: (value: boolean) => showExpenseModal.value = value,
})

const expenseForm = ref({
  category_id: null as number | null,
  amount: null as number | null,
  spent_at: new Date().toISOString().split('T')[0],
  note: '',
})

const resetForm = () => {
  expenseForm.value = {
    category_id: null,
    amount: null,
    spent_at: new Date().toISOString().split('T')[0],
    note: '',
  }
}

const handleModalClose = () => {
  resetForm()
  internalModalValue.value = false
}
</script>

<template>
  <v-container>
    <OrganismsDashboardHeader
      :current-year="currentYear"
      :current-month="currentMonth"
    />

    <OrganismsDashboardCards
      :dashboard-cards="dashboardCards"
    />

    <OrganismsDashboardProgress
      :total-progress="totalProgress"
      :month-elapsed="monthElapsed"
    />

    <OrganismsDashboardBudgetList
      :budgets-with-categories="budgetsWithCategories"
    />

    <OrganismsDashboardRecentExpenses
      :recent-expenses="recentExpenses"
      @add-expense="openExpenseModal"
    />

    <OrganismsExpenseAddModal
      :show-modal="showExpenseModal"
      @update:show-modal="handleModalClose"
      @expense-saved="handleExpenseSaved"
    />

    <OrganismsSuccessSnackbar
      :show="showSuccessMessage"
      @update:show="showSuccessMessage = $event"
    />
  </v-container>
</template>
