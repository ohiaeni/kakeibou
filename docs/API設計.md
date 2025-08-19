# API設計

## API概要

家計簿アプリのREST API設計書です。OpenAPI 3.0仕様に準拠し、SpringDoc OpenAPIを使用して自動生成されるAPIドキュメントと併用してください。

## ベースURL

```
開発環境: http://localhost:8080/api/v1
本番環境: https://kakeibou.example.com/api/v1
```

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

### 2. ユーザー管理 (Users)

#### プロフィール取得
```http
GET /users/profile
```

#### プロフィール更新
```http
PUT /users/profile
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

#### カテゴリ作成（管理者のみ）
```http
POST /categories
```

### 4. 支出記録管理 (Expenses)

#### 支出記録一覧取得
```http
GET /expenses?year=2024&month=1&category_id=550e8400-e29b-41d4-a716-446655440001
```

**クエリパラメータ**:
- `year` (optional): 年（例: 2024）
- `month` (optional): 月（例: 1-12）
- `category_id` (optional): カテゴリID
- `limit` (optional): 取得件数上限（デフォルト: 100）
- `offset` (optional): オフセット（デフォルト: 0）

**レスポンス**:
```json
{
  "expenses": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "category": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "食費"
      },
      "amount": 1500,
      "description": "スーパーでの買い物",
      "expense_date": "2024-01-15"
    }
  ],
  "total_count": 25,
  "total_amount": 45000
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

#### 支出記録更新
```http
PUT /expenses/{id}
```

#### 支出記録削除
```http
DELETE /expenses/{id}
```

### 5. 予算管理 (Budgets)

#### 月次予算一覧取得
```http
GET /budgets?year=2024&month=1
```

**レスポンス**:
```json
{
  "budgets": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
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

### 6. レポート機能 (Reports)

#### 月次レポート取得
```http
GET /reports/monthly?year=2024&month=1
```

#### カテゴリ別集計レポート取得
```http
GET /reports/categories?start_date=2024-01-01&end_date=2024-01-31
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

| HTTPステータス | エラーコード     | 説明                   |
| -------------- | ---------------- | ---------------------- |
| 400            | VALIDATION_ERROR | バリデーションエラー   |
| 401            | UNAUTHORIZED     | 認証が必要             |
| 403            | FORBIDDEN        | アクセス権限なし       |
| 404            | NOT_FOUND        | リソースが見つからない |
| 409            | CONFLICT         | データ競合             |
| 500            | INTERNAL_ERROR   | サーバー内部エラー     |

## レート制限

- **認証エンドポイント**: 5回/分
- **その他のエンドポイント**: 100回/分
- **レポートエンドポイント**: 20回/分

## バージョニング

- URLパスにバージョンを含める（例: `/api/v1/`）
- 後方互換性を保ちながら新バージョンをリリース
- 旧バージョンは最低6ヶ月間サポート

## セキュリティ考慮事項

1. **HTTPS必須**: 本番環境では全ての通信をHTTPSで行う
2. **CORS設定**: 適切なオリジンのみ許可
3. **入力検証**: 全ての入力データを厳密に検証
4. **SQL インジェクション対策**: パラメータ化クエリを使用
5. **XSS対策**: 出力時のエスケープ処理
