<script setup lang="ts">
interface Props {
  currentYear: number
  currentMonth: number
}

const props = defineProps<Props>()
</script>

<template>
  <div class="d-flex justify-space-between align-center mb-6">
    <h1 class="text-h4 font-weight-bold text-primary">
      {{ props.currentYear }}年{{ props.currentMonth }}月のダッシュボード
    </h1>
  </div>
</template>
