# GitHub Copilot Instructions for Kakeibou Project

## 基本情報
- **プロジェクト**: 家計簿アプリケーション
- **技術スタック**: Java 21+ / Spring Boot 3.x / Gradle
- **アーキテクチャ**: クリーンアーキテクチャ

## モジュール構成
- `web/` - Web層（REST API）
- `application-core/` - アプリケーション層（ビジネスロジック）
- `infrastructure/` - インフラストラクチャ層（データアクセス）
- `system-common/` - 共通機能

## コメント・レビュー指示
- **すべてのコメント・レビューコメントは日本語で記述すること**
- コードコメントは簡潔で分かりやすい日本語を使用
- プルリクエストのレビューコメントも日本語で提供
- エラーメッセージは日本語での説明を含める