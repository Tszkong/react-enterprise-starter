import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 让 import 时用 @/ 代替 ../../src/
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
