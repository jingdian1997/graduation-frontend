<template>
    <div class="login">
        <el-container>
            <el-header>
                <h1 style="text-align: left; color: #66ccff; margin-top: 20px; margin-left: 50px">登录</h1>
            </el-header>
            <el-main>
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
                    <h3 class="title">登录</h3>
                    <el-form-item prop="account">
                        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd">
                        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item style="width:100%;">
                        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                    </el-form-item>
                </el-form>
                <img id="background" src="../assets/1.jpg" alt="">
            </el-main>
            <el-footer>
                Copyright (C) 经典图书网 2015-2019, All Rights Reserved
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {userLogin} from '@/api'

    export default {
        name: "Login",

        data () {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    pwd: ''
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
            };
        },

        methods: {
            handleSubmit2(ev) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        let loginParams = {
                            account: this.ruleForm2.account,
                            pwd: this.ruleForm2.pwd
                        };

                        userLogin(loginParams).then(res => {
                            this.logining = false;
                            let { message, code, data } = res;
                            if (code !== 200) {
                                this.$message({
                                    message: message,
                                    type: 'error',
                                });
                            } else {
                                this.$store.commit('setToken', data.key);
                                this.$store.commit('setUser', data.user);
                                this.$router.push({ path: '/' });
                            }
                        }).catch(err => {
                            this.logining = false;
                        });
                    } else {
                        this.logining = false;
                        return false;
                    }
                });
            },
        },
    }
</script>

<style scoped>
    #background {
        position:absolute;
        left:0;
        top:60px;
        width:100%;
        height:580px;
        z-index:-1;
    }

    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 120px 0 120px 900px;
        width: 300px;
        padding: 35px 35px 15px 35px;
        background: #ccc;
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