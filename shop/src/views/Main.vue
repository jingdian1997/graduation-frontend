<template>
    <div class="main">
        <el-header style="padding: 0">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64"
                     text-color="#fff" active-text-color="#ffd04b" @select="handleSelect2">
                <el-menu-item index="1" style="width: 300px">
                    <span slot="title">{{this.$store.state.user.nickname}},个人中心</span>
                </el-menu-item>
                <el-menu-item index="2" style="float: right">
                    <i class="el-icon-circle-close"></i>
                    <span slot="title">退出登录</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside>
                <el-col>
                    <el-menu class="el-menu-vertical-demo" @select="handleSelect" background-color="#545c64" text-color="#fff"
                             active-text-color="#ffd04b" style="height: 100%;">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>账户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="11">个人信息</el-menu-item>
                                <el-menu-item index="12">修改密码</el-menu-item>
                                <el-menu-item index="13">更改手机</el-menu-item>
                                <el-menu-item index="14">更改邮箱</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">我的地址</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-goods"></i>
                            <span slot="title">我的购物车</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-circle-plus"></i>
                            <span slot="title">我的关注</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-d-caret"></i>
                            <span slot="title">我的足迹</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-document"></i>
                            <span slot="title">我的评价</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-setting"></i>
                            <span slot="title">我的订单</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <i class="el-icon-phone"></i>
                            <span slot="title">我的售后</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {userLogout} from '@/api';

    export default {
        name: "Main",

        data() {
            return {
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                let path = keyPath[keyPath.length - 1];
                console.log(path);
                switch (path) {
                    case "11":
                        this.$router.push("/info");
                        break;
                    case "12":
                        this.$router.push("/pwd");
                        break;
                    case "13":
                        this.$router.push("/tel");
                        break;
                    case "14":
                        this.$router.push("/mail");
                        break;
                    case "2":
                        this.$router.push("/address");
                        break;
                    case "3":
                        this.$router.push("/cart");
                        break;
                    case "4":
                        this.$router.push("/focus");
                        break;
                    case "5":
                        this.$router.push("/visit");
                        break;
                    case "6":
                        this.$router.push("/comment");
                        break;
                    case "7":
                        this.$router.push("/order");
                        break;
                    case "8":
                        this.$router.push("/refund");
                        break;
                }
            },

            handleSelect2(key, keyPath) {
                switch (key) {
                    case "2" :
                        this.logout();
                        break;
                }
            },

            logout () {
                userLogout().then(res => {
                    this.$store.commit('cleanToken');
                    this.$router.push('');
                });
            },
        },

        mounted: function () {
            if (this.$store.state.token === '') {
                this.$router.push("/login");
            }
        }
    }
</script>

<style scoped>

</style>