<template>
    <div class="order">
        <el-container>
            <el-header>
                <div>
                    <div style="text-align: left; font-size: 20px;">当前位置：订单管理</div>
                    <el-select v-model="status" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="getOrders">查询</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="openIdSearch">查询订单号</el-button>
                </div>
            </el-header>
            <el-main>
                <div class="white" v-if="orders.length === 0" style="text-align: center">
                    <h3>暂无数据</h3>
                </div>
                <el-card class="box-card" v-for="one in orders" style="text-align: left">
                    <div slot="header" class="clearfix">
                        <span>订单号：{{one.id}}</span>
                    </div>
                    <div class="text item">
                        <el-row :gutter="20">
                            <el-col :span="8"><span>订单金额￥{{one.price + one.freight}}</span></el-col>
                            <el-col :span="8">
                                <span>下单用户：{{one.nickname}}</span>
                            </el-col>
                            <el-col :span="8">
                                <el-button v-if="one.status === 1" @click="confirmOrder(one.id)" type="danger">确认订单</el-button>
                                <el-button v-if="one.status === 2" @click="openDeliver(one.id)" type="danger">订单发货</el-button>
                                <el-button style="float: right;" type="primary" @click="getJump(one.id)">查看详情</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-main>

            <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
                <el-input v-model="deliverNo" placeholder="请输入快递单号"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deliverOrder">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="提示" :visible.sync="dialogVisible2" width="50%">
                <el-input v-model="orderId" placeholder="按照单号查找"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="getOrderDetail">查 询</el-button>
                </span>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import {orderList, confirmOrder, deliverOrder, orderDetail} from '@/api'

    export default {
        name: "Order",

        data() {
            return {
                orders: [],
                options: [{
                    value: '1',
                    label: '待确认'
                }, {
                    value: '2',
                    label: '待发货'
                }, {
                    value: '3',
                    label: '待签收'
                }, {
                    value: '4',
                    label: '已完成'
                }, {
                    value: '0',
                    label: '待支付'
                }, {
                    value: '-1',
                    label: '已取消'
                }],
                status: null,
                dialogVisible: false,
                dialogVisible2: false,
                deliverNo: '',
                deliverId: -1,
                orderId: '',
            };
        },

        methods: {
            getOrders() {
                if (this.status !== null){
                    orderList(this.status).then(res => {
                        this.orders = res.data;
                    });
                } else {
                    this.$message("请选择订单类型！");
                }
            },

            getJump(id) {
                this.$router.push({
                    path: `/od/${id}/`,
                });
            },

            getOrderDetail() {
                if (this.orderId > 0) {
                    this.dialogVisible2 = false;
                    this.$router.push({
                        path: `/od/${this.orderId}/`,
                    });
                } else {
                    this.$message({
                        message: '请填写正确的订单编号',
                        type: 'error',
                    });
                }
            },

            confirmOrder(id) {
                confirmOrder(id).then(res => {
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

            deliverOrder() {
                if (this.deliverId === -1 || this.deliverNo === '') {
                    this.$message({
                        message: '请填写快递相关信息',
                        type: 'error',
                    });
                }

                deliverOrder(this.deliverId, this.deliverNo).then(res => {
                    if (res.code === 200) {
                        this.$message("发货成功！");
                        this.dialogVisible = false;
                        this.getOrders();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },

            openDeliver(id) {
                this.dialogVisible = true;
                this.deliverNo = '';
                this.deliverId = id;
            },

            openIdSearch() {
                this.dialogVisible2 = true;
            }
        },
    }
</script>

<style scoped>

</style>