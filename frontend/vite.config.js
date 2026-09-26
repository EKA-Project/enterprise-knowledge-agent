import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Vite uses this configuration to process React and Tailwind CSS.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})