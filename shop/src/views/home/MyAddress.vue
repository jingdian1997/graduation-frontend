<template>
    <div class="myAddress">
        <h2>我的收货地址</h2>
        <el-table :data="tableData" stripe style="width: 100%" tooltip-effect="dark">
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="recipient" label="收件人"></el-table-column>
            <el-table-column prop="tel" label="联系电话"></el-table-column>
            <el-table-column prop="defaulting" label="默认" width="50px">
                <template slot-scope="scope">
                    <span v-if="scope.row.defaulting === true">是</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button type="text" @click="openDialog(scope.row)">修改</el-button>
                    <el-button @click="handleDelete(scope.row.id)" type="text">删除</el-button>
                    <el-button v-if="scope.row.defaulting === false" @click="handleDefault(scope.row.id)" type="text">
                        设为默认
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button @click="openDialog(null)">新增地址</el-button>

        <el-dialog title="收货地址" :visible.sync="dialogVisible">
            <el-form :model="formData">
                <el-form-item label="地址" label-width="120px">
                    <el-input v-model="formData.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" label-width="120px">
                    <el-input v-model="formData.recipient" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="120px">
                    <el-input v-model="formData.tel" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelDialog">取 消</el-button>
                <el-button type="primary" @click="submitDialog">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {allAddress, addAddress, setDefaultAddress, deleteAddress, updateAddress} from '@/api'

    export default {
        name: "MyAddress",

        data() {
            return {
                tableData: [],
                dialogVisible: false,
                formData: {},
                isCreate: false,
            };
        },

        methods: {
            getAddress() {
                allAddress().then(res => {
                    this.tableData = res.data;
                });
            },

            handleDelete(id) {
                deleteAddress(id).then(res => {
                    if (res.code === 200) {
                        this.$message("删除成功");
                        this.getAddress();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        })
                    }
                });
            },

            handleDefault(id) {
                setDefaultAddress(id).then(res => {
                    if (res.code === 200) {
                        this.$message("设置成功");
                        this.getAddress();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error',
                        });
                    }
                });
            },

            openDialog (row) {
                if (row === null) {
                    this.formData = {
                        tel: null,
                        recipient: null,
                        address: null,
                        defaulting: false,
                    };
                    this.isCreate = true;
                } else {
                    this.formData = row;
                    this.isCreate = false;
                }
                this.dialogVisible = true;
            },

            cancelDialog() {
                this.dialogVisible = false;
                this.formData = {}
            },

            submitDialog() {
                if (this.isCreate) {
                    addAddress(this.formData.address, this.formData.recipient, this.formData.tel, this.formData.defaulting)
                        .then(res => {
                        if (res.code === 200) {
                            this.$message("添加成功");
                            this.getAddress();
                        } else {
                            this.$message("添加失败，请重试");
                        }
                    });
                } else {
                    updateAddress(this.formData.id, this.formData.address, this.formData.recipient, this.formData.tel)
                        .then(res => {
                        if (res.code === 200) {
                            this.$message("修改成功");
                            this.getAddress();
                        } else {
                            this.$message("修改失败，请重试");
                        }
                    });
                }
                this.dialogVisible = false;
                this.isCreate = false;
            }
        },

        mounted: function () {
            this.getAddress();
        }
    }
</script>

<style scoped>

</style>