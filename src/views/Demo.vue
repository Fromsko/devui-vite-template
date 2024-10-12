<template>

</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup() {
    const uploadedFiles = ref([
      {
        name: 'food.jpeg',
        url: 'https://devui.design/home',
      },
      {
        name: 'food2.jpeg',
        url: 'https://devui.design/home',
      },
    ])

    const uploadOptions = ref({
      uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
    })

    const beforeUpload = (file) => {
      console.log(file)
      return true
    }

    const onSuccess = (result) => {
      console.log('success', result)
    }

    const onError = () => {
      console.log(error)
    }

    const onProgress = (selectFile, uploadedFiles) => {
      console.log('selectFile: ', selectFile)
      console.log('uploadedFiles: ', uploadedFiles)
    }

    const fileOver = (fileInfo) => {
      console.log('fileInfo:', fileInfo)
    }

    const fileDrop = (fileInfo) => {
      console.log('fileInfo:', fileInfo)
    }

    const fileSelect = (fileInfo) => {
      console.log('fileInfo:', fileInfo)
    }

    const deleteUploadedFile = (fileInfo) => {
      console.log('fileInfo:', fileInfo)
    }

    watch(uploadedFiles, (newValue, oldValue) => {
      console.log('uploadedFiles', {
        newValue,
        oldValue,
      })
    })

    return {
      uploadedFiles,
      uploadOptions,
      beforeUpload,
      onSuccess,
      onError,
      onProgress,
      fileOver,
      fileDrop,
      fileSelect,
      deleteUploadedFile,
    }
  },
}
</script>

<style>
.upload-demo .upload-trigger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.upload-demo .upload-trigger .link {
  color: #5e7ce0;
}
</style>
