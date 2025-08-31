<script setup lang="ts">
interface Props {
  categoryName: string
  onGoBack: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <div class="d-flex align-center justify-space-between mb-6">
    <div class="d-flex align-center">
      <v-btn
        icon="mdi-arrow-left"
        variant="text"
        class="mr-2"
        @click="props.onGoBack"
      />
      <h1 class="text-h4 font-weight-bold">
        {{ props.categoryName }}
      </h1>
    </div>
  </div>
</template>
