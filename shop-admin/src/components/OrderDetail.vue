<template>
    <div class="orderDetail">
        <h3>订单详情</h3>
        <el-card class="box-card" style="text-align: left">
            <div class="text item">
                <p>收货地址：{{address.address}}</p>
                <p>收货人：{{address.recipient}}</p>
                <p>收货人电话：{{address.tel}}</p>
            </div>
        </el-card>
        <hr/>
        <el-table :data="detail" style="width: 100%">
            <el-table-column prop="bname" label="图书"></el-table-column>
            <el-table-column prop="amount" label="数量"></el-table-column>
            <el-table-column prop="price" label="单价"></el-table-column>
            <el-table-column prop="total" label="小计"></el-table-column>
        </el-table>

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
                    <span v-if="orders.status === -1">已取消</span>
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
    import {orderDetail} from '@/api'

    export default {
        name: "OrderDetail",

        data() {
            return {
                id: this.$route.params.id,
                address: {},
                orders: {},
                detail: [],
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
        },

        mounted: function () {
            this.getOrderDetail();
        }
    }
</script>

<style scoped>

</style>