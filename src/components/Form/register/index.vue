<template>
  <form
    class="login-form box-border w-[95%] max-w-sm p-3 m-auto flex flex-col justify-center items-center"
    @submit.prevent="handleSubmit">
    <div class="h-12 mt-2 flex justify-center">
      <h1 class="text-2xl text-black">注册</h1>
    </div>

    <div class="space-y-1">
      <label class="input outline-none flex items-center gap-2">
        <svg class="h-4 w-4 opacity-70" fill="currentColor" viewBox="0 0 16 16"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z">
          </path>
        </svg>
        <input v-model="form.username" class="grow" name="username" placeholder="用户名" required
               type="text" />
      </label>
      <label class="input outline-none flex items-center gap-2">
        <svg class="h-4 w-4 opacity-70" fill="currentColor" viewBox="0 0 16 16"
             xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                fill-rule="evenodd"></path>
        </svg>
        <input v-model="form.password" class="grow" name="password" placeholder="密码"
               required type="password" />
      </label>

      <div class="space-y-1 flex justify-between items-center">
        <label class="input flex items-center gap-2 w-28 mr-1">
          <input v-model="form.captcha" class="w-full grow" name="captcha" placeholder="验证码" required type="text" />
        </label>
        <img
          :src="captchaContent"
          alt="验证码"
          class="flex-grow h-10 object-cover"
          @click="updateCaptcha"
        />
      </div>

      <div class="w-full flex justify-center">
        <button class="btn btn-success w-2/3" type="submit">注册</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { RegisterParams, RespCaptchaType, ResponseData, RespTokenType } from "@/utils/models/auth";
import { authClient, eventType, useHook } from "@/api/auth";
import { Message } from "vue-devui";
import { useConfigStore } from "@/utils/stores/useConfigStore";
import { useRouter } from "vue-router";

const captchaContent = ref("");
const router = useRouter();
const configStore = useConfigStore();
const form = reactive<RegisterParams>({ password: "", username: "", captcha: "", captchaID: "" });


onBeforeMount(async () => updateCaptcha);

const updateCaptcha = async () => {
  let res: ResponseData = await authClient.captcha();
  let data = res.data as RespCaptchaType;
  captchaContent.value = data.captcha;
  form.captchaID = data.captchaID;
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  await useHook({
    viewName: eventType.Register,
    formData: form as RegisterParams,
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