<script setup lang="ts">
interface Props {
  year: number
  month: number
}

defineProps<Props>()
</script>

<template>
  <!-- ヘッダー -->
  <div class="d-flex align-center justify-space-between flex-wrap ga-4 mb-6">
    <div class="flex-grow-1" style="min-width: 200px;">
      <h1 class="text-h4 text-lg-h3 font-weight-bold" style="line-height: 1.2;">
        ダッシュボード
      </h1>
      <p class="text-body-1 text-on-surface mt-1">
        {{ year }}年{{ month }}月の家計状況
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
</template>
