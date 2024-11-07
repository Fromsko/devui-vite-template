<template>
<form class="login-form box-border w-[95%] max-w-sm p-3 m-auto flex flex-col justify-center items-center">
    <div class="h-12 mt-2 flex justify-center">
        <h1 class="text-2xl text-black">注册</h1>
    </div>

    <div class="space-y-1">
        <label class="input outline-none flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z">
                </path>
            </svg>
            <input type="text" class="grow" placeholder="用户名" name="username" required />
        </label>
        <label class="input outline-none flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
                <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd"></path>
            </svg>
            <input type="password" class="grow" placeholder="密码" name="password" required />
        </label>

        <div class="space-y-1 flex justify-between items-center">
            <label class="input flex items-center gap-2 w-28 mr-1">
                <input class="w-full grow" type="text" placeholder="验证码" name="captcha" required />
            </label>
            <img src="data:image/png;base64,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" alt="验证码" class="flex-grow h-10 object-cover" onclick="console.log('xx');" />
        </div>

        <div class="w-full flex justify-center">
            <button type="submit" class="btn btn-success w-2/3">注册</button>
        </div>
    </div>
</form>
</template>

<script setup lang="ts">

</script>
