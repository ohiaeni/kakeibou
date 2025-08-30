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
    <v-card class="expense-modal">
      <!-- ヘッダー -->
      <v-card-title class="modal-header">
        <v-icon class="header-icon" color="primary">
          mdi-plus
        </v-icon>
        <span class="header-title">支出を追加</span>
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
      <v-card-text class="modal-content">
        <v-form v-model="isFormValid">
          <!-- よく使うカテゴリ -->
          <div v-if="frequentCategories.length > 0" class="section">
            <div class="section-title">
              よく使うカテゴリ
            </div>
            <div class="category-chips">
              <v-chip
                v-for="budget in frequentCategories"
                :key="budget.category.category_id"
                :color="budget.category.color"
                variant="outlined"
                size="small"
                clickable
                class="category-chip"
                @click="expenseForm.category_id = budget.category.category_id"
              >
                <v-icon start :icon="budget.category.icon" />
                {{ budget.category.name }}
              </v-chip>
            </div>
          </div>

          <!-- カテゴリ選択 -->
          <div class="section">
            <v-select
              v-model="expenseForm.category_id"
              label="カテゴリ"
              variant="outlined"
              :items="categories"
              item-title="name"
              item-value="category_id"
              required
              :rules="[rules.category]"
              class="form-field"
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

            <div class="helper-text">
              ※ 予算が設定されているカテゴリのみ表示されます
            </div>

            <!-- 予算未設定のカテゴリがある場合の案内 -->
            <v-alert
              v-if="hasUnbudgetedCategories"
              type="info"
              variant="tonal"
              density="compact"
              class="budget-alert"
            >
              <div class="text-body-2">
                他のカテゴリを使用したい場合は、先に予算を設定してください
              </div>
            </v-alert>
          </div>

          <!-- 金額と日付 -->
          <v-row class="section">
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
                class="form-field"
              />

              <!-- クイック金額選択 -->
              <div class="quick-amounts">
                <div class="quick-amounts-label">
                  クイック選択
                </div>
                <div class="quick-amounts-grid">
                  <v-chip
                    v-for="amount in [500, 1000, 2000, 3000, 5000, 10000]"
                    :key="amount"
                    variant="outlined"
                    size="small"
                    clickable
                    class="quick-amount-chip"
                    @pointerdown="handleAmountSelect(amount, $event)"
                  >
                    ¥{{ amount.toLocaleString() }}
                  </v-chip>
                </div>
                <div class="quick-amounts-help">
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
                class="form-field"
              />
            </v-col>
          </v-row>

          <!-- メモ入力 -->
          <div class="section">
            <v-textarea
              v-model="expenseForm.note"
              label="メモ（任意）"
              variant="outlined"
              rows="3"
              placeholder="例：スーパーで食材購入、電車代など"
              class="form-field"
            />
          </div>

          <!-- プレビュー -->
          <div class="section">
            <div class="preview-title">
              プレビュー
            </div>
            <v-card
              color="surface-variant"
              rounded="lg"
              class="preview-card"
            >
              <v-card-text class="preview-content">
                <div class="preview-main">
                  <div class="preview-left">
                    <v-icon
                      class="preview-icon"
                      size="large"
                      :color="expenseForm.category_id ? categories.find(c => c.category_id === expenseForm.category_id)?.color : 'grey'"
                    >
                      {{ expenseForm.category_id ? categories.find(c => c.category_id === expenseForm.category_id)?.icon : 'mdi-help' }}
                    </v-icon>
                    <div class="preview-details">
                      <div class="preview-category">
                        {{ expenseForm.category_id ? categories.find(c => c.category_id === expenseForm.category_id)?.name : 'カテゴリを選択' }}
                      </div>
                      <div class="preview-date">
                        {{ expenseForm.spent_at || '日付を選択' }}
                      </div>
                      <div v-if="expenseForm.note" class="preview-note">
                        {{ expenseForm.note }}
                      </div>
                    </div>
                  </div>
                  <div class="preview-amount" :class="expenseForm.amount ? 'text-error' : 'text-grey'">
                    ¥{{ expenseForm.amount ? expenseForm.amount.toLocaleString() : '0' }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-form>
      </v-card-text>

      <v-divider />

      <!-- フッター（アクションボタン） -->
      <v-card-actions class="modal-actions">
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
          @click="handleClose"
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
  </v-dialog>
</template>

<style scoped>
.expense-modal {
  max-height: 90vh;
}

/* ヘッダー */
.modal-header {
  padding: 20px 24px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 600;
}

.header-icon {
  margin-right: 4px;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
}

/* コンテンツ */
.modal-content {
  padding: 20px 24px;
  max-height: 60vh;
  overflow-y: auto;
}

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 12px;
}

/* カテゴリチップ */
.category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.category-chip {
  transition: transform 0.2s ease;
}

.category-chip:hover {
  transform: scale(1.05);
}

/* フォーム要素 */
.form-field {
  margin-bottom: 8px;
}

.helper-text {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-top: 4px;
  margin-bottom: 8px;
}

.budget-alert {
  margin-top: 12px;
}

/* クイック金額選択 */
.quick-amounts {
  margin-top: 16px;
}

.quick-amounts-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
}

.quick-amounts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-bottom: 8px;
}

.quick-amount-chip {
  transition: all 0.2s ease;
  user-select: none;
}

.quick-amount-chip:hover {
  transform: scale(1.05);
}

.quick-amount-chip:active {
  transform: scale(0.95);
}

.quick-amounts-help {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  text-align: center;
}

/* プレビューセクション */
.preview-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
}

.preview-card {
  padding: 16px;
}

.preview-content {
  padding: 0;
}

.preview-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.preview-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.preview-icon {
  flex-shrink: 0;
}

.preview-details {
  flex: 1;
  min-width: 0;
}

.preview-category {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  line-height: 1.3;
}

.preview-date {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-top: 2px;
}

.preview-note {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-top: 4px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.preview-amount {
  font-size: 1.25rem;
  font-weight: bold;
  flex-shrink: 0;
}

/* フッター */
.modal-actions {
  padding: 16px 24px;
  gap: 8px;
}

/* モバイル表示の最適化 */
@media (max-width: 599px) {
  .modal-header {
    padding: 16px 20px 12px;
    font-size: 1.1rem;
  }

  .header-title {
    font-size: 1.1rem;
  }

  .modal-content {
    padding: 16px 20px;
  }

  .modal-actions {
    padding: 12px 20px;
    flex-wrap: wrap;
  }

  .modal-actions > .v-btn:first-child {
    order: 3;
    width: 100%;
    margin-top: 8px;
  }

  .modal-actions > .v-spacer {
    display: none;
  }

  .modal-actions > .v-btn:nth-child(3) {
    order: 1;
    flex: 1;
  }

  .modal-actions > .v-btn:last-child {
    order: 2;
    flex: 1;
    margin-left: 8px;
  }

  .quick-amounts-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .preview-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .preview-left {
    width: 100%;
  }

  .preview-amount {
    align-self: flex-end;
    font-size: 1.1rem;
  }
}

/* ダークモード対応 */
@media (prefers-color-scheme: dark) {
  .preview-card {
    border: 1px solid rgb(var(--v-theme-outline-variant));
  }
}
</style>
