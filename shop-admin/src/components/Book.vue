<template>
    <div class="book">
        <el-container>
            <el-header>
                <div style="text-align: left; font-size: 20px;">当前位置：图书管理</div>
            </el-header>
            <el-main>
                <el-table :data="list" stripe style="width: 100%" tooltip-effect="dark">
                    <el-table-column prop="name" label="图书"></el-table-column>
                    <el-table-column prop="categories" label="分类">
                        <template slot-scope="scope">
                            <span v-for="c in scope.row.categories">{{c.name}} << </span>
                            <span>图书</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="author" label="图书"></el-table-column>
                    <el-table-column prop="publisher" label="出版社"></el-table-column>
                    <el-table-column prop="price" label="定价"></el-table-column>
                    <el-table-column prop="del" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.del === true">已下架</span>
                            <span v-else>在售</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.del === false" @click="handlePullOff(scope.row.id)" type="text">下架</el-button>
                            <el-button @click="getJump(scope.row.id)" type="text">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="jumpToInsert">添加图书</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {bookList, bookPullOff} from '@/api'

    export default {
        name: "Book",

        data() {
            return {
                list: [],
                cid: 0,
                query: '',
            };
        },

        methods: {
            getBook() {
                bookList(this.cid, this.query).then(res => {
                    this.list = res.data.records;
                });
            },

            handlePullOff(id) {
                bookPullOff(id).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.getBook();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                });
            },

            getJump(id) {
                this.$router.push({
                    path: `/bookDetail/${id}/`,
                });
            },

            jumpToInsert() {
                this.$router.push({
                    path: `/bookInsert/`,
                });
            },
        },

        mounted: function () {
            this.getBook();
        },
    }
</script>

<style scoped>

</style>