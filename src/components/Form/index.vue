<template>
    <div class="size-full flex justify-center items-center">
        <div role="tablist" class="tabs tabs-boxed w-fit mx-auto justify-center items-center">
            <input type="radio" name="activeTab" role="tab" class="tab" aria-label="登录" checked="checked" />
            <div role="tabpanel" class="tab-content">
                <slot name="login"></slot>
            </div>

            <input type="radio" name="activeTab" role="tab" class="tab" aria-label="注册" />
            <div role="tabpanel" class="tab-content">
                <slot name="register"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const activeTab = ref('')
    console.log(activeTab.value);
</script>