interface ActionButton {
  icon: string
  label: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  labelColor?: string
  to?: string
  onClick?: () => void
}

export const useHome = () => {
  const showExpenseModal = ref(false)
  const showSuccessMessage = ref(false)

  const openExpenseModal = () => {
    showExpenseModal.value = true
  }

  const handleExpenseSaved = () => {
    showSuccessMessage.value = true
  }

  // アクションボタンの設定
  const actionButtons: ActionButton[] = [
    {
      icon: 'mdi-plus',
      label: '支出を追加',
      color: 'primary',
      variant: 'tonal' as const,
      labelColor: 'text-primary',
      onClick: openExpenseModal,
    },
    {
      icon: 'mdi-chart-line',
      label: 'ダッシュボード',
      color: 'surface-variant',
      variant: 'tonal' as const,
      labelColor: 'text-on-surface',
      to: '/dashboard',
    },
  ]

  return {
    showExpenseModal,
    showSuccessMessage,
    actionButtons,
    openExpenseModal,
    handleExpenseSaved,
  }
}
