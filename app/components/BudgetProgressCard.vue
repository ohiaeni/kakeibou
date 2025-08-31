<script setup lang="ts">
interface Props {
  totalProgress: number
  monthElapsed: number
}

defineProps<Props>()
</script>

<template>
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
</template>
