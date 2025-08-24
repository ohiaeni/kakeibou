# 画面詳細設計

このドキュメントでは、家計簿アプリの画面の詳細設計に関する情報を提供します。各画面の機能について詳しく説明します。

## 画面構成概要

### 画面数統計

- **総画面数**: 26 画面
- **認証関連**: 4 画面（ログイン、登録、ログアウト、プロフィール管理）
- **支出管理**: 6 画面（一覧、詳細、登録、編集、削除確認・完了）
- **カテゴリ管理**: 5 画面（一覧、登録、編集、削除確認・完了）
- **予算管理**: 6 画面（設定、カテゴリ別登録・編集・削除）
- **レポート・設定**: 2 画面
- **エラーページ**: 3 画面（404、500、403）

### 画面一覧（RESTful URL設計）

| 画面名                   | URL                             | HTTPメソッド | 備考                           |
| ------------------------ | ------------------------------- | ------------ | ------------------------------ |
| ダッシュボード画面       | /                               | GET          | メイン画面、支出概要表示       |
| ログイン画面             | /auth/login                     | GET/POST     | ユーザー認証                   |
| ログアウト確認画面       | /auth/logout                    | GET/POST     | ログアウト処理                 |
| ユーザー登録画面         | /auth/register                  | GET/POST     | 新規ユーザー登録               |
| プロフィール編集画面     | /profile/edit                   | GET/POST     | ユーザー情報編集               |
| パスワード変更画面       | /profile/password               | GET/POST     | パスワード変更                 |
| 支出一覧画面             | /expenses                       | GET          | 支出記録の一覧表示・検索       |
| 支出登録画面             | /expenses/new                   | GET/POST     | 支出の入力・新規作成           |
| 支出編集画面             | /expenses/{id}/edit             | GET/POST     | 特定支出の編集                 |
| 支出削除・確認画面       | /expenses/{id}/delete           | GET          | 支出削除の確認                 |
| 支出削除・完了画面       | /expenses/{id}/delete           | POST         | 支出削除の実行・完了           |
| カテゴリ一覧画面         | /categories                     | GET          | カテゴリ一覧表示・管理         |
| カテゴリ登録画面         | /categories/new                 | GET/POST     | 新規カテゴリの登録             |
| カテゴリ編集画面         | /categories/{id}/edit           | GET/POST     | 特定カテゴリの編集             |
| カテゴリ削除確認画面     | /categories/{id}/delete         | GET          | カテゴリ削除の確認             |
| カテゴリ削除完了画面     | /categories/{id}/delete         | POST         | カテゴリ削除の実行・完了       |
| 予算設定画面             | /budgets                        | GET/POST     | 月次予算の設定・管理           |
| カテゴリ別・予算登録画面 | /budgets/categories/new         | GET/POST     | カテゴリ別予算の新規登録       |
| カテゴリ別・予算編集画面 | /budgets/categories/{id}/edit   | GET/POST     | カテゴリ別予算の編集           |
| カテゴリ別・予算削除確認 | /budgets/categories/{id}/delete | GET          | カテゴリ別予算削除の確認       |
| カテゴリ別・予算削除完了 | /budgets/categories/{id}/delete | POST         | カテゴリ別予算削除の実行・完了 |
| レポート画面             | /reports                        | GET          | 支出分析・グラフ表示           |
| 設定画面                 | /settings                       | GET/POST     | アプリ設定                     |

## 画面設計原則

### HTTP メソッド設計ガイドライン

- **GET**: リソースの取得・表示画面
- **POST**: リソースの新規作成・更新・削除のすべての処理

### URL設計規則

- 複数形を使用: `/expenses`, `/categories`, `/budgets`
- 階層構造を適切に表現: `/budgets/categories`
- ID 指定は `{id}` で表現: `/expenses/{id}/edit`
- アクション名は末尾に配置: `/new`, `/edit`, `/delete`
