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
  <v-container class="home-container">
    <!-- メインアクションエリア -->
    <div class="main-actions">
      <!-- 主要アクション: 支出を追加 -->
      <div class="action-item primary-action">
        <v-btn
          color="primary"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-plus"
          class="action-btn primary-btn"
          @click="openExpenseModal"
        />
        <div class="action-label">
          支出を追加
        </div>
      </div>

      <!-- 補助アクション: ダッシュボード -->
      <div class="action-item secondary-action">
        <v-btn
          color="surface-variant"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-chart-line"
          class="action-btn secondary-btn"
          to="/dashboard"
        />
        <div class="action-label">
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
    <div v-if="isDevelopment" class="debug-section">
      <v-btn
        color="error"
        variant="outlined"
        prepend-icon="mdi-delete-sweep"
        size="small"
        class="debug-btn"
        @click="handleClearLocalData"
      >
        🔧 ローカルデータを削除 (Debug)
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
/* コンテナ */
.home-container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

/* メインアクション */
.main-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding: 24px 16px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 100px;
}

.action-btn {
  width: 70px;
  height: 70px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.primary-btn {
  width: 80px;
  height: 80px;
}

.action-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface-variant));
  text-align: center;
  line-height: 1.2;
}

.primary-action .action-label {
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

/* デバッグセクション */
.debug-section {
  display: flex;
  justify-content: center;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
}

.debug-btn {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.debug-btn:hover {
  opacity: 1;
}

/* モバイル表示の最適化 */
@media (max-width: 599px) {
  .home-container {
    padding: 12px;
  }

  .main-actions {
    gap: 20px;
    margin-bottom: 24px;
    padding: 20px 12px;
  }

  .action-btn {
    width: 60px;
    height: 60px;
  }

  .primary-btn {
    width: 70px;
    height: 70px;
  }

  .action-label {
    font-size: 0.8rem;
  }

  .debug-section {
    margin-top: 32px;
    padding-top: 20px;
  }
}

/* タブレット表示の最適化 */
@media (min-width: 600px) and (max-width: 959px) {
  .main-actions {
    gap: 32px;
    margin-bottom: 40px;
    padding: 32px 20px;
  }

  .action-btn {
    width: 75px;
    height: 75px;
  }

  .primary-btn {
    width: 85px;
    height: 85px;
  }

  .action-label {
    font-size: 0.9rem;
  }
}

/* デスクトップ表示の最適化 */
@media (min-width: 960px) {
  .home-container {
    padding: 24px;
  }

  .main-actions {
    gap: 40px;
    margin-bottom: 48px;
    padding: 40px 24px;
  }

  .action-btn {
    width: 80px;
    height: 80px;
  }

  .primary-btn {
    width: 90px;
    height: 90px;
  }

  .action-label {
    font-size: 1rem;
  }

  .debug-section {
    margin-top: 64px;
    padding-top: 32px;
  }
}

/* ダークモード対応 */
@media (prefers-color-scheme: dark) {
  .action-btn {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .action-btn:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
}
</style>
