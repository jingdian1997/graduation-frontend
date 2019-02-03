<template>
    <div class="index">
        <el-container>
            <el-header style="height: 130px; margin-left: -140px; margin-right: -140px">
                <el-container>
                    <el-header>
                        <PersonalNav></PersonalNav>
                    </el-header>
                    <el-main>
                        <div class="search">
                            <el-input v-model="query" style="width: 500px" placeholder="搜索图书名称"></el-input>
                            <el-button class="button" type="danger" @click="getQuery" icon="el-icon-search"></el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-header>
            <el-main>
                <el-container>
                    <el-aside height="100%" width="250px">
                        <Nav></Nav>
                    </el-aside>
                    <el-main style="padding-top: 0;padding-bottom: 0;">
                        <div id="picture">
                            <img alt="Vue logo" src="../assets/preview.jpg" :height="imgHeight + 'px'" width="100%"/>
                        </div>
                    </el-main>
                </el-container>

                <div id="main">
                    <div class="category" v-for="(item, index) in indexPageData">
                        <el-card class="box-card" shadow="hover">
                            <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #e4393c; text-align: left; font-size: 22px; color: white">
                                <router-link class="link2" :to="{path:'/search/1/' + item.id}">
                                    {{item.name}}
                                </router-link>
                            </div>

                            <el-row :gutter="20">
                                <el-col :span="6" v-for="(book) in item.books">
                                    <router-link class="link" :to="{path:'/about/' + book.id}" color="red">
                                        <img :src="'data:image/jpg;base64,' + book.picture" width="100px" height="150px"/>
                                        <p>{{book.name}}</p>
                                        <p>{{book.author}},{{book.publisher}}</p>
                                        <p>￥{{book.price}}</p>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </div>
            </el-main>
            <el-footer>
                Copyright (C) 经典图书网 2015-2019, All Rights Reserved
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {bookIndex} from '@/api';
    import Nav from '@/components/Nav.vue'
    import PersonalNav from '@//components/PersonalNav.vue'

    export default {
        name: "Index",

        components: {
            Nav,
            PersonalNav,
        },

        data () {
            return {
                indexPageData: [],
                imgHeight: 0,
                query: '',
            };
        },

        methods: {
            getIndex() {
                bookIndex().then(res => {
                    this.indexPageData = res.data;
                    this.imgHeight = this.indexPageData.length * 50;
                });
            },

            getQuery() {
                if (this.query === null || this.query === '') {
                    this.$router.push({
                        path: `/search/`,
                    })
                } else {
                    this.$router.push({
                        path: `/search/${this.query}`,
                    })
                }
            },

        },

        mounted: function (){
            this.getIndex();
        },
    }
</script>

<style scoped>
    div.index {
        margin: 0 100px;
    }

    div #picture {
        margin-bottom: 30px;
    }
</style>