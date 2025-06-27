import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ¡Añade esta línea! Es fundamental para GitHub Pages con Vite.
  // Debe ser el nombre de tu repositorio, rodeado de barras diagonales.
  base: '/mi-app-react/',
  plugins: [react()],
})