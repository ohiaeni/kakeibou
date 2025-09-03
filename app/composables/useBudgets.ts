export interface Category {
  category_id: number
  name: string
  description?: string
  icon: string
  color?: string
  created_at: string
  updated_at: string
}

export interface Budget {
  budget_id: number
  category_id: number
  amount: number
  year: number
  month: number
  created_at: string
  updated_at: string
}

export interface Expense {
  expense_id: number
  category_id: number
  amount: number
  spent_at: string
  note?: string
  created_at: string
  updated_at: string
}

// 表示用のデータ構造
export interface BudgetWithCategory {
  budget_id: number
  category: Category
  amount: number
  year: number
  month: number
  created_at: string
  updated_at: string
  current_expense: number
  usage_percentage: number
  remaining_amount: number
}

export const useBudgets = () => {
  // 現在の年月
  const currentYear = ref(new Date().getFullYear())
  const currentMonth = ref(new Date().getMonth() + 1)

  // サンプルカテゴリデータ
  const categories = ref<Category[]>([
    {
      category_id: 1,
      name: '食費',
      description: '食材費、外食費など',
      icon: 'mdi-food',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 2,
      name: '交通費',
      description: '電車賃、ガソリン代など',
      icon: 'mdi-train',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 3,
      name: '娯楽',
      description: '映画、ゲーム、レジャーなど',
      icon: 'mdi-movie',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 4,
      name: '光熱費',
      description: '電気代、ガス代、水道代',
      icon: 'mdi-lightning-bolt',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 5,
      name: '通信費',
      description: '携帯代、インターネット代',
      icon: 'mdi-cellphone',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 6,
      name: '医療費',
      description: '病院代、薬代など',
      icon: 'mdi-medical-bag',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 7,
      name: '衣類',
      description: '服、靴、アクセサリーなど',
      icon: 'mdi-tshirt-crew',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 8,
      name: '美容',
      description: '化粧品、美容院など',
      icon: 'mdi-face-woman',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
    {
      category_id: 9,
      name: 'その他',
      description: 'その他の支出',
      icon: 'mdi-dots-horizontal',
      color: 'primary',
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-01-01T00:00:00Z',
    },
  ])

  // サンプル予算データ
  const budgets = ref<Budget[]>([
    {
      budget_id: 1,
      category_id: 1,
      amount: 50000,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
    {
      budget_id: 2,
      category_id: 2,
      amount: 15000,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
    {
      budget_id: 3,
      category_id: 3,
      amount: 20000,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
    {
      budget_id: 4,
      category_id: 4,
      amount: 12000,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
    {
      budget_id: 5,
      category_id: 5,
      amount: 8000,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
    // 予算0円のカテゴリを追加（テスト用）
    {
      budget_id: 6,
      category_id: 6,
      amount: 0,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
    {
      budget_id: 7,
      category_id: 7,
      amount: 0,
      year: 2025,
      month: 8,
      created_at: '2025-08-01T00:00:00Z',
      updated_at: '2025-08-01T00:00:00Z',
    },
  ])

  // サンプル支出データ
  const expenses = ref<Expense[]>([
    {
      expense_id: 1,
      category_id: 1,
      amount: 32500,
      spent_at: '2025-08-15',
      note: '食材費など',
      created_at: '2025-08-15T00:00:00Z',
      updated_at: '2025-08-15T00:00:00Z',
    },
    {
      expense_id: 2,
      category_id: 2,
      amount: 4500,
      spent_at: '2025-08-10',
      note: '電車代',
      created_at: '2025-08-10T00:00:00Z',
      updated_at: '2025-08-10T00:00:00Z',
    },
    {
      expense_id: 3,
      category_id: 3,
      amount: 17000,
      spent_at: '2025-08-20',
      note: '映画・レジャー',
      created_at: '2025-08-20T00:00:00Z',
      updated_at: '2025-08-20T00:00:00Z',
    },
  ])

  // 指定された年月の予算一覧を取得（カテゴリ情報付き）
  const getBudgetsWithCategories = (year: number = currentYear.value, month: number = currentMonth.value): BudgetWithCategory[] => {
    return budgets.value
      .filter(budget => budget.year === year && budget.month === month)
      .map((budget) => {
        const category = categories.value.find(c => c.category_id === budget.category_id)
        if (!category) return null

        // 該当する支出を計算
        const currentExpense = expenses.value
          .filter(expense =>
            expense.category_id === budget.category_id
            && new Date(expense.spent_at).getFullYear() === year
            && new Date(expense.spent_at).getMonth() + 1 === month,
          )
          .reduce((sum, expense) => sum + expense.amount, 0)

        // 予算が0の場合は使用率を0にして「未設定」として扱う
        const usagePercentage = budget.amount === 0 ? 0 : Math.round((currentExpense / budget.amount) * 100)
        const remainingAmount = budget.amount - currentExpense

        return {
          budget_id: budget.budget_id,
          category,
          amount: budget.amount,
          year: budget.year,
          month: budget.month,
          created_at: budget.created_at,
          updated_at: budget.updated_at,
          current_expense: currentExpense,
          usage_percentage: usagePercentage,
          remaining_amount: remainingAmount,
        }
      })
      .filter(Boolean) as BudgetWithCategory[]
  }

  // 全カテゴリを9件表示（予算未設定も含む）
  const getAllCategoriesWithBudgets = (year: number = currentYear.value, month: number = currentMonth.value): BudgetWithCategory[] => {
    const userCategories = categories.value.filter(_category => true)
    const existingBudgets = getBudgetsWithCategories(year, month)

    // 全カテゴリに対して予算情報を作成
    const allCategoriesWithBudgets = userCategories.map((category) => {
      // 既存の予算があるかチェック
      const existingBudget = existingBudgets.find(budget => budget.category.category_id === category.category_id)

      if (existingBudget) {
        // 既存の予算がある場合はそれを使用
        return existingBudget
      }
      else {
        // 予算が設定されていない場合は0円として作成
        const currentExpense = expenses.value
          .filter(expense =>
            expense.category_id === category.category_id
            && new Date(expense.spent_at).getFullYear() === year
            && new Date(expense.spent_at).getMonth() + 1 === month,
          )
          .reduce((sum, expense) => sum + expense.amount, 0)

        return {
          budget_id: 0, // 未設定を示すID
          category,
          amount: 0, // 予算未設定
          year,
          month,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          current_expense: currentExpense,
          usage_percentage: 0, // 予算未設定の場合は0%
          remaining_amount: -currentExpense, // 予算がないので支出がマイナス表示
        }
      }
    })

    // 9件に制限
    return allCategoriesWithBudgets.slice(0, 9)
  }

  // カテゴリIDから予算を取得
  const getBudgetByCategoryId = (categoryId: number, year: number = currentYear.value, month: number = currentMonth.value): BudgetWithCategory | null => {
    const budgetsWithCategories = getBudgetsWithCategories(year, month)
    return budgetsWithCategories.find(budget => budget.category.category_id === categoryId) || null
  }

  // カテゴリ一覧を取得
  const getCategories = (): Category[] => {
    return categories.value.filter(_category => true)
  }

  // カテゴリIDからカテゴリを取得
  const getCategoryById = (categoryId: number): Category | null => {
    return categories.value.find(category => category.category_id === categoryId) || null
  }

  // 予算を更新
  const updateBudget = (categoryId: number, amount: number, year: number = currentYear.value, month: number = currentMonth.value): void => {
    const existingBudgetIndex = budgets.value.findIndex(
      budget => budget.category_id === categoryId
        && budget.year === year
        && budget.month === month,
    )

    if (existingBudgetIndex !== -1) {
      // 既存の予算を更新
      const existingBudget = budgets.value[existingBudgetIndex]
      if (existingBudget) {
        existingBudget.amount = amount
        existingBudget.updated_at = new Date().toISOString()
      }
    }
    else {
      // 新しい予算を作成
      const newBudget: Budget = {
        budget_id: Math.max(...budgets.value.map(b => b.budget_id)) + 1,
        category_id: categoryId,
        amount,
        year,
        month,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      budgets.value.push(newBudget)
    }

    // ローカルストレージに保存（実際のアプリケーションではAPIを使用）
    if (import.meta.client) {
      localStorage.setItem('budgets', JSON.stringify(budgets.value))
    }
  }

  // カテゴリを更新
  const updateCategory = (categoryId: number, name: string, description?: string, icon?: string, color?: string): void => {
    const categoryIndex = categories.value.findIndex(category => category.category_id === categoryId)

    if (categoryIndex !== -1) {
      const category = categories.value[categoryIndex]
      if (category) {
        category.name = name
        if (description !== undefined) category.description = description
        if (icon !== undefined) category.icon = icon
        if (color !== undefined) category.color = color
        category.updated_at = new Date().toISOString()
      }

      // ローカルストレージに保存（実際のアプリケーションではAPIを使用）
      if (import.meta.client) {
        localStorage.setItem('categories', JSON.stringify(categories.value))
      }
    }
  }

  // 支出を追加
  const addExpense = (categoryId: number, amount: number, spentAt: string, note?: string): void => {
    const newExpense: Expense = {
      expense_id: Math.max(...expenses.value.map(e => e.expense_id), 0) + 1,
      category_id: categoryId,
      amount,
      spent_at: spentAt,
      note,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    expenses.value.push(newExpense)

    // ローカルストレージに保存
    if (import.meta.client) {
      localStorage.setItem('expenses', JSON.stringify(expenses.value))
    }
  }

  // ローカルストレージからデータを復元
  const loadFromStorage = (): void => {
    if (import.meta.client) {
      const savedBudgets = localStorage.getItem('budgets')
      const savedExpenses = localStorage.getItem('expenses')
      const savedCategories = localStorage.getItem('categories')

      if (savedBudgets) {
        budgets.value = JSON.parse(savedBudgets)
      }

      if (savedExpenses) {
        expenses.value = JSON.parse(savedExpenses)
      }

      if (savedCategories) {
        // カテゴリデータがローカルストレージにある場合は復元
        const parsedCategories = JSON.parse(savedCategories)
        categories.value.splice(0, categories.value.length, ...parsedCategories)
      }
    }
  }

  // ローカルストレージのデータをすべて削除
  const clearStorage = (): void => {
    if (import.meta.client) {
      localStorage.removeItem('budgets')
      localStorage.removeItem('expenses')
      localStorage.removeItem('categories')

      // データをデフォルト状態にリセット
      budgets.value = []
      expenses.value = []
      // カテゴリは初期データに戻す（必要に応じて）
      resetCategories()
    }
  }

  // カテゴリを初期状態にリセット
  const resetCategories = (): void => {
    categories.value = [
      {
        category_id: 1,
        name: '食費',
        description: '食材費、外食費など',
        icon: 'mdi-food',
        color: 'primary',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
      {
        category_id: 2,
        name: '交通費',
        description: '電車賃、ガソリン代など',
        icon: 'mdi-train',
        color: 'primary',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
      {
        category_id: 3,
        name: '娯楽',
        description: '映画、ゲーム、レジャーなど',
        icon: 'mdi-movie',
        color: 'primary',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
      {
        category_id: 4,
        name: '光熱費',
        description: '電気、ガス、水道代など',
        icon: 'mdi-lightning-bolt',
        color: 'warning',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
      {
        category_id: 5,
        name: 'その他',
        description: 'その他の支出',
        icon: 'mdi-dots-horizontal',
        color: 'secondary',
        created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-01T00:00:00Z',
      },
    ]
  }

  // 初期化
  onMounted(() => {
    loadFromStorage()
  })

  // 合計予算を取得
  const getTotalBudget = (year: number = currentYear.value, month: number = currentMonth.value): number => {
    return budgets.value
      .filter(budget => budget.year === year && budget.month === month)
      .reduce((sum, budget) => sum + budget.amount, 0)
  }

  // 合計支出を取得
  const getTotalExpense = (year: number = currentYear.value, month: number = currentMonth.value): number => {
    return expenses.value
      .filter(expense =>
        new Date(expense.spent_at).getFullYear() === year
          && new Date(expense.spent_at).getMonth() + 1 === month,
      )
      .reduce((sum, expense) => sum + expense.amount, 0)
  }

  // 予算の進捗率を取得
  const getBudgetProgress = (year: number = currentYear.value, month: number = currentMonth.value): number => {
    const totalBudget = getTotalBudget(year, month)
    const totalExpense = getTotalExpense(year, month)
    return totalBudget === 0 ? 0 : Math.round((totalExpense / totalBudget) * 100)
  }

  // 支出データを取得（カテゴリ情報付き）
  const getExpensesWithCategories = (year: number = currentYear.value, month: number = currentMonth.value, limit?: number) => {
    const filteredExpenses = expenses.value
      .filter(expense =>
        new Date(expense.spent_at).getFullYear() === year
          && new Date(expense.spent_at).getMonth() + 1 === month,
      )
      .map((expense) => {
        const category = categories.value.find(c => c.category_id === expense.category_id)
        return {
          ...expense,
          category: category
            ? {
                ...category,
                color: category.color || 'primary', // colorがundefinedの場合はデフォルト値を設定
              }
            : undefined,
        }
      })
      .filter(expense => expense.category) // カテゴリが見つからない支出は除外
      .sort((a, b) => new Date(b.spent_at).getTime() - new Date(a.spent_at).getTime()) // 新しい順にソート

    return limit ? filteredExpenses.slice(0, limit) : filteredExpenses
  }

  // BudgetWithCategoryをBudgetItemPropsに変換
  const getBudgetItemsForDisplay = (year: number = currentYear.value, month: number = currentMonth.value) => {
    return getAllCategoriesWithBudgets(year, month).map(budget => ({
      id: budget.category.category_id,
      icon: budget.category.icon,
      label: budget.category.name,
      value: budget.usage_percentage,
      amount: budget.amount,
      color: budget.category.color || 'primary',
    }))
  }

  return {
    currentYear,
    currentMonth,
    getBudgetsWithCategories,
    getAllCategoriesWithBudgets,
    getBudgetByCategoryId,
    getCategories,
    getCategoryById,
    updateBudget,
    updateCategory,
    addExpense,
    loadFromStorage,
    clearStorage,
    resetCategories,
    getTotalBudget,
    getTotalExpense,
    getBudgetProgress,
    getExpensesWithCategories,
    getBudgetItemsForDisplay,
  }
}
