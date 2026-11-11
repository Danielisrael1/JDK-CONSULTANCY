import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // the design kit lives in public/assets; Vite's own bundles go to dist/app so the two never mix
  build: { assetsDir: 'app' },
})
