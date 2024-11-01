<template>
  <div class="mx-auto size-2/4 mt-20">
    <div :class="uploadStyle">
      <UploadView v-if="uploadStyle.length == 1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import UploadView from "@/components/Upload/filepond/index.vue"
  import { onBeforeMount, onMounted, ref } from 'vue'

  let uploadStyle = ref<Array<string>>(['skeleton', 'size-2/3'])


  onBeforeMount(() => {
    let timer = setInterval(() => {
      uploadStyle.value = uploadStyle.value.slice(1)

      clearInterval(timer)
    }, 3000);
  })

  onMounted(() => {

  })
</script>

<style scoped></style>
