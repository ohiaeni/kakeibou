<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const router = useRouter()
const { addExpense, getAllCategoriesWithBudgets } = useBudgets()

// フォームデータ
const expenseForm = ref({
  category_id: null as number | null,
  amount: null as number | null,
  spent_at: new Date().toISOString().split('T')[0], // 今日の日付
  note: '',
})

// バリデーションルール
const rules = {
  required: (value: string | number) => !!value || '必須項目です',
  amount: (value: number) => (value > 0) || '金額は0円より大きい値を入力してください',
  category: (value: number) => !!value || 'カテゴリを選択してください',
}

// カテゴリ一覧を取得（予算設定済みのみ）
const categories = computed(() => {
  return budgetsWithCategories.value
    .filter(budget => budget.amount > 0)
    .map(budget => budget.category)
})

// 予算情報付きカテゴリを取得
const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())

// よく使うカテゴリ（予算設定済みのカテゴリを優先表示）
const frequentCategories = computed(() => {
  return budgetsWithCategories.value
    .filter(budget => budget.amount > 0)
    .slice(0, 6)
})

// 予算未設定のカテゴリがあるかチェック
const hasUnbudgetedCategories = computed(() => {
  const totalCategories = budgetsWithCategories.value.length
  const budgetedCategories = categories.value.length
  return totalCategories > budgetedCategories
})

// フォームの有効性
const isFormValid = ref(false)

// 成功メッセージ表示用
const showSuccess = ref(false)

// 支出を保存する関数
const saveExpense = () => {
  if (expenseForm.value.category_id && expenseForm.value.amount && expenseForm.value.spent_at) {
    addExpense(
      expenseForm.value.category_id,
      expenseForm.value.amount,
      expenseForm.value.spent_at,
      expenseForm.value.note || undefined,
    )

    // 成功メッセージを表示
    showSuccess.value = true

    // 少し待ってからホームページに戻る
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
}

// フォームをリセットする関数
const resetForm = () => {
  expenseForm.value = {
    category_id: null,
    amount: null,
    spent_at: new Date().toISOString().split('T')[0],
    note: '',
  }
}
</script>

<template>
  <v-container class="py-6">
    <!-- ヘッダー -->
    <div class="d-flex align-center mb-6">
      <v-btn
        icon="mdi-arrow-left"
        variant="text"
        class="mr-2"
        @click="router.push('/')"
      />
      <h1 class="text-h4 font-weight-bold">
        支出を追加
      </h1>
    </div>

    <!-- 支出追加フォーム -->
    <v-card elevation="2" rounded="lg">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="primary">
          mdi-plus
        </v-icon>
        新しい支出
      </v-card-title>

      <v-card-text class="pt-4">
        <v-form v-model="isFormValid">
          <v-row>
            <!-- よく使うカテゴリ -->
            <v-col v-if="frequentCategories.length > 0" cols="12">
              <div class="text-subtitle-2 mb-3">
                よく使うカテゴリ
              </div>
              <div class="d-flex flex-wrap gap-2 mb-4">
                <v-chip
                  v-for="budget in frequentCategories"
                  :key="budget.category.category_id"
                  :color="budget.category.color"
                  variant="outlined"
                  size="small"
                  clickable
                  @click="expenseForm.category_id = budget.category.category_id"
                >
                  <v-icon start :icon="budget.category.icon" />
                  {{ budget.category.name }}
                </v-chip>
              </div>
            </v-col>

            <!-- カテゴリ選択 -->
            <v-col cols="12">
              <v-select
                v-model="expenseForm.category_id"
                label="カテゴリ"
                variant="outlined"
                :items="categories"
                item-title="name"
                item-value="category_id"
                required
                :rules="[rules.category]"
              >
                <template #selection="{ item }">
                  <div class="d-flex align-center">
                    <v-icon class="mr-2" :color="item.raw.color">
                      {{ item.raw.icon }}
                    </v-icon>
                    {{ item.raw.name }}
                  </div>
                </template>
                <template #item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.raw.name"
                  >
                    <template #prepend>
                      <v-icon :color="item.raw.color">
                        {{ item.raw.icon }}
                      </v-icon>
                    </template>
                  </v-list-item>
                </template>
              </v-select>
              <div class="text-caption text-grey-darken-1 mt-1">
                ※ 予算が設定されているカテゴリのみ表示されます
              </div>

              <!-- 予算未設定のカテゴリがある場合の案内 -->
              <v-alert
                v-if="hasUnbudgetedCategories"
                type="info"
                variant="tonal"
                density="compact"
                class="mt-3"
              >
                <div class="text-body-2">
                  他のカテゴリを使用したい場合は、先に予算を設定してください
                </div>
                <v-btn
                  variant="text"
                  size="small"
                  color="info"
                  class="mt-1"
                  @click="router.push('/')"
                >
                  ホームで予算設定
                </v-btn>
              </v-alert>
            </v-col>

            <!-- 金額入力 -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="expenseForm.amount"
                label="金額"
                type="number"
                prefix="¥"
                variant="outlined"
                min="1"
                step="1"
                required
                :rules="[rules.required, rules.amount]"
              />
            </v-col>

            <!-- 日付入力 -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="expenseForm.spent_at"
                label="支出日"
                type="date"
                variant="outlined"
                required
                :rules="[rules.required]"
              />
            </v-col>

            <!-- メモ入力 -->
            <v-col cols="12">
              <v-textarea
                v-model="expenseForm.note"
                label="メモ（任意）"
                variant="outlined"
                rows="3"
                placeholder="例：スーパーで食材購入、電車代など"
              />
            </v-col>

            <!-- プレビュー -->
            <v-col cols="12">
              <div class="text-subtitle-2 mb-2">
                プレビュー
              </div>
              <v-card
                color="surface-variant"
                rounded="lg"
                class="pa-4"
              >
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-icon
                      class="mr-3"
                      size="large"
                      :color="expenseForm.category_id ? categories.find(c => c.category_id === expenseForm.category_id)?.color : 'grey'"
                    >
                      {{ expenseForm.category_id ? categories.find(c => c.category_id === expenseForm.category_id)?.icon : 'mdi-help' }}
                    </v-icon>
                    <div>
                      <div class="text-body-1 font-weight-medium">
                        {{ expenseForm.category_id ? categories.find(c => c.category_id === expenseForm.category_id)?.name : 'カテゴリを選択' }}
                      </div>
                      <div class="text-caption text-grey-darken-1">
                        {{ expenseForm.spent_at || '日付を選択' }}
                      </div>
                      <div v-if="expenseForm.note" class="text-caption text-grey-darken-1">
                        {{ expenseForm.note }}
                      </div>
                    </div>
                  </div>
                  <div class="text-h6 font-weight-bold" :class="expenseForm.amount ? 'text-error' : 'text-grey'">
                    ¥{{ expenseForm.amount ? expenseForm.amount.toLocaleString() : '0' }}
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-btn
          color="grey"
          variant="outlined"
          @click="resetForm"
        >
          リセット
        </v-btn>
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="router.push('/')"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!isFormValid || !expenseForm.category_id || !expenseForm.amount || !expenseForm.spent_at"
          @click="saveExpense"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- 成功メッセージ -->
    <v-snackbar
      v-model="showSuccess"
      color="success"
      timeout="3000"
      location="top"
    >
      支出を追加しました
      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="showSuccess = false"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
