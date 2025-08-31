<script setup lang="ts">
const showExpenseModal = ref(false)

const openExpenseModal = () => {
  showExpenseModal.value = true
}

const handleExpenseSaved = () => {
  showSuccessMessage.value = true
}

const showSuccessMessage = ref(false)
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

    <div class="d-flex justify-center align-center ga-6 ga-sm-8 ga-md-10 mb-8 mb-sm-10 mb-md-12 pa-6 pa-sm-8 pa-md-10">
      <!-- 支出を追加ボタン -->
      <div class="d-flex flex-column align-center ga-3" style="min-width: 100px;">
        <v-btn
          color="primary"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-plus"
          class="elevation-1"
          style="width: 70px; height: 70px; transition: all 0.3s ease;"
          @click="openExpenseModal"
          @mouseenter="$event.target.style.transform = 'translateY(-2px)'"
          @mouseleave="$event.target.style.transform = 'translateY(0)'"
        />
        <div class="text-body-2 font-weight-medium text-primary text-center">
          支出を追加
        </div>
      </div>

      <!-- ダッシュボード遷移ボタン -->
      <div class="d-flex flex-column align-center ga-3" style="min-width: 100px;">
        <v-btn
          color="surface-variant"
          variant="tonal"
          rounded="xl"
          size="large"
          icon="mdi-chart-line"
          class="elevation-2"
          style="width: 70px; height: 70px; transition: all 0.3s ease;"
          to="/dashboard"
          @mouseenter="$event.target.style.transform = 'translateY(-2px)'"
          @mouseleave="$event.target.style.transform = 'translateY(0)'"
        />
        <div class="text-body-2 font-weight-medium text-on-surface text-center">
          ダッシュボード
        </div>
      </div>
    </div>

    <OrganismsBudgetItemList />

    <!-- 支出追加モーダル -->
    <OrganismsExpenseAddModal
      v-model="showExpenseModal"
      @saved="handleExpenseSaved"
    />
  </v-container>
</template>
