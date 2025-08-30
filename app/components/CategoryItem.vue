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
    class="category-card"
    color="surface"
    rounded="lg"
    hover
    @click="navigateToDetail"
  >
    <div class="card-content">
      <v-progress-circular
        :model-value="percentage"
        :size="60"
        :width="6"
        :color="amount === 0 ? 'grey-lighten-2' : 'primary'"
        bg-color="white"
        class="progress-circle"
      >
        <span class="progress-text">
          {{ amount === 0 ? '未設定' : `${percentage}%` }}
        </span>
      </v-progress-circular>
      <div class="category-info">
        <v-icon
          class="category-icon"
          size="small"
          :color="amount === 0 ? 'grey-darken-1' : 'primary'"
        >
          {{ icon }}
        </v-icon>
        <div
          class="category-name"
          :class="amount === 0 ? 'text-grey-darken-1' : 'text-on-surface'"
        >
          {{ name }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.category-card {
  height: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(var(--v-theme-outline-variant));
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.category-card:active {
  transform: translateY(0);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  width: 100%;
  height: 100%;
}

.progress-circle {
  flex-shrink: 0;
}

.progress-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

.category-info {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.category-icon {
  flex-shrink: 0;
}

.category-name {
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* レスポンシブ対応 */
@media (max-width: 599px) {
  .category-card {
    height: 100px;
  }

  .card-content {
    gap: 6px;
    padding: 8px;
  }

  .progress-text {
    font-size: 0.7rem;
  }

  .category-name {
    font-size: 0.7rem;
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .category-card {
    height: 110px;
  }

  .card-content {
    gap: 7px;
    padding: 10px;
  }

  .progress-text {
    font-size: 0.75rem;
  }

  .category-name {
    font-size: 0.725rem;
  }
}

@media (min-width: 960px) {
  .category-card {
    height: 130px;
  }

  .card-content {
    gap: 10px;
    padding: 16px;
  }

  .progress-text {
    font-size: 0.8rem;
  }

  .category-name {
    font-size: 0.8rem;
  }
}
</style>
