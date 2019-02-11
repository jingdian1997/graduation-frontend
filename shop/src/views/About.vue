<template>
  <div class="about">
    <el-container>
      <el-header style="height: 130px; margin-left: -70px; margin-right: -70px">
        <PersonalNav></PersonalNav>
      </el-header>
      <el-main>
        <el-container>
          <el-aside>
            <img :src="'data:image/jpg;base64,' + bookData.picture" width="300px" height="300px"/>
          </el-aside>
          <el-main class="right-main">
            <el-card class="box-card" style="background-color: #ebebeb; height: 400px">
              <div :key="1" class="text item" style="font-size: 28px">
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
                  <el-button type="primary" @click="addFocus" v-show="!focusOrNot">关注</el-button>
                  <el-button type="info" @click="addFocus" v-show="focusOrNot">取消关注</el-button>
                </div>
              </div>
            </el-card>
          </el-main>
        </el-container>

        <div class="comment_area">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix" style="text-align: left; font-size: 20px;">
              <span>评论区</span>
            </div>
            <div v-for="co in comments" class="text item">
              <p>{{co.nickname}}于{{co.time}}发表评论：</p>
              <p>{{co.content}}</p>
              <p>评分：{{co.score}}分</p>
              <p v-if="co.reply !== null && co.reply !== ''">
                官方回复（{{co.replyTime}}）：{{co.reply}}
              </p>
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
        name: "Search",

        components: {
            PersonalNav,
        },

        data () {
            return {
                bookData: {},
                comments: [],
                focusOrNot: false,
                bid: this.$route.params.bid,
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
