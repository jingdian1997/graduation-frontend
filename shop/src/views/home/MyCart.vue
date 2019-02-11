<template>
    <div class="myCart">
        <h2>我的购物车</h2>
        <el-table :data="tableData" stripe style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column prop="name" label="图书"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="amount" label="数量">
                <template scope="scope">
                    <div>
                        <el-input-number :min="1" :max="100" size="small" v-model="scope.row.amount"></el-input-number>
                        <el-button @click="changeNumber(scope.row.id, scope.row.amount)" type="text" size="small">确定</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.id)" type="text" size="small">移出购物车</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="" type="text" size="small">提交订单</el-button>
    </div>
</template>

<script>
    import {myCart, deleteCart, changeCartAmount} from '@/api'

    export default {
        name: "MyCart",

        data() {
            return {
                tableData: [],
                multipleSelection: [],
            };
        },

        methods: {
            getCart() {
                myCart().then(res => {
                    this.tableData = res.data;
                });
            },

            handleClick(id) {
                deleteCart(id).then(this.getCart);
            },

            changeNumber(id, amount) {
                changeCartAmount(id, amount).then(res => {
                    if (res.code !== 200) {
                        this.$message({
                            message: message,
                            type: 'error',
                        });
                    }
                });
            },

            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
        },

        mounted: function () {
            this.getCart();
        }
    }
</script>

<style scoped>

</style>