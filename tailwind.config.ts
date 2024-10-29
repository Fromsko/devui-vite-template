import daisyui from "daisyui";
import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
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
    logs: true,
    themeRoot: ":root",
  }
};

export default tailwindConfig satisfies Config;
