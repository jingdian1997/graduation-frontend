<template>
    <div class="orderRefund">
        <h2>我的售后</h2>
        <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="bname" label="图书"></el-table-column>
            <el-table-column prop="amount" label="价格"></el-table-column>
            <el-table-column prop="reason" label="我的申请理由"></el-table-column>
            <el-table-column prop="refuseReason" label="商家拒绝理由"></el-table-column>
            <el-table-column prop="pay" label="退款"></el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">退货</span>
                    <span v-else-if="scope.row.type === 2">换货</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="我的申请时间"></el-table-column>
            <el-table-column prop="replyTime" label="商家回复时间"></el-table-column>
            <el-table-column prop="dealTime" label="处理完毕时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getRefund} from '@/api'

    export default {
        name: "OrderRefund",

        data() {
            return {
                tableData: [],
            };
        },

        methods: {
            getRefund() {
                getRefund().then(res => {
                    this.tableData = res.data;
                });
            },
        },

        mounted: function () {
            this.getRefund();
        }
    }
</script>

<style scoped>

</style>