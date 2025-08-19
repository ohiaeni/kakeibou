DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL,
    username VARCHAR(128) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password_hash VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT
);

DROP TABLE IF EXISTS budgets CASCADE;
CREATE TABLE budgets (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    UNIQUE (user_id, category_id, year, month)
);

DROP TABLE IF EXISTS expenses CASCADE;
CREATE TABLE expenses (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL
);
