<template>
    <div class="personalNav">
        <div class="search">
            <el-input v-model="query" style="width: 500px" placeholder="搜索图书名称"></el-input>
            <el-button @click="getQuery" type="danger" round>搜索</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalNav",

        data() {
            return {
                query: '',
            };
        },

        methods: {
            getQuery() {
                if (this.query === null || this.query === '') {
                    this.$router.push({
                        path: `/search/1/0/`,
                    })
                } else {
                    this.$router.push({
                        path: `/search/1/0/${this.query}`,
                    })
                }
            },
        },
    }
</script>

<style scoped>

</style>