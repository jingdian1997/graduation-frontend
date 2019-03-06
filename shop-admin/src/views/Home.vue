<template>
  <div class="home">
    <el-header style="padding: 0">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" @select="handleSelect2" :default-active="1">
        <el-menu-item index="1" style="width: 300px">
          <span slot="title">{{this.$store.state.admin.name}},欢迎</span>
        </el-menu-item>
        <el-menu-item index="2" style="float: right">
          <i class="el-icon-circle-close"></i>
          <span slot="title">退出登录</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container style="height: 660px;">
      <el-aside>
        <el-col>
          <el-menu class="el-menu-vertical-demo" @select="handleSelect" background-color="#545c64" text-color="#fff"
                   active-text-color="#fff" style="height: 660px;">
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <span>类目管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-goods"></i>
              <span>图书管理</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span>订单管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-phone"></i>
              <span slot="title">售后管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">评论管理</span>
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
    import {logout} from '@/api';

    export default {
        name: 'Home',

        data() {
            return {
            };
        },

        methods: {
            handleSelect(key, keyPath) {
                switch (key) {
                    case "1":
                        this.$router.push("/category/0");
                        break;
                    case "2":
                        this.$router.push("/book");
                        break;
                    case "3":
                        this.$router.push("/order");
                        break;
                    case "4":
                        this.$router.push("/refund");
                        break;
                    case "5":
                        this.$router.push("/comment");
                        break;
                }
            },

            handleSelect2(key, keyPath) {
                switch (key) {
                    case "2" :
                        this.logout();
                        this.$router.push('/');
                        break;
                }
            },

            logout () {
                logout().then(res => {
                    this.$store.commit('cleanToken');
                    this.$router.push('/');
                });
            },
        },

        mounted: function () {
            if (this.$store.state.token === '') {
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>

</style>