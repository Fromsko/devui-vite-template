<template>
  <d-menu :router="true" default-select-keys="/dashboard/system/home" mode="vertical">
    <template v-for="menuItem in menuItems" :key="menuItem.key">
      <MenuItem :menu-item="menuItem" />
    </template>
  </d-menu>
</template>

<script lang="ts" setup>
import CustomTemplateView from "@/components/Custom/tmplate.vue";
import MenuItem from "@/components/Tree/MenuItem.vue";
import { defineComponent, h, onBeforeMount } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";

interface MenuItemType {
  key: string;
  label: string;
  icon?: string;
  subMenu?: MenuItemType[];
}

const menuItems: MenuItemType[] = [
  {
    key: "/dashboard/system/home",
    label: "首页",
    icon: "icon-homepage"
  },
  {
    key: "/dashboard/system",
    label: "系统",
    icon: "icon-system",
    subMenu: [
      {
        key: "/dashboard/system/about",
        label: "关于"
      },
      {
        key: "/dashboard/system/setting",
        label: "设置",
        icon: "icon-setting",
        subMenu: [
          {
            key: "/dashboard/system/setting/one",
            label: "第一项"
          },
          {
            key: "/dashboard/system/setting/demo",
            label: "示例"
          },
          {
            key: "/dashboard/system/setting/custom",
            label: "自定义"
          },
          {
            key: "/dashboard/system/setting/upload",
            label: "文件上传"
          }
        ]
      }
    ]
  }
];

const analyzeMenu = (items: MenuItemType[]): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = [];

  items.forEach((item) => {
    result.push({
      path: item.key, name: item.label, component: () => {
      }
    });

    if (item.subMenu) {
      result.push(...analyzeMenu(item.subMenu));
    }
  });

  return result;
};

onBeforeMount(() => {
  const router = useRouter();
  const analyzedMenuItems = analyzeMenu(menuItems);

  if (analyzedMenuItems && Array.isArray(analyzedMenuItems)) {
    analyzedMenuItems.forEach((menuItem) => {
      if (router.hasRoute(menuItem.name as string)) return;

      let templateComponent = () => {
        let component = defineComponent({
          setup() {
            return () =>
              h(CustomTemplateView, {
                title: `我是 ${menuItem.name as string} 路由`,
                content: `我是动态创建的路由信息: ${menuItem.path as string}`,
                likeNum: 10,
                starNum: 4,
                msgNum: 3
              });
          }
        });
        component.displayName = menuItem.name as string;
        return component;
      };

      menuItem.component = () => Promise.resolve(templateComponent());
      router.addRoute(menuItem);
    });
  }
});
</script>
