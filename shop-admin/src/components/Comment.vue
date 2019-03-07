<template>
    <div class="comment">
        <el-container>
            <el-header>
                <div style="text-align: left; font-size: 20px;">当前位置：评论管理</div>
            </el-header>
            <el-main>
                <el-table :data="list" stripe style="width: 100%" tooltip-effect="dark">
                    <el-table-column prop="name" label="图书"></el-table-column>
                    <el-table-column prop="nickname" label="评论用户"></el-table-column>
                    <el-table-column prop="score" label="评分"></el-table-column>
                    <el-table-column prop="content" label="评论内容" width="250px"></el-table-column>
                    <el-table-column prop="time" label="评论时间" width="100px"></el-table-column>
                    <el-table-column prop="reply" label="回复" width="250px"></el-table-column>
                    <el-table-column prop="replyTime" label="处理时间" width="100px"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button @click="openDialog(scope.row)">回复</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>

            <el-dialog title="拒绝申请" :visible.sync="dialogVisible" width="50%">
                <el-input v-model="reply" placeholder="请输入回复内容"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleReply">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import {commentList, commentReply} from '@/api'

    export default {
        name: "Comment",

        data() {
            return {
                list: [],
                dialogVisible: false,
                reply: '',
                commentId: -1,
            };
        },

        methods: {
            getComment() {
                commentList().then(res => {
                    this.list = res.data.records;
                });
            },

            openDialog(row) {
                this.dialogVisible = true;
                this.reply = '';
                this.commentId = row.id;
            },

            handleReply() {
                commentReply(this.commentId, this.reply).then(res => {
                    if (res.code === 200) {
                        this.$message("回复成功！");
                        this.getComment();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                })
            },
        },

        mounted: function () {
            this.getComment();
        }
    }
</script>

<style scoped>

</style>