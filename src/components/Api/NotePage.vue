<template>
  <div id="container-layout">
    <div id="button-group" class="m-1 join d-flex justify-between">
      <button class="btn btn-circle bg-sky-200 ml-2" @click="handleBack"> Back</button>

      <div class="font-bold text-2xl my-auto p-2">{{ Item.title }}</div>

      <d-switch v-model="changeTheme" active-value="dark" inactive-value="light" size="lg">
        <template #checkedContent>亮</template>
        <template #uncheckedContent>暗</template>
      </d-switch>
    </div>

    <div id="code-layout" class="mx-48 mt-2 overflow-hidden">
      <d-code-editor v-model="Item.content" :options="{ language: 'lua' }" :theme="changeTheme"
                     class="size-full"
                     mode="review" />
    </div>

    <div id="log-layout" class="m-2 rounded-lg"></div>

    <div class="dropdown dropdown-top dropdown-end fixed bottom-20 right-20">
      <div class="btn btn-circle m-1" role="button" tabindex="0">Click</div>
      <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-24 shadow" tabindex="0">
        <li><a>Item 1</a></li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { apiInfo } from "@/components/Api/help.json";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";


const route = useRoute();
const router = useRouter();
const changeTheme = ref<boolean>(false);
const Item = ref<NoteCard>({ id: "", title: "", content: "" });
const handleBack = () => router.back();


watch(() => route.params.id, (newId) => {
  const foundItem = apiInfo.find(element => element.id === newId);
  if (foundItem) {
    Item.value = foundItem;
  } else {
    Item.value = { id: "", title: "Not found", content: "" };
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
#container-layout {
  display: grid;
  grid-template-rows: 52px 500px auto;
  height: 100%;

  #button-group {
    grid-row: 1;
  }

  #code-layout {
    grid-row: 2;
  }

  #log-layout {
    grid-row: 3;
    overflow: auto;
  }
}
</style>
