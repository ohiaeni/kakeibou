export const useHome = () => {
  const showExpenseModal = ref(false)
  const showSuccessMessage = ref(false)

  const openExpenseModal = () => {
    showExpenseModal.value = true
  }

  const handleExpenseSaved = () => {
    showSuccessMessage.value = true
  }

  return {
    showExpenseModal,
    showSuccessMessage,
    openExpenseModal,
    handleExpenseSaved,
  }
}
