# API設計
- [API設計](#api設計)
  - [API概要](#api概要)
  - [認証](#認証)
    - [認証方式](#認証方式)
    - [認証ヘッダー](#認証ヘッダー)
  - [API エンドポイント一覧](#api-エンドポイント一覧)
    - [1. 認証関連 (Authentication)](#1-認証関連-authentication)
      - [ログイン](#ログイン)
      - [ユーザー登録](#ユーザー登録)
    - [2. ユーザー管理 (Users)](#2-ユーザー管理-users)
      - [プロフィール取得](#プロフィール取得)
      - [プロフィール更新](#プロフィール更新)
    - [3. 支出カテゴリ管理 (Categories)](#3-支出カテゴリ管理-categories)
      - [カテゴリ一覧取得](#カテゴリ一覧取得)
      - [カテゴリ作成](#カテゴリ作成)
      - [カテゴリ更新](#カテゴリ更新)
      - [カテゴリ削除](#カテゴリ削除)
    - [4. 支出記録管理 (Expenses)](#4-支出記録管理-expenses)
      - [支出記録一覧取得](#支出記録一覧取得)
      - [支出記録作成](#支出記録作成)
      - [支出記録更新](#支出記録更新)
      - [支出記録削除](#支出記録削除)
    - [5. 予算管理 (Budgets)](#5-予算管理-budgets)
      - [月次予算一覧取得](#月次予算一覧取得)
      - [月次予算設定/更新](#月次予算設定更新)
      - [月次予算削除](#月次予算削除)
    - [6. レポート機能 (Reports)](#6-レポート機能-reports)
      - [月次レポート取得](#月次レポート取得)
      - [カテゴリ別集計レポート取得](#カテゴリ別集計レポート取得)
  - [エラーレスポンス](#エラーレスポンス)
    - [エラーフォーマット](#エラーフォーマット)
    - [エラーコード一覧](#エラーコード一覧)
  - [セキュリティ考慮事項](#セキュリティ考慮事項)
  - [バリデーション規則](#バリデーション規則)
    - [共通バリデーション](#共通バリデーション)
    - [エンドポイント別バリデーション](#エンドポイント別バリデーション)
      - [ユーザー登録・更新](#ユーザー登録更新)
      - [カテゴリ](#カテゴリ)
      - [支出記録](#支出記録)
      - [予算](#予算)
  - [ページネーション](#ページネーション)
    - [リクエストパラメータ](#リクエストパラメータ)
    - [レスポンス形式](#レスポンス形式)

## API概要

家計簿アプリのREST API設計書です。OpenAPI 3.0仕様に準拠し、SpringDoc OpenAPIを使用して自動生成されるAPIドキュメントと併用してください。

## 認証

### 認証方式
- **JWT Bearer Token**を使用
- ログイン成功時にアクセストークンを発行
- トークンの有効期限: 24時間

### 認証ヘッダー
```http
Authorization: Bearer <access_token>
```

## API エンドポイント一覧

### 1. 認証関連 (Authentication)

#### ログイン
```http
POST /auth/login
```

**リクエスト**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**レスポンス**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "user@example.com"
  }
}
```

#### ユーザー登録
```http
POST /auth/register
```

**リクエスト**:
```json
{
  "username": "john_doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**レスポンス**:
```json
{
  "message": "ユーザー登録が完了しました",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "user@example.com"
  }
}
```

### 2. ユーザー管理 (Users)

#### プロフィール取得
```http
GET /users/profile
```

**レスポンス**:
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "user@example.com"
  }
}
```

#### プロフィール更新
```http
PUT /users/profile
```

**リクエスト**:
```json
{
  "username": "john_doe_updated",
  "email": "newemail@example.com"
}
```

**レスポンス**:
```json
{
  "message": "プロフィールが更新されました",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe_updated",
    "email": "newemail@example.com"
  }
}
```

### 3. 支出カテゴリ管理 (Categories)

#### カテゴリ一覧取得
```http
GET /categories
```

**レスポンス**:
```json
{
  "categories": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "食費",
      "description": "食材、外食、飲料等の費用"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "住居費",
      "description": "家賃、光熱費、通信費等"
    }
  ]
}
```

#### カテゴリ作成
```http
POST /categories
```

**リクエスト**:
```json
{
  "name": "交通費",
  "description": "電車、バス、タクシー等の交通費"
}
```

**レスポンス**:
```json
{
  "message": "カテゴリが作成されました",
  "category": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "交通費",
    "description": "電車、バス、タクシー等の交通費"
  }
}
```

#### カテゴリ更新
```http
PUT /categories/{id}
```

**リクエスト**:
```json
{
  "name": "交通費（更新）",
  "description": "電車、バス、タクシー、自家用車等の交通費"
}
```

**レスポンス**:
```json
{
  "message": "カテゴリが更新されました",
  "category": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "name": "交通費（更新）",
    "description": "電車、バス、タクシー、自家用車等の交通費"
  }
}
```

#### カテゴリ削除
```http
DELETE /categories/{id}
```

**レスポンス**:
```json
{
  "message": "カテゴリが削除されました"
}
```

**注意**: カテゴリを削除すると、関連する予算や支出記録のcategory_idはNULLに設定されます。

### 4. 支出記録管理 (Expenses)

#### 支出記録一覧取得
```http
GET /expenses
```
```http
GET /expenses?year=2024&month=1&category_id=550e8400-e29b-41d4-a716-446655440001
```

**クエリパラメータ**:
- `year` (optional): 年（例: 2024）
- `month` (optional): 月（例: 1-12）
- `category_id` (optional): カテゴリID
- `limit` (optional): 取得件数上限（最大100、デフォルト: 20）
- `offset` (optional): オフセット（デフォルト: 0）

**レスポンス**:
```json
{
  "expenses": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "category_id": "550e8400-e29b-41d4-a716-446655440001",
      "category": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "食費"
      },
      "amount": 1500,
      "description": "スーパーでの買い物",
      "expense_date": "2024-01-15"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total_count": 25,
    "has_next": true,
    "has_previous": false
  },
  "summary": {
    "total_amount": 45000
  }
}
```

#### 支出記録作成
```http
POST /expenses
```

**リクエスト**:
```json
{
  "category_id": "550e8400-e29b-41d4-a716-446655440001",
  "amount": 1500,
  "description": "スーパーでの買い物",
  "expense_date": "2024-01-15"
}
```

**レスポンス**:
```json
{
  "message": "支出記録が作成されました",
  "expense": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "category_id": "550e8400-e29b-41d4-a716-446655440001",
    "category": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "食費"
    },
    "amount": 1500,
    "description": "スーパーでの買い物",
    "expense_date": "2024-01-15"
  }
}
```

#### 支出記録更新
```http
PUT /expenses/{id}
```

**リクエスト**:
```json
{
  "category_id": "550e8400-e29b-41d4-a716-446655440001",
  "amount": 1800,
  "description": "スーパーでの買い物（修正）",
  "expense_date": "2024-01-15"
}
```

**レスポンス**:
```json
{
  "message": "支出記録が更新されました",
  "expense": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "category_id": "550e8400-e29b-41d4-a716-446655440001",
    "category": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "食費"
    },
    "amount": 1800,
    "description": "スーパーでの買い物（修正）",
    "expense_date": "2024-01-15"
  }
}
```

#### 支出記録削除
```http
DELETE /expenses/{id}
```

**レスポンス**:
```json
{
  "message": "支出記録が削除されました"
}
```

### 5. 予算管理 (Budgets)

#### 月次予算一覧取得
```http
GET /budgets?year=2024&month=1
```

**クエリパラメータ**:
- `year` (required): 年（例: 2024）
- `month` (required): 月（例: 1-12）

**レスポンス**:
```json
{
  "budgets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "category_id": "550e8400-e29b-41d4-a716-446655440001",
      "category": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "食費"
      },
      "amount": 50000,
      "budget_year": 2024,
      "budget_month": 1,
      "spent_amount": 35000,
      "remaining_amount": 15000
    }
  ]
}
```

#### 月次予算設定/更新
```http
PUT /budgets
```

**リクエスト**:
```json
{
  "budgets": [
    {
      "category_id": "550e8400-e29b-41d4-a716-446655440001",
      "amount": 50000,
      "budget_year": 2024,
      "budget_month": 1
    }
  ]
}
```

**レスポンス**:
```json
{
  "message": "予算が設定されました",
  "budgets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "category_id": "550e8400-e29b-41d4-a716-446655440001",
      "category": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "食費"
      },
      "amount": 50000,
      "budget_year": 2024,
      "budget_month": 1,
      "spent_amount": 0,
      "remaining_amount": 50000
    }
  ]
}
```

#### 月次予算削除
```http
DELETE /budgets/{id}
```

**レスポンス**:
```json
{
  "message": "予算が削除されました"
}
```

### 6. レポート機能 (Reports)

#### 月次レポート取得
```http
GET /reports/monthly?year=2024&month=1
```

**クエリパラメータ**:
- `year` (required): 年（例: 2024）
- `month` (required): 月（例: 1-12）

**レスポンス**:
```json
{
  "report": {
    "year": 2024,
    "month": 1,
    "total_budget": 150000,
    "total_spent": 125000,
    "total_remaining": 25000,
    "budget_utilization_rate": 83.33,
    "categories": [
      {
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "食費"
        },
        "budget": 50000,
        "spent": 45000,
        "remaining": 5000,
        "utilization_rate": 90.0
      },
      {
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440002",
          "name": "住居費"
        },
        "budget": 100000,
        "spent": 80000,
        "remaining": 20000,
        "utilization_rate": 80.0
      }
    ]
  }
}
```

#### カテゴリ別集計レポート取得
```http
GET /reports/categories?start_date=2024-01-01&end_date=2024-01-31
```

**クエリパラメータ**:
- `start_date` (required): 集計開始日（YYYY-MM-DD形式）
- `end_date` (required): 集計終了日（YYYY-MM-DD形式）

**レスポンス**:
```json
{
  "report": {
    "period": {
      "start_date": "2024-01-01",
      "end_date": "2024-01-31"
    },
    "total_amount": 125000,
    "categories": [
      {
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "食費"
        },
        "total_amount": 45000,
        "percentage": 36.0,
        "transaction_count": 25,
        "average_amount": 1800
      },
      {
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440002",
          "name": "住居費"
        },
        "total_amount": 80000,
        "percentage": 64.0,
        "transaction_count": 3,
        "average_amount": 26667
      }
    ]
  }
}
```

## エラーレスポンス

### エラーフォーマット
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "入力データに不正があります",
    "details": [
      {
        "field": "amount",
        "message": "金額は1円以上である必要があります"
      }
    ]
  }
}
```

### エラーコード一覧

| HTTPステータス | エラーコード     | 説明                                    |
| -------------- | ---------------- | --------------------------------------- |
| 400            | VALIDATION_ERROR | バリデーションエラー                    |
| 401            | UNAUTHORIZED     | 認証が必要                              |
| 404            | NOT_FOUND        | リソースが見つからない/アクセス権限なし |
| 409            | CONFLICT         | データ競合                              |
| 500            | INTERNAL_ERROR   | サーバー内部エラー                      |

## セキュリティ考慮事項

1. **HTTPS必須**: 本番環境では全ての通信をHTTPSで行う
2. **CORS設定**: 適切なオリジンのみ許可
3. **入力検証**: 全ての入力データを厳密に検証
4. **SQL インジェクション対策**: パラメータ化クエリを使用
5. **XSS対策**: 出力時のエスケープ処理

## バリデーション規則

### 共通バリデーション
- **UUID**: 標準的なUUID形式（例: 550e8400-e29b-41d4-a716-446655440000）
- **金額**: 1円以上、1億円以下の整数
- **日付**: YYYY-MM-DD形式
- **メールアドレス**: RFC 5322準拠

### エンドポイント別バリデーション

#### ユーザー登録・更新
- **username**: 3文字以上128文字以下、英数字とアンダースコアのみ（データベース：VARCHAR(128)）
- **email**: 有効なメールアドレス形式、256文字以下（データベース：VARCHAR(256)）
- **password**: 8文字以上、英大文字・小文字・数字を含む（ハッシュ化後256文字以下：VARCHAR(256)）

#### カテゴリ
- **name**: 1文字以上128文字以下（データベース：VARCHAR(128)）
- **description**: TEXT型のため文字数制限なし（任意、データベース：TEXT）

#### 支出記録
- **amount**: 1円以上2,147,483,647円以下（データベース：INTEGER、32bit符号付き整数）
- **description**: TEXT型のため文字数制限なし（任意、データベース：TEXT）
- **expense_date**: 有効な日付形式（YYYY-MM-DD、データベース：DATE）

#### 予算
- **amount**: 1円以上2,147,483,647円以下（データベース：INTEGER、32bit符号付き整数）
- **budget_year**: 1900年以降の整数（データベース：INTEGER）
- **budget_month**: 1-12の整数（データベース：INTEGER）

## ページネーション

大量データを扱うAPIでは、ページネーションを実装:

### リクエストパラメータ
- `limit`: 取得件数（最大100、デフォルト20）
- `offset`: オフセット（デフォルト0）

### レスポンス形式
```json
{
  "data": [...],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total_count": 150,
    "has_next": true,
    "has_previous": false
  }
}
```
