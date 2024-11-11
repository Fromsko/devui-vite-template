<template>
  <d-layout>
    <d-header class="sk-header">
      <div class="header-list-one">
        <img alt="Logo" class="logo-devui" src="@/assets/vue.svg" />
        <span class="title-text">{{ config.title }}</span>
      </div>

      <div class="pr-2 w-fit">
        <div class="dropdown dropdown-end">
          <div class="btn btn-outline btn-success m-1 text-sm" role="button" tabindex="0">{{ config.author }}
          </div>
          <ul
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow items-center"
            tabindex="0">
            <li>
              <RouterLink style="text-align: center; user-select: none" to="/">退出</RouterLink>
            </li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
    </d-header>

    <d-layout class="sk-body">
      <d-row type="flex">
        <d-col class="sk-aside">
          <MenuTree :default-select-keys="['/dashboard/system/home']" />
        </d-col>

        <d-col class="sk-container" flex="auto">
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
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import MenuTree from "@/components/Tree/MenuTree.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import config from "@/utils/config";

const router = useRouter();
const allRoutes = router.getRoutes();
const defaultShow = ref(allRoutes[0].name);

watch(defaultShow, () => {
  router.push({ name: defaultShow.value });
});
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
