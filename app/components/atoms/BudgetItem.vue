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

const navigateToDetail = () => {
  router.push(`/budget/${props.id}`)
}
</script>

<template>
  <v-card
    class="d-flex align-center justify-center cursor-pointer elevation-1"
    color="surface"
    rounded="lg"
    hover
    @click="navigateToDetail"
  >
    <div class="d-flex flex-column align-center justify-center ga-2 pa-3 w-100 h-100">
      <v-progress-circular
        :model-value="percentage"
        :size="75"
        :width="18"
        :color="amount === 0 ? 'grey-lighten-1' : color"
        bg-color="white"
      >
        <span class="text-caption font-weight-medium text-on-surface">
          {{ amount === 0 ? '未設定' : `${percentage}%` }}
        </span>
      </v-progress-circular>
      <div class="d-flex align-center ga-1 flex-shrink-0">
        <v-icon
          class="flex-shrink-0"
          size="small"
          :color="amount === 0 ? 'grey-lighten-1' : color "
        >
          {{ icon }}
        </v-icon>
        <div
          class="text-caption font-weight-medium text-center"
          :class="amount === 0 ? 'text-grey-lighten-1' : 'text-on-surface'"
        >
          {{ name }}
        </div>
      </div>
    </div>
  </v-card>
</template>
