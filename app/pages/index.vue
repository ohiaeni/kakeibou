<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'
import { OrganismsIndexActionButtons } from '#components'

// ホームページの状態管理（旧useHome.tsの内容をインライン化）
const showExpenseModal = ref(false)
const showSuccessMessage = ref(false)

// ローカルストレージ初期化のための確認ダイアログ
const showClearDialog = ref(false)

const handleExpenseSaved = () => {
  showSuccessMessage.value = true
}

const { getBudgetItemsForDisplay, clearStorage } = useBudgets()
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

// ローカルストレージ初期化機能
const handleClearStorage = () => {
  showClearDialog.value = true
}

const confirmClearStorage = () => {
  clearStorage()
  showClearDialog.value = false
  // データがクリアされたことを通知
  showSuccessMessage.value = true
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
  {
    icon: 'mdi-delete-sweep',
    label: 'データ初期化',
    color: 'error',
    onClick: handleClearStorage,
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

    <!-- データ初期化確認ダイアログ -->
    <v-dialog v-model="showClearDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h6">
          データ初期化の確認
        </v-card-title>
        <v-card-text>
          すべての予算・支出データが削除されます。この操作は元に戻せません。本当に実行しますか？
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showClearDialog = false">
            キャンセル
          </v-btn>
          <v-btn color="error" @click="confirmClearStorage">
            削除する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
