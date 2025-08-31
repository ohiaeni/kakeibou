import { useBudgets } from '~/composables/useBudgets'

export const useDashboard = () => {
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

  return {
    showExpenseModal,
    showSuccessMessage,
    currentYear,
    currentMonth,
    budgetsWithCategories,
    totalBudget,
    totalExpense,
    totalRemaining,
    totalProgress,
    recentExpenses,
    topExpenseCategory,
    overBudgetCategories,
    monthElapsed,
    dashboardCards,
    openExpenseModal,
    handleExpenseSaved,
  }
}
