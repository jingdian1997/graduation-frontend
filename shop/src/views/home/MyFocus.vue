<template>
    <div class="myFocus">
        <h2>我的关注</h2>
        <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="name" label="图书"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.bid)" type="text" size="small">取消关注</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {myFocus, focusFocus} from '@/api'

    export default {
        name: "MyFocus",

        data() {
            return {
                tableData: [],
            };
        },

        methods: {
            getCart() {
                myFocus().then(res => {
                    this.tableData = res.data;
                });
            },

            handleClick(bid) {
                focusFocus(bid).then(this.getCart);
            },
        },

        mounted: function () {
            this.getCart();
        }
    }
</script>

<style scoped>

</style>