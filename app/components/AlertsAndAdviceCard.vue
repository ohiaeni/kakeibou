<script setup lang="ts">
interface Budget {
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
  overBudgetCategories: Budget[]
  totalProgress: number
  monthElapsed: number
  topExpenseCategory: Budget | null | undefined
  totalBudget: number
}

defineProps<Props>()
</script>

<template>
  <!-- アラートとアドバイス -->
  <v-card class="h-100">
    <div class="pa-4 pb-2 text-body-1 font-weight-bold">
      <v-icon icon="mdi-alert-circle" class="me-2" />
      アラート & アドバイス
    </div>
    <v-card-text>
      <!-- 予算超過アラート -->
      <div v-if="overBudgetCategories.length > 0" class="mb-4">
        <v-alert
          type="error"
          variant="tonal"
          density="compact"
          class="mb-2"
        >
          <template #prepend>
            <v-icon icon="mdi-alert" />
          </template>
          {{ overBudgetCategories.length }}個のカテゴリで予算超過
        </v-alert>
        <div
          v-for="budget in overBudgetCategories"
          :key="budget.budget_id"
          class="d-flex align-center py-1"
        >
          <v-icon
            :icon="budget.category.icon"
            color="error"
            size="small"
            class="me-2"
          />
          <span class="text-body-2">
            {{ budget.category.name }}:
            <span class="text-error font-weight-bold">
              ¥{{ (budget.current_expense - budget.amount).toLocaleString() }}
            </span>
            超過
          </span>
        </div>
      </div>

      <!-- 支出ペースの警告 -->
      <div v-if="totalProgress > monthElapsed + 20" class="mb-4">
        <v-alert
          type="warning"
          variant="tonal"
          density="compact"
        >
          <template #prepend>
            <v-icon icon="mdi-speedometer" />
          </template>
          支出ペースが早すぎます。月末まで注意が必要です。
        </v-alert>
      </div>

      <!-- 最高支出カテゴリの情報 -->
      <div v-if="topExpenseCategory" class="mb-4">
        <div class="d-flex align-center mb-2">
          <v-icon icon="mdi-chart-bar" color="primary" class="me-2" />
          <span class="text-subtitle-2 font-weight-bold">今月の最高支出</span>
        </div>
        <div class="d-flex align-center">
          <v-icon
            :icon="topExpenseCategory.category.icon"
            :color="topExpenseCategory.category.color"
            class="me-2"
          />
          <div>
            <div class="font-weight-medium">
              {{ topExpenseCategory.category.name }}
            </div>
            <div class="text-caption text-medium-emphasis">
              ¥{{ topExpenseCategory.current_expense.toLocaleString() }}
              <template v-if="topExpenseCategory.amount > 0">
                （予算の{{ topExpenseCategory.usage_percentage }}%）
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- ポジティブメッセージ -->
      <div v-if="overBudgetCategories.length === 0 && totalProgress <= monthElapsed + 10">
        <v-alert
          type="success"
          variant="tonal"
          density="compact"
        >
          <template #prepend>
            <v-icon icon="mdi-check-circle" />
          </template>
          順調に予算管理ができています！この調子で続けましょう。
        </v-alert>
      </div>

      <!-- 予算未設定の警告 -->
      <div v-if="totalBudget === 0" class="mb-4">
        <v-alert
          type="info"
          variant="tonal"
          density="compact"
        >
          <template #prepend>
            <v-icon icon="mdi-information" />
          </template>
          予算が設定されていません。カテゴリページで予算を設定してください。
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>
