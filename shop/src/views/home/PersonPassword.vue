<template>
    <div class="personPassword">
        <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">修改密码</h3>
            <el-form-item prop="prePassword">
                <el-input type="password" v-model="pwdModel.prePassword" auto-complete="off" placeholder="原密码"></el-input>
            </el-form-item>
            <el-form-item prop="newPassword">
                <el-input type="password" v-model="pwdModel.newPassword" auto-complete="off" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input type="password" v-model="pwdModel.newPasswordAgain" auto-complete="off" placeholder="确认新密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="changeInfo" :loading="logining">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {userChangePwd} from '@/api';

    export default {
        name: "PersonPassword",

        data() {
            return {
                logining: false,
                pwdModel: {
                    prePassword: null,
                    newPassword: null,
                    newPasswordAgain: null
                },
            };
        },

        methods: {
            changeInfo() {
                userChangePwd(this.pwdModel).then(res => {
                    this.logining = true;
                    if (res.code === 200) {
                        this.$message('保存成功');
                        this.$router.push("/main");
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
    }
</script>

<style scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 150px auto;
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