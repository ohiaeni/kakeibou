<script setup lang="ts">
import { useBudgets } from '~/composables/useBudgets'

const { getBudgetsWithCategories, getTotalBudget, getTotalExpense, getBudgetProgress, getExpensesWithCategories } = useBudgets()

// 支出追加モーダルの表示状態
const showExpenseModal = ref(false)

// 支出追加モーダルを開く
const openExpenseModal = () => {
  showExpenseModal.value = true
}

// 支出が保存された時の処理
const handleExpenseSaved = () => {
  // データが更新されるので、特に追加処理は不要
  // 成功メッセージを表示
  showSuccessMessage.value = true
}

// 成功メッセージ表示用
const showSuccessMessage = ref(false)

// 現在の年月
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

// 予算データを取得
const budgetsWithCategories = computed(() => getBudgetsWithCategories(currentYear, currentMonth))

// 合計金額を計算
const totalBudget = computed(() => getTotalBudget(currentYear, currentMonth))
const totalExpense = computed(() => getTotalExpense(currentYear, currentMonth))
const totalRemaining = computed(() => totalBudget.value - totalExpense.value)
const totalProgress = computed(() => getBudgetProgress(currentYear, currentMonth))

// 最近の支出リスト（最新5件）
const recentExpenses = computed(() => getExpensesWithCategories(currentYear, currentMonth, 5))

// 最も支出の多いカテゴリ
const topExpenseCategory = computed(() => {
  const sorted = budgetsWithCategories.value
    .filter(budget => budget.current_expense > 0)
    .sort((a, b) => b.current_expense - a.current_expense)
  return sorted.length > 0 ? sorted[0] : null
})

// 予算超過カテゴリ
const overBudgetCategories = computed(() => {
  return budgetsWithCategories.value.filter(budget =>
    budget.amount > 0 && budget.current_expense > budget.amount,
  )
})

// 月の経過率（日付ベース）
const monthElapsed = computed(() => {
  const today = new Date()
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const currentDay = today.getDate()
  return Math.round((currentDay / daysInMonth) * 100)
})

// ダッシュボードカード用のデータ
const dashboardCards = computed(() => [
  {
    title: '今月の予算',
    value: `¥${totalBudget.value.toLocaleString()}`,
    icon: 'mdi-wallet',
    color: 'primary',
  },
  {
    title: '今月の支出',
    value: `¥${totalExpense.value.toLocaleString()}`,
    icon: 'mdi-cash-minus',
    color: 'error',
  },
  {
    title: '残り予算',
    value: `¥${totalRemaining.value.toLocaleString()}`,
    icon: 'mdi-piggy-bank',
    color: totalRemaining.value >= 0 ? 'success' : 'error',
  },
  {
    title: '使用率',
    value: `${totalProgress.value}%`,
    icon: 'mdi-chart-pie',
    color: totalProgress.value > 100 ? 'error' : totalProgress.value > 80 ? 'warning' : 'success',
  },
])

// カテゴリ別のチャート用データ（将来の拡張用）
const _chartData = computed(() => {
  return budgetsWithCategories.value
    .filter(budget => budget.current_expense > 0)
    .map(budget => ({
      name: budget.category.name,
      value: budget.current_expense,
      color: budget.category.color,
    }))
})
</script>

<template>
  <v-container>
    <!-- ヘッダー -->
    <div class="d-flex align-center justify-space-between flex-wrap ga-4 mb-6">
      <div class="flex-grow-1" style="min-width: 200px;">
        <h1 class="text-h4 text-lg-h3 font-weight-bold" style="line-height: 1.2;">
          ダッシュボード
        </h1>
        <p class="text-body-1 text-on-surface mt-1">
          {{ currentYear }}年{{ currentMonth }}月の家計状況
        </p>
      </div>
      <v-btn
        class="flex-shrink-0 w-100 w-sm-auto justify-center"
        variant="outlined"
        prepend-icon="mdi-arrow-left"
        to="/"
      >
        <span class="hidden-xs">ホームに戻る</span>
        <span class="hidden-sm-and-up">戻る</span>
      </v-btn>
    </div>

    <!-- 概要カード -->
    <v-row class="mb-6">
      <v-col
        v-for="card in dashboardCards"
        :key="card.title"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card class="h-100">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-caption text-medium-emphasis mb-1">
                  {{ card.title }}
                </p>
                <p class="text-h6 font-weight-bold" :class="`text-${card.color}`">
                  {{ card.value }}
                </p>
              </div>
              <v-icon
                :icon="card.icon"
                :color="card.color"
                size="large"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 予算vs支出の全体進捗 -->
    <v-card class="mb-6">
      <v-card-title>
        <v-icon icon="mdi-chart-line" class="me-2" />
        全体の進捗
      </v-card-title>
      <v-card-text>
        <div class="d-flex align-center justify-space-between mb-2">
          <span class="text-subtitle-2">予算使用率</span>
          <span class="text-subtitle-2 font-weight-bold">
            {{ totalProgress }}%
          </span>
        </div>
        <v-progress-linear
          :model-value="totalProgress"
          :color="totalProgress > 100 ? 'error' : totalProgress > 80 ? 'warning' : 'success'"
          height="8"
          rounded
          class="mb-4"
        />

        <div class="d-flex align-center justify-space-between mb-2">
          <span class="text-caption">月の経過日数</span>
          <span class="text-caption">{{ monthElapsed }}%</span>
        </div>
        <v-progress-linear
          :model-value="monthElapsed"
          color="primary"
          height="4"
          rounded
        />

        <div class="text-caption text-medium-emphasis mt-2">
          <template v-if="totalProgress > monthElapsed + 10">
            ⚠️ 予算の使用ペースが早めです
          </template>
          <template v-else-if="totalProgress < monthElapsed - 10">
            ✅ 良いペースで予算を管理できています
          </template>
          <template v-else>
            📊 予算使用率は月の経過とほぼ同じペースです
          </template>
        </div>
      </v-card-text>
    </v-card>

    <v-row>
      <!-- カテゴリ別支出ランキング -->
      <v-col cols="12" lg="6">
        <v-card class="h-100">
          <div class="pa-4 pb-2 text-body-1 font-weight-bold">
            <v-icon icon="mdi-trophy" class="me-2" />
            支出ランキング
          </div>
          <v-card-text>
            <div v-if="budgetsWithCategories.length === 0" class="text-center py-8">
              <v-icon icon="mdi-chart-bar" size="64" class="text-medium-emphasis mb-4" />
              <p class="text-medium-emphasis">
                支出データがありません
              </p>
            </div>
            <div v-else>
              <div
                v-for="(budget, index) in budgetsWithCategories
                  .filter(b => b.current_expense > 0)
                  .sort((a, b) => b.current_expense - a.current_expense)
                  .slice(0, 5)"
                :key="budget.budget_id"
                class="d-flex align-center py-3 ga-3"
                :class="{ 'border-b': index < 4 }"
                :style="{ borderBottomColor: 'rgb(var(--v-theme-surface-variant))' }"
              >
                <div class="text-center flex-shrink-0" style="min-width: 32px;">
                  <span class="text-h6 font-weight-bold text-primary">
                    {{ index + 1 }}
                  </span>
                </div>
                <v-icon
                  :icon="budget.category.icon"
                  :color="budget.category.color"
                  class="flex-shrink-0"
                />
                <div class="flex-grow-1" style="min-width: 0;">
                  <div class="d-flex align-center justify-space-between ga-2 flex-wrap">
                    <span class="font-weight-medium flex-grow-1 text-truncate">{{ budget.category.name }}</span>
                    <span class="font-weight-bold text-body-1 flex-shrink-0">
                      ¥{{ budget.current_expense.toLocaleString() }}
                    </span>
                  </div>
                  <div v-if="budget.amount > 0" class="d-flex align-center mt-2 ga-2">
                    <v-progress-linear
                      :model-value="Math.min(budget.usage_percentage, 100)"
                      :color="budget.usage_percentage > 100 ? 'error' : 'primary'"
                      height="4"
                      rounded
                      class="flex-grow-1"
                    />
                    <span class="text-caption text-on-surface flex-shrink-0 text-right" style="min-width: 40px;">
                      {{ budget.usage_percentage }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- アラートとアドバイス -->
      <v-col cols="12" lg="6">
        <v-card class="h-100">
          <div class="pa-4 pb-2 text-body-1 font-weight-bold">
            <v-icon icon="mdi-alert-circle" class="me-2" />
            アラート & アドバイス
          </div>
          <v-card-text>
            <!-- 予算超過アラート -->
            <div v-if="overBudgetCategories.length > 0" class="mb-4">
              <v-alert
                type="error"
                variant="tonal"
                density="compact"
                class="mb-2"
              >
                <template #prepend>
                  <v-icon icon="mdi-alert" />
                </template>
                {{ overBudgetCategories.length }}個のカテゴリで予算超過
              </v-alert>
              <div
                v-for="budget in overBudgetCategories"
                :key="budget.budget_id"
                class="d-flex align-center py-1"
              >
                <v-icon
                  :icon="budget.category.icon"
                  color="error"
                  size="small"
                  class="me-2"
                />
                <span class="text-body-2">
                  {{ budget.category.name }}:
                  <span class="text-error font-weight-bold">
                    ¥{{ (budget.current_expense - budget.amount).toLocaleString() }}
                  </span>
                  超過
                </span>
              </div>
            </div>

            <!-- 支出ペースの警告 -->
            <div v-if="totalProgress > monthElapsed + 20" class="mb-4">
              <v-alert
                type="warning"
                variant="tonal"
                density="compact"
              >
                <template #prepend>
                  <v-icon icon="mdi-speedometer" />
                </template>
                支出ペースが早すぎます。月末まで注意が必要です。
              </v-alert>
            </div>

            <!-- 最高支出カテゴリの情報 -->
            <div v-if="topExpenseCategory" class="mb-4">
              <div class="d-flex align-center mb-2">
                <v-icon icon="mdi-chart-bar" color="primary" class="me-2" />
                <span class="text-subtitle-2 font-weight-bold">今月の最高支出</span>
              </div>
              <div class="d-flex align-center">
                <v-icon
                  :icon="topExpenseCategory.category.icon"
                  :color="topExpenseCategory.category.color"
                  class="me-2"
                />
                <div>
                  <div class="font-weight-medium">
                    {{ topExpenseCategory.category.name }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    ¥{{ topExpenseCategory.current_expense.toLocaleString() }}
                    <template v-if="topExpenseCategory.amount > 0">
                      （予算の{{ topExpenseCategory.usage_percentage }}%）
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- ポジティブメッセージ -->
            <div v-if="overBudgetCategories.length === 0 && totalProgress <= monthElapsed + 10">
              <v-alert
                type="success"
                variant="tonal"
                density="compact"
              >
                <template #prepend>
                  <v-icon icon="mdi-check-circle" />
                </template>
                順調に予算管理ができています！この調子で続けましょう。
              </v-alert>
            </div>

            <!-- 予算未設定の警告 -->
            <div v-if="totalBudget === 0" class="mb-4">
              <v-alert
                type="info"
                variant="tonal"
                density="compact"
              >
                <template #prepend>
                  <v-icon icon="mdi-information" />
                </template>
                予算が設定されていません。カテゴリページで予算を設定してください。
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 最近の支出リスト -->
    <v-card class="mt-6">
      <div class="pa-4 pb-2 text-body-1 font-weight-bold">
        <v-icon icon="mdi-history" class="me-2" />
        最近の支出
      </div>
      <v-card-text>
        <div v-if="recentExpenses.length === 0" class="text-center py-8">
          <v-icon icon="mdi-receipt" size="64" class="text-medium-emphasis mb-4" />
          <p class="text-medium-emphasis">
            今月の支出データがありません
          </p>
          <v-btn
            color="primary"
            variant="elevated"
            prepend-icon="mdi-plus"
            class="mt-4"
            @click="openExpenseModal"
          >
            支出を記録
          </v-btn>
        </div>
        <div v-else>
          <v-list lines="two">
            <template
              v-for="(expense, index) in recentExpenses"
              :key="expense.expense_id"
            >
              <v-list-item class="py-3">
                <template #prepend>
                  <v-avatar :color="expense.category?.color || 'primary'" size="40">
                    <v-icon
                      :icon="expense.category?.icon || 'mdi-cash'"
                      color="white"
                    />
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-medium">
                  {{ expense.category?.name || '不明' }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div class="d-flex align-center justify-space-between ga-2 flex-wrap">
                    <span class="text-body-2 text-on-surface">{{ expense.spent_at }}</span>
                    <span class="font-weight-bold text-error text-body-1 flex-shrink-0">
                      -¥{{ expense.amount.toLocaleString() }}
                    </span>
                  </div>
                  <div v-if="expense.note" class="text-caption text-on-surface mt-1" style="line-height: 1.3;">
                    {{ expense.note }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <v-divider v-if="index < recentExpenses.length - 1" />
            </template>
          </v-list>

          <div class="d-flex justify-center mt-4">
            <v-btn
              color="primary"
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="openExpenseModal"
            >
              支出を追加
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- 支出追加モーダル -->
    <ExpenseAddModal
      v-model="showExpenseModal"
      @saved="handleExpenseSaved"
    />

    <!-- 成功メッセージ -->
    <v-snackbar
      v-model="showSuccessMessage"
      color="success"
      timeout="3000"
      location="top"
    >
      支出を追加しました
      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="showSuccessMessage = false"
        >
          閉じる
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
