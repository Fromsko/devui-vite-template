<template>
    <div id="warpper">
        <NavBar />
        <div id="container" :style="containerStyle">
            <RouterView />
        </div>
        <FootBar v-show="isFooterShow" />
    </div>
</template>

<script lang="ts" setup>
    import FootBar from '@/components/Home/FootBar.vue'
    import NavBar from '@/components/Home/navbar.vue'
    import { computed, ref, watch } from 'vue'
    import { useRoute } from 'vue-router'

    const isFooterShow = ref<boolean>(true)
    const route = useRoute()

    // 监听 route.name 的变化
    watch(() => route.name, (newName) => {
        if (newName !== 'IndexHomeView') {
            isFooterShow.value = false
        } else {
            isFooterShow.value = true
        }
    })

    // 计算容器的样式
    const containerStyle = computed(() => {
        const footerHeight = isFooterShow.value ? '68px' : '0px';
        return {
            height: `calc(100vh - 66px - ${footerHeight})`
        };
    });
</script>


<style lang="scss" scoped>
    #warpper {
        height: 100vh;
    }

    #container {
        transition: height 0.3s ease;
        background-image: url('../../assets/images/background.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
