<template>
  <d-menu mode="vertical" :router="true" default-select-keys="/home">
    <template v-for="menuItem in menuItems" :key="menuItem.key">
      <MenuItem :menu-item="menuItem" />
    </template>
  </d-menu>
</template>

<script lang="ts" setup>
import CustomTemplateView from '@/components/Custom/tmplate.vue'
import MenuItem from '@/components/Tree/MenuItem.vue'
import { defineComponent, h, onBeforeMount } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'

interface MenuItemType {
  key: string
  label: string
  icon?: string
  subMenu?: MenuItemType[]
}

const menuItems: MenuItemType[] = [
  {
    key: '/home',
    label: '首页',
    icon: 'icon-homepage',
  },
  {
    key: '/dashboard/system',
    label: '系统',
    icon: 'icon-system',
    subMenu: [
      {
        key: '/dashboard/system/about',
        label: '关于',
      },
      {
        key: '/dashboard/system/setting',
        label: '设置',
        icon: 'icon-setting',
        subMenu: [
          {
            key: '/dashboard/system/setting/one',
            label: '第一项',
          },
          {
            key: '/dashboard/system/setting/demo',
            label: '示例',
          },
          {
            key: '/dashboard/system/setting/custom',
            label: '自定义',
          },
        ],
      },
    ],
  },
]

// 层级分析函数
const analyzeMenu = (items: MenuItemType[]): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []

  items.forEach((item) => {
    // 添加当前菜单项
    result.push({ path: item.key, name: item.label, component: () => {} })

    // 如果有子菜单，递归处理
    if (item.subMenu) {
      result.push(...analyzeMenu(item.subMenu))
    }
  })

  return result
}

onBeforeMount(() => {
  const router = useRouter()
  const analyzedMenuItems = analyzeMenu(menuItems)

  if (analyzedMenuItems && Array.isArray(analyzedMenuItems)) {
    analyzedMenuItems.forEach((menuItem) => {
      // 判断路由是否存在
      if (router.hasRoute(menuItem.name as string)) return

      // 模板组件
      let templateComponent = () => {
        let component = defineComponent({
          setup() {
            return () =>
              h(CustomTemplateView, {
                title: `我是 ${menuItem.name as string} 路由`,
                content: `我是动态创建的路由信息: ${menuItem.path as string}`,
                likeNum: 10,
                starNum: 4,
                msgNum: 3,
              })
          },
        })
        component.displayName = menuItem.name as string
        return component
      }

      // 为路由添加组件
      menuItem.component = () => Promise.resolve(templateComponent())
      // 动态增加路由
      router.addRoute(menuItem)

      console.log('动态创建了路由!', menuItem.name, router.getRoutes())
    })
  }
  console.log(router.getRoutes())
})
</script>

<style scoped>
/* 这里可以添加自定义样式 */
</style>
