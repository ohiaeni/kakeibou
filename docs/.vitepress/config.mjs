import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "家計簿アプリ設計書",
    description: "家計簿アプリの設計・開発ドキュメント",
    lang: "ja",
    mermaid: {
      // Mermaidの設定をカスタマイズ
    },
    themeConfig: {
      nav: [
        { text: "ホーム", link: "/" },
        { text: "設計関連", link: "/設計関連/" },
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
                  {
                    text: "画面設計",
                    collapsed: true,
                    items: [
                      { text: "概要", link: "/設計関連/画面設計/" },
                      {
                        text: "ダッシュボード",
                        link: "/設計関連/画面設計/ダッシュボード",
                      },
                      {
                        text: "ユーザー登録画面",
                        link: "/設計関連/画面設計/ユーザー登録画面",
                      },
                      {
                        text: "ログイン画面",
                        link: "/設計関連/画面設計/ログイン画面",
                      },
                      {
                        text: "支出記録画面",
                        link: "/設計関連/画面設計/支出記録画面",
                      },
                      {
                        text: "支出履歴画面",
                        link: "/設計関連/画面設計/支出履歴画面",
                      },
                      {
                        text: "予算設定画面",
                        link: "/設計関連/画面設計/予算設定画面",
                      },
                      {
                        text: "レポート画面",
                        link: "/設計関連/画面設計/レポート画面",
                      },
                      { text: "設定画面", link: "/設計関連/画面設計/設定画面" },
                    ],
                  },
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
