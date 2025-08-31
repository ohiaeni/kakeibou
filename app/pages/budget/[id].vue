<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

// 旧useBudgetDetail.tsからの型定義を移動
interface CategoryForm {
  name: string
  description: string
  icon: string
  color: string
}

const route = useRoute()
const router = useRouter()

// URLパラメータからIDを取得
const budgetId = computed(() => parseInt(route.params.id as string))

// useBudgetsから必要な関数を取得
const { getBudgetByCategoryId, getCategoryById, updateBudget, updateCategory } = useBudgets()

// 指定されたIDに対応するカテゴリを取得
const category = computed(() => getCategoryById(budgetId.value))

// 指定されたIDに対応する予算を取得
const budgetWithCategory = computed(() => getBudgetByCategoryId(budgetId.value))

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

// 予算を保存する関数
const saveBudget = (amount: number) => {
  if (budgetId.value && amount > 0) {
    updateBudget(budgetId.value, amount)
  }
}

// カテゴリを保存する関数
const saveCategory = (form: CategoryForm) => {
  if (budgetId.value && form.name.trim()) {
    updateCategory(
      budgetId.value,
      form.name.trim(),
      form.description.trim() || undefined,
      form.icon,
      form.color,
    )
  }
}

// ホームに戻る関数
const goBack = () => {
  router.push('/')
}

// カテゴリが見つからない場合は一覧ページにリダイレクト
watchEffect(() => {
  if (budgetId.value && !category.value) {
    router.push('/')
  }
})

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
      <!-- ヘッダー (inlined from BudgetDetailHeader) -->
      <div class="d-flex align-center justify-space-between mb-6">
        <div class="d-flex align-center">
          <v-btn
            icon="mdi-arrow-left"
            variant="text"
            class="mr-2"
            @click="goBack"
          />
          <h1 class="text-h4 font-weight-bold">
            {{ category.name }}
          </h1>
        </div>
        <v-btn
          color="secondary"
          variant="outlined"
          size="small"
          prepend-icon="mdi-pencil"
          @click="openCategoryEdit"
        >
          カテゴリ編集
        </v-btn>
      </div>

      <!-- カテゴリ詳細カード (inlined from CategoryDetailCard) -->
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
                :class="budgetWithCategory?.usage_percentage && budgetWithCategory.usage_percentage > 80 ? 'text-error' : 'text-primary'"
              >
                {{ budgetWithCategory?.usage_percentage || 0 }}%
              </span>
            </div>
            <v-progress-linear
              :model-value="budgetWithCategory?.usage_percentage || 0"
              :color="budgetWithCategory?.usage_percentage && budgetWithCategory.usage_percentage > 80 ? 'error' : 'primary'"
              bg-color="grey-lighten-3"
              height="10"
              rounded
            />
          </div>
        </v-card-text>
      </v-card>

      <!-- 統計情報 (inlined from BudgetStatisticsCard) -->
      <v-card class="mb-6" elevation="2" rounded="lg">
        <v-card-title class="pb-2 d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <v-icon class="mr-2">
              mdi-chart-line
            </v-icon>
            統計情報
          </div>
          <v-btn
            color="primary"
            variant="outlined"
            size="small"
            prepend-icon="mdi-pencil"
            @click="openBudgetEdit"
          >
            予算編集
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6" md="3">
              <div class="text-center">
                <p class="text-h4 font-weight-bold text-primary mb-1">
                  ¥{{ budgetWithCategory?.current_expense.toLocaleString() || '0' }}
                </p>
                <p class="text-caption text-grey">
                  今月の支出
                </p>
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="text-center">
                <p
                  class="text-h4 font-weight-bold mb-1"
                  :class="budgetWithCategory?.remaining_amount && budgetWithCategory.remaining_amount >= 0 ? 'text-success' : 'text-error'"
                >
                  ¥{{ budgetWithCategory?.remaining_amount.toLocaleString() || '0' }}
                </p>
                <p class="text-caption text-grey">
                  予算残額
                </p>
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="text-center">
                <p class="text-h4 font-weight-bold text-info mb-1">
                  ¥{{ budgetWithCategory?.amount.toLocaleString() || '0' }}
                </p>
                <p class="text-caption text-grey">
                  月予算
                </p>
              </div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="text-center">
                <p class="text-h4 font-weight-bold text-warning mb-1">
                  {{ budgetWithCategory?.usage_percentage || 0 }}%
                </p>
                <p class="text-caption text-grey">
                  使用率
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- 予算編集ダイアログ (inlined from BudgetEditDialog) -->
      <v-dialog v-model="budgetDialog" max-width="500">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">
              mdi-currency-jpy
            </v-icon>
            {{ category.name }}の予算編集
          </v-card-title>

          <v-card-text class="pt-4">
            <div class="mb-4">
              <p class="text-body-2 text-grey-darken-1 mb-2">
                現在の予算: ¥{{ budgetWithCategory?.amount.toLocaleString() || '0' }}
              </p>
              <p class="text-body-2 text-grey-darken-1">
                現在の支出: ¥{{ budgetWithCategory?.current_expense.toLocaleString() || '0' }}
              </p>
            </div>

            <v-text-field
              v-model.number="budgetForm"
              label="新しい予算金額"
              type="number"
              prefix="¥"
              variant="outlined"
              min="0"
              step="1000"
              :rules="[(v) => v > 0 || '予算は0円より大きい値を入力してください']"
            />

            <div class="mt-2">
              <p class="text-body-2 text-grey-darken-1">
                予算変更後の使用率:
                <span
                  :class="budgetWithCategory && Math.round((budgetWithCategory.current_expense / budgetForm) * 100) > 80 ? 'text-error font-weight-bold' : 'text-primary font-weight-bold'"
                >
                  {{ budgetWithCategory ? Math.round((budgetWithCategory.current_expense / budgetForm) * 100) : 0 }}%
                </span>
              </p>
            </div>
          </v-card-text>

          <v-card-actions class="px-6 pb-4">
            <v-spacer />
            <v-btn
              color="grey"
              variant="text"
              @click="budgetDialog = false"
            >
              キャンセル
            </v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              :disabled="!budgetForm || budgetForm <= 0"
              @click="handleSaveBudget"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- カテゴリ編集ダイアログ (inlined from CategoryEditDialog) -->
      <v-dialog v-model="categoryDialog" max-width="600">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="secondary">
              mdi-pencil
            </v-icon>
            カテゴリの編集
          </v-card-title>

          <v-card-text class="pt-4">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="categoryForm.name"
                  label="カテゴリ名"
                  variant="outlined"
                  required
                  :rules="[(v) => !!v || 'カテゴリ名は必須です']"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="categoryForm.description"
                  label="説明（任意）"
                  variant="outlined"
                  rows="3"
                />
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="categoryForm.icon"
                  label="アイコン"
                  variant="outlined"
                  :items="availableIcons"
                  required
                  :rules="[(v) => !!v || 'アイコンを選択してください']"
                >
                  <template #selection="{ item }">
                    <div class="d-flex align-center">
                      <v-icon class="mr-2">
                        {{ item.value }}
                      </v-icon>
                      {{ item.value }}
                    </div>
                  </template>
                  <template #item="{ props: itemProps, item }">
                    <v-list-item v-bind="itemProps">
                      <template #prepend>
                        <v-icon>{{ item.value }}</v-icon>
                      </template>
                      <v-list-item-title>{{ item.value }}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="categoryForm.color"
                  label="カラー"
                  variant="outlined"
                  :items="[
                    { title: 'プライマリー', value: 'primary' },
                    { title: 'セカンダリー', value: 'secondary' },
                    { title: '成功', value: 'success' },
                    { title: '情報', value: 'info' },
                    { title: '警告', value: 'warning' },
                    { title: 'エラー', value: 'error' },
                    { title: '赤', value: 'red' },
                    { title: 'ピンク', value: 'pink' },
                    { title: '紫', value: 'purple' },
                    { title: '青', value: 'blue' },
                    { title: '緑', value: 'green' },
                    { title: 'オレンジ', value: 'orange' },
                  ]"
                  required
                  :rules="[(v) => !!v || 'カラーを選択してください']"
                >
                  <template #selection="{ item }">
                    <div class="d-flex align-center">
                      <v-chip :color="item.value" class="mr-2" size="small" />
                      {{ item.title }}
                    </div>
                  </template>
                  <template #item="{ props: itemProps, item }">
                    <v-list-item v-bind="itemProps">
                      <template #prepend>
                        <v-chip :color="item.value" size="small" />
                      </template>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="px-6 pb-4">
            <v-spacer />
            <v-btn
              color="grey"
              variant="text"
              @click="categoryDialog = false"
            >
              キャンセル
            </v-btn>
            <v-btn
              color="secondary"
              variant="elevated"
              :disabled="!categoryForm.name.trim() || !categoryForm.icon || !categoryForm.color"
              @click="handleSaveCategory"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
