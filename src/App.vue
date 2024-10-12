<template>
  <d-layout>
    <d-header class="sk-header">
      <div class="header-list-one">
        <img class="logo-devui" src="@/assets/vue.svg" alt="Logo" />
        <span class="title-text">{{ Title }}</span>
      </div>

      <div class="header-list-two">
        <d-switch
          size="lg"
          color="#50D4AB"
          v-model="modeSwitch"
          active-value="打开"
          inactive-value="关闭"
        >
          <template #checkedContent>开</template>
          <template #uncheckedContent>关</template>
        </d-switch>

        <d-dropdown close-scope="blank" style="width: 75px">
          <span class="account-text">{{ Account }}</span>
          <template #menu>
            <ul style="padding: 8px">
              <li style="text-align: center; user-select: none">退出</li>
            </ul>
          </template>
        </d-dropdown>
      </div>
    </d-header>

    <d-layout class="sk-body">
      <d-row type="flex">
        <d-col class="sk-aside">
          <MenuTree
            :default-select-keys="['/home']"
            :menu-items="AutoGenRoute"
          />
        </d-col>

        <d-col flex="auto" class="sk-container">
          <d-content>
            <Breadcrumb />
            <div class="sk-inner-content">
              <router-view></router-view>
            </div>
          </d-content>
        </d-col>
      </d-row>
    </d-layout>

    <d-footer class="sk-footer">footer</d-footer>
  </d-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Breadcrumb from '@/components/Breadcrumb/index.vue'
import MenuTree from '@/components/Tree/MenuTree.vue'

const Account = 'user-select'
  const Title = 'Fromsko 后台管理系统'

const router = useRouter()

const allRoutes = router.getRoutes()
const defaultShow = ref(allRoutes[0].name)

const modeSwitch = ref(false)

const AutoGenRoute = [
  { name: 'system/setting/one', path: '/system/setting/one', title: '测试' },
]

watch(defaultShow, () => {
  router.push({ name: defaultShow.value })
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;

  body {
    margin: 0;

    #app {
      height: 100vh;

      .sk-header {
        width: 100%;
        height: 60px;
        display: flex;
        user-select: none;
        position: relative;
        align-items: center;
        justify-content: space-between;

        .header-list-one {
          width: 240px;
          margin-left: 8px;
          align-items: center;
          display: inline-flex;

          .logo-devui {
            width: 36px;
            height: 36px;
            margin: 0 10px;
          }

          .title-text {
            color: #000;
            font-size: 18px;
          }
        }

        .header-list-two {
          gap: 8px;
          width: 150px;
          align-items: center;
          display: inline-flex;
          margin-right: 15px;

          .account-text {
            min-width: 75px;
            flex-shrink: 0;
            font-size: 16px;
          }
        }
      }

      .sk-body {
        .sk-aside {
          flex: 0 0 220px;
          user-select: none;
        }

        .sk-container {
          display: flex;
          padding: 15px;
          height: calc(100vh - 97px);
          background-color: #f3f6f8;

          .sk-inner-content {
            padding: 10px;
            margin-bottom: 10px;
            height: calc(100% - 20px);
            background-color: #fff;
          }
        }
      }

      .sk-footer {
        color: #000;
        padding: 8px 24px;
      }
    }
  }
}
</style>
