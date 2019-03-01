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
                    <el-button @click="openDialog(scope.row)" type="primary" size="small"
                               v-if="scope.row.flag === 4 && scope.row.ifComment === false">评价</el-button>
                    <el-button @click="openDialog2(scope.row)" type="primary" size="small"
                               v-if="scope.row.flag === 4">申请售后</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="发表评论" :visible.sync="dialogVisible" width="50%" >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="评分">
                    <el-rate v-model="form.score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                </el-form-item>
                <el-form-item label="评论内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="makeComment">立即创建</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="发起售后" :visible.sync="dialogVisible2" width="50%" >
            <el-form ref="form2" :model="form2" label-width="80px">
                <el-form-item label="售后类型">
                    <el-select v-model="form2.type" placeholder="请选择售后类型">
                        <el-option label="退货" value="1"></el-option>
                        <el-option label="换货" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请原因">
                    <el-input v-model="form2.reason"></el-input>
                </el-form-item>
                <el-form-item label="申请数量">
                    <el-input-number v-model="form2.amount" :min="1" :max="form2.amountMax"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createRefund">立即创建</el-button>
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                </el-form-item>
            </el-form>
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
    import {orderDetail, payOrder, makeComment, createRefund} from '@/api'

    export default {
        name: "OrderDetail",

        data() {
            return {
                id: this.$route.params.id,
                address: {},
                orders: {},
                detail: [],
                dialogVisible: false,
                dialogVisible2: false,
                form: {
                    odid: null,
                    content: '',
                    bid: null,
                    score: 5,
                },
                form2: {
                    odid: null,
                    reason: '',
                    type: null,
                    amount: 1,
                    amountMax: 1
                }
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

            //发起评论
            openDialog(row) {
                this.dialogVisible = true;
                this.form.odid = row.id;
                this.form.bid = row.bid;
            },

            //发起售后
            openDialog2(row) {
                this.dialogVisible2 = true;
                this.form2.amountMax = row.amount;
                this.form2.odid = row.id;
            },

            makeComment() {
                makeComment(this.form.bid, this.form.score, this.form.odid, this.form.content).then(res => {
                    if (res.code === 200) {
                        this.$message("申请成功！");
                        this.$router.push('/comment');
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },

            createRefund() {
                createRefund(this.form2.odid, this.form2.amount, this.form2.reason, this.form2.type).then(res => {
                    if (res.code === 200) {
                        this.$message("申请成功！");
                        this.$router.push('/refund');
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
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