<script setup lang="ts">
// 家計簿カテゴリのサンプルデータ
const categories = [
  {
    id: 1,
    name: '食費',
    icon: 'mdi-food',
    percentage: 65,
    color: 'primary',
  },
  {
    id: 2,
    name: '交通費',
    icon: 'mdi-train',
    percentage: 30,
    color: 'primary',
  },
  {
    id: 3,
    name: '娯楽',
    icon: 'mdi-movie',
    percentage: 85,
    color: 'primary',
  },
  {
    id: 4,
    name: '光熱費',
    icon: 'mdi-lightning-bolt',
    percentage: 45,
    color: 'primary',
  },
  {
    id: 5,
    name: '通信費',
    icon: 'mdi-cellphone',
    percentage: 20,
    color: 'primary',
  },
  {
    id: 6,
    name: '医療費',
    icon: 'mdi-medical-bag',
    percentage: 15,
    color: 'primary',
  },
  {
    id: 7,
    name: '衣類',
    icon: 'mdi-tshirt-crew',
    percentage: 40,
    color: 'primary',
  },
  {
    id: 8,
    name: '美容',
    icon: 'mdi-face-woman',
    percentage: 25,
    color: 'primary',
  },
  {
    id: 9,
    name: 'その他',
    icon: 'mdi-dots-horizontal',
    percentage: 10,
    color: 'primary',
  },
]
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
