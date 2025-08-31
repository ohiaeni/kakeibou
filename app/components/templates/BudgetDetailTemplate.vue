<script setup lang="ts">
import type { CategoryForm } from '~/composables/useBudgetDetail'

interface Category {
  category_id: number
  name: string
  description?: string
  icon: string
  color?: string
}

interface BudgetWithCategory {
  budget_id: number
  amount: number
  current_expense: number
  remaining_amount: number
  usage_percentage: number
  category: Category
}

interface Props {
  category?: Category | null
  budgetWithCategory?: BudgetWithCategory | null
  availableIcons: string[]
}

interface Emits {
  (e: 'go-back'): void
  (e: 'edit-category', category: Category): void
  (e: 'edit-budget', budgetData: BudgetWithCategory): void
  (e: 'save-budget', amount: number): void
  (e: 'save-category', form: CategoryForm): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

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
  if (props.budgetWithCategory) {
    budgetForm.value = props.budgetWithCategory.amount
  }

  // カテゴリ情報をフォームに設定
  if (props.category) {
    categoryForm.value = {
      name: props.category.name,
      description: props.category.description || '',
      icon: props.category.icon,
      color: props.category.color || 'primary',
    }
  }
})

// 予算を保存する関数
const saveBudget = () => {
  if (budgetForm.value > 0) {
    emit('save-budget', budgetForm.value)
    budgetDialog.value = false
  }
}

// カテゴリを保存する関数
const saveCategory = () => {
  if (categoryForm.value.name.trim()) {
    emit('save-category', {
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
  if (props.budgetWithCategory && props.budgetWithCategory.amount > 0) {
    budgetForm.value = props.budgetWithCategory.amount
  }
  else {
    budgetForm.value = 50000 // 予算未設定の場合のデフォルト値
  }
  emit('edit-budget', props.budgetWithCategory!)
  budgetDialog.value = true
}

// カテゴリ編集を開始する関数
const openCategoryEdit = () => {
  if (props.category) {
    categoryForm.value = {
      name: props.category.name,
      description: props.category.description || '',
      icon: props.category.icon,
      color: props.category.color || 'primary',
    }
    emit('edit-category', props.category)
  }
  categoryDialog.value = true
}

// カテゴリが変更された時にフォームデータを更新
watch(() => props.category, (newCategory) => {
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
        @click="emit('go-back')"
      >
        ホームに戻る
      </v-btn>
    </div>

    <!-- カテゴリ詳細表示 -->
    <div v-else>
      <!-- ヘッダー -->
      <OrganismsBudgetDetailHeader
        :category-name="category.name"
        @go-back="emit('go-back')"
        @edit-category="openCategoryEdit"
      />

      <!-- カテゴリ詳細カード -->
      <MoleculesCategoryDetailCard
        :category="category"
        :budget-data="budgetWithCategory"
      />

      <!-- 統計情報 -->
      <MoleculesBudgetStatisticsCard
        :budget-data="budgetWithCategory"
        @edit-budget="openBudgetEdit"
      />

      <!-- 予算編集ダイアログ -->
      <OrganismsBudgetEditDialog
        v-model:is-open="budgetDialog"
        v-model:budget-form="budgetForm"
        :category-name="category.name"
        :budget-data="budgetWithCategory"
        @save="saveBudget"
      />

      <!-- カテゴリ編集ダイアログ -->
      <OrganismsCategoryEditDialog
        v-model:is-open="categoryDialog"
        v-model:category-form="categoryForm"
        :available-icons="availableIcons"
        @save="saveCategory"
      />
    </div>
  </v-container>
</template>
