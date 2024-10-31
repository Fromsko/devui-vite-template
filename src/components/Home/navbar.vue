<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <RouterLink class="btn btn-ghost text-xl" to="/">
                <span class="tooltip tooltip-bottom" data-tip="返回主页">{{ appTitle }}</span>
            </RouterLink>
        </div>

        <div class="flex-none gap-2">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://ts2.cn.mm.bing.net/th?id=OIP-C._MolZc9ybWaQGJMZP3FrzgAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>

                        <RouterLink class="justify-between" to="/dashboard/system">
                            Dashbord
                            <span class="badge">New</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink class="justify-between" to="/api">
                            文档
                        </RouterLink>
                    </li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const appTitle = ref<String>('Fromsko')
</script>