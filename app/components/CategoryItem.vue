<script setup lang="ts">
interface Props {
  id: number
  name: string
  icon: string
  percentage: number
  color?: string
}

const props = defineProps<Props>()
const router = useRouter()

// カテゴリ詳細ページに遷移
const navigateToDetail = () => {
  router.push(`/category/${props.id}`)
}
</script>

<template>
  <v-card
    class="mx-auto d-flex flex-column align-center justify-center elevation-1 cursor-pointer"
    color="surface"
    height="120"
    rounded="lg"
    hover
    @click="navigateToDetail"
  >
    <v-progress-circular
      :model-value="percentage"
      :size="60"
      :width="6"
      :color="percentage === 0 ? 'grey-lighten-2' : 'primary'"
      bg-color="white"
      class="mb-2"
    >
      <span class="text-body-2 font-weight-medium text-on-surface">
        {{ percentage === 0 ? '未設定' : `${percentage}%` }}
      </span>
    </v-progress-circular>
    <div class="d-flex align-center">
      <v-icon
        class="mr-1"
        size="small"
        :color="percentage === 0 ? 'grey-lighten-1' : 'on-surface-variant'"
      >
        {{ icon }}
      </v-icon>
      <v-card-title
        class="text-caption text-center pa-0 font-weight-medium"
        :class="percentage === 0 ? 'text-grey-lighten-1' : 'text-on-surface'"
      >
        {{ name }}
      </v-card-title>
    </div>
  </v-card>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.cursor-pointer:active {
  transform: translateY(0);
}
</style>
