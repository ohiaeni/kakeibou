<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'
import type { ActionButtonProps } from '~/types/ui/ActionButtonProps'
import { OrganismsIndexActionButtons } from '#components'

const router = useRouter()
const showExpenseModal = ref(false)
const showSuccessMessage = ref(false)
const showClearDialog = ref(false)

const { getBudgetItemsForDisplay, clearStorage } = useBudgets()
const budgetsWithCategories = computed(() => getBudgetItemsForDisplay())

// データ初期化の確認ダイアログを表示
const handleClearDataClick = () => {
  showClearDialog.value = true
}

// データ初期化を実行
const confirmClearData = () => {
  clearStorage()
  showClearDialog.value = false
  showSuccessMessage.value = true
  // データを再読み込みするため、budgetsWithCategoriesを再計算
  setTimeout(() => {
    location.reload()
  }, 1000)
}

// ダイアログをキャンセル
const cancelClearData = () => {
  showClearDialog.value = false
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
    onClick: handleClearDataClick,
  },
]

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

    <!-- データ初期化確認ダイアログ -->
    <v-dialog v-model="showClearDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          <v-icon class="mr-2" color="error">
            mdi-alert-circle
          </v-icon>
          データ初期化の確認
        </v-card-title>

        <v-card-text>
          <p class="mb-3">
            すべてのローカルデータ（予算、支出、カスタムカテゴリ）が削除されます。
          </p>
          <p class="text-error font-weight-bold">
            この操作は取り消せません。本当に実行しますか？
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="grey"
            variant="text"
            @click="cancelClearData"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="error"
            variant="elevated"
            @click="confirmClearData"
          >
            初期化する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
