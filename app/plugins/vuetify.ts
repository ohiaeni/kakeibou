import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            'primary': '#FF6B35',
            'secondary': '#F7931E',
            'accent': '#FFB347',
            'error': '#F44336',
            'warning': '#FF9800',
            'info': '#2196F3',
            'success': '#4CAF50',
            'surface': '#FFF8F3',
            'background': '#FFFAF7',
            'on-surface': '#2D1B14',
            'on-background': '#2D1B14',
            'on-primary': '#FFFFFF',
          },
        },
        dark: {
          colors: {
            'primary': '#FF8A65',
            'secondary': '#FFB74D',
            'accent': '#FFCC80',
            'error': '#FF5252',
            'warning': '#FFA726',
            'info': '#42A5F5',
            'success': '#66BB6A',
            'surface': '#2D1B14',
            'background': '#1A0F0A',
            'on-surface': '#FFE0CC',
            'on-background': '#FFE0CC',
            'on-primary': '#1A0F0A',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
