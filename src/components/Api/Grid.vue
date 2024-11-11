<template>
  <div class="size-full">
    <div id="card-layout">
      <Card v-for="item in store.paginatedItems" :id="item.id" :key="item.id" :title="item.title" />
    </div>

    <Page v-if="store.totalPages > 1" />
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Api/Card.vue";
import Page from "@/components/Api/Page.vue";
import { useHelpStore } from "@/utils/stores/useHelpStore";

const store = useHelpStore();
</script>

<style lang="css" scoped>
#card-layout {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 16px;
}
</style>