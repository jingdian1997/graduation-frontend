<template>
    <div class="main">
        <el-container>
            <el-aside>
                <MainNav></MainNav>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import MainNav from '@/components/MainNav.vue'

    export default {
        name: "Main",
        components: {MainNav},
        comments: {
            MainNav,
        }
    }
</script>

<style scoped>

</style>