<script setup lang="ts">
interface BudgetData {
  current_expense: number
  remaining_amount: number
  amount: number
  usage_percentage: number
}

interface Props {
  budgetData?: BudgetData | null
}

defineProps<Props>()

const emit = defineEmits<{
  editBudget: []
}>()
</script>

<template>
  <v-card class="mb-6" elevation="2" rounded="lg">
    <v-card-title class="pb-2 d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon class="mr-2">
          mdi-chart-line
        </v-icon>
        統計情報
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        prepend-icon="mdi-pencil"
        @click="emit('editBudget')"
      >
        予算編集
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-bold text-primary mb-1">
              ¥{{ budgetData?.current_expense.toLocaleString() || '0' }}
            </p>
            <p class="text-caption text-grey">
              今月の支出
            </p>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p
              class="text-h4 font-weight-bold mb-1"
              :class="budgetData?.remaining_amount && budgetData.remaining_amount >= 0 ? 'text-success' : 'text-error'"
            >
              ¥{{ budgetData?.remaining_amount.toLocaleString() || '0' }}
            </p>
            <p class="text-caption text-grey">
              予算残額
            </p>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-bold text-info mb-1">
              ¥{{ budgetData?.amount.toLocaleString() || '0' }}
            </p>
            <p class="text-caption text-grey">
              月予算
            </p>
          </div>
        </v-col>
        <v-col cols="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-bold text-warning mb-1">
              {{ budgetData?.usage_percentage || 0 }}%
            </p>
            <p class="text-caption text-grey">
              使用率
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
