<template>
  <FormView>
    <template #login>
      <LoginView />
    </template>
    <template #register>
      <RegisterView />
    </template>
  </FormView>
</template>

<script lang="ts" setup>
import FormView from "@/components/Form/index.vue";
import LoginView from "@/components/Form/login/index.vue";
import RegisterView from "@/components/Form/register/index.vue";
</script>
