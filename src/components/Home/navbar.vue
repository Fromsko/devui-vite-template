<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <RouterLink class="btn btn-ghost text-xl" to="/">
                <span class="tooltip tooltip-bottom" data-tip="返回主页">{{ store.title }}</span>
            </RouterLink>
        </div>
        <div class="flex-none gap-2">
            <div class="form-control" v-show="store.isOpen">
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
                    class="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow items-center">
                    <li v-for="(value, key, index) of store.items" :key="index">
                        <RouterLink :to="value" v-if="value !== 'logout'"> {{ key }} </RouterLink>
                        <button v-else @click="toggleLogout">{{ value }}</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { useConfigStore } from '@/utils/stores/useConfigStore'

    const { navConfig: store, toggleLogout } = useConfigStore()
</script>