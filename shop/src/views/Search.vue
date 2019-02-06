<template>
    <div class="search">
        <el-container>
            <el-header style="height: 200px; margin-left: -40px; margin-right: -40px">
                <el-container>
                    <el-header>
                        <PersonalNav></PersonalNav>
                    </el-header>
                    <el-main>
                        <div class="search">
                            <el-input v-model="query" style="width: 500px" placeholder="搜索图书名称"></el-input>
                            <el-button class="button" type="danger" @click="getQuery" icon="el-icon-search">搜索</el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-header>

            <el-container style="margin: 0 100px">
                <el-aside v-if="category.length > 0">
                    <el-menu class="el-menu-demo" mode="vertical" @select="" background-color="#545c64" text-color="#fff">
                        <el-menu-item v-for="(c, index) in category" :index="(index).toString()" @click="getJump(c.id)"  style="height: 50px">
                            {{c.name}}
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main style="padding: 0 20px">
                    <div v-for="book in tableData">
                        <el-card class="box-card" shadow="hover">
                            <div class="text item">
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">
                                            <img :src="'data:image/jpg;base64,' + book.picture" width="100px" height="100px"/>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">
                                            <router-link  class="link" :to="{path:'/about/' + book.id}">
                                                {{book.name}}
                                            </router-link>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="grid-content bg-purple">
                                            <p>{{book.author}}</p>
                                            <p>{{book.publisher}}</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            ￥{{book.price}}
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-card>
                    </div>
                </el-main>
            </el-container>

            <el-footer>
                Copyright (C) 经典图书网 2015-2019, All Rights Reserved
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {bookList, categoryList} from '@/api';
    import PersonalNav from '@//components/PersonalNav.vue'

    export default {
        name: "Search",

        inject: ['reload'],

        components: {
            PersonalNav,
        },

        data () {
            return {
                tableData: [],
                total: 0,
                pageSize: 10,
                query: this.$route.params.query,
                cid: this.$route.params.cid,
                category: [],
                pageNumber: 1,
            };
        },

        methods: {
            getBooks() {
                let query;
                if (this.query === null || this.query === undefined || this.query === '') {
                    query = null;
                } else {
                    query = this.query
                }

                bookList(this.pageNumber, this.cid, query).then(res => {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                });
            },

            getCategory() {
                if (this.cid > 0) {
                    categoryList(this.cid).then(res => {
                        this.category = res.data;
                    });
                }
            },

            getJump(cid) {
                if (this.query === null || this.query === '' || this.query === undefined) {
                    this.$router.push({
                        path: `/search/${cid}/`,
                    });
                    this.reload();
                } else {
                    this.$router.push({
                        path: `/search/${cid}/${this.query}`,
                    });
                    this.reload();
                }
            },

            getQuery() {
                if (this.query === null || this.query === '' || this.query === undefined) {
                    this.$alert('搜索内容不能为空', '内容为空', {
                        confirmButtonText: '确定',
                    });
                    return false;
                } else {
                    this.$router.push({
                        path: `/search/${this.cid}/${this.query}`,
                    });
                    this.reload();
                }
            },
        },

        mounted: function () {
            this.getBooks();
            this.getCategory();
        },
    }
</script>

<style scoped>
    .link {
        color: black;
        text-decoration: none;
    }
</style>