<template>
  <div class="container">
    <div class="demo-spacing">
      <d-button variant="solid" @click="showRouter"> 基础 </d-button>

      <d-button icon="add" variant="solid"> 添加</d-button>

      <d-button-group>
        <d-button variant="solid"> 组合按钮 </d-button>
        <d-button icon="icon-select-arrow" variant="solid" />
      </d-button-group>

      <d-button variant="solid" :loading="showLoading" @click="handleClick">
        加载按钮
      </d-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showLoading = ref(false)
const handleClick = () => {
  showLoading.value = true

  setTimeout(() => {
    showLoading.value = false
  }, 2000)
}

const showRouter = () => {
  router.push('/show')
}

defineComponent({
  name: 'Home',
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: center;

  .demo-spacing {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid skyblue;
    /* 浅绿色边框 */
    border-radius: 8px;
    padding: 20px;
    gap: 16px;
    /* 按钮之间的间隔 */

    d-button {
      margin: 0;
    }
  }
}
</style>
