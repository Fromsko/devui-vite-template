import { defineStore } from "pinia";
import { onBeforeMount, reactive, watch } from "vue";
import storage from "@/utils/storage";

export interface ConfigStore {
  title: String,
  isLogin: boolean,
  items: { [key: string]: string }
}

export const useConfigStore = defineStore("ConfigStore", () => {
  const navConfig: ConfigStore = reactive({
    items: {},
    isLogin: false,
    title: "Fromsko"
  });

  const getAppTitle = (): String => {
    return navConfig.title;
  };

  const toggleNavConfig = (): ConfigStore => {
    return navConfig;
  };

  const setupItems = () => {
    if (navConfig.isLogin) {
      navConfig.items = {
        "接口文档": "/api",
        "控制台": "/dashboard/system",
        "退出登录": "logout"
      };
    } else {
      navConfig.items = { "登录": "/auth" };
    }
  };

  // 基础版本
  const hasValidToken = () => {
    const token = storage.getItem("token");
    if (typeof token === "string") {
      try {
        const parsedToken = JSON.parse(token);
        return Object.keys(parsedToken).length > 0;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const setLoginStatus = (isLogin: boolean) => {
    navConfig.isLogin = isLogin;
  };

  const setLogoutStatus = () => {
    storage.clearItem("token");
    navConfig.isLogin = false;
  };

  // 设置 Token 信息
  const setTokenInfo = (token: string) => {
    storage.setItem("token", token);
  };

  // 清除 Token 信息
  const clearTokenInfo = () => storage.clearItem("token");

  onBeforeMount(() => {
    navConfig.isLogin = hasValidToken();
    setupItems();
  });

  watch(() => navConfig.isLogin, (status: boolean) => {
    console.log(status);
    setupItems();
  });

  return {
    navConfig,
    setLoginStatus,
    setLogoutStatus,
    setTokenInfo,
    clearTokenInfo,
    toggleNavConfig,
    toggleAppTitle: getAppTitle
  };
});
