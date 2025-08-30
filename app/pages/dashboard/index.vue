<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getBudgetsWithCategories, getTotalBudget, getTotalExpense, getBudgetProgress, getExpensesWithCategories } = useBudgets()

// 支出追加モーダルの表示状態
const showExpenseModal = ref(false)

// 支出追加モーダルを開く
const openExpenseModal = () => {
  showExpenseModal.value = true
}

// 支出が保存された時の処理
const handleExpenseSaved = () => {
  // データが更新されるので、特に追加処理は不要
  // 成功メッセージを表示
  showSuccessMessage.value = true
}

// 成功メッセージ表示用
const showSuccessMessage = ref(false)

// 現在の年月
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

// 予算データを取得
const budgetsWithCategories = computed(() => getBudgetsWithCategories(currentYear, currentMonth))

// 合計金額を計算
const totalBudget = computed(() => getTotalBudget(currentYear, currentMonth))
const totalExpense = computed(() => getTotalExpense(currentYear, currentMonth))
const totalRemaining = computed(() => totalBudget.value - totalExpense.value)
const totalProgress = computed(() => getBudgetProgress(currentYear, currentMonth))

// 最近の支出リスト（最新5件）
const recentExpenses = computed(() => getExpensesWithCategories(currentYear, currentMonth, 5))

// 最も支出の多いカテゴリ
const topExpenseCategory = computed(() => {
  const sorted = budgetsWithCategories.value
    .filter(budget => budget.current_expense > 0)
    .sort((a, b) => b.current_expense - a.current_expense)
  return sorted.length > 0 ? sorted[0] : null
})

// 予算超過カテゴリ
const overBudgetCategories = computed(() => {
  return budgetsWithCategories.value.filter(budget =>
    budget.amount > 0 && budget.current_expense > budget.amount,
  )
})

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

// カテゴリ別のチャート用データ（将来の拡張用）
const _chartData = computed(() => {
  return budgetsWithCategories.value
    .filter(budget => budget.current_expense > 0)
    .map(budget => ({
      name: budget.category.name,
      value: budget.current_expense,
      color: budget.category.color,
    }))
})
</script>

<template>
  <v-container>
    <!-- ヘッダー -->
    <DashboardHeader :year="currentYear" :month="currentMonth" />

    <!-- 概要カード -->
    <DashboardSummaryCards :cards="dashboardCards" />

    <!-- 予算vs支出の全体進捗 -->
    <BudgetProgressCard
      :total-progress="totalProgress"
      :month-elapsed="monthElapsed"
    />    <v-row>
      <!-- カテゴリ別支出ランキング -->
      <v-col cols="12" lg="6">
        <ExpenseRankingCard :budgets-with-categories="budgetsWithCategories" />
      </v-col>

      <!-- アラートとアドバイス -->
      <v-col cols="12" lg="6">
        <AlertsAndAdviceCard
          :over-budget-categories="overBudgetCategories"
          :total-progress="totalProgress"
          :month-elapsed="monthElapsed"
          :top-expense-category="topExpenseCategory"
          :total-budget="totalBudget"
        />
      </v-col>
    </v-row>

    <!-- 最近の支出リスト -->
    <RecentExpensesCard
      :recent-expenses="recentExpenses"
      @open-expense-modal="openExpenseModal"
    />    <!-- 支出追加モーダル -->
    <ExpenseAddModal
      v-model="showExpenseModal"
      @saved="handleExpenseSaved"
    />

    <!-- 成功メッセージ -->
    <v-snackbar
      v-model="showSuccessMessage"
      color="success"
      timeout="3000"
      location="top"
    >
      支出を追加しました
      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="showSuccessMessage = false"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
