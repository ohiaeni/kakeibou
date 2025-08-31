<script setup lang="ts">
interface DashboardCard {
  title: string
  value: string
  icon: string
  color: string
}

interface Props {
  cards: DashboardCard[]
}

defineProps<Props>()
</script>

<template>
  <!-- 概要カード -->
  <v-row class="mb-6">
    <v-col
      v-for="card in cards"
      :key="card.title"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card class="h-100">
        <v-card-text>
          <div class="d-flex align-center justify-space-between">
            <div>
              <p class="text-caption text-medium-emphasis mb-1">
                {{ card.title }}
              </p>
              <p class="text-h6 font-weight-bold" :class="`text-${card.color}`">
                {{ card.value }}
              </p>
            </div>
            <v-icon
              :icon="card.icon"
              :color="card.color"
              size="large"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
