<script setup lang="ts">
import { useCategories } from '~/composables/useCategories'

const { categories } = useCategories()
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="category in categories"
        :key="category.id"
        cols="4"
      >
        <CategoryItem
          :percentage="category.percentage"
          :category-name="category.name"
          :icon="category.icon"
          :color="category.color"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
