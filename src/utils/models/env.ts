// src/model/env.ts

export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

const config = {
  baseApi: import.meta.env.VITE_API_BASE,
  mockApi: import.meta.env.VITE_API_MOCK,
  useMock: import.meta.env.VITE_API_USE_MOCK,
  author: import.meta.env.VITE_AUTHOR,
  title: import.meta.env.VITE_APP_TITLE,
  version: import.meta.env.VITE_VERSION,
  namespace: import.meta.env.VITE_NAME_SPACE
};

export const EnvConfig = {
  [Environment.DEVELOPMENT]: config,
  [Environment.PRODUCTION]: config
};