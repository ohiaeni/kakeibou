<script setup lang="ts">
import { useBudgetDetail, type CategoryForm } from '~/composables/useBudgetDetail'

const route = useRoute()

// URLパラメータからIDを取得
const budgetId = computed(() => parseInt(route.params.id as string))

// 予算詳細のロジックを取得
const {
  category,
  budgetWithCategory,
  availableIcons,
  saveBudget,
  saveCategory,
  goBack,
} = useBudgetDetail(budgetId)

// 予算編集関連のリアクティブ変数
const budgetDialog = ref(false)
const budgetForm = ref(50000)

// カテゴリ編集関連のリアクティブ変数
const categoryDialog = ref(false)
const categoryForm = ref<CategoryForm>({
  name: '',
  description: '',
  icon: '',
  color: 'primary',
})

// 予算データを初期化
onMounted(() => {
  if (budgetWithCategory.value) {
    budgetForm.value = budgetWithCategory.value.amount
  }

  // カテゴリ情報をフォームに設定
  if (category.value) {
    categoryForm.value = {
      name: category.value.name,
      description: category.value.description || '',
      icon: category.value.icon,
      color: category.value.color || 'primary',
    }
  }
})

// 予算を保存する関数
const handleSaveBudget = () => {
  if (budgetForm.value > 0) {
    saveBudget(budgetForm.value)
    budgetDialog.value = false
  }
}

// カテゴリを保存する関数
const handleSaveCategory = () => {
  if (categoryForm.value.name.trim()) {
    saveCategory({
      name: categoryForm.value.name.trim(),
      description: categoryForm.value.description.trim() || '',
      icon: categoryForm.value.icon,
      color: categoryForm.value.color,
    })
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

// カテゴリが変更された時にフォームデータを更新
watch(category, (newCategory) => {
  if (newCategory) {
    categoryForm.value = {
      name: newCategory.name,
      description: newCategory.description || '',
      icon: newCategory.icon,
      color: newCategory.color || 'primary',
    }
  }
}, { immediate: true })
</script>

<template>
  <v-container class="py-6">
    <!-- カテゴリが見つからない場合 -->
    <div v-if="!category" class="text-center py-8">
      <v-icon size="64" color="grey">
        mdi-folder-remove
      </v-icon>
      <p class="text-h6 mt-4 text-grey">
        カテゴリが見つかりません
      </p>
      <v-btn
        color="primary"
        class="mt-4"
        @click="goBack"
      >
        ホームに戻る
      </v-btn>
    </div>

    <!-- カテゴリ詳細表示 -->
    <div v-else>
      <!-- ヘッダー -->
      <BudgetDetailHeader
        :category-name="category.name"
        @go-back="goBack"
        @edit-category="openCategoryEdit"
      />

      <!-- カテゴリ詳細カード -->
      <CategoryDetailCard
        :category="category"
        :budget-data="budgetWithCategory"
      />

      <!-- 統計情報 -->
      <BudgetStatisticsCard
        :budget-data="budgetWithCategory"
        @edit-budget="openBudgetEdit"
      />

      <!-- 予算編集ダイアログ -->
      <BudgetEditDialog
        v-model:is-open="budgetDialog"
        v-model:budget-form="budgetForm"
        :category-name="category.name"
        :budget-data="budgetWithCategory"
        @save="handleSaveBudget"
      />

      <!-- カテゴリ編集ダイアログ -->
      <CategoryEditDialog
        v-model:is-open="categoryDialog"
        v-model:category-form="categoryForm"
        :available-icons="availableIcons"
        @save="handleSaveCategory"
      />
    </div>
  </v-container>
</template>
