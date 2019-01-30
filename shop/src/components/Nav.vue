<template>
    <div class="nav">
        <div v-for="c in category">
            <p @click="getJump(c.id)">{{c.name}}</p>
        </div>
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
                    path: `/about/${cid}`,
                })
            }
        },

        mounted: function () {
            this.getCategory();
        }
    }
</script>

<style scoped>

</style>