<template>
    <div class="myOrder">
        <div class="white" v-if="orders.length === 0" style="text-align: center">
            <h3>暂无数据</h3>
        </div>
        <el-card class="box-card" v-for="one in orders" style="text-align: left">
            <div slot="header" class="clearfix">
                <!--<p style="float: left">订单编号：{{one.id}}</p>-->
                <p>
                    <span>￥{{one.pay}}</span>
                    <span v-if="one.status === 3">物流：{{one.deliverNo}}</span>
                    <span>状态：{{one.status}}</span>
                </p>
                <el-button style="float: right; padding: 3px 0" type="text" @click="getJump(one.id)">查看详情</el-button>
            </div>
            <div v-for="detail in one.details" :key="detail.id" class="text item" style="float: left">
                {{detail.bname}}   X   {{detail.amount}}
            </div>
        </el-card>
    </div>
</template>

<script>
    import {orderList} from '@/api'

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
            }
        },

        mounted() {
            this.getOrders();
        }
    }
</script>

<style scoped>

</style>