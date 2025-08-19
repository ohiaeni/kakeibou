DROP TABLE IF EXISTS user_accounts CASCADE;
CREATE TABLE user_accounts (
    id UUID PRIMARY KEY NOT NULL,
    username VARCHAR(128) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password_hash VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS expense_categories CASCADE;
CREATE TABLE expense_categories (
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS monthly_budgets CASCADE;
CREATE TABLE monthly_budgets (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES user_accounts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES expense_categories(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    budget_year INTEGER NOT NULL,
    budget_month INTEGER NOT NULL,
    UNIQUE (user_id, category_id, budget_year, budget_month)
);

DROP TABLE IF EXISTS expense_records CASCADE;
CREATE TABLE expense_records (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES user_accounts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES expense_categories(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL
);
