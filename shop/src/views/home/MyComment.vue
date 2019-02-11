<template>
    <div class="myComment">
        <h2>我的评论</h2>
        <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="name" label="图书"></el-table-column>
            <el-table-column prop="score" label="评分"></el-table-column>
            <el-table-column prop="content" label="评论内容"></el-table-column>
            <el-table-column prop="time" label="日期"></el-table-column>
            <el-table-column prop="reply" label="商家回复"></el-table-column>
            <el-table-column prop="replyTime" label="回复日期"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.id)" type="text" size="small">删除评论</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {myComment, deleteComment} from '@/api';

    export default {
        name: "MyComment",

        data() {
            return {
                tableData: [],
            };
        },

        methods: {
            getCart() {
                myComment().then(res => {
                    this.tableData = res.data.records;
                });
            },

            handleClick(id) {
                deleteComment(id).then(this.getCart);
            },
        },

        mounted: function () {
            this.getCart();
        }
    }
</script>

<style scoped>

</style>