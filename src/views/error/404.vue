<template>
  <div class="page-style">
    <h1>页面丢失了</h1>
    <d-button variant="solid" :loading="showLoading" @click="handleClick">
      Click Me
    </d-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showLoading = ref(false)
const handleClick = () => {
  showLoading.value = true

  setTimeout(() => {
    showLoading.value = false
  }, 2000)
}
</script>

<style scoped lang="scss">
.page-style {
  display: flex;
  height: 100%;
  user-select: none;
  text-align: center;
  justify-content: center;
  background-color: skyblue;
}
</style>
