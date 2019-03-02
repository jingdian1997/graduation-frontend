<template>
    <div class="category">
        <el-container>
            <el-header>
                <div v-if="id === '0'" style="text-align: left; font-size: 20px;">
                    <p>当前位置：类目管理</p>
                </div>
                <div v-else style="text-align: left">
                    <p>当前类目：{{bigCategory.name}}</p>
                    <el-button @click="getJump(bigCategory.parentId)">返回上一级</el-button>
                </div>
            </el-header>
            <el-main>
                <el-table :data="list" stripe style="width: 100%" tooltip-effect="dark">
                    <el-table-column prop="name" label="类目名称"></el-table-column>
                    <el-table-column prop="del" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.del === true">禁用</span>
                            <span v-else>启用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.del === false" @click="getJump(scope.row.id)" type="text">查看下一级</el-button>
                            <el-button v-if="scope.row.del === false" @click="openDialog2(scope.row)" type="text">禁用</el-button>
                            <el-button v-if="scope.row.del === false" @click="handleDelete(scope.row.id)" type="text">禁用</el-button>
                            <el-button v-if="scope.row.del === true" @click="handleActive(scope.row.id)" type="text">启用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="openDialog">添加新类目</el-button>

                <el-dialog title="添加新类目" :visible.sync="dialogVisible" width="50%">
                    <el-input v-model="newCategoryName" placeholder="请输入新类名"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleInsert">确 定</el-button>
                    </span>
                </el-dialog>

                <el-dialog title="修改类目名称" :visible.sync="dialogVisible2" width="50%">
                    <el-input v-model="newCategoryName" placeholder="请输入新类名"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="handleUpdate">确 定</el-button>
                    </span>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {categoryList, categoryOne, categoryInsert, categoryDelete, categoryActive, categoryUpdate} from '@/api'

    export default {
        name: "Category",

        inject: ['reload'],

        data() {
            return {
                bigCategory: {},
                list: [],
                id: this.$route.params.id,
                dialogVisible: false,
                dialogVisible2: false,
                newCategoryName: '',
                editId: null,
            };
        },

        methods: {
            getCategory() {
                if (this.id !== '0') {
                    categoryOne(this.id).then(res => {
                        this.bigCategory = res.data;
                    })
                }

                categoryList(this.id).then(res => {
                    this.list = res.data;
                });
            },

            getJump(id) {
                this.$router.push({
                    path: `/category/${id}/`,
                });
                this.reload();
            },

            handleActive(id) {
                categoryActive(id).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.getCategory();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                });
            },

            handleDelete(id) {
                categoryDelete(id).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.getCategory();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                });
            },

            openDialog() {
                this.dialogVisible = true;
                this.newCategoryName = '';
            },

            openDialog2(row) {
                this.dialogVisible2 = true;
                this.newCategoryName = row.name;
                this.editId = row.id;
            },

            handleInsert() {
                categoryInsert(this.newCategoryName, this.id).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.dialogVisible = false;
                        this.getCategory();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                })
            },

            handleUpdate() {
                categoryUpdate(this.editId, this.newCategoryName).then(res => {
                    if (res.code === 200) {
                        this.$message("操作成功！");
                        this.dialogVisible2 = false;
                        this.getCategory();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                        });
                    }
                })
            }
        },

        mounted: function () {
            this.getCategory();
        },
    }
</script>

<style scoped>

</style>