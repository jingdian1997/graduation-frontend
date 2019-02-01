<template>
    <div class="index">
        <el-container>
            <el-header>
                <PersonalNav></PersonalNav>
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
                        <div class="category2">
                            <router-link class="link" :to="{path:'/about/' + item.id}">
                                <p class="category">{{item.name}}</p>
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
                    </div>
                </div>
            </el-main>
            <el-footer>
                Copyright (C) 经典图书网 2019-2019, All Rights Reserved
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
            };
        },

        methods: {
            getIndex() {
                bookIndex().then(res => {
                    this.indexPageData = res.data;
                    this.imgHeight = this.indexPageData.length * 50;
                });
            },

            getJump(cid) {
                this.$router.push({
                    path: `/about/${cid}`,
                })
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

    .link {
        color: black;
        text-decoration: none;
    }

    div #picture {
        margin-bottom: 30px;
    }

    div.category {
        border-bottom: 3px solid red;
        margin: 5px 5px 15px;
    }

    div.category2 {
        border-bottom: 3px solid red;
    }

    p.category {
        text-align: left;
        font-size: 22px;
    }

    hr {
    }
</style>