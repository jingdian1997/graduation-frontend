<template>
    <div class="search">
        <el-container>
            <el-header>
                <PersonalNav></PersonalNav>
            </el-header>
            <el-main>
                <div v-for="book in tableData">
                    <el-card class="box-card">
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
                <div class="pages">
                </div>
            </el-main>
            <el-footer>
                Copyright (C) 经典图书网 2015-2019, All Rights Reserved
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {bookList} from '@/api';
    import PersonalNav from '@//components/PersonalNav.vue'

    export default {
        name: "Search",

        components: {
            PersonalNav,
        },

        data () {
            return {
                tableData: [],
                total: 0,
                pageSize: 10,
                totalPage: 0,
                query: this.$route.params.query,
                cid: this.$route.params.cid,
                page: this.$route.params.page,
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

                bookList(this.page, this.cid, query).then(res => {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.totalPage = Math.ceil(this.total / this.pageSize);
                });
            },
        },

        mounted: function () {
            this.getBooks();
        },
    }
</script>

<style scoped>
    .link {
        color: black;
        text-decoration: none;
    }
</style>