<template>
    <div class="nav">
        <el-menu class="el-menu-demo" mode="vertical" @select="" background-color="#e4393c" text-color="white">
            <el-menu-item v-for="(c, index) in category" :index="(index).toString()" @click="getJump(c.id)" style="height: 50px">
                {{c.name}}
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {categoryList} from '@/api';

    export default {
        name: "Nav",

        data() {
            return {
                category: [],
                theme: 'primary',
            };
        },

        methods: {
            getCategory() {
                categoryList(0).then(res => {
                    this.category = res.data;
                });
            },

            getJump(cid) {
                this.$router.push({
                    path: `/search/${cid}/`,
                })
            },
        },

        mounted: function () {
            this.getCategory();
        }
    }
</script>

<style scoped>

</style>