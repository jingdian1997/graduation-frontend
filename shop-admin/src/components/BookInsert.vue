<template>
    <div class="bookInsert">
        <el-container>
            <el-header>
                <div style="text-align: left; font-size: 20px;">当前位置：新书添加</div>
            </el-header>
            <el-main>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="图书名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="ISBN">
                        <el-input v-model="form.ISBN"></el-input>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="form.publisher"></el-input>
                    </el-form-item>
                    <el-form-item label="出版日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.publishDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="定价">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="选择分类">
                        <el-select v-model="cid" placeholder="请选择" @change="onChange">
                            <el-option v-for="item in cList1" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="cid2" placeholder="请选择">
                            <el-option v-for="item in cList2" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图书描述">
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 10}"
                                  placeholder="请输入内容" v-model="form.description">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload ref='upload' :auto-upload='false' :file-list="fileList" :multiple='false' :limit="1"
                                   :http-request="uploadFiles" accept="image/jpeg,image/gif,image/png" action=''>
                            <el-button slot="trigger" type="primary">选取图片</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {bookInsert, categoryList} from '@/api'

    export default {
        name: "BookInsert",

        data() {
            return {
                form: {
                    name: '',
                    ISBN: '',
                    author: '',
                    publisher: '',
                    publishDate: '',
                    price: '',
                    description: '',
                },
                cid: 0,
                cid2: 0,
                cList1: [],
                cList2: [],
            };
        },

        methods: {
            getCategoryList() {
                categoryList(0).then(res => {
                    this.cList1 = res.data;
                });
            },

            onChange(id) {
                console.log(id);
                categoryList(id).then(res => {
                    this.cList2 = res.data;
                });
            },

            onSubmit() {
                if (this.cid2 === 0) {
                    this.$message({
                        message: "请选择分类",
                        type: 'error',
                    });
                } else {
                    // 先获取图片
                    let that = this;
                    let file = this.$refs.upload.$refs['upload-inner'].$refs.input; //获取文件数据
                    let fileList = file.files;

                    let picture;
                    let reader = new FileReader();     //html5读文件
                    reader.readAsDataURL(fileList[0]); //转BASE64
                    reader.onload = function (e) {
                        picture = e.target.result;

                        bookInsert(that.form.ISBN, that.form.name, that.form.author, that.form.publisher,
                            that.form.publishDate, that.form.price, picture, that.form.description, that.cid2).then(res => {
                            if (res.code === 200) {
                                that.$message("操作成功！");
                                that.$router.push('/book');
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: res.message,
                                });
                            }
                        });
                    }
                }
            },
        },

        mounted: function () {
            this.getCategoryList();
        },
    }
</script>

<style scoped>

</style>