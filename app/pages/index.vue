<script setup lang="ts">
const { clearStorage } = useBudgets()

// 開発環境かどうかを判定
const isDevelopment = process.env.NODE_ENV === 'development'

// 支出追加モーダルの表示状態
const showExpenseModal = ref(false)

// 支出追加モーダルを開く
const openExpenseModal = () => {
  showExpenseModal.value = true
}

// 支出が保存された時の処理
const handleExpenseSaved = () => {
  // 成功メッセージを表示
  showSuccessMessage.value = true
}

// 成功メッセージ表示用
const showSuccessMessage = ref(false)

// デバッグ用：ローカルストレージデータを削除
const handleClearLocalData = () => {
  if (confirm('すべてのローカルデータを削除しますか？\n\n削除されるデータ：\n- 予算データ\n- 支出データ\n- カテゴリデータ\n\nこの操作は取り消せません。')) {
    clearStorage()
    // 削除完了を通知
    alert('ローカルデータを削除しました。ページをリロードします。')
    // ページをリロードして初期状態に戻す
    window.location.reload()
  }
}
</script>

<template>
  <v-container class="pa-4 pa-sm-6 mx-auto" style="max-width: 1200px;">
    <!-- メインアクションエリア -->
    <div class="d-flex justify-center align-center ga-6 ga-sm-8 ga-md-10 mb-8 mb-sm-10 mb-md-12 pa-6 pa-sm-8 pa-md-10">
      <!-- 主要アクション: 支出を追加 -->
      <div class="d-flex flex-column align-center ga-3" style="min-width: 100px;">
        <v-btn
          color="primary"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-plus"
          class="elevation-2"
          style="width: 70px; height: 70px; transition: all 0.3s ease;"
          @click="openExpenseModal"
          @mouseenter="$event.target.style.transform = 'translateY(-2px)'"
          @mouseleave="$event.target.style.transform = 'translateY(0)'"
        />
        <div class="text-body-2 font-weight-medium text-primary text-center">
          支出を追加
        </div>
      </div>

      <!-- 補助アクション: ダッシュボード -->
      <div class="d-flex flex-column align-center ga-3" style="min-width: 100px;">
        <v-btn
          color="surface-variant"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-chart-line"
          class="elevation-2"
          style="width: 70px; height: 70px; transition: all 0.3s ease;"
          to="/dashboard"
          @mouseenter="$event.target.style.transform = 'translateY(-2px)'"
          @mouseleave="$event.target.style.transform = 'translateY(0)'"
        />
        <div class="text-body-2 font-weight-medium text-on-surface text-center">
          ダッシュボード
        </div>
      </div>
    </div>

    <CategoryItemList />

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

    <!-- デバッグ用削除ボタン（開発環境のみ表示） -->
    <div v-if="isDevelopment" class="d-flex justify-center mt-12 pt-6" style="border-top: 1px solid rgb(var(--v-theme-surface-variant));">
      <v-btn
        color="error"
        variant="outlined"
        prepend-icon="mdi-delete-sweep"
        size="small"
        style="opacity: 0.7; transition: opacity 0.2s ease;"
        @click="handleClearLocalData"
        @mouseenter="$event.target.style.opacity = '1'"
        @mouseleave="$event.target.style.opacity = '0.7'"
      >
        🔧 ローカルデータを削除 (Debug)
      </v-btn>
    </div>
  </v-container>
</template>
