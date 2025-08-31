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
  budgetsWithCategories: Budget[]
}

defineProps<Props>()
</script>

<template>
  <!-- カテゴリ別支出ランキング -->
  <v-card class="h-100">
    <div class="pa-4 pb-2 text-body-1 font-weight-bold">
      <v-icon icon="mdi-trophy" class="me-2" />
      支出ランキング
    </div>
    <v-card-text>
      <div v-if="budgetsWithCategories.length === 0" class="text-center py-8">
        <v-icon icon="mdi-chart-bar" size="64" class="text-medium-emphasis mb-4" />
        <p class="text-medium-emphasis">
          支出データがありません
        </p>
      </div>
      <div v-else>
        <div
          v-for="(budget, index) in budgetsWithCategories
            .filter(b => b.current_expense > 0)
            .sort((a, b) => b.current_expense - a.current_expense)
            .slice(0, 5)"
          :key="budget.budget_id"
          class="d-flex align-center py-3 ga-3"
          :class="{ 'border-b': index < 4 }"
          :style="{ borderBottomColor: 'rgb(var(--v-theme-surface-variant))' }"
        >
          <div class="text-center flex-shrink-0" style="min-width: 32px;">
            <span class="text-h6 font-weight-bold text-primary">
              {{ index + 1 }}
            </span>
          </div>
          <v-icon
            :icon="budget.category.icon"
            :color="budget.category.color"
            class="flex-shrink-0"
          />
          <div class="flex-grow-1" style="min-width: 0;">
            <div class="d-flex align-center justify-space-between ga-2 flex-wrap">
              <span class="font-weight-medium flex-grow-1 text-truncate">{{ budget.category.name }}</span>
              <span class="font-weight-bold text-body-1 flex-shrink-0">
                ¥{{ budget.current_expense.toLocaleString() }}
              </span>
            </div>
            <div v-if="budget.amount > 0" class="d-flex align-center mt-2 ga-2">
              <v-progress-linear
                :model-value="Math.min(budget.usage_percentage, 100)"
                :color="budget.usage_percentage > 100 ? 'error' : 'primary'"
                height="4"
                rounded
                class="flex-grow-1"
              />
              <span class="text-caption text-on-surface flex-shrink-0 text-right" style="min-width: 40px;">
                {{ budget.usage_percentage }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
