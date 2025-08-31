import { useBudgets } from '~/composables/useBudgets'

export interface ExpenseForm {
  category_id: number | null
  amount: number | null
  spent_at: string
  note: string
}

export const useExpenseAddModal = () => {
  const { getAllCategoriesWithBudgets, addExpense } = useBudgets()

  const expenseForm = ref<ExpenseForm>({
    category_id: null,
    amount: null,
    spent_at: new Date().toISOString().split('T')[0] ?? '',
    note: '',
  })

  const isFormValid = ref(false)

  const categories = computed(() => {
    return getAllCategoriesWithBudgets()
      .filter(budget => budget.amount > 0)
      .map(budget => budget.category)
  })

  const rules = {
    required: (value: string | number) => !!value || '必須項目です',
    amount: (value: number) => (value > 0) || '金額は0円より大きい値を入力してください',
    category: (value: number) => !!value || 'カテゴリを選択してください',
  }

  const resetForm = () => {
    expenseForm.value = {
      category_id: null,
      amount: null,
      spent_at: new Date().toISOString().split('T')[0] ?? '',
      note: '',
    }
    isFormValid.value = false
  }

  const saveExpense = (): boolean => {
    if (expenseForm.value.category_id && expenseForm.value.amount && expenseForm.value.spent_at) {
      addExpense(
        expenseForm.value.category_id,
        expenseForm.value.amount,
        expenseForm.value.spent_at,
        expenseForm.value.note || undefined,
      )
      resetForm()
      return true
    }
    return false
  }

  const isFormComplete = computed(() => {
    return !!(
      isFormValid.value
      && expenseForm.value.category_id
      && expenseForm.value.amount
      && expenseForm.value.spent_at
    )
  })

  return {
    expenseForm,
    isFormValid,
    categories,
    rules,
    resetForm,
    saveExpense,
    isFormComplete,
  }
}
