<script setup lang="ts">
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="n in 9"
        :key="n"
        cols="4"
      >
        <CategoryItem />
      </v-col>
    </v-row>
  </v-container>
</template>
