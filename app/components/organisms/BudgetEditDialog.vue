<script setup lang="ts">
interface Props {
  showDialog: boolean
  categoryName: string
  currentBudget: number
  currentExpense: number
  budgetForm: number
}

interface Emits {
  'update:showDialog': [value: boolean]
  'update:budgetForm': [value: number]
  'save': []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSave = () => {
  emit('save')
}

const handleCancel = () => {
  emit('update:showDialog', false)
}

const updateBudgetForm = (value: number) => {
  emit('update:budgetForm', value)
}
</script>

<template>
  <v-dialog :model-value="props.showDialog" max-width="500" @update:model-value="emit('update:showDialog', $event)">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="primary">
          mdi-currency-jpy
        </v-icon>
        {{ props.categoryName }}の予算編集
      </v-card-title>

      <v-card-text class="pt-4">
        <div class="mb-4">
          <p class="text-body-2 text-grey-darken-1 mb-2">
            現在の予算: ¥{{ props.currentBudget.toLocaleString() }}
          </p>
          <p class="text-body-2 text-grey-darken-1">
            現在の支出: ¥{{ props.currentExpense.toLocaleString() }}
          </p>
        </div>

        <v-text-field
          :model-value="props.budgetForm"
          label="新しい予算金額"
          type="number"
          prefix="¥"
          variant="outlined"
          min="0"
          step="1000"
          :rules="[(v) => v > 0 || '予算は0円より大きい値を入力してください']"
          @update:model-value="(value) => updateBudgetForm(Number(value))"
        />

        <div class="mt-2">
          <p class="text-body-2 text-grey-darken-1">
            予算変更後の使用率:
            <span
              :class="props.budgetForm > 0 && Math.round((props.currentExpense / props.budgetForm) * 100) > 80 ? 'text-error font-weight-bold' : 'text-primary font-weight-bold'"
            >
              {{ props.budgetForm > 0 ? Math.round((props.currentExpense / props.budgetForm) * 100) : 0 }}%
            </span>
          </p>
        </div>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="handleCancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="!props.budgetForm || props.budgetForm <= 0"
          @click="handleSave"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
