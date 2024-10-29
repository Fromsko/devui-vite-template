import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'


const pathSrc = path.resolve(__dirname, 'src')

console.log(pathSrc)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 或 "modern"，"legacy"
        importers: [],
      },
    }
  },
  plugins: [
    vue(),
  ]
})
