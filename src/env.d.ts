/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_AUTHOR: string;
  readonly VITE_MODE: string;
  readonly VITE_VERSION: string;
  readonly VITE_NAME_SPACE: string;
  readonly VITE_API_USE_MOCK: string;
  readonly VITE_API_BASE: string;
  readonly VITE_API_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}