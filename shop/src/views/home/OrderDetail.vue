<template>
    <div class="orderDetail">
        <h3>订单详情</h3>
        <el-card class="box-card" style="text-align: left">
            <div slot="header" class="clearfix">
                <span>收货地址</span>
            </div>
            <div class="text item">
                <p>地址：{{address.address}}</p>
                <p>收货人：{{address.recipient}}</p>
                <p>电话：{{address.tel}}</p>
            </div>
        </el-card>
        <hr/>
        <el-table :data="detail" style="width: 100%">
            <el-table-column prop="bname" label="图书"></el-table-column>
            <el-table-column prop="amount" label="数量"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="total" label="小计"></el-table-column>
            <el-table-column prop="flag" label="操作">
                <template slot-scope="scope">
                    <el-button @click="" type="primary" size="small" v-if="scope.row.flag === 4">评价</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="发表评论" :visible.sync="dialogVisible" width="50%" >
            <!--TODO: 评论发表-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
            </span>
        </el-dialog>
        <el-button v-if="orders.status === 0" @click="payOrder" type="danger">支付订单</el-button>
        <hr/>

        <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align: left">
            <h4>订单详情</h4>
        </div>
        <div class="text item" style="text-align: left">
            <p>图书总价：{{orders.price}}</p>
            <p>运费：{{orders.freight}}</p>
            <p>订单总价：{{orders.pay}}</p>
            <p>物流单号：{{orders.deliverNo}}</p>
            <p>
                状态：
                <span v-if="orders.status === -1">已删除</span>
                <span v-if="orders.status === 0">未支付</span>
                <span v-if="orders.status === 1">已支付</span>
                <span v-if="orders.status === 2">商家确认</span>
                <span v-if="orders.status === 3">商家发货</span>
                <span v-if="orders.status === 4">已完成</span>
            </p>
            <hr/>
            <p>订单创建时间：{{orders.createTime}}</p>
            <p>用户支付时间：{{orders.payTime}}</p>
            <p>商家确认时间：{{orders.confirmTime}}</p>
            <p>商家发货时间：{{orders.deliverTime}}</p>
            <p>用户收货时间：{{orders.completeTime}}</p>
            <p>用户取消时间：{{orders.cancelTime}}</p>
        </div>
        </el-card>
    </div>
</template>

<script>
    import {orderDetail, payOrder, makeComment} from '@/api'

    export default {
        name: "OrderDetail",

        data() {
            return {
                id: this.$route.params.id,
                address: {},
                orders: {},
                detail: [],
                dialogVisible: false,
            };
        },

        methods: {
            getOrderDetail() {
                orderDetail(this.id).then(res => {
                    this.address = res.data.address;
                    this.orders = res.data.order;
                    this.detail = res.data.detail;
                });
            },

            payOrder(){
                payOrder(this.id).then(res => {
                    if (res.code === 200) {
                        this.$message("支付成功！");
                        this.$router.push('/order');
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },

            makeComment() {
            },
        },

        mounted: function () {
            this.getOrderDetail();
        }
    }
</script>

<style scoped>

</style>