<script setup lang="ts">
interface DashboardCard {
  title: string
  value: string
  icon: string
  color: string
}

interface Props {
  dashboardCards: DashboardCard[]
}

const props = defineProps<Props>()
</script>

<template>
  <v-row class="mb-6">
    <v-col
      v-for="card in props.dashboardCards"
      :key="card.title"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card
        class="d-flex align-center pa-4"
        :color="card.color"
        elevation="2"
      >
        <div class="d-flex align-center w-100">
          <v-icon
            size="40"
            color="white"
            class="mr-4"
          >
            {{ card.icon }}
          </v-icon>
          <div>
            <div class="text-h6 font-weight-bold text-white">
              {{ card.value }}
            </div>
            <div class="text-caption text-white opacity-80">
              {{ card.title }}
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
