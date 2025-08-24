# 家計簿アプリ

家計簿管理のためのWebアプリケーションです。

## 📖 ドキュメント

このプロジェクトの設計書・開発ドキュメントは、GitHub Pagesで公開されています：

**🔗 [設計書・ドキュメントを見る](https://ohiaeni.github.io/kakeibou/)**

## プロジェクト構成

- `backend/` - バックエンドアプリケーション（Spring Boot）
  - `web/` - Web層（REST API）
  - `application-core/` - アプリケーション層
  - `infrastructure/` - インフラストラクチャ層
  - `system-common/` - 共通モジュール
- `docs/` - 設計書・ドキュメント（VitePress）

## 技術スタック

- **バックエンド**: Java, Spring Boot, Gradle
- **アーキテクチャ**: クリーンアーキテクチャ
- **ドキュメント**: VitePress, GitHub Pages

## 開発環境セットアップ

### バックエンド
```bash
cd backend
./gradlew build
```

### ドキュメント（ローカル）
```bash
cd docs
npm install
npm run docs:dev
```

## ドキュメントの更新

ドキュメントは `docs/` ディレクトリ内のMarkdownファイルを編集することで更新できます。
変更をmainブランチにプッシュすると、自動的にGitHub Pagesにデプロイされます。

## GitHub Pages設定

このリポジトリは以下の設定でGitHub Pagesを利用しています：

1. **Source**: GitHub Actions
2. **Build**: VitePress（GitHub Actions workflow）
3. **Deploy**: 自動デプロイ（mainブランチへのpush時）

### 初回設定手順

1. GitHubリポジトリの「Settings」→「Pages」に移動
2. 「Source」を「GitHub Actions」に設定
3. mainブランチにpushすると自動的にデプロイが開始されます

## ライセンス

MIT License

