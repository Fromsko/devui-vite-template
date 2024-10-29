<template>
    <div id="container">
        <NavBar />
    </div>
</template>

<script lang="ts" setup>
    import NavBar from '@/components/Home/navbar.vue'
</script>

<style lang="scss" scoped>
    #container {
        background-image: url('../../assets/images/background.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
    }
</style>