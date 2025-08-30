<script setup lang="ts">
interface Props {
  id: number
  name: string
  icon: string
  percentage: number
  amount: number
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
    class="d-flex align-center justify-center cursor-pointer elevation-1"
    color="surface"
    rounded="lg"
    hover
    style="height: 120px; transition: all 0.3s ease; border: 1px solid rgb(var(--v-theme-outline-variant));"
    @click="navigateToDetail"
    @mouseenter="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'"
    @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = ''"
  >
    <div class="d-flex flex-column align-center justify-center ga-2 pa-3 w-100 h-100">
      <v-progress-circular
        :model-value="percentage"
        :size="60"
        :width="6"
        :color="amount === 0 ? 'grey-lighten-2' : 'primary'"
        bg-color="white"
        class="flex-shrink-0"
      >
        <span class="text-caption font-weight-medium text-on-surface">
          {{ amount === 0 ? '未設定' : `${percentage}%` }}
        </span>
      </v-progress-circular>
      <div class="d-flex align-center ga-1 flex-shrink-0">
        <v-icon
          class="flex-shrink-0"
          size="small"
          :color="amount === 0 ? 'grey-darken-1' : 'primary'"
        >
          {{ icon }}
        </v-icon>
        <div
          class="text-caption font-weight-medium text-center"
          :class="amount === 0 ? 'text-grey-darken-1' : 'text-on-surface'"
          style="line-height: 1.2; word-break: break-word; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;"
        >
          {{ name }}
        </div>
      </div>
    </div>
  </v-card>
</template>
