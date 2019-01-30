<template>
    <div class="index">
        <div id="navigation">
            <Nav></Nav>
        </div>
        <div id="picture">
            <img alt="Vue logo" src="../assets/logo.png" width="600px" height="300px"/>
        </div>
        <div id="main">
            <div v-for="(item, index) in indexPageData">
                <p @click="getJump(item.id)">{{item.name}}</p>
                <div v-for="(book, index) in item.books" @click="getJump(book.id)">
                    <img :src="'data:image/jpg;base64,' + book.picture" alt="../assets/logo.png"/>
                    <p>{{book.name}}</p>
                    <p>{{book.author}},{{book.publisher}}</p>
                    <p>{{book.price * book.discount}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bookIndex} from '@/api';
    import Nav from '@/components/Nav.vue'

    export default {
        name: "Index",

        components: {
            Nav,
        },

        data () {
            return {
                indexPageData: {},
            };
        },

        methods: {
            getIndex() {
                bookIndex().then(res => {
                    this.indexPageData = res.data;
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

</style>