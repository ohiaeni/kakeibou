<script setup lang="ts">
interface Expense {
  expense_id: number
  amount: number
  spent_at: string
  note?: string
  category?: {
    category_id: number
    name: string
    icon: string
    color?: string
  }
}

interface Props {
  recentExpenses: Expense[]
}

interface Emits {
  (e: 'open-expense-modal'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleOpenExpenseModal = () => {
  emit('open-expense-modal')
}
</script>

<template>
  <!-- 最近の支出リスト -->
  <v-card class="mt-6">
    <div class="pa-4 pb-2 text-body-1 font-weight-bold">
      <v-icon icon="mdi-history" class="me-2" />
      最近の支出
    </div>
    <v-card-text>
      <div v-if="recentExpenses.length === 0" class="text-center py-8">
        <v-icon icon="mdi-receipt" size="64" class="text-medium-emphasis mb-4" />
        <p class="text-medium-emphasis">
          今月の支出データがありません
        </p>
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-plus"
          class="mt-4"
          @click="handleOpenExpenseModal"
        >
          支出を記録
        </v-btn>
      </div>
      <div v-else>
        <v-list lines="two">
          <template
            v-for="(expense, index) in recentExpenses"
            :key="expense.expense_id"
          >
            <v-list-item class="py-3">
              <template #prepend>
                <v-avatar :color="expense.category?.color || 'primary'" size="40">
                  <v-icon
                    :icon="expense.category?.icon || 'mdi-cash'"
                    color="white"
                  />
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium">
                {{ expense.category?.name || '不明' }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <div class="d-flex align-center justify-space-between ga-2 flex-wrap">
                  <span class="text-body-2 text-on-surface">{{ expense.spent_at }}</span>
                  <span class="font-weight-bold text-error text-body-1 flex-shrink-0">
                    -¥{{ expense.amount.toLocaleString() }}
                  </span>
                </div>
                <div v-if="expense.note" class="text-caption text-on-surface mt-1" style="line-height: 1.3;">
                  {{ expense.note }}
                </div>
              </v-list-item-subtitle>
            </v-list-item>

            <v-divider v-if="index < recentExpenses.length - 1" />
          </template>
        </v-list>

        <div class="d-flex justify-center mt-4">
          <v-btn
            color="primary"
            variant="outlined"
            prepend-icon="mdi-plus"
            @click="handleOpenExpenseModal"
          >
            支出を追加
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
