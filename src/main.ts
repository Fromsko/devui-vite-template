import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import { createApp } from "vue";

import App from "@/App.vue";
import router from '@/router';
import DevUI from 'vue-devui';

import '@/assets/styles/main.css';
import '@devui-design/icons/icomoon/devui-icon.css';

ThemeServiceInit({ infinityTheme }, 'infinityTheme');

const app = createApp(App);

app.use(DevUI)
app.use(router)
app.mount("#app");