import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import White from './views/White.vue'
import Order from './components/Order.vue'
import OrderDetail from './components/OrderDetail.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/', component: White, name: 'White', hidden: true },
                { path: '/order', component: Order, name: 'Order' },
                { path: '/od/:id', component: OrderDetail, name: 'OrderDetail' },
            ],
        }, {
            path: '/',
            name: 'index',
            component: Index,
        },
    ]
})
