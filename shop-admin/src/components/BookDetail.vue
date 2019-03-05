<template>
    <div class="bookDetail" style="text-align: left">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">图书名称：{{book.name}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">作者：{{book.author}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">出版社：{{book.publisher}}</div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">ISBN：{{book.isbn}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">出版日期：{{book.publishDate}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">定价：{{book.price}}</div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    分类：<span v-for="c in book.categories">{{c.name}} << </span>
                    <span>图书</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    状态：
                    <span v-if="book.del === true">已下架</span>
                    <span v-else>在售</span></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">库存：{{book.stock}}</div>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">描述：{{book.description}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">创建时间：{{book.createTime}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
        <br/><br/>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <img :src="book.picture" width="100px" height="100px"/>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="margin-top: 40px;">
                    <el-upload ref='upload' :auto-upload='false' :file-list="fileList" :multiple='false' :limit="1"
                               :http-request="uploadFiles" accept="image/jpeg,image/gif,image/png" action=''>
                        <el-button slot="trigger" type="primary">选取图片</el-button>
                        <span>&nbsp;</span>
                        <el-button type="primary" @click="handleUpdatePicture">更换图片</el-button>
                    </el-upload>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {bookOne, bookUpdatePicture} from '@/api'

    export default {
        name: "BookDetail",

        inject: ['reload'],

        data() {
            return {
                id: this.$route.params.id,
                book: {},
                dialogVisible: false,
            };
        },

        methods: {
            getBook() {
                bookOne(this.id).then(res => {
                    this.book = res.data;
                });
            },

            openDialog() {
                this.dialogVisible = true;
            },

            handleUpdatePicture() {
                let that = this;

                let file = this.$refs.upload.$refs['upload-inner'].$refs.input; //获取文件数据
                let fileList = file.files;

                let picture;
                let reader = new FileReader();     //html5读文件
                reader.readAsDataURL(fileList[0]); //转BASE64
                reader.onload = function (e) {
                    picture = e.target.result;

                    bookUpdatePicture(that.id, picture).then(res => {
                        if (res.code === 200) {
                            that.$message("操作成功！");
                            that.reload();
                        } else {
                            that.$message({
                                type: 'error',
                                message: res.message,
                            });
                        }
                    });
                };
            }
        },

        mounted: function () {
            this.getBook();
        }
    }
</script>

<style scoped>

</style>