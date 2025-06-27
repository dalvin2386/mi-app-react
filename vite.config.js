import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ¡Añade esta línea!
  // 'base' es la URL base para el despliegue de tu aplicación.
  // Debe coincidir con el nombre de tu repositorio en GitHub Pages,
  // rodeado de barras diagonales.
  base: '/mi-app-react/',
  plugins: [react()],
})