<script setup lang="ts">
interface ActionButton {
  icon: string
  label: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  labelColor?: string
  to?: string
  onClick?: () => void
}

interface Props {
  actionButtons: ActionButton[]
  showExpenseModal: boolean
  showSuccessMessage: boolean
}

interface Emits {
  (e: 'update:showExpenseModal' | 'update:showSuccessMessage', value: boolean): void
  (e: 'expense-saved'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

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
  <v-container class="pa-4 pa-sm-6 mx-auto" style="max-width: 1200px;">
    <!-- 成功メッセージ（固定位置） -->
    <v-fade-transition>
      <v-alert
        v-if="showSuccessMessage"
        :model-value="showSuccessMessage"
        closable
        text="支出を追加しました。"
        title="成功"
        type="success"
        @update:model-value="updateSuccessMessage"
      />
    </v-fade-transition>

    <OrganismsActionButtonGroup :actions="actionButtons" />

    <OrganismsBudgetItemList />

    <!-- 支出追加モーダル -->
    <OrganismsExpenseAddModal
      :model-value="showExpenseModal"
      @update:model-value="updateExpenseModal"
      @saved="handleExpenseSaved"
    />
  </v-container>
</template>
