<template>
    <div class="register">
        <img id="background" src="../assets/0.jpg" alt="">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">登录</h3>
            <el-form-item prop="tel">
                <el-input type="text" v-model="ruleForm2.tel" auto-complete="off" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="mail">
                <el-input type="text" v-model="ruleForm2.mail" auto-complete="off" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
                <el-input type="text" v-model="ruleForm2.nickname" auto-complete="off" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="pwd2">
                <el-input type="password" v-model="ruleForm2.pwd2" auto-complete="off" placeholder="再次输入密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {userRegister} from '@/api'

    export default {
        name: "Register",

        data () {
            return {
                logining: false,
                ruleForm2: {
                    tel: '',
                    mail: '',
                    pwd: '',
                    pwd2: '',
                    nickname: '',
                },
                rules2: {
                    tel : [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    mail : [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    nickname : [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    pwd : [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    pwd2 : [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            handleSubmit2(ev) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        this.logining = true;

                        let params = {
                            tel: this.ruleForm2.tel,
                            mail: this.ruleForm2.mail,
                            nickname: this.ruleForm2.nickname,
                            pwd: this.ruleForm2.pwd,
                            pwdAgain: this.ruleForm2.pwd2,
                        };

                        userRegister(params).then(res => {
                            this.logining = false;
                            let { msg, code, data } = res;
                            if (code !== 200) {
                                this.$message({
                                    message: msg,
                                    type: 'error',
                                });
                            } else {
                                this.$router.push({ path: '/' });
                            }
                        });
                    } else {
                        console.log('error submit!!');
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
        top:0;
        width:100%;
        height:100%;
        z-index:-1;
    }

    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
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