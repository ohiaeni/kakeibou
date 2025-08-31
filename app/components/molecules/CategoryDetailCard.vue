<script setup lang="ts">
interface Category {
  category_id: number
  name: string
  icon: string
  color?: string
}

interface BudgetData {
  usage_percentage: number
}

interface Props {
  category: Category
  budgetData?: BudgetData | null
}

defineProps<Props>()
</script>

<template>
  <v-card class="mb-6" elevation="2" rounded="lg">
    <v-card-text class="pa-6">
      <div class="d-flex align-center mb-4">
        <v-avatar size="80" class="mr-4" :color="category.color || 'primary'">
          <v-icon size="40" color="white">
            {{ category.icon }}
          </v-icon>
        </v-avatar>
        <div>
          <h2 class="text-h5 font-weight-bold mb-2">
            {{ category.name }}
          </h2>
          <p class="text-body-1 text-grey-darken-1 mb-1">
            ID: {{ category.category_id }}
          </p>
          <p class="text-body-1 text-grey-darken-1 mb-0">
            支出カテゴリ
          </p>
        </div>
      </div>

      <!-- 使用率表示 -->
      <div class="mt-4">
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="text-body-1 font-weight-medium">今月の予算使用率</span>
          <span
            class="text-h6 font-weight-bold"
            :class="budgetData?.usage_percentage && budgetData.usage_percentage > 80 ? 'text-error' : 'text-primary'"
          >
            {{ budgetData?.usage_percentage || 0 }}%
          </span>
        </div>
        <v-progress-linear
          :model-value="budgetData?.usage_percentage || 0"
          :color="budgetData?.usage_percentage && budgetData.usage_percentage > 80 ? 'error' : 'primary'"
          bg-color="grey-lighten-3"
          height="10"
          rounded
        />
      </div>
    </v-card-text>
  </v-card>
</template>
