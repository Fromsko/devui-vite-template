/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_AUTHOR: string
  readonly VITE_MODE: string
  readonly VITE_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}