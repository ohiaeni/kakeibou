<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { addExpense, getAllCategoriesWithBudgets } = useBudgets()

// モーダルの表示状態を管理
const internalValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

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

// フォームの有効性
const isFormValid = ref(false)

// 支出を保存する関数
const saveExpense = () => {
  if (expenseForm.value.category_id && expenseForm.value.amount && expenseForm.value.spent_at) {
    addExpense(
      expenseForm.value.category_id,
      expenseForm.value.amount,
      expenseForm.value.spent_at,
      expenseForm.value.note || undefined,
    )

    // フォームをリセット
    resetForm()

    // モーダルを閉じる
    internalValue.value = false

    // 保存完了を通知
    emit('saved')
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

// モーダルが閉じられる時の処理
const handleClose = () => {
  resetForm()
  internalValue.value = false
}
</script>

<template>
  <v-dialog
    v-model="internalValue"
    max-width="600"
    scrollable
    :fullscreen="$vuetify.display.xs"
    persistent
  >
    <v-card>
      <!-- ヘッダー -->
      <v-card-title class="d-flex align-center ga-2 pa-5 pa-sm-6 text-h6 font-weight-bold">
        <v-icon color="primary" class="mr-1">
          mdi-plus
        </v-icon>
        <span>支出を追加</span>
        <v-spacer />
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="handleClose"
        />
      </v-card-title>

      <!-- フォーム内容 -->
      <v-card-text class="pa-0">
        <v-form v-model="isFormValid" class="pa-6">
          <!-- カテゴリ選択セクション -->
          <div class="mb-6">
            <v-label class="text-subtitle-2 font-weight-medium mb-2">
              カテゴリ
            </v-label>
            <v-select
              v-model="expenseForm.category_id"
              label="カテゴリを選択"
              variant="outlined"
              :items="categories"
              item-title="name"
              item-value="category_id"
              required
              :rules="[rules.category]"
              class="mb-2"
            >
              <template #selection="{ item }">
                <div class="d-flex align-center">
                  <v-icon class="mr-2" :color="item.raw.color">
                    {{ item.raw.icon }}
                  </v-icon>
                  {{ item.raw.name }}
                </div>
              </template>
              <template #item="{ props: itemProps, item }">
                <v-list-item
                  v-bind="itemProps"
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
            <div class="text-caption text-medium-emphasis">
              ※ 予算が設定されているカテゴリのみ表示されます
            </div>
          </div>

          <!-- 金額セクション -->
          <div class="mb-6">
            <v-label class="text-subtitle-2 font-weight-medium mb-2">
              金額
            </v-label>
            <v-text-field
              v-model.number="expenseForm.amount"
              label="金額を入力"
              type="number"
              prefix="¥"
              variant="outlined"
              min="1"
              step="1"
              required
              :rules="[rules.required, rules.amount]"
            />
          </div>

          <!-- 支出日セクション -->
          <div class="mb-6">
            <v-label class="text-subtitle-2 font-weight-medium mb-2">
              支出日
            </v-label>
            <v-text-field
              v-model="expenseForm.spent_at"
              label="支出日を選択"
              type="date"
              variant="outlined"
              required
              :rules="[rules.required]"
            />
          </div>

          <!-- メモセクション -->
          <div class="mb-4">
            <v-label class="text-subtitle-2 font-weight-medium mb-2">
              メモ（任意）
            </v-label>
            <v-textarea
              v-model="expenseForm.note"
              label="メモを入力"
              variant="outlined"
              rows="3"
              placeholder="例：スーパーで食材購入、電車代など"
            />
          </div>
        </v-form>
      </v-card-text>

      <!-- フッター（アクションボタン） -->
      <v-card-actions class="pa-6 pt-0">
        <div class="d-flex flex-column flex-sm-row justify-sm-space-between align-sm-center ga-3 w-100">
          <!-- リセットボタン -->
          <v-btn
            color="grey-darken-1"
            size="large"
            class="w-100 w-sm-auto order-2 order-sm-1"
            @click="resetForm"
          >
            <v-icon start>
              mdi-refresh
            </v-icon>
            リセット
          </v-btn>

          <!-- 主要アクションボタン -->
          <div class="d-flex ga-3 order-1 order-sm-2">
            <v-btn
              color="grey-darken-1"
              variant="text"
              size="large"
              class="flex-fill flex-sm-grow-0"
              @click="handleClose"
            >
              キャンセル
            </v-btn>
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              class="flex-fill flex-sm-grow-0"
              :disabled="!isFormValid || !expenseForm.category_id || !expenseForm.amount || !expenseForm.spent_at"
              @click="saveExpense"
            >
              <v-icon start>
                mdi-content-save
              </v-icon>
              保存
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
