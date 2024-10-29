import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      exclude: ['src/main.tsx', 'vite.config.ts', 'eslint.config.js'], // Excluded files from coverage
    },
  },
})
