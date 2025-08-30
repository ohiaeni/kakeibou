<script setup lang="ts">
const router = useRouter()
const { clearStorage } = useBudgets()

// 開発環境かどうかを判定
const isDevelopment = process.env.NODE_ENV === 'development'

// 支出追加ページに遷移
const navigateToAddExpense = () => {
  router.push('/expense/add')
}

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
  <v-container>
    <!-- メインアクションエリア -->
    <div class="d-flex flex-wrap gap-4 justify-center mb-6">
      <!-- 主要アクション: 支出を追加 -->
      <div class="d-flex flex-column align-center" style="min-width: 100px;">
        <v-btn
          color="primary"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-plus"
          class="mb-2"
          style="width: 70px; height: 70px;"
          @click="navigateToAddExpense"
        />
        <div class="text-caption text-medium-emphasis text-center">
          支出を追加
        </div>
      </div>

      <!-- 補助アクション: ダッシュボード -->
      <div class="d-flex flex-column align-center" style="min-width: 100px;">
        <v-btn
          color="surface-variant"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-chart-line"
          class="mb-2"
          style="width: 70px; height: 70px;"
          to="/dashboard"
        />
        <div class="text-caption text-medium-emphasis text-center">
          ダッシュボード
        </div>
      </div>
    </div>
    <CategoryItemList />

    <!-- デバッグ用削除ボタン（開発環境のみ表示） -->
    <div v-if="isDevelopment" class="d-flex justify-center mt-8">
      <v-btn
        color="error"
        variant="outlined"
        prepend-icon="mdi-delete-sweep"
        size="small"
        @click="handleClearLocalData"
      >
        🔧 ローカルデータを削除 (Debug)
      </v-btn>
    </div>
  </v-container>
</template>
