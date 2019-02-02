<template>
  <div class="about">
    <h1>This is {{this.$route.params.bid}}</h1>
  </div>
</template>

<script>
    import {bookList} from '@/api';
    import PersonalNav from '@//components/PersonalNav.vue'

    export default {
        name: "Search",

        components: {
            PersonalNav,
        },

        data () {
            return {
                bookData: {},
                bid: this.$route.params.bid,
            };
        },

        methods: {
        },

        mounted: function () {
        },
    }
</script>

<style scoped>
  .link {
    color: black;
    text-decoration: none;
  }
</style>
