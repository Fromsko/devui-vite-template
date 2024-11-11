<template>
  <div class="flex size-full justify-center">
    <div class="flex h-fit w-64 flex-col items-center">
      <img alt="Login"
           class="mb-2 h-16 w-16 cursor-pointer rounded-full hover:shadow-lg hover:shadow-green-400/70"
           src="https://q1.qlogo.cn/g?b=qq&nk=1614355756&s=100" />
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="font-bold" for="username">账号</label>
          <input id="username" v-model="form.username"
                 class="mt-2 w-full rounded-md border border-gray-300 p-2 pl-4 outline-none hover:border-green-400"
                 placeholder="请输入账号"
                 type="text" />
        </div>
        <div class="mb-4">
          <label class="font-bold" for="password">密码</label>
          <input id="password" v-model="form.password"
                 class="mt-2 w-full rounded-md border border-gray-300 p-2 pl-4 outline-none hover:border-green-400"
                 placeholder="请输入密码"
                 type="password" />
        </div>
        <div class="mt-4">
          <button class="btn btn-info w-full rounded-xl p-1 mb-2 text-white" type="submit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { LoginParams, ResponseData, RespTokenType } from "@/utils/models/auth";
import { eventType, useHook } from "@/api/auth";
import { Message } from "vue-devui";
import { useConfigStore } from "@/utils/stores/useConfigStore";
import { useRouter } from "vue-router";

const router = useRouter();
const configStore = useConfigStore();
const form = reactive<LoginParams>({ password: "", username: "" });

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  await useHook({
    viewName: eventType.Login,
    formData: form as LoginParams,
    callBack(finished: boolean, resp: ResponseData | string): void {
      if (finished) {
        let res = resp as ResponseData;
        let data = res.data as RespTokenType;
        configStore.setTokenInfo(data.Token);
        configStore.setLoginStatus(true);
        Message.success(res.msg);
        router.push("/");
      } else {
        Message.error(resp as string);
      }
    }
  });
};
</script>