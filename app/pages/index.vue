<script setup lang="ts">
import { useHome } from '~/composables/useHome'

const {
  showExpenseModal,
  showSuccessMessage,
  actionButtons,
  handleExpenseSaved,
} = useHome()
</script>

<template>
  <v-container class="pa-4 pa-sm-6 mx-auto" style="max-width: 1200px;">
    <!-- 成功メッセージ（固定位置） -->
    <v-fade-transition>
      <v-alert
        v-if="showSuccessMessage"
        v-model="showSuccessMessage"
        closable
        text="支出を追加しました。"
        title="成功"
        type="success"
      />
    </v-fade-transition>

    <OrganismsActionButtonGroup :actions="actionButtons" />

    <OrganismsBudgetItemList />

    <!-- 支出追加モーダル -->
    <OrganismsExpenseAddModal
      v-model="showExpenseModal"
      @saved="handleExpenseSaved"
    />
  </v-container>
</template>
