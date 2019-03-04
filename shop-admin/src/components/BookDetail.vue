<template>
    <div class="bookDetail">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">图书名称：{{book.name}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">作者：{{book.author}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">出版社：{{book.publishrt}}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">ISBN：{{book.ISBN}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">出版日期：{{book.publishDate}}</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">定价：{{book.price}}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple">分类：<span v-for="c in book.categories">{{c.name}} << </span></div>
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
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <img :src="'data:image/jpg;base64,' + book.picture" width="150px" height="150px"/>
                </div>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="openDialog" style="margin-top: 40px;">更换展示图片</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {bookOne, bookUpdatePicture} from '@/api'

    export default {
        name: "BookDetail",

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
            }
        },

        mounted: function () {
            this.getBook();
        }
    }
</script>

<style scoped>

</style>