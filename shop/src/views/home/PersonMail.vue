<template>
    <div class="personMail">
        <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">修改邮箱</h3>
            <el-form-item prop="mail">
                <el-input type="text" v-model="mail" auto-complete="off" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="change" :loading="logining">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {userGet, userChangeMail} from '@/api';

    export default {
        name: "userChangeMail",

        data() {
            return {
                logining: false,
                mail: null,
            };
        },

        methods: {
            getUser() {
                userGet().then(res => {
                    this.mail = res.data.mail;
                });
            },

            change() {
                userChangeMail(this.mail).then(res => {
                    this.logining = true;
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
        margin: 120px auto;
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