import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "家計簿アプリ設計書",
    description: "家計簿アプリの設計・開発ドキュメント",
    lang: "ja",
    base: "/kakeibou/",
    cleanUrls: true,
    lastUpdated: true,
    head: [
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: "家計簿アプリ設計書" }],
      [
        "meta",
        {
          property: "og:description",
          content: "家計簿アプリの設計・開発ドキュメント",
        },
      ],
      [
        "meta",
        { property: "og:url", content: "https://ohiaeni.github.io/kakeibou/" },
      ],
      ["meta", { name: "theme-color", content: "#646cff" }],
    ],
    mermaid: {
      // Mermaidの設定をカスタマイズ
    },
    themeConfig: {
      nav: [
        { text: "ホーム", link: "/" },
        { text: "設計関連", link: "/00_設計関連/" },
        { text: "画面要件定義", link: "/02_画面要件定義/" },
        { text: "画面詳細設計", link: "/03_画面詳細設計/" },
        { text: "開発関連", link: "/01_開発関連/" },
      ],
      sidebar: {
        "/": [
          {
            text: "家計簿アプリ設計書",
            items: [
              { text: "概要", link: "/" },
              {
                text: "設計関連",
                collapsed: false,
                items: [
                  {
                    text: "アーキテクチャ設計",
                    link: "/00_設計関連/アーキテクチャ設計",
                  },
                  {
                    text: "データベース設計",
                    link: "/00_設計関連/データベース設計",
                  },
                  {
                    text: "コントローラー設計",
                    link: "/00_設計関連/コントローラー設計",
                  },
                  {
                    text: "セキュリティ設計",
                    link: "/00_設計関連/セキュリティ設計",
                  },
                ],
              },
              {
                text: "画面要件定義",
                collapsed: false,
                items: [
                  { text: "概要", link: "/02_画面要件定義/" },
                  {
                    text: "認証関連",
                    collapsed: true,
                    items: [
                      {
                        text: "ログイン画面",
                        link: "/02_画面要件定義/ログイン画面",
                      },
                      {
                        text: "ユーザー登録画面",
                        link: "/02_画面要件定義/ユーザー登録画面",
                      },
                    ],
                  },
                  {
                    text: "メイン画面",
                    collapsed: true,
                    items: [
                      {
                        text: "ダッシュボード",
                        link: "/02_画面要件定義/ダッシュボード",
                      },
                    ],
                  },
                  {
                    text: "支出管理",
                    collapsed: true,
                    items: [
                      {
                        text: "支出登録画面",
                        link: "/02_画面要件定義/支出登録画面",
                      },
                      {
                        text: "支出一覧画面",
                        link: "/02_画面要件定義/支出一覧画面",
                      },
                      {
                        text: "支出編集画面",
                        link: "/02_画面要件定義/支出編集画面",
                      },
                      {
                        text: "支出削除確認画面",
                        link: "/02_画面要件定義/支出削除確認画面",
                      },
                      {
                        text: "支出削除完了画面",
                        link: "/02_画面要件定義/支出削除完了画面",
                      },
                    ],
                  },
                  {
                    text: "カテゴリ管理",
                    collapsed: true,
                    items: [
                      {
                        text: "カテゴリ登録画面",
                        link: "/02_画面要件定義/カテゴリ登録画面",
                      },
                      {
                        text: "カテゴリ編集画面",
                        link: "/02_画面要件定義/カテゴリ編集画面",
                      },
                      {
                        text: "カテゴリ削除確認画面",
                        link: "/02_画面要件定義/カテゴリ削除確認画面",
                      },
                      {
                        text: "カテゴリ削除完了画面",
                        link: "/02_画面要件定義/カテゴリ削除完了画面",
                      },
                    ],
                  },
                  {
                    text: "予算管理",
                    collapsed: true,
                    items: [
                      {
                        text: "予算設定画面",
                        link: "/02_画面要件定義/予算設定画面",
                      },
                      {
                        text: "カテゴリ別予算登録画面",
                        link: "/02_画面要件定義/カテゴリ別予算登録画面",
                      },
                      {
                        text: "カテゴリ別予算編集画面",
                        link: "/02_画面要件定義/カテゴリ別予算編集画面",
                      },
                      {
                        text: "カテゴリ別予算削除確認画面",
                        link: "/02_画面要件定義/カテゴリ別予算削除確認画面",
                      },
                      {
                        text: "カテゴリ別予算削除完了画面",
                        link: "/02_画面要件定義/カテゴリ別予算削除完了画面",
                      },
                    ],
                  },
                  {
                    text: "分析・レポート",
                    collapsed: true,
                    items: [
                      {
                        text: "レポート画面",
                        link: "/02_画面要件定義/レポート画面",
                      },
                    ],
                  },
                  {
                    text: "設定",
                    collapsed: true,
                    items: [
                      {
                        text: "設定画面",
                        link: "/02_画面要件定義/設定画面",
                      },
                    ],
                  },
                ],
              },
              {
                text: "画面詳細設計",
                collapsed: false,
                items: [{ text: "概要", link: "/03_画面詳細設計/" }],
              },
              {
                text: "開発関連",
                collapsed: false,
                items: [
                  { text: "テスト戦略", link: "/01_開発関連/テスト戦略" },
                ],
              },
            ],
          },
        ],
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/ohiaeni/kakeibou" },
      ],
      footer: {
        message: "家計簿アプリ設計書",
        copyright: "Copyright © 2025",
      },
      search: {
        provider: "local",
      },
    },
  })
);
