<!-- src/components/Breadcrumb.vue -->
<template>
  <div class="sk-breadcrumb">
    <d-breadcrumb>
      <d-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="item.path"
                         class="bread-style">
        <router-link :to=item.path>
          {{ item.name }}
        </router-link>
      </d-breadcrumb-item>
    </d-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { RouteLocationMatched, useRoute } from "vue-router";

const route = useRoute();
const breadList = ref<RouteLocationMatched[]>([]);

watch(
  () => route.matched,
  (matchedRoutes: RouteLocationMatched[]) => {

    breadList.value = matchedRoutes;
    console.log(breadList.value);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.sk-breadcrumb {
  margin-bottom: 8px;
  user-select: none;

  .bread-style {
    span {
      font-size: 14px;
    }
  }
}
</style>
