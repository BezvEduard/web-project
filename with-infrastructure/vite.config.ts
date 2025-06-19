import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    open: true // Автоматически открывать браузер
  }
})
