<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { getBudgetByCategoryId, getCategoryById, updateBudget, updateCategory } = useBudgets()

// URLパラメータからIDを取得
const budgetId = computed(() => parseInt(route.params.id as string))

// 指定されたIDに対応するカテゴリを取得
const category = computed(() => getCategoryById(budgetId.value))

// 指定されたIDに対応する予算を取得
const budgetWithCategory = computed(() => getBudgetByCategoryId(budgetId.value))

// 予算編集関連のリアクティブ変数
const budgetDialog = ref(false)
const budgetForm = ref(50000)

// カテゴリ編集関連のリアクティブ変数
const categoryDialog = ref(false)
const categoryForm = ref({
  name: '',
  description: '',
  icon: '',
  color: 'primary',
})

// 利用可能なアイコンリスト
const availableIcons = [
  'mdi-food',
  'mdi-train',
  'mdi-movie',
  'mdi-lightning-bolt',
  'mdi-cellphone',
  'mdi-medical-bag',
  'mdi-tshirt-crew',
  'mdi-face-woman',
  'mdi-dots-horizontal',
  'mdi-home',
  'mdi-car',
  'mdi-book',
  'mdi-briefcase',
  'mdi-shopping',
  'mdi-gamepad-variant',
]

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
const saveBudget = () => {
  if (budgetId.value && budgetForm.value > 0) {
    updateBudget(budgetId.value, budgetForm.value)
    budgetDialog.value = false
  }
}

// カテゴリを保存する関数
const saveCategory = () => {
  if (budgetId.value && categoryForm.value.name.trim()) {
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

// カテゴリが見つからない場合は一覧ページにリダイレクト
watchEffect(() => {
  if (budgetId.value && !category.value) {
    router.push('/')
  }
})

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
        @click="router.push('/')"
      >
        ホームに戻る
      </v-btn>
    </div>

    <!-- カテゴリ詳細表示 -->
    <div v-else>
      <!-- ヘッダー -->
      <OrganismsBudgetDetailHeader
        :category-name="category.name"
        @go-back="router.push('/')"
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
