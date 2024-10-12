<template>
  <d-carousel height="200px" autoplay :autoplay-speed="3000">
    <d-carousel-item
      class="d-carousel-item"
      v-for="item in items"
      :key="item"
      >{{ item }}</d-carousel-item
    >
  </d-carousel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const items = ref<string[]>(['page 1', 'page 2', 'page 3', 'page 4'])
    return {
      items,
    }
  },
})
</script>

<style>
.d-carousel-item {
  text-align: center;
  line-height: 200px;
  background: var(--devui-global-bg, #f3f6f8);
}
</style>
