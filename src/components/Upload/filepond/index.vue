<template>
  <file-pond ref="pond" accepted-file-types="image/jpeg, image/png" label-idle="🍍上传"
             v-bind:allow-multiple="false"
             v-bind:files="myFiles" v-bind:server="myServer"
             v-on:init="handleFilePondInit" />
</template>

<script lang="ts" setup>
// Import Vue FilePond
import { reactive, ref } from "vue";

// import * as FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor'
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import vueFilePond from "vue-filepond";

let pond = ref("");
let myFiles = ref<Array<string>>([]);

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

const handleFilePondInit = () => {
  console.log("FilePond has initialized");

  // FilePond instance methods are available on `this.$refs.pond`
};

let myServer = reactive({
  process: (fieldName: any, file: any, metadata: any, load: any) => {
    // simulates uploading a file
    setTimeout(() => {
      load(Date.now());
    }, 1500);
  },
  load: (source: any, load: any) => {
    // simulates loading a file from the server
    fetch(source)
      .then((res) => res.blob())
      .then(load);
  }
});
</script>