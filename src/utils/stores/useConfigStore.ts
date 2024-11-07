import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface ConfigStore {
    title: String,
    isOpen: boolean,
    isLogin: boolean,
    items: { [key: string]: string }
}

export const useConfigStore = defineStore('ConfigStore', () => {
    const navConfig: ConfigStore = reactive({
        items: {},
        isOpen: false,
        isLogin: false,
        title: 'Fromsko',
    })

    const getAppTitle = (): String => {
        return navConfig.title
    }

    const toggleNavConfig = (): ConfigStore => {
        return navConfig
    }

    const setNavConfig = (isOpen: boolean) => {
        navConfig.isOpen = isOpen
    }

    const setItems = (items: { [key: string]: string } | null = null) => {
        if (items === null) {
            navConfig.items = {
                "API接口": "/api",
                "控制台": "/dashboard/system",
                "退出登录": "logout",
            }
        } else {
            navConfig.items = items
        }
        return navConfig.items
    }

    const logout = () => {
        if (navConfig.isLogin) {
            navConfig.isLogin = false
        }
        setItems({ "登录": "/auth" })
    }

    setItems()

    return {
        navConfig,
        setNavConfig,
        toggleNavConfig,
        toggleLogout: logout,
        toggleAppTitle: getAppTitle,
    };
});
