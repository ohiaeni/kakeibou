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
        { text: "設計関連", link: "/設計関連/" },
        { text: "画面要件定義", link: "/画面要件定義/" },
        { text: "開発関連", link: "/開発関連/" },
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
                    link: "/設計関連/アーキテクチャ設計",
                  },
                  {
                    text: "データベース設計",
                    link: "/設計関連/データベース設計",
                  },
                  { text: "API設計", link: "/設計関連/API設計" },
                  {
                    text: "セキュリティ設計",
                    link: "/設計関連/セキュリティ設計",
                  },
                ],
              },
              {
                text: "画面要件定義",
                collapsed: false,
                items: [
                  { text: "概要", link: "/画面要件定義/" },
                  {
                    text: "ダッシュボード",
                    link: "/画面要件定義/ダッシュボード",
                  },
                  {
                    text: "ユーザー登録画面",
                    link: "/画面要件定義/ユーザー登録画面",
                  },
                  {
                    text: "ログイン画面",
                    link: "/画面要件定義/ログイン画面",
                  },
                  {
                    text: "支出記録画面",
                    link: "/画面要件定義/支出記録画面",
                  },
                  {
                    text: "支出履歴画面",
                    link: "/画面要件定義/支出履歴画面",
                  },
                  {
                    text: "予算設定画面",
                    link: "/画面要件定義/予算設定画面",
                  },
                  {
                    text: "レポート画面",
                    link: "/画面要件定義/レポート画面",
                  },
                  { text: "設定画面", link: "/画面要件定義/設定画面" },
                ],
              },
              {
                text: "開発関連",
                collapsed: false,
                items: [{ text: "テスト戦略", link: "/開発関連/テスト戦略" }],
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
