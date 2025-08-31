export interface CategoryForm {
  name: string
  description: string
  icon: string
  color: string
}

export const useBudgetDetail = (budgetId: Ref<number>) => {
  const router = useRouter()
  const { getBudgetByCategoryId, getCategoryById, updateBudget, updateCategory } = useBudgets()

  // 指定されたIDに対応するカテゴリを取得
  const category = computed(() => getCategoryById(budgetId.value))

  // 指定されたIDに対応する予算を取得
  const budgetWithCategory = computed(() => getBudgetByCategoryId(budgetId.value))

  // 利用可能なアイコンリスト
  const availableIcons = [
    'mdi-food',
    'mdi-train',
    'mdi-movie',
    'mdi-lightning-bolt',
    'mdi-cellphone',
    'mdi-medical-bag',
    'mdi-tshirt-crew',
    'mdi-face-woman',
    'mdi-dots-horizontal',
    'mdi-home',
    'mdi-car',
    'mdi-book',
    'mdi-briefcase',
    'mdi-shopping',
    'mdi-gamepad-variant',
  ]

  // 予算を保存する関数
  const saveBudget = (amount: number) => {
    if (budgetId.value && amount > 0) {
      updateBudget(budgetId.value, amount)
    }
  }

  // カテゴリを保存する関数
  const saveCategory = (form: CategoryForm) => {
    if (budgetId.value && form.name.trim()) {
      updateCategory(
        budgetId.value,
        form.name.trim(),
        form.description.trim() || undefined,
        form.icon,
        form.color,
      )
    }
  }

  // ホームに戻る関数
  const goBack = () => {
    router.push('/')
  }

  // カテゴリが見つからない場合は一覧ページにリダイレクト
  watchEffect(() => {
    if (budgetId.value && !category.value) {
      router.push('/')
    }
  })

  return {
    category,
    budgetWithCategory,
    availableIcons,
    saveBudget,
    saveCategory,
    goBack,
  }
}
