<script setup lang="ts">
</script>

<template>
  <v-container>
    <!-- メインアクションエリア -->
    <div class="d-flex flex-wrap gap-4 justify-center mb-6">
      <!-- 主要アクション: 出費を追加 -->
      <div class="d-flex flex-column align-center" style="min-width: 100px;">
        <v-btn
          color="primary"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-plus"
          class="mb-2"
          style="width: 70px; height: 70px;"
        />
        <div class="text-caption text-medium-emphasis text-center">
          出費を追加
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
        />
        <div class="text-caption text-medium-emphasis text-center">
          ダッシュボード
        </div>
      </div>

      <!-- 補助アクション: カテゴリ編集 -->
      <div class="d-flex flex-column align-center" style="min-width: 100px;">
        <v-btn
          color="surface-variant"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-pencil"
          class="mb-2"
          style="width: 70px; height: 70px;"
        />
        <div class="text-caption text-medium-emphasis text-center">
          カテゴリ編集
        </div>
      </div>
    </div>
    <CategoryItemList />
  </v-container>
</template>
