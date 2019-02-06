<template>
    <div class="personalNav">
        <div v-if="user.id === null">
            <el-menu class="el-menu-demo" mode="horizontal" @select="" background-color="#f5f5f5" text-color="black">
                <el-menu-item index="1">您好，请登录</el-menu-item>
                <el-menu-item index="2">免费注册</el-menu-item>
            </el-menu>
        </div>
        <div v-else>
            <el-menu v-model="user" class="el-menu-demo" mode="horizontal" @select="" background-color="#f5f5f5" text-color="black">
                <el-menu-item index="1">{{user.nickname}}，您好！</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">个人中心</template>
                    <el-menu-item index="2-1">我的购物车</el-menu-item>
                    <el-menu-item index="2-2">我的订单</el-menu-item>
                    <el-menu-item index="2-3">账户管理</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">退出登录</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    import {userGet} from '@/api';

    export default {
        name: "PersonalNav",

        data() {
            return {
                user: this.$store.state.user,
            };
        },

        methods: {
            // getUser() {
            //     if (this.getToken === '') {
            //         this.user = null;
            //     } else {
            //         userGet().then(res => {
            //             this.user = res.data;
            //         });
            //     }
            // }
        },

        // computed: {
        //     getToken: function() {
        //         return this.$store.state.token;
        //     },
        // },

        mounted: function () {
        },
    }
</script>

<style scoped>
    .button {
        background-color: #e4393c;
        color: white;
    }

    span {
        background-color: white;
    }
</style>