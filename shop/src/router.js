import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Main from './views/Main.vue'
import Home from './views/home/Home.vue'
import PersonInfo from './views/home/PersonInfo.vue'
import PersonMail from './views/home/PersonMail.vue'
import PersonTel from './views/home/PersonTel.vue'
import PersonPassword from './views/home/PersonPassword.vue'
import MyComment from './views/home/MyComment.vue'
import MyVisit from './views/home/MyVisit.vue'
import MyFocus from './views/home/MyFocus.vue'
import MyCart from './views/home/MyCart.vue'
import MyOrder from './views/home/MyOrder.vue'
import OrderDetail from './views/home/OrderDetail.vue'
import MyAddress from './views/home/MyAddress.vue'
import OrderRefund from './views/home/OrderRefund.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        }, {
            path: '/index',
            name: 'index',
            component: Index
        }, {
            path: '/about/:bid',
            name: 'about',
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }, {
            path: '/search/:cid/:query?',
            name: 'search',
            component: () => import('./views/Search.vue')
        }, {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        }, {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        }, {
            path: '/main',
            component: Main,
            name: 'main',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/', component: Home, name: 'Home', hidden: true },
                { path: '/info', component: PersonInfo, name: 'PersonInfo' },
                { path: '/mail', component: PersonMail, name: 'PersonMail' },
                { path: '/tel', component: PersonTel, name: 'PersonTel' },
                { path: '/pwd', component: PersonPassword, name: 'PersonPassword' },
                { path: '/visit', component: MyVisit, name: 'MyVisit' },
                { path: '/comment', component: MyComment, name: 'MyComment' },
                { path: '/focus', component: MyFocus, name: 'MyFocus' },
                { path: '/cart', component: MyCart, name: 'MyCart' },
                { path: '/od/:id', component: OrderDetail, name: 'OrderDetail' },
                { path: '/order', component: MyOrder, name: 'MyOrder' },
                { path: '/address', component: MyAddress, name: 'MyAddress' },
                { path: '/refund', component: OrderRefund, name: 'OrderRefund' },
            ],
        },
    ]
});
