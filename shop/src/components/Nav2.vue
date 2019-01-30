<template>
    <div class="nav2">
    </div>
</template>

<script>
    export default {
        name: "Nav2",

        //props可以接受来自父组件的参数
        props: {
            cid: Number,
        },

        data() {
            return {
                categories: [],
            };
        },
    }
</script>

<style scoped>

</style>