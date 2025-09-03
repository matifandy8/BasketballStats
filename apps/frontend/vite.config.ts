import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  build: {
    outDir: 'public', // Cambia 'dist' por 'public' si tu host lo requiere
  },
})
