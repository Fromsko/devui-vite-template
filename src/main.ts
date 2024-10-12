import App from "@/App.vue";
import router from '@/router';
import '@/utils/config';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import { createApp } from "vue";
import DevUI from 'vue-devui';
import 'vue-devui/style.css';

ThemeServiceInit({ infinityTheme }, 'infinityTheme');

const app = createApp(App);

app.use(DevUI)
app.use(router)
app.mount("#app");