<script setup lang="ts">
import { useHome } from '~/composables/useHome'
import { useBudgets } from '~/composables/useBudgets'
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'
import { OrganismsIndexActionButtons } from '#components'

const {
  showExpenseModal,
  showSuccessMessage,
  handleExpenseSaved,
} = useHome()

const { getBudgetItemsForDisplay } = useBudgets()
const router = useRouter()

const budgetsWithCategories = computed(() => getBudgetItemsForDisplay())

// BudgetItem functions
const handleBudgetItemClick = (categoryId: number) => {
  router.push(`/budget/${categoryId}`)
}

// Modal event handlers
const handleModalUpdate = (value: boolean) => {
  showExpenseModal.value = value
}

const handleExpenseAdded = () => {
  handleExpenseSaved()
}

const actionButtons: ActionButtonProps[] = [
  {
    icon: 'mdi-plus',
    label: '支出を追加',
    color: 'primary',
    onClick: () => { showExpenseModal.value = true },
  },
  {
    icon: 'mdi-chart-line',
    label: 'ダッシュボード',
    color: 'surface-variant',
    to: '/dashboard',
  },
]
</script>

<template>
  <div class="pa-4 min-h-screen">
    <OrganismsIndexActionButtons :action-buttons="actionButtons" />
    <OrganismsIndexBudgetItems
      :budget-items="budgetsWithCategories"
      @budget-item-click="handleBudgetItemClick"
    />
    <OrganismsExpenseAddModal
      :show-modal="showExpenseModal"
      @update:show-modal="handleModalUpdate"
      @expense-saved="handleExpenseAdded"
    />
    <OrganismsSuccessSnackbar
      :show="showSuccessMessage"
      @update:show="showSuccessMessage = $event"
    />
  </div>
</template>
