<template>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/show">Go to About</RouterLink>
  </nav>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'show',
})
</script>
