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

// 金額のクイック選択（加算・減算対応）
const handleAmountSelect = (amount: number, event: PointerEvent) => {
  const target = event.target as HTMLElement
  let pressTimer: NodeJS.Timeout | undefined = undefined

  // 長押し検出用の変数
  let isLongPress = false

  const handlePointerUp = () => {
    clearTimeout(pressTimer)
    target.removeEventListener('pointerup', handlePointerUp)
    target.removeEventListener('pointerleave', handlePointerUp)

    if (!isLongPress) {
      // 短押し：加算
      expenseForm.value.amount = (expenseForm.value.amount || 0) + amount
    }
  }

  const handleLongPress = () => {
    isLongPress = true
    // 長押し：減算（0未満にはしない）
    const newAmount = (expenseForm.value.amount || 0) - amount
    expenseForm.value.amount = Math.max(0, newAmount)
  }

  // 長押し検出（500ms）
  pressTimer = setTimeout(handleLongPress, 500)

  target.addEventListener('pointerup', handlePointerUp)
  target.addEventListener('pointerleave', handlePointerUp)
}

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
    <v-card class="h-100" style="max-height: 90vh;">
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

      <v-divider />

      <!-- フォーム内容 -->
      <v-card-text class="pa-5 pa-sm-6" style="max-height: 60vh; overflow-y: auto;">
        <v-form v-model="isFormValid">
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
                variant="outlined"
                size="small"
                clickable
                style="transition: transform 0.2s ease;"
                @click="expenseForm.category_id = budget.category.category_id"
                @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.05)'"
                @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'"
              >
                <v-icon start :icon="budget.category.icon" />
                {{ budget.category.name }}
              </v-chip>
            </div>
          </div>

          <!-- カテゴリ選択 -->
          <div class="mb-6">
            <v-select
              v-model="expenseForm.category_id"
              label="カテゴリ"
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

            <div class="text-caption text-on-surface mt-1 mb-2">
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
            </v-alert>
          </div>

          <!-- 金額と日付 -->
          <v-row class="mb-6">
            <v-col cols="12" sm="6">
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
                class="mb-2"
              />

              <!-- クイック金額選択 -->
              <div class="mt-4">
                <div class="text-body-2 font-weight-medium text-on-surface mb-2">
                  クイック選択
                </div>
                <div class="d-flex flex-wrap justify-center ga-2 mb-2">
                  <v-chip
                    v-for="amount in [500, 1000, 2000, 3000, 5000, 10000]"
                    :key="amount"
                    variant="outlined"
                    size="small"
                    clickable
                    style="transition: all 0.2s ease; user-select: none;"
                    @pointerdown="handleAmountSelect(amount, $event)"
                    @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.05)'"
                    @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'"
                  >
                    ¥{{ amount.toLocaleString() }}
                  </v-chip>
                </div>
                <div class="text-caption text-on-surface text-center">
                  タップで加算、長押しで減算
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="expenseForm.spent_at"
                label="支出日"
                type="date"
                variant="outlined"
                required
                :rules="[rules.required]"
                class="mb-2"
              />
            </v-col>
          </v-row>

          <!-- メモ入力 -->
          <div class="mb-6">
            <v-textarea
              v-model="expenseForm.note"
              label="メモ（任意）"
              variant="outlined"
              rows="3"
              placeholder="例：スーパーで食材購入、電車代など"
              class="mb-2"
            />
          </div>
        </v-form>
      </v-card-text>

      <v-divider />

      <!-- フッター（アクションボタン） -->
      <v-card-actions class="d-flex ga-2 pa-4 pa-sm-6 flex-column flex-sm-row">
        <!-- モバイル表示でリセットボタンを下に配置 -->
        <v-btn
          color="grey"
          variant="outlined"
          class="order-2 order-sm-0 w-100 w-sm-auto mt-2 mt-sm-0"
          @click="resetForm"
        >
          リセット
        </v-btn>
        <v-spacer class="d-none d-sm-flex" />
        <div class="d-flex ga-2 order-1 order-sm-0 w-100 w-sm-auto">
          <v-btn
            color="grey"
            variant="text"
            class="flex-fill flex-sm-grow-0"
            @click="handleClose"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            class="flex-fill flex-sm-grow-0 ml-2"
            :disabled="!isFormValid || !expenseForm.category_id || !expenseForm.amount || !expenseForm.spent_at"
            @click="saveExpense"
          >
            保存
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
