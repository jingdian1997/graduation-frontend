<template>
    <div class="index">
    </div>
</template>

<script>
    import {baseUrl} from "../axios";

    export default {
        name: "Index",

        data () {
            return {
                book: {},
                category: [],
            };
        },

        methods: {
            getIndex() {
                this.$http.get(baseUrl + "book/index").then(result => {
                    if (result.data.code === 200){
                        this.book = result.data.data.book;
                        this.category = result.data.data.category;
                        // console.log(this.book);
                        // console.log(this.category);
                    }
                });
            }
        },

        mounted: function (){
            this.getIndex();
        },
    }
</script>

<style scoped>

</style>