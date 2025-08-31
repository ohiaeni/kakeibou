<script setup lang="ts">
import type { Category } from '~/composables/useBudgets'

interface Props {
  category: Category
  usagePercentage: number
  onEditCategory: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <v-card class="mb-6" elevation="2" rounded="lg">
    <v-card-title class="d-flex justify-space-between align-center pb-2">
      <div class="d-flex align-center">
        <v-icon
          class="mr-2"
          icon="mdi-tag"
        />
        <span class="text-h6">カテゴリ詳細</span>
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        prepend-icon="mdi-pencil"
        @click="props.onEditCategory"
      >
        カテゴリ編集
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-0">
      <div class="d-flex align-center mb-4">
        <v-avatar size="80" class="mr-4" :color="props.category.color || 'primary'">
          <v-icon size="40" color="white">
            {{ props.category.icon }}
          </v-icon>
        </v-avatar>
        <div>
          <p v-if="props.category.description" class="text-body-1 text-grey-darken-1 mb-1">
            {{ props.category.description }}
          </p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
