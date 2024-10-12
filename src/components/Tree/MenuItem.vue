<template>
  <template v-if="menuItem.subMenu">
    <d-sub-menu :title="menuItem.label" :key="menuItem.key">
      <template #icon>
        <i :class="menuItem.icon"></i>
      </template>
      <template v-for="subItem in menuItem.subMenu" :key="subItem.key">
        <MenuItem :menu-item="subItem" />
      </template>
    </d-sub-menu>
  </template>
  <template v-else>
    <d-menu-item :key="menuItem.key" :title="menuItem.label">
      <template #icon v-if="menuItem.icon">
        <i :class="menuItem.icon"></i>
      </template>
      <span>{{ menuItem.label }}</span>
    </d-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface MenuItemType {
  key: string
  label: string
  icon?: string
  subMenu?: MenuItemType[]
}

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object as () => MenuItemType,
      required: true,
    },
  },
})
</script>
