<template>
    <div class="orderDetail">
    </div>
</template>

<script>
    export default {
        name: "OrderDetail",

        data() {
            return {
                id: this.$route.params.id,
                data: {},
            };
        },

        methods: {
            getOrderDetail() {
            },

            payOrder(){
            },
        },

        mounted: function () {
            this.getOrderDetail();
        }
    }
</script>

<style scoped>

</style>