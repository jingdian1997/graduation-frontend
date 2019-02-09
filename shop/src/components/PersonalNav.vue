<template>
    <div class="personalNav">
        <div v-if="user.id === null">
            <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#66b1ff" text-color="black">
                <el-menu-item index="1">您好，请登录</el-menu-item>
                <el-menu-item index="2">免费注册</el-menu-item>
            </el-menu>
        </div>
        <div v-else>
            <el-menu v-model="user" class="el-menu-demo" mode="horizontal" @select="handleSelect2" background-color="#66b1ff" text-color="black">
                <el-menu-item index="1">{{user.nickname}}，您好！</el-menu-item>
                <el-menu-item index="2">我的购物车</el-menu-item>
                <el-menu-item index="3">我的订单</el-menu-item>
                <el-menu-item index="4">账户管理</el-menu-item>
                <el-menu-item index="5">退出登录</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import {userLogout} from '@/api';

    export default {
        name: "PersonalNav",

        inject: ['reload'],

        data() {
            return {
                user: this.$store.state.user,
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                switch (key) {
                    case "1" :
                        this.$router.push('/login');
                        break;
                    case "2" :
                        this.$router.push('/register');
                        break;
                }
            },

            handleSelect2(key, keyPath) {
                switch (key) {
                    case "1" :
                        this.$router.push('/main/home');
                        break;
                    case "2" :
                        break;
                    case "3":
                        break;
                    case "4" :
                        break;
                    case "5":
                        this.logout();
                        break;
                }
            },

            logout () {
                userLogout().then(res => {
                    this.$store.commit('cleanToken');
                    this.reload();
                });
            }
        },
    }
</script>

<style scoped>
    span {
        background-color: white;
    }
</style>