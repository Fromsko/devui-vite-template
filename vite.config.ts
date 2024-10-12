import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'


const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler" // or 'modern'
      }
    }
  },
  plugins: [
    vue(),
  ]
})
