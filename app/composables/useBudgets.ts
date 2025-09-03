export interface Category {
  categoryId: number
  name: string
  description?: string
  icon: string
  color?: string
  createdAt: string
  updatedAt: string
}

export interface Budget {
  budgetId: number
  categoryId: number
  amount: number
  year: number
  month: number
  createdAt: string
  updatedAt: string
}

export interface Expense {
  expenseId: number
  userId: number
  categoryId: number
  amount: number
  spentAt: string
  note?: string
  createdAt: string
  updatedAt: string
}

// 表示用のデータ構造
export interface BudgetWithCategory {
  budgetId: number
  category: Category
  amount: number
  year: number
  month: number
  createdAt: string
  updatedAt: string
  currentExpense: number
  usagePercentage: number
  remainingAmount: number
}

export const useBudgets = () => {
  // 現在の年月
  const currentYear = ref(new Date().getFullYear())
  const currentMonth = ref(new Date().getMonth() + 1)

  // リアクティビティを強制するためのトリガー
  const refreshTrigger = ref(0)

  // サンプルカテゴリデータ
  const categories = ref<Category[]>([
    {
      categoryId: 1,
      name: '食費',
      description: '食材費、外食費など',
      icon: 'mdi-food',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 2,
      name: '交通費',
      description: '電車賃、ガソリン代など',
      icon: 'mdi-train',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 3,
      name: '娯楽',
      description: '映画、ゲーム、レジャーなど',
      icon: 'mdi-movie',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 4,
      name: '光熱費',
      description: '電気代、ガス代、水道代',
      icon: 'mdi-lightning-bolt',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 5,
      name: '通信費',
      description: '携帯代、インターネット代',
      icon: 'mdi-cellphone',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 6,
      name: '医療費',
      description: '病院代、薬代など',
      icon: 'mdi-medical-bag',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 7,
      name: '衣類',
      description: '服、靴、アクセサリーなど',
      icon: 'mdi-tshirt-crew',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 8,
      name: '美容',
      description: '化粧品、美容院など',
      icon: 'mdi-face-woman',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      categoryId: 9,
      name: 'その他',
      description: 'その他の支出',
      icon: 'mdi-dots-horizontal',
      color: 'primary',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
  ])

  // サンプル予算データ
  const budgets = ref<Budget[]>([
    {
      budgetId: 1,
      categoryId: 1,
      amount: 50000,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
    {
      budgetId: 2,
      categoryId: 2,
      amount: 15000,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
    {
      budgetId: 3,
      categoryId: 3,
      amount: 20000,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
    {
      budgetId: 4,
      categoryId: 4,
      amount: 12000,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
    {
      budgetId: 5,
      categoryId: 5,
      amount: 8000,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
    // 予算0円のカテゴリを追加（テスト用）
    {
      budgetId: 6,
      categoryId: 6,
      amount: 0,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
    {
      budgetId: 7,
      categoryId: 7,
      amount: 0,
      year: 2025,
      month: 9,
      createdAt: '2025-09-01T00:00:00Z',
      updatedAt: '2025-09-01T00:00:00Z',
    },
  ])

  // サンプル支出データ
  const expenses = ref<Expense[]>([
    {
      expenseId: 1,
      userId: 1,
      categoryId: 1,
      amount: 32500,
      spentAt: '2025-09-15',
      note: '食材費など',
      createdAt: '2025-09-15T00:00:00Z',
      updatedAt: '2025-09-15T00:00:00Z',
    },
    {
      expenseId: 2,
      userId: 1,
      categoryId: 2,
      amount: 4500,
      spentAt: '2025-09-10',
      note: '電車代',
      createdAt: '2025-09-10T00:00:00Z',
      updatedAt: '2025-09-10T00:00:00Z',
    },
    {
      expenseId: 3,
      userId: 1,
      categoryId: 3,
      amount: 17000,
      spentAt: '2025-09-20',
      note: '映画・レジャー',
      createdAt: '2025-09-20T00:00:00Z',
      updatedAt: '2025-09-20T00:00:00Z',
    },
  ])

  // 指定された年月の予算一覧を取得（カテゴリ情報付き）
  const getBudgetsWithCategories = (year: number = currentYear.value, month: number = currentMonth.value): BudgetWithCategory[] => {
    return budgets.value
      .filter(budget => budget.year === year && budget.month === month)
      .map((budget) => {
        const category = categories.value.find(c => c.categoryId === budget.categoryId)
        if (!category) return null

        // 該当する支出を計算
        const currentExpense = expenses.value
          .filter(expense =>
            expense.categoryId === budget.categoryId
            && new Date(expense.spentAt).getFullYear() === year
            && new Date(expense.spentAt).getMonth() + 1 === month,
          )
          .reduce((sum, expense) => sum + expense.amount, 0)

        // 予算が0の場合は使用率を0にして「未設定」として扱う
        const usagePercentage = budget.amount === 0 ? 0 : Math.round((currentExpense / budget.amount) * 100)
        const remainingAmount = budget.amount - currentExpense

        return {
          budgetId: budget.budgetId,
          category,
          amount: budget.amount,
          year: budget.year,
          month: budget.month,
          createdAt: budget.createdAt,
          updatedAt: budget.updatedAt,
          currentExpense: currentExpense,
          usagePercentage: usagePercentage,
          remainingAmount: remainingAmount,
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
      const existingBudget = existingBudgets.find(budget => budget.category.categoryId === category.categoryId)

      if (existingBudget) {
        // 既存の予算がある場合はそれを使用
        return existingBudget
      }
      else {
        // 予算が設定されていない場合は0円として作成
        const currentExpense = expenses.value
          .filter(expense =>
            expense.categoryId === category.categoryId
            && new Date(expense.spentAt).getFullYear() === year
            && new Date(expense.spentAt).getMonth() + 1 === month,
          )
          .reduce((sum, expense) => sum + expense.amount, 0)

        return {
          budgetId: 0, // 未設定を示すID
          category,
          amount: 0, // 予算未設定
          year,
          month,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          currentExpense: currentExpense,
          usagePercentage: 0, // 予算未設定の場合は0%
          remainingAmount: -currentExpense, // 予算がないので支出がマイナス表示
        }
      }
    })

    // 9件に制限
    return allCategoriesWithBudgets.slice(0, 9)
  }

  // カテゴリIDから予算を取得
  const getBudgetByCategoryId = (categoryId: number, year: number = currentYear.value, month: number = currentMonth.value): BudgetWithCategory | null => {
    const budgetsWithCategories = getBudgetsWithCategories(year, month)
    return budgetsWithCategories.find(budget => budget.category.categoryId === categoryId) || null
  }

  // カテゴリ一覧を取得
  const getCategories = (): Category[] => {
    return categories.value
  }

  // カテゴリIDからカテゴリを取得
  const getCategoryById = (categoryId: number): Category | null => {
    return categories.value.find(category => category.categoryId === categoryId) || null
  }

  // 予算を更新
  const updateBudget = (categoryId: number, amount: number, year: number = currentYear.value, month: number = currentMonth.value): void => {
    const existingBudgetIndex = budgets.value.findIndex(budget =>
      budget.categoryId === categoryId && budget.year === year && budget.month === month,
    )

    if (existingBudgetIndex !== -1) {
      // 既存の予算を更新
      const existingBudget = budgets.value[existingBudgetIndex]
      if (existingBudget) {
        existingBudget.amount = amount
        existingBudget.updatedAt = new Date().toISOString()
      }
    }
    else {
      // 新しい予算を作成
      const newBudget: Budget = {
        budgetId: Math.max(...budgets.value.map(b => b.budgetId), 0) + 1,
        categoryId: categoryId,
        amount,
        year,
        month,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
    const categoryIndex = categories.value.findIndex(category => category.categoryId === categoryId)

    if (categoryIndex !== -1) {
      const category = categories.value[categoryIndex]
      if (category) {
        category.name = name
        if (description !== undefined) category.description = description
        if (icon !== undefined) category.icon = icon
        if (color !== undefined) category.color = color
        category.updatedAt = new Date().toISOString()
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
      expenseId: Math.max(...expenses.value.map(e => e.expenseId), 0) + 1,
      userId: 1, // デフォルトユーザーID
      categoryId: categoryId,
      amount,
      spentAt: spentAt,
      note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expenses.value.push(newExpense)

    // ローカルストレージに保存
    if (import.meta.client) {
      localStorage.setItem('expenses', JSON.stringify(expenses.value))
    }

    // リアクティビティを強制更新
    refreshTrigger.value++
  }

  // ローカルストレージからデータを復元
  const loadFromStorage = (): void => {
    if (import.meta.client) {
      const savedBudgets = localStorage.getItem('budgets')
      const savedExpenses = localStorage.getItem('expenses')
      const savedCategories = localStorage.getItem('categories')

      console.log('Loading from storage:', { savedBudgets, savedExpenses, savedCategories })

      if (savedBudgets) {
        try {
          const parsedBudgets = JSON.parse(savedBudgets)
          console.log('Parsed budgets:', parsedBudgets)
          budgets.value = parsedBudgets
        }
        catch (error) {
          console.error('Error parsing budgets:', error)
        }
      }

      if (savedExpenses) {
        try {
          const parsedExpenses = JSON.parse(savedExpenses)
          console.log('Parsed expenses:', parsedExpenses)
          expenses.value = parsedExpenses
        }
        catch (error) {
          console.error('Error parsing expenses:', error)
        }
      }

      if (savedCategories) {
        try {
          // カテゴリデータがローカルストレージにある場合は復元
          const parsedCategories = JSON.parse(savedCategories)
          console.log('Parsed categories:', parsedCategories)
          categories.value.splice(0, categories.value.length, ...parsedCategories)
        }
        catch (error) {
          console.error('Error parsing categories:', error)
        }
      }

      console.log('Final data state:', {
        budgets: budgets.value,
        expenses: expenses.value,
        categories: categories.value,
      })
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
        categoryId: 1,
        name: '食費',
        description: '食材費、外食費など',
        icon: 'mdi-food',
        color: 'primary',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        categoryId: 2,
        name: '交通費',
        description: '電車賃、ガソリン代など',
        icon: 'mdi-train',
        color: 'primary',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        categoryId: 3,
        name: '娯楽',
        description: '映画、ゲーム、レジャーなど',
        icon: 'mdi-movie',
        color: 'primary',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        categoryId: 4,
        name: '光熱費',
        description: '電気、ガス、水道代など',
        icon: 'mdi-lightning-bolt',
        color: 'warning',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        categoryId: 5,
        name: 'その他',
        description: 'その他の支出',
        icon: 'mdi-dots-horizontal',
        color: 'secondary',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
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
        new Date(expense.spentAt).getFullYear() === year
          && new Date(expense.spentAt).getMonth() + 1 === month,
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
        new Date(expense.spentAt).getFullYear() === year
          && new Date(expense.spentAt).getMonth() + 1 === month,
      )
      .map((expense) => {
        const category = categories.value.find(c => c.categoryId === expense.categoryId)
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
      .sort((a, b) => new Date(b.spentAt).getTime() - new Date(a.spentAt).getTime()) // 新しい順にソート

    return limit ? filteredExpenses.slice(0, limit) : filteredExpenses
  }

  // BudgetWithCategoryをBudgetItemPropsに変換
  const getBudgetItemsForDisplay = (year: number = currentYear.value, month: number = currentMonth.value) => {
    // refreshTriggerを使用してリアクティビティを強制
    void refreshTrigger.value // この行はリアクティビティのトリガーとして機能
    return getAllCategoriesWithBudgets(year, month).map(budget => ({
      id: budget.category.categoryId,
      icon: budget.category.icon,
      label: budget.category.name,
      value: budget.usagePercentage,
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
