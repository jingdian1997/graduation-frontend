<template>
  <div class="about">
    <el-container>
      <el-header style="height: 130px; margin-left: -70px; margin-right: -70px">
        <PersonalNav></PersonalNav>
      </el-header>
      <el-main>
        <el-container>
          <el-aside>
            <img :src="bookData.picture" width="300px" height="350px"/>
          </el-aside>
          <el-main class="right-main">
            <el-card class="box-card" style="height: 350px; background-color: rgba(182,170,174,0.18)">
              <div :key="1" class="text item" style="font-size: 24px">
                {{bookData.name}}
              </div>
              <div :key="2" class="text item" style="font-size: 16px; color: blue">
                {{bookData.description}}
              </div>
              <div :key="3" class="text item" style="font-size: 14px">
                作者：{{bookData.author}}，出版社：{{bookData.publisher}}，出版日期：{{bookData.publishDate}}，ISBN：{{bookData.isbn}}
              </div>
              <div :key="4" class="text item" style="font-size: 24px; color: red">
                定价：￥{{bookData.price}}
              </div>
              <div :key="5" class="text item" style="font-size: 14px; color: green">
                库存：{{bookData.stock}}本
              </div>
              <div :key="6" class="text item" style="font-size: 14px">
                <div v-if="bookData.del === true">
                  很抱歉，本书已经下架
                </div>
                <div v-else>
                  <el-button type="danger" @click="addCart">加入购物车</el-button>
                  <div v-if="token !== ''">
                    <el-button type="primary" @click="addFocus" v-show="!focusOrNot">关注</el-button>
                    <el-button type="info" @click="addFocus" v-show="focusOrNot">取消关注</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </el-main>
        </el-container>

        <div class="comment_area">
          <el-card class="box-card" shadow="hover" style="background-color: rgba(182,170,174,0.18); margin-top: 50px;">
            <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background: #66ccff; text-align: left; font-size: 22px; color: white">
              <span>评论区（{{comments.length}}）</span>
            </div>
            <div v-for="co in comments" class="text item" style="text-align: left;">
              <p style="color: blue">
                {{co.nickname}}（{{co.time}}）：<el-rate v-model="co.score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" disabled></el-rate>
              </p>
              <p>{{co.content}}</p>
              <p v-if="co.reply !== null && co.reply !== ''">
                <el-card class="box-card" style="background-color: rgba(182,170,174,0.18);">
                  <div slot="header" class="clearfix" style="margin:-18px -20px; padding:10px 20px;
                            background-color: rgba(182,170,174,0.18); text-align: left; font-size: 16px;">
                    <span>店家回复（{{co.replyTime}}）：</span>
                  </div>
                  <div class="text item">
                    {{co.reply}}
                  </div>
                </el-card>
              </p>
              <hr/>
            </div>
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
    import {bookComments, bookOne, createVisit, addCart, focusFocus, ifFocused} from '@/api';
    import PersonalNav from '@//components/PersonalNav.vue'

    export default {
        name: "About",

        components: {
            PersonalNav,
        },

        data () {
            return {
                bookData: {},
                comments: [],
                focusOrNot: false,
                bid: this.$route.params.bid,
                token: this.$store.state.token,
            };
        },

        methods: {
            getCart() {
                bookComments(this.bid).then(res => {
                    this.comments = res.data.records;
                    console.log(this.comments);
                });
            },

            getBook() {
                bookOne(this.bid).then(res => {
                    this.bookData = res.data;
                });
            },

            createVisit(){
                createVisit(this.bid);
            },

            addCart() {
                addCart(this.bid).then(res => {
                    this.$alert('商品已加入购物车', '操作成功', {
                        confirmButtonText: '确定',
                    });
                });
            },

            addFocus() {
                focusFocus(this.bid).then(res => {
                    this.focusOrNot = !this.focusOrNot;
                });
            },

            ifFocused() {
                ifFocused(this.bid).then(res => {
                    this.focusOrNot = res.data;
                });
            }
        },

        mounted: function () {
            this.getBook();
            this.createVisit();
            this.getCart();
            this.ifFocused();
        },
    }
</script>

<style scoped>
  .link {
    color: black;
    text-decoration: none;
  }

  div.about {
    margin: 0 50px;
  }

  div.text {
    margin-top: 25px;
  }

  .right-main {
    padding: 0 30px;
    text-align: left;
  }
</style>
