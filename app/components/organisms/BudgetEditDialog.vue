<script setup lang="ts">
interface BudgetData {
  amount: number
  current_expense: number
}

interface Props {
  isOpen: boolean
  categoryName: string
  budgetData?: BudgetData | null
  budgetForm: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update:budgetForm': [value: number]
  'save': []
}>()

const budgetFormModel = computed({
  get: () => props.budgetForm,
  set: value => emit('update:budgetForm', value),
})

const dialogModel = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})
</script>

<template>
  <v-dialog v-model="dialogModel" max-width="500">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="primary">
          mdi-currency-jpy
        </v-icon>
        {{ categoryName }}の予算編集
      </v-card-title>

      <v-card-text class="pt-4">
        <div class="mb-4">
          <p class="text-body-2 text-grey-darken-1 mb-2">
            現在の予算: ¥{{ budgetData?.amount.toLocaleString() || '0' }}
          </p>
          <p class="text-body-2 text-grey-darken-1">
            現在の支出: ¥{{ budgetData?.current_expense.toLocaleString() || '0' }}
          </p>
        </div>

        <v-text-field
          v-model.number="budgetFormModel"
          label="新しい予算金額"
          type="number"
          prefix="¥"
          variant="outlined"
          min="0"
          step="1000"
          :rules="[(v) => v > 0 || '予算は0円より大きい値を入力してください']"
        />

        <div class="mt-2">
          <p class="text-body-2 text-grey-darken-1">
            予算変更後の使用率:
            <span
              :class="budgetData && Math.round((budgetData.current_expense / budgetForm) * 100) > 80 ? 'text-error font-weight-bold' : 'text-primary font-weight-bold'"
            >
              {{ budgetData ? Math.round((budgetData.current_expense / budgetForm) * 100) : 0 }}%
            </span>
          </p>
        </div>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="dialogModel = false"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!budgetForm || budgetForm <= 0"
          @click="emit('save')"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
