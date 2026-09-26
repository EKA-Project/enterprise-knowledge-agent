import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Vite uses this configuration to process React and Tailwind CSS.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})