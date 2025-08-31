export interface ExpenseFormProps {
  categoryId: number | null
  amount: number | null
  spentAt: string
  note: string
}

export interface ExpenseAddModalProps {
  showModal: boolean
}

export interface ExpenseAddModalEmits {
  'update:showModal': [value: boolean]
  'expense-saved': []
}
