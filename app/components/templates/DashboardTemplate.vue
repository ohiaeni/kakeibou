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
  showExpenseModal: boolean
  showSuccessMessage: boolean
  currentYear: number
  currentMonth: number
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
  (e: 'update:showExpenseModal' | 'update:showSuccessMessage', value: boolean): void
  (e: 'open-expense-modal' | 'expense-saved'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleOpenExpenseModal = () => {
  emit('open-expense-modal')
}

const handleExpenseSaved = () => {
  emit('expense-saved')
}

const updateExpenseModal = (value: boolean) => {
  emit('update:showExpenseModal', value)
}

const updateSuccessMessage = (value: boolean) => {
  emit('update:showSuccessMessage', value)
}
</script>

<template>
  <v-container>
    <OrganismsDashboardContent
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
      @open-expense-modal="handleOpenExpenseModal"
    />

    <!-- 支出追加モーダル -->
    <OrganismsExpenseAddModal
      :model-value="showExpenseModal"
      @update:model-value="updateExpenseModal"
      @saved="handleExpenseSaved"
    />

    <!-- 成功メッセージ -->
    <MoleculesSuccessSnackbar
      :model-value="showSuccessMessage"
      message="支出を追加しました"
      @update:model-value="updateSuccessMessage"
    />
  </v-container>
</template>
