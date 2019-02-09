<template>
    <div class="mainNav" style="height: 722px;">
        <el-col>
            <el-menu class="el-menu-vertical-demo" @select="handleOpen" background-color="#545c64" text-color="#fff"
                     active-text-color="#ffd04b" style="height: 722px;">
                <el-menu-item index="0">
                    <span slot="title">{{this.$store.state.user.nickname}},个人中心</span>
                </el-menu-item>
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
                        <!--<el-menu-item index="71">已完成订单</el-menu-item>-->
                        <!--<el-menu-item index="72">待收货订单</el-menu-item>-->
                        <!--<el-menu-item index="73">未支付订单</el-menu-item>-->
                <el-menu-item index="8">
                    <i class="el-icon-circle-close"></i>
                    <span slot="title">退出登录</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
    import {userLogout} from '@/api';

    export default {
        name: "MainNav",

        data() {
            return {
            };
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(keyPath);
                switch (keyPath) {
                    case "8":
                        // this.logout();
                        break;
                }
            },

            logout () {
                userLogout().then(res => {
                    this.$store.commit('cleanToken');
                    this.reload();
                });
            },
        },

        mounted: function () {
            if (this.$store.state.token === '') {
                // this.$router.push("/login");
            }
        }
    }
</script>

<style scoped>

</style>