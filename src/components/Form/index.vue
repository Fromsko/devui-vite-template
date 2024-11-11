<template>
  <div class="size-full flex justify-center items-center">
    <div class="tabs tabs-boxed w-fit mx-auto justify-center items-center" role="tablist">
      <input aria-label="登录" checked="checked" class="tab" name="activeTab" role="tab"
             type="radio" />
      <div class="tab-content" role="tabpanel">
        <slot name="login"></slot>
      </div>

      <input aria-label="注册" class="tab" name="activeTab" role="tab" type="radio" />
      <div class="tab-content" role="tabpanel">
        <slot name="register"></slot>
      </div>
    </div>
  </div>
</template>