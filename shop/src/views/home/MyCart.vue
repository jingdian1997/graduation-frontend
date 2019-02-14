<template>
    <div class="myCart">
        <h2>我的购物车</h2>
        <el-table :data="tableData" stripe style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
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
        <el-button @click="openDialog" type="primary" size="small">提交订单</el-button>

        <el-dialog title="选择地址" :visible.sync="dialogVisible" width="50%" >
            <el-table :data="addressData" ref="singleTable" stripe style="width: 100%" tooltip-effect="dark"
                      @current-change="handleCurrentChange" highlight-current-row>
                <el-table-column prop="address" label="地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.address}}</span>
                        <span v-if="scope.row.defaulting === true">(默认)</span>
                    </template>
                </el-table-column>
                <el-table-column prop="recipient" label="收件人"></el-table-column>
                <el-table-column prop="tel" label="联系电话"></el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDialog">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {myCart, deleteCart, changeCartAmount, allAddress, createOrder} from '@/api'

    export default {
        name: "MyCart",

        data() {
            return {
                tableData: [],
                multipleSelection: [],
                addressData: [],
                addressId: null,
                dialogVisible: false,
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

            getAddress() {
                allAddress().then(res => {
                    this.addressData = res.data;
                    this.addressData.forEach(item => {
                        if (item.defaulting === true){
                            this.addressId = item.id;
                        }
                    });
                });
            },

            handleSelectionChange(val) {
                for(let i = 0; i < val.length; ++i) {
                    this.multipleSelection[i] = val[i].id;
                }
            },

            openDialog() {
                this.dialogVisible = true;
            },

            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },

            handleCurrentChange(val) {
                this.addressId = val.id;
                console.log(this.addressId);
            },

            confirmDialog() {
                createOrder(this.multipleSelection, this.addressId).then(res => {
                    let oid = res.data;
                    this.$router.push({
                        path: `/od/${oid}/`,
                    });
                });
                this.dialogVisible = false;
            }
        },

        mounted: function () {
            this.getCart();
            this.getAddress();
        }
    }
</script>

<style scoped>

</style>