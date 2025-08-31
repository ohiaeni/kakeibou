<script setup lang="ts">
interface ExpenseWithCategory {
  expense_id: number
  user_id: number
  category_id: number
  amount: number
  spent_at: string
  note?: string
  created_at: string
  updated_at: string
  category?: {
    category_id: number
    name: string
    icon: string
    color: string
  }
}

interface Props {
  recentExpenses: ExpenseWithCategory[]
  onAddExpense: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <v-card class="pa-6 mb-6" elevation="2">
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h6 font-weight-bold">
        最近の支出
      </h2>
      <v-btn
        color="primary"
        variant="elevated"
        prepend-icon="mdi-plus"
        @click="props.onAddExpense"
      >
        支出を追加
      </v-btn>
    </div>
    <div v-if="props.recentExpenses.length === 0" class="text-center py-8">
      <v-icon size="48" color="grey-lighten-1" class="mb-2">
        mdi-receipt-text-outline
      </v-icon>
      <div class="text-body-2 text-grey-darken-1">
        まだ支出が記録されていません
      </div>
    </div>
    <v-list v-else lines="two">
      <v-list-item
        v-for="(expense, index) in props.recentExpenses.slice(0, 5)"
        :key="index"
        class="px-0"
      >
        <template #prepend>
          <v-icon
            size="24"
            :color="expense.category?.color"
            class="mr-3"
          >
            {{ expense.category?.icon || 'mdi-receipt' }}
          </v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-medium">
          ¥{{ expense.amount?.toLocaleString() }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption">
          {{ expense.category?.name }} • {{ expense.spent_at }}
          <span v-if="expense.note" class="text-grey-darken-1">
            • {{ expense.note }}
          </span>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
