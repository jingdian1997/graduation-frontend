<template>
    <div class="myVisit">
        <h2>我的足迹</h2>
        <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="name" label="图书"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="createTime" label="时间"></el-table-column>
        </el-table>
        <el-button type="danger" @click="handleClick">清空足迹</el-button>
    </div>
</template>

<script>
    import {myVisit, deleteVisit} from '@/api';

    export default {
        name: "MyVisit",

        data() {
            return {
                tableData: [],
            };
        },

        methods: {
            getCart() {
                myVisit().then(res => {
                    this.tableData = res.data;
                });
            },

            handleClick() {
                deleteVisit().then(this.getCart);
            },
        },

        mounted: function () {
            this.getCart();
        }
    }
</script>

<style scoped>

</style>