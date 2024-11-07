<template>
    <div class="flex size-full justify-center">
        <div class="flex h-fit w-64 flex-col items-center">
            <img src="https://q1.qlogo.cn/g?b=qq&nk=1614355756&s=100" alt="Login"
                class="mb-2 h-16 w-16 cursor-pointer rounded-full hover:shadow-lg hover:shadow-green-400/70" />
            <form action="${pageContext.request.contextPath}/auth/login" method="post">
                <div class="mb-4">
                    <label for="username" class="font-bold">账号</label>
                    <input type="text" name="username" id="username" placeholder="请输入账号"
                        class="mt-2 w-full rounded-md border border-gray-300 p-2 pl-4 outline-none hover:border-green-400" />
                </div>
                <div class="mb-4">
                    <label for="password" class="font-bold">密码</label>
                    <input type="password" name="password" id="password" placeholder="请输入密码"
                        class="mt-2 w-full rounded-md border border-gray-300 p-2 pl-4 outline-none hover:border-green-400" />
                </div>
                <div class="mt-4">
                    <button type="submit" class="btn btn-info w-full rounded-xl p-1 text-white">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>