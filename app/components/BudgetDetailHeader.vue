<script setup lang="ts">
interface Props {
  categoryName: string
}

defineProps<Props>()

const emit = defineEmits<{
  goBack: []
  editCategory: []
}>()
</script>

<template>
  <div class="d-flex align-center justify-space-between mb-6">
    <div class="d-flex align-center">
      <v-btn
        icon="mdi-arrow-left"
        variant="text"
        class="mr-2"
        @click="emit('goBack')"
      />
      <h1 class="text-h4 font-weight-bold">
        {{ categoryName }}
      </h1>
    </div>
    <v-btn
      color="secondary"
      variant="outlined"
      size="small"
      prepend-icon="mdi-pencil"
      @click="emit('editCategory')"
    >
      カテゴリ編集
    </v-btn>
  </div>
</template>
