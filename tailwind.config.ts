import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    '!./node_modules/**', // 排除 node_modules 目录
  ],
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: false,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  }
};

export default tailwindConfig satisfies Config;
