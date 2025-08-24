# GitHub Copilot Instructions for Kakeibou Project

このファイルは、GitHub Copilotが家計簿アプリケーション（Kakeibou）プロジェクトでより効果的に動作するための指示書です。

## プロジェクト概要

家計簿管理のためのWebアプリケーションで、以下の技術スタックを使用しています：

- **言語**: Java 17+
- **フレームワーク**: Spring Boot 3.x
- **アーキテクチャ**: クリーンアーキテクチャ（レイヤードアーキテクチャ）
- **ビルドツール**: Gradle
- **ドキュメント**: VitePress

## アーキテクチャ構成

### モジュール構成
- `web/` - Web層（REST API、コントローラー）
- `application-core/` - アプリケーション層（ビジネスロジック、ユースケース）
- `infrastructure/` - インフラストラクチャ層（データアクセス、外部システム連携）
- `system-common/` - システム共通機能（設定、ユーティリティ）

### 依存関係ルール
- Web層 → Application層 → Infrastructure層の順で依存
- 逆方向の依存は禁止（Dependency Inversion Principle）
- すべての層でsystem-commonを参照可能

## コーディング規約

### パッケージ構成
```
com.kakeibou.{module}.{layer}
例: com.kakeibou.expense.application.usecase
```

### クラス命名規約
- **Controller**: `{機能名}Controller`
- **UseCase**: `{機能名}UseCase`
- **Repository Interface**: `{エンティティ名}Repository`
- **Repository Implementation**: `{エンティティ名}RepositoryImpl`
- **Entity**: `{エンティティ名}`
- **DTO**: `{機能名}Request/Response`

### メソッド命名規約
- **Repository**: `findBy*`, `save`, `delete`, `exists`
- **UseCase**: `execute`, `handle`
- **Controller**: HTTP動詞に対応 (`get*`, `post*`, `put*`, `delete*`)

## 開発時の考慮事項

### セキュリティ
- すべてのAPIエンドポイントでJWT認証を実装
- 入力値検証は必須（Bean Validation使用）
- SQLインジェクション対策でPreparedStatementを使用

### エラーハンドリング
- カスタム例外クラスを使用
- `@ControllerAdvice`でグローバル例外ハンドリング
- 適切なHTTPステータスコードを返却

### テスト
- 各層で適切なテストを実装
  - **Controller**: `@WebMvcTest`
  - **UseCase**: 単体テスト（モック使用）
  - **Repository**: `@DataJpaTest`

### ログ
- SLF4J + Logbackを使用
- ログレベルを適切に設定（DEBUG, INFO, WARN, ERROR）
- 個人情報をログに出力しない

## よく使用するアノテーション

### Spring Boot
- `@RestController` - REST APIコントローラー
- `@Service` - サービス層
- `@Repository` - リポジトリ層
- `@Component` - 汎用コンポーネント
- `@Configuration` - 設定クラス

### バリデーション
- `@Valid` - リクエスト検証
- `@NotNull`, `@NotBlank` - 必須項目
- `@Size`, `@Min`, `@Max` - サイズ・範囲制限

### JPA
- `@Entity` - エンティティクラス
- `@Id`, `@GeneratedValue` - 主キー
- `@Column` - カラム定義
- `@OneToMany`, `@ManyToOne` - リレーション

## ファイル生成時のテンプレート

### Controller例
```java
@RestController
@RequestMapping("/api/v1/{resource}")
@RequiredArgsConstructor
public class {Resource}Controller {
    
    private final {Resource}UseCase useCase;
    
    @GetMapping
    public ResponseEntity<List<{Resource}Response>> getAll() {
        // 実装
    }
}
```

### UseCase例
```java
@Service
@RequiredArgsConstructor
public class {Resource}UseCase {
    
    private final {Resource}Repository repository;
    
    public {Resource}Response execute({Resource}Request request) {
        // 実装
    }
}
```

## 注意事項

1. **依存関係の循環参照を避ける**
2. **DTOとEntityを明確に分離する**
3. **ビジネスロジックはApplication層に集約する**
4. **データベースアクセスはRepository経由のみ**
5. **例外処理は適切な層で実装する**

## ドキュメント更新

コード変更時は以下のドキュメントも更新してください：
- API仕様書（`api-docs/web/api-specification.json`）
- 設計書（`docs/` ディレクトリ内のMarkdownファイル）

## 参考リンク

- [プロジェクトドキュメント](https://ohiaeni.github.io/kakeibou/)
- [Spring Boot公式ドキュメント](https://spring.io/projects/spring-boot)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)