import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/equiparacao-clinicas/', // repo do Pages
  plugins: [react()],
})
