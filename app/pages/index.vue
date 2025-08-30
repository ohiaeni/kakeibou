<script setup lang="ts">
</script>

<template>
  <v-container>
    <div class="d-flex flex-wrap gap-2 mb-4">
      <v-btn
        color="primary"
        variant="elevated"
        rounded="lg"
        prepend-icon="mdi-plus"
      >
        出費を追加
      </v-btn>
      <v-btn
        color="secondary"
        variant="elevated"
        rounded="lg"
        prepend-icon="mdi-chart-line"
      >
        ダッシュボードを表示
      </v-btn>
    </div>
    <CategoryItemList />
    <div class="text-center mt-4">
      <v-btn
        color="accent"
        variant="outlined"
        rounded="lg"
        prepend-icon="mdi-pencil"
      >
        カテゴリ編集
      </v-btn>
    </div>
  </v-container>
</template>
