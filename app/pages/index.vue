<script setup lang="ts">
const showExpenseModal = ref(false)

const openExpenseModal = () => {
  showExpenseModal.value = true
}

const handleExpenseSaved = () => {
  showSuccessMessage.value = true
}

const showSuccessMessage = ref(false)

// アクションボタンの設定
const actionButtons = [
  {
    icon: 'mdi-plus',
    label: '支出を追加',
    color: 'primary',
    variant: 'tonal' as const,
    labelColor: 'text-primary',
    onClick: openExpenseModal,
  },
  {
    icon: 'mdi-chart-line',
    label: 'ダッシュボード',
    color: 'surface-variant',
    variant: 'tonal' as const,
    labelColor: 'text-on-surface',
    to: '/dashboard',
  },
]
</script>

<template>
  <v-container class="pa-4 pa-sm-6 mx-auto" style="max-width: 1200px;">
    <!-- 成功メッセージ（固定位置） -->
    <v-fade-transition>
      <v-alert
        v-if="showSuccessMessage"
        v-model="showSuccessMessage"
        closable
        text="支出を追加しました。"
        title="成功"
        type="success"
      />
    </v-fade-transition>

    <OrganismsActionButtonGroup :actions="actionButtons" />

    <OrganismsBudgetItemList />

    <!-- 支出追加モーダル -->
    <OrganismsExpenseAddModal
      v-model="showExpenseModal"
      @saved="handleExpenseSaved"
    />
  </v-container>
</template>
