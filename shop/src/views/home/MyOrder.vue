<template>
    <div class="myOrder">
        <div class="white" v-if="orders.length === 0" style="text-align: center">
            <h3>暂无数据</h3>
        </div>
        <el-card class="box-card" v-for="one in orders" style="text-align: left">
            <div slot="header" class="clearfix">
                <el-row :gutter="20">
                    <el-col :span="6"><span>￥{{one.price + one.freight}}</span></el-col>
                    <el-col :span="4"><span>物流：</span><span v-if="one.status === 3">{{one.deliverNo}}</span></el-col>
                    <el-col :span="6">
                        <span>状态：</span>
                        <span v-if="one.status === -1">已删除</span>
                        <span v-if="one.status === 0">未支付</span>
                        <span v-if="one.status === 1">已支付</span>
                        <span v-if="one.status === 2">商家确认</span>
                        <span v-if="one.status === 3">商家发货</span>
                        <span v-if="one.status === 4">已完成</span>
                    </el-col>
                    <el-col :span="8">
                        <el-button v-if="one.status === -1" style="float: right;" type="danger" @click="deleteOrder(one.id)">删除订单</el-button>
                        <el-button v-if="one.status === 0 || one.status === 1" @click="cancelOrder(one.id)" type="danger">取消订单</el-button>
                        <el-button v-if="one.status === 3" @click="completeOrder(one.id)" type="danger">确认收货</el-button>
                        <el-button style="float: right;" type="primary" @click="getJump(one.id)">查看详情</el-button>
                    </el-col>
                </el-row>
            </div>
            <div v-for="detail in one.details" :key="detail.id" class="text item" style="float: left">
                {{detail.bname}}   X   {{detail.amount}}
            </div>
        </el-card>
    </div>
</template>

<script>
    import {orderList, cancelOrder, deleteOrder, completeOrder} from '@/api'

    export default {
        name: "MyOrder",

        data() {
            return {
                orders: [],
            };
        },

        methods: {
            getOrders() {
                orderList().then(res => {
                    this.orders = res.data;
                });
            },

            getJump(id) {
                this.$router.push({
                    path: `/od/${id}/`,
                });
            },

            deleteOrder(id){
                deleteOrder(id).then(res => {
                    if (res.code === 200) {
                        this.$message("删除成功！");
                        this.getOrders();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },

            cancelOrder(id){
                cancelOrder(id).then(res => {
                    if (res.code === 200) {
                        this.$message("取消成功！");
                        this.getOrders();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },

            completeOrder(id) {
                completeOrder(id).then(res => {
                    if (res.code === 200) {
                        this.$message("确认成功！");
                        this.getOrders();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },
        },

        mounted() {
            this.getOrders();
        }
    }
</script>

<style scoped>

</style>