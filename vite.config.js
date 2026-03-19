import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://tiis-project-backend.onrender.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://tiis-project-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
