<script setup lang="ts">
import { useHome } from '~/composables/useHome'
import { useBudgets } from '~/composables/useBudgets'

interface ActionButton {
  icon: string
  label: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  labelColor?: string
  to?: string
  onClick?: () => void
}

const {
  showExpenseModal,
  showSuccessMessage,
  actionButtons,
  openExpenseModal,
  handleExpenseSaved,
} = useHome()

const { getAllCategoriesWithBudgets, addExpense } = useBudgets()
const router = useRouter()

const budgetsWithCategories = computed(() => getAllCategoriesWithBudgets())

// ActionButton functions
const handleActionButtonClick = (action: ActionButton) => {
  if (action.onClick) {
    action.onClick()
  }
}

const handleActionButtonMouseEnter = (e: MouseEvent) => {
  (e.target as HTMLElement).style.transform = 'translateY(-2px)'
}

const handleActionButtonMouseLeave = (e: MouseEvent) => {
  (e.target as HTMLElement).style.transform = 'translateY(0)'
}

// BudgetItem functions
const handleBudgetItemClick = (categoryId: number) => {
  router.push(`/budget/${categoryId}`)
}

// Expense Modal functions (inlined from ExpenseAddModal)
const internalModalValue = computed({
  get: () => showExpenseModal.value,
  set: (value: boolean) => showExpenseModal.value = value,
})

const expenseForm = ref({
  category_id: null as number | null,
  amount: null as number | null,
  spent_at: new Date().toISOString().split('T')[0],
  note: '',
})

const rules = {
  required: (value: string | number) => !!value || '必須項目です',
  amount: (value: number) => (value > 0) || '金額は0円より大きい値を入力してください',
  category: (value: number) => !!value || 'カテゴリを選択してください',
}

const categories = computed(() => {
  return budgetsWithCategories.value
    .filter(budget => budget.amount > 0)
    .map(budget => budget.category)
})

const isFormValid = ref(false)

const saveExpense = () => {
  if (expenseForm.value.category_id && expenseForm.value.amount && expenseForm.value.spent_at) {
    addExpense(
      expenseForm.value.category_id,
      expenseForm.value.amount,
      expenseForm.value.spent_at,
      expenseForm.value.note || undefined,
    )
    resetForm()
    internalModalValue.value = false
    handleExpenseSaved()
  }
}

const resetForm = () => {
  expenseForm.value = {
    category_id: null,
    amount: null,
    spent_at: new Date().toISOString().split('T')[0],
    note: '',
  }
}

const handleModalClose = () => {
  resetForm()
  internalModalValue.value = false
}

// Success Snackbar functions (inlined from SuccessSnackbar)
const handleSnackbarClose = () => {
  showSuccessMessage.value = false
}
</script>

<template>
  <div class="pa-4 min-h-screen">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4 font-weight-bold text-primary">
        家計簿アプリ
      </h1>
      <v-icon icon="mdi-account-circle" size="32" color="primary" />
    </div>

    <!-- Action Buttons (inlined from ActionButtonGroup and ActionButton) -->
    <v-card class="mb-4 pa-4" elevation="2">
      <div class="d-flex justify-space-around">
        <div
          v-for="action in actionButtons"
          :key="action.label"
          class="d-flex flex-column align-center ga-3"
          style="min-width: 100px;"
        >
          <v-btn
            :color="action.color || 'primary'"
            variant="tonal"
            rounded="xl"
            size="large"
            :icon="action.icon"
            class="elevation-1"
            style="width: 70px; height: 70px; transition: all 0.3s ease;"
            :to="action.to"
            @click="handleActionButtonClick(action)"
            @mouseenter="handleActionButtonMouseEnter"
            @mouseleave="handleActionButtonMouseLeave"
          >
            <v-icon :icon="action.icon" />
          </v-btn>
          <div class="text-body-2 font-weight-medium text-center text-on-surface">
            {{ action.label }}
          </div>
        </div>
      </div>
    </v-card>

    <!-- Budget Items (inlined from BudgetItemList and BudgetItem) -->
    <div class="w-100 mb-4">
      <v-row>
        <v-col
          v-for="budgetWithCategory in budgetsWithCategories"
          :key="budgetWithCategory.budget_id"
          cols="4"
          class="pa-1 pa-sm-2 pa-md-3"
        >
          <v-card
            class="d-flex align-center justify-center cursor-pointer elevation-1"
            color="surface"
            rounded="lg"
            hover
            @click="handleBudgetItemClick(budgetWithCategory.category.category_id)"
          >
            <div class="d-flex flex-column align-center justify-center ga-2 pa-3 w-100 h-100">
              <!-- Progress Circle (inlined) -->
              <v-progress-circular
                :model-value="budgetWithCategory.usage_percentage"
                :size="75"
                :width="18"
                :color="budgetWithCategory.amount === 0 ? 'grey-lighten-1' : budgetWithCategory.category.color"
                bg-color="white"
              >
                <span class="text-caption font-weight-medium text-on-surface">
                  {{ budgetWithCategory.amount === 0 ? '未設定' : `${budgetWithCategory.usage_percentage}%` }}
                </span>
              </v-progress-circular>
              <!-- Category Info (inlined) -->
              <div class="d-flex align-center ga-1 flex-shrink-0">
                <v-icon
                  class="flex-shrink-0"
                  size="small"
                  :color="budgetWithCategory.amount !== 0 ? budgetWithCategory.category.color : 'grey-lighten-1'"
                >
                  {{ budgetWithCategory.category.icon }}
                </v-icon>
                <div
                  class="text-caption font-weight-medium text-center"
                  :class="budgetWithCategory.amount !== 0 ? 'text-on-surface' : 'text-grey-lighten-1'"
                >
                  {{ budgetWithCategory.category.name }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- ExpenseAddModal (inlined) -->
    <v-dialog
      v-model="internalModalValue"
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
            @click="handleModalClose"
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
                @click="handleModalClose"
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

    <!-- Success Snackbar (inlined) -->
    <v-snackbar
      :model-value="showSuccessMessage"
      color="success"
      :timeout="3000"
      location="top"
      @update:model-value="showSuccessMessage = $event"
    >
      支出が追加されました
      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="handleSnackbarClose"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
