// アプリケーション全体で使用するカラーパレット定数
export const COLOR_OPTIONS = [
  { title: 'プライマリー', value: 'primary' },
  { title: 'セカンダリー', value: 'secondary' },
  { title: '成功', value: 'success' },
  { title: '情報', value: 'info' },
  { title: '警告', value: 'warning' },
  { title: 'エラー', value: 'error' },
  { title: '赤', value: 'red' },
  { title: 'ピンク', value: 'pink' },
  { title: '紫', value: 'purple' },
  { title: '青', value: 'blue' },
  { title: '緑', value: 'green' },
  { title: 'オレンジ', value: 'orange' },
] as const

export type ColorOption = typeof COLOR_OPTIONS[number]
