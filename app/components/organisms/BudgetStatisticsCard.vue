<script setup lang="ts">
interface Props {
  currentExpense: number
  remainingAmount: number
  budgetAmount: number
  usagePercentage: number
  onEditBudget: () => void
}

const props = defineProps<Props>()
</script>

<template>
  <v-card class="mb-6" elevation="2" rounded="lg">
    <v-card-title class="pb-2 d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon class="mr-2" icon="mdi-chart-line" />
        統計情報
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        prepend-icon="mdi-pencil"
        @click="props.onEditBudget"
      >
        予算編集
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-3">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-bold text-primary mb-1">
              ¥{{ props.currentExpense.toLocaleString() }}
            </p>
            <p class="text-caption text-grey">
              今月の支出
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="text-center">
            <p
              class="text-h4 font-weight-bold mb-1"
              :class="props.remainingAmount >= 0 ? 'text-success' : 'text-error'"
            >
              ¥{{ props.remainingAmount.toLocaleString() }}
            </p>
            <p class="text-caption text-grey">
              予算残額
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-bold text-info mb-1">
              ¥{{ props.budgetAmount.toLocaleString() }}
            </p>
            <p class="text-caption text-grey">
              月予算
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <div class="text-center">
            <p class="text-h4 font-weight-bold text-warning mb-1">
              {{ props.usagePercentage }}%
            </p>
            <p class="text-caption text-grey mb-2">
              使用率
            </p>
            <div class="pa-2">
              <v-progress-linear
                :model-value="props.usagePercentage"
                :color="props.usagePercentage > 80 ? 'error' : props.usagePercentage > 60 ? 'warning' : 'success'"
                bg-color="grey-lighten-3"
                height="8"
                rounded
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
