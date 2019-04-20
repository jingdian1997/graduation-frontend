<template>
    <div class="personalInfo">
        <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">个人信息</h3>
            <el-form-item prop="name">
                <el-input type="text" v-model="user.name" auto-complete="off" placeholder="姓名" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item prop="sex">
                <el-radio v-model="user.sex" label="男">男</el-radio>
                <el-radio v-model="user.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item prop="idCard">
                <el-input type="text" v-model="user.idCard" auto-complete="off" placeholder="身份证号" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item prop="birthday">
                <el-date-picker v-model="user.birthday" auto-complete="off" type="date" placeholder="生日"></el-date-picker>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="changeInfo" :loading="logining">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {userGet, userChangeInfo} from '@/api';

    export default {
        name: "PersonInfo",

        data() {
            return {
                logining: false,
                user: {},
            };
        },

        methods: {
            getUser() {
                userGet().then(res => {
                    this.user = res.data;
                });
            },

            changeInfo() {
                this.logining = true;
                userChangeInfo(this.user).then(res => {
                    if (res.code === 200) {
                        this.$message('保存成功');
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                    this.logining = false;
                });
            }
        },

        mounted: function () {
            this.getUser();
        },
    }
</script>

<style scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background-size: cover;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>