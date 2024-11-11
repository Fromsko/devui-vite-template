<script setup>
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/vue";
import Webcam from "@uppy/webcam";

const uppy = new Uppy().use(Webcam);
</script>

<template>
  <Dashboard :plugins="['Webcam']" :uppy="uppy" />
</template>