<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'
import { OrganismsIndexActionButtons } from '#components'

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

const router = useRouter()
const showExpenseModal = ref(false)
const showSuccessMessage = ref(false)

const { getBudgetItemsForDisplay } = useBudgets()
const budgetsWithCategories = computed(() => getBudgetItemsForDisplay())

const handleBudgetItemClick = (categoryId: number) => {
  router.push(`/budget/${categoryId}`)
}
const handleModalUpdate = (value: boolean) => {
  showExpenseModal.value = value
}
const handleExpenseAdded = () => {
  showSuccessMessage.value = true
}
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
