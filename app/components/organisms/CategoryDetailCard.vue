<script setup lang="ts">
import type { Category } from '~/composables/useBudgets'

interface Props {
  category: Category
  usagePercentage: number
}

const props = defineProps<Props>()
</script>

<template>
  <v-card class="mb-6" elevation="2" rounded="lg">
    <v-card-text class="pa-6">
      <div class="d-flex align-center mb-4">
        <v-avatar size="80" class="mr-4" :color="props.category.color || 'primary'">
          <v-icon size="40" color="white">
            {{ props.category.icon }}
          </v-icon>
        </v-avatar>
        <div>
          <h2 class="text-h5 font-weight-bold mb-2">
            {{ props.category.name }}
          </h2>
          <p class="text-body-1 text-grey-darken-1 mb-1">
            ID: {{ props.category.category_id }}
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
            :class="props.usagePercentage > 80 ? 'text-error' : 'text-primary'"
          >
            {{ props.usagePercentage }}%
          </span>
        </div>
        <v-progress-linear
          :model-value="props.usagePercentage"
          :color="props.usagePercentage > 80 ? 'error' : 'primary'"
          bg-color="grey-lighten-3"
          height="10"
          rounded
        />
      </div>
    </v-card-text>
  </v-card>
</template>
