<template>
    <div class="index">
    </div>
</template>

<script>
    import {bookIndex} from '@/api';

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
                bookIndex().then(res => {
                    this.book = res.data.book;
                    this.category = res.data.category;
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