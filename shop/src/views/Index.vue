<template>
    <div class="index">
        <el-container>
            <el-header style="height: 130px; margin-left: -100px; margin-right: -100px; padding: 0 0">
                <el-container>
                    <el-header style="padding: 0 0">
                        <PersonalNav></PersonalNav>
                    </el-header>
                    <el-main>
                        <div class="search">
                            <el-input v-model="query" style="width: 500px" placeholder="搜索图书名称"></el-input>
                            <el-button class="button" type="primary" @click="getQuery" icon="el-icon-search"
                                       style="background-color: #66ccff">搜索</el-button>
                        </div>
                    </el-main>
                </el-container>
            </el-header>
            <el-main style="margin: auto 50px;">
                <el-container>
                    <el-aside height="100%" width="250px">
                        <Nav></Nav>
                    </el-aside>
                    <el-main style="padding-top: 0;padding-bottom: 0; padding-right: 0">
                        <div id="picture">
                            <el-carousel :height="imgHeight + 'px'">
                                <el-carousel-item :key="1">
                                    <img alt="Vue logo" src="../assets/index1.jpg" :height="imgHeight + 'px'" style="width: 100%;"/>
                                </el-carousel-item>
                                <el-carousel-item :key="2">
                                    <img alt="Vue logo" src="../assets/index2.jpg" :height="imgHeight + 'px'" style="width: 100%;"/>
                                </el-carousel-item>
                                <el-carousel-item :key="3">
                                    <img alt="Vue logo" src="../assets/index3.jpg" :height="imgHeight + 'px'" style="width: 100%;"/>
                                </el-carousel-item>
                                <el-carousel-item :key="4">
                                    <img alt="Vue logo" src="../assets/index4.jpg" :height="imgHeight + 'px'" style="width: 100%;"/>
                                </el-carousel-item>
                                <el-carousel-item :key="5">
                                    <img alt="Vue logo" src="../assets/index5.jpg" :height="imgHeight + 'px'" style="width: 100%;"/>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-main>
                </el-container>

                <div id="main">
                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #66CCFF; text-align: left; font-size: 22px; color: white">
                            新书上架
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(book) in booksOfNew">
                                <router-link class="link" :to="{path:'/about/' + book.id}" color="red">
                                    <img :src="book.picture" width="100px" height="150px"/>
                                    <p>{{book.name}}</p>
                                    <p>{{book.author}},{{book.publisher}}</p>
                                    <p>￥{{book.price}}</p>
                                </router-link>
                            </el-col>
                        </el-row>
                    </el-card>

                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #EE82EE; text-align: left; font-size: 22px; color: white">
                            万众瞩目
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(book) in booksOfVisit">
                                <router-link class="link" :to="{path:'/about/' + book.id}" color="red">
                                    <img :src="book.picture" width="100px" height="150px"/>
                                    <p>{{book.name}}</p>
                                    <p>{{book.author}},{{book.publisher}}</p>
                                    <p>￥{{book.price}}</p>
                                </router-link>
                            </el-col>
                        </el-row>
                    </el-card>

                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #ffff00; text-align: left; font-size: 22px; color: white">
                            最多关注
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(book) in booksOfFocus">
                                <router-link class="link" :to="{path:'/about/' + book.id}" color="red">
                                    <img :src="book.picture" width="100px" height="150px"/>
                                    <p>{{book.name}}</p>
                                    <p>{{book.author}},{{book.publisher}}</p>
                                    <p>￥{{book.price}}</p>
                                </router-link>
                            </el-col>
                        </el-row>
                    </el-card>

                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #EE0000; text-align: left; font-size: 22px; color: white">
                            火热销售
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(book) in booksOfSell">
                                <router-link class="link" :to="{path:'/about/' + book.id}" color="red">
                                    <img :src="book.picture" width="100px" height="150px"/>
                                    <p>{{book.name}}</p>
                                    <p>{{book.author}},{{book.publisher}}</p>
                                    <p>￥{{book.price}}</p>
                                </router-link>
                            </el-col>
                        </el-row>
                    </el-card>

                    <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #0080ff; text-align: left; font-size: 22px; color: white">
                            好评如潮
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(book) in booksOfScore">
                                <router-link class="link" :to="{path:'/about/' + book.id}" color="red">
                                    <img :src="book.picture" width="100px" height="150px"/>
                                    <p>{{book.name}}</p>
                                    <p>{{book.author}},{{book.publisher}}</p>
                                    <p>￥{{book.price}}</p>
                                </router-link>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-main>
            <el-footer>
                Copyright (C) 经典图书网 2015-2019, All Rights Reserved
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {bookIndex, categoryList} from '@/api';
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
                category: [],
                booksOfNew: [],
                booksOfVisit: [],
                booksOfFocus: [],
                booksOfSell: [],
                booksOfScore: [],
                imgHeight: 0,
                query: '',
            };
        },

        methods: {
            getIndex() {
                bookIndex().then(res => {
                    this.booksOfNew = res.data.new;
                    this.booksOfScore = res.data.score;
                    this.booksOfSell = res.data.sell;
                    this.booksOfFocus = res.data.focus;
                    this.booksOfVisit = res.data.visit;
                });
            },

            getCategoryList() {
                categoryList(0).then(res => {
                    this.category = res.data;
                    this.imgHeight = this.category.length * 60;
                });
            },

            getQuery() {
                if (this.query === null || this.query === '' || this.query === undefined) {
                    this.$alert('搜索内容不能为空', '内容为空', {
                        confirmButtonText: '确定',
                    });
                    return false;
                } else {
                    this.$router.push({
                        path: `/search/0/${this.query}`,
                    });
                }
            },
        },

        mounted: function (){
            this.getCategoryList();
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