<script setup lang="ts">
interface Category {
  category_id: number
  name: string
  icon: string
  color?: string
}

interface Budget {
  amount: number
  category: Category
}

interface Props {
  frequentCategories: Budget[]
  selectedCategoryId: number | null
}

interface Emits {
  (e: 'category-selected', categoryId: number): void
}

const _props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleCategorySelect = (categoryId: number) => {
  emit('category-selected', categoryId)
}
</script>

<template>
  <!-- よく使うカテゴリ -->
  <div v-if="frequentCategories.length > 0" class="mb-6">
    <div class="text-body-1 font-weight-bold text-on-surface mb-3">
      よく使うカテゴリ
    </div>
    <div class="d-flex flex-wrap ga-2 mb-4">
      <v-chip
        v-for="budget in frequentCategories"
        :key="budget.category.category_id"
        :color="budget.category.color"
        :variant="selectedCategoryId === budget.category.category_id ? 'elevated' : 'outlined'"
        size="small"
        clickable
        style="transition: transform 0.2s ease;"
        @click="handleCategorySelect(budget.category.category_id)"
        @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.05)'"
        @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'"
      >
        <v-icon start :icon="budget.category.icon" />
        {{ budget.category.name }}
      </v-chip>
    </div>
  </div>
</template>
