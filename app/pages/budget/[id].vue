<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'
import { AVAILABLE_ICONS } from '~/constants/icons'
import type { CategoryFormProps } from '~/types/ui/CategoryFormProps'

const route = useRoute()
const router = useRouter()

const budgetId = computed(() => parseInt(route.params.id as string))

const { getBudgetByCategoryId, getCategoryById, updateBudget, updateCategory } = useBudgets()

const category = computed(() => getCategoryById(budgetId.value))

const budgetWithCategory = computed(() => getBudgetByCategoryId(budgetId.value))

// 予算編集関連のリアクティブ変数
const budgetDialog = ref(false)
const budgetForm = ref(50000)

// カテゴリ編集関連のリアクティブ変数
const categoryDialog = ref(false)
const categoryForm = ref<CategoryFormProps>({
  name: '',
  description: '',
  icon: '',
  color: 'primary',
})

// 予算を保存する関数
const handleSaveBudget = () => {
  if (budgetForm.value > 0) {
    updateBudget(budgetId.value, budgetForm.value)
    budgetDialog.value = false
  }
}

// カテゴリを保存する関数
const handleSaveCategory = () => {
  if (categoryForm.value.name.trim()) {
    updateCategory(
      budgetId.value,
      categoryForm.value.name.trim(),
      categoryForm.value.description.trim() || undefined,
      categoryForm.value.icon,
      categoryForm.value.color,
    )
    categoryDialog.value = false
  }
}

// 予算編集を開始する関数
const openBudgetEdit = () => {
  if (budgetWithCategory.value && budgetWithCategory.value.amount > 0) {
    budgetForm.value = budgetWithCategory.value.amount
  }
  else {
    budgetForm.value = 50000 // 予算未設定の場合のデフォルト値
  }
  budgetDialog.value = true
}

// カテゴリ編集を開始する関数
const openCategoryEdit = () => {
  if (category.value) {
    categoryForm.value = {
      name: category.value.name,
      description: category.value.description || '',
      icon: category.value.icon,
      color: category.value.color || 'primary',
    }
  }
  categoryDialog.value = true
}
</script>

<template>
  <v-container class="py-6">
    <div v-if="!budgetWithCategory || !category" class="text-center py-8">
      <v-icon size="64" color="grey" icon="mdi-folder-remove" />
      <p class="text-h6 mt-4 text-grey">
        予算が見つかりません
      </p>
      <v-btn
        color="primary"
        class="mt-4"
        @click="() => router.push('/')"
      >
        ホームに戻る
      </v-btn>
    </div>

    <!-- カテゴリ詳細表示 -->
    <div v-else>
      <OrganismsBudgetDetailHeader
        :category-name="category.name"
        @go-back="() => router.push('/')"
      />

      <OrganismsCategoryDetailCard
        :category="category"
        :usage-percentage="budgetWithCategory?.usagePercentage || 0"
        @edit-category="openCategoryEdit"
      />

      <OrganismsBudgetStatisticsCard
        :current-expense="budgetWithCategory?.currentExpense || 0"
        :remaining-amount="budgetWithCategory?.remainingAmount || 0"
        :budget-amount="budgetWithCategory?.amount || 0"
        :usage-percentage="budgetWithCategory?.usagePercentage || 0"
        @edit-budget="openBudgetEdit"
      />

      <OrganismsCategoryEditDialog
        :show-dialog="categoryDialog"
        :category-form="categoryForm"
        :available-icons="AVAILABLE_ICONS"
        @update:show-dialog="categoryDialog = $event"
        @update:category-form="categoryForm = $event"
        @save="handleSaveCategory"
      />

      <OrganismsBudgetEditDialog
        :show-dialog="budgetDialog"
        :category-name="category.name"
        :current-budget="budgetWithCategory?.amount || 0"
        :current-expense="budgetWithCategory?.currentExpense || 0"
        :budget-form="budgetForm"
        @update:show-dialog="budgetDialog = $event"
        @update:budget-form="budgetForm = $event"
        @save="handleSaveBudget"
      />
    </div>
  </v-container>
</template>
