<script setup lang="ts">
import { useDashboard } from '~/composables/useDashboard'
import { useBudgets } from '~/composables/useBudgets'

const {
  showExpenseModal,
  showSuccessMessage,
  currentYear,
  currentMonth,
  dashboardCards,
  totalProgress,
  monthElapsed,
  budgetsWithCategories,
  recentExpenses,
  openExpenseModal,
  handleExpenseSaved,
} = useDashboard()

const { addExpense } = useBudgets()

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
  <v-container>
    <!-- ダッシュボードヘッダー (inlined) -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4 font-weight-bold text-primary">
        {{ currentYear }}年{{ currentMonth }}月のダッシュボード
      </h1>
    </div>

    <!-- 概要カード (inlined) -->
    <v-row class="mb-6">
      <v-col
        v-for="card in dashboardCards"
        :key="card.title"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="d-flex align-center pa-4"
          :color="card.color"
          elevation="2"
        >
          <div class="d-flex align-center w-100">
            <v-icon
              size="40"
              color="white"
              class="mr-4"
            >
              {{ card.icon }}
            </v-icon>
            <div>
              <div class="text-h6 font-weight-bold text-white">
                {{ card.value }}
              </div>
              <div class="text-caption text-white opacity-80">
                {{ card.title }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 予算vs支出の全体進捗 (inlined) -->
    <v-card class="pa-6 mb-6" elevation="2">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h6 font-weight-bold">
          予算の進捗状況
        </h2>
      </div>
      <div class="d-flex align-center justify-space-between">
        <div class="flex-grow-1 mr-6">
          <v-progress-linear
            :model-value="totalProgress"
            height="20"
            rounded
            :color="totalProgress > 100 ? 'error' : totalProgress > 80 ? 'warning' : 'success'"
          >
            <strong>{{ Math.round(totalProgress) }}%</strong>
          </v-progress-linear>
          <div class="text-caption text-grey-darken-1 mt-2">
            月経過率: {{ Math.round(monthElapsed) }}%
          </div>
        </div>
      </div>
    </v-card>

    <!-- 予算統計 (カテゴリ別進捗) -->
    <v-card class="pa-6 mb-6" elevation="2">
      <h2 class="text-h6 font-weight-bold mb-4">
        カテゴリ別予算
      </h2>
      <v-row>
        <v-col
          v-for="budget in budgetsWithCategories.slice(0, 6)"
          :key="budget.budget_id"
          cols="12"
          sm="6"
          md="4"
        >
          <div class="d-flex align-center justify-space-between pa-3 border rounded">
            <div class="d-flex align-center">
              <v-icon
                size="24"
                :color="budget.category.color"
                class="mr-3"
              >
                {{ budget.category.icon }}
              </v-icon>
              <div>
                <div class="text-body-2 font-weight-medium">
                  {{ budget.category.name }}
                </div>
                <div class="text-caption text-grey-darken-1">
                  ¥{{ budget.current_expense.toLocaleString() }} / ¥{{ budget.amount.toLocaleString() }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div
                class="text-body-2 font-weight-bold"
                :class="budget.usage_percentage > 100 ? 'text-error' : budget.usage_percentage > 80 ? 'text-warning' : 'text-success'"
              >
                {{ Math.round(budget.usage_percentage) }}%
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- 最近の支出 -->
    <v-card class="pa-6 mb-6" elevation="2">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h6 font-weight-bold">
          最近の支出
        </h2>
        <v-btn
          color="primary"
          variant="elevated"
          prepend-icon="mdi-plus"
          @click="openExpenseModal"
        >
          支出を追加
        </v-btn>
      </div>
      <div v-if="recentExpenses.length === 0" class="text-center py-8">
        <v-icon size="48" color="grey-lighten-1" class="mb-2">
          mdi-receipt-text-outline
        </v-icon>
        <div class="text-body-2 text-grey-darken-1">
          まだ支出が記録されていません
        </div>
      </div>
      <v-list v-else lines="two">
        <v-list-item
          v-for="(expense, index) in recentExpenses.slice(0, 5)"
          :key="index"
          class="px-0"
        >
          <template #prepend>
            <v-icon
              size="24"
              :color="(expense as any).category?.color"
              class="mr-3"
            >
              {{ (expense as any).category?.icon || 'mdi-receipt' }}
            </v-icon>
          </template>
          <v-list-item-title class="text-body-2 font-weight-medium">
            ¥{{ (expense as any).amount?.toLocaleString() }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-caption">
            {{ (expense as any).category?.name }} • {{ (expense as any).spent_at }}
            <span v-if="(expense as any).note" class="text-grey-darken-1">
              • {{ (expense as any).note }}
            </span>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>

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
      支出を追加しました
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
  </v-container>
</template>
