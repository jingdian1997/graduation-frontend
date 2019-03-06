<template>
    <div class="refund">
        <el-container>
            <el-header>
                <div style="text-align: left; font-size: 20px;">当前位置：售后管理</div>
            </el-header>
            <el-main>
                <el-table :data="list" stripe style="width: 100%" tooltip-effect="dark">
                    <el-table-column prop="nickname" label="申请用户"></el-table-column>
                    <el-table-column prop="bname" label="图书"></el-table-column>
                    <el-table-column prop="amount" label="数量"></el-table-column>
                    <el-table-column prop="price" label="总价"></el-table-column>
                    <el-table-column prop="reason" label="申请原因" width="200px"></el-table-column>
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type === 1">退货</span>
                            <span v-else>换货</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="申请时间" width="100px"></el-table-column>
                    <el-table-column prop="flag" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.flag === 0">未处理</span>
                            <span v-else-if="scope.row.flag === 1">已同意，处理中</span>
                            <span v-else-if="scope.row.flag === 2">处理完毕</span>
                            <span v-else>已拒绝</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="refuseReason" label="拒绝原因" width="200px"></el-table-column>
                    <el-table-column prop="replyTime" label="处理时间" width="100px"></el-table-column>
                    <el-table-column prop="pay" label="退款金额"></el-table-column>
                    <el-table-column prop="dealTime" label="完成时间" width="100px"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.flag === 0" @click="handleApprove(scope.row.id)">同意</el-button>
                            <el-button v-if="scope.row.flag === 0" @click="openDialog(scope.row)">拒绝</el-button>
                            <el-button v-if="scope.row.flag === 1" @click="openDialog2(scope.row)">退款</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>

            <el-dialog title="拒绝申请" :visible.sync="dialogVisible" width="50%">
                <el-input v-model="refuseReason" placeholder="请输入拒绝原因"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleRefuse">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="完成申请" :visible.sync="dialogVisible2" width="50%">
                <el-input v-model="refuseReason" placeholder="请输入退款金额"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleDeal">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import {refundList, refundApprove, refundRefuse, refundDeal} from '@/api'

    export default {
        name: "OrderRefund",

        data() {
            return {
                list: [],
                dialogVisible: false,
                refuseReason: '',
                refuseId: 0,
                dialogVisible2: false,
                refuseId2: 0,
                pay: 0,
            };
        },

        methods: {
            getRefund() {
                refundList().then(res => {
                    this.list = res.data;
                });
            },

            openDialog(row) {
                this.dialogVisible = true;
                this.refuseId = row.id;
            },

            openDialog2(row) {
                this.dialogVisible2 = true;
                this.refuseId2 = row.id;
            },

            handleApprove(id) {
                refundApprove(id).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.getRefund();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                });
            },

            handleRefuse() {
                refundRefuse(this.refuseId, this.refuseReason).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.dialogVisible = false;
                        this.getRefund();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                });
            },

            handleDeal() {
                refundDeal(this.refuseId2, this.pay).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.dialogVisible2 = false;
                        this.getRefund();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                });
            },
        },

        mounted: function () {
            this.getRefund();
        },
    }
</script>

<style scoped>

</style>