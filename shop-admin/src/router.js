import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import White from './views/White.vue'
import Order from './components/Order.vue'
import OrderDetail from './components/OrderDetail.vue'
import Category from './components/Category.vue'
import Book from './components/Book.vue'
import BookDetail from './components/BookDetail.vue'
import BookInsert from './components/BookInsert.vue'
import OrderRefund from './components/OrderRefund.vue'
import Comment from './components/Comment.vue'
import Statics from './components/Statics.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
            iconCls: 'el-icon-message',
            children: [
                { path: '/', component: White, name: 'White', hidden: true },
                { path: '/order', component: Order, name: 'Order' },
                { path: '/od/:id', component: OrderDetail, name: 'OrderDetail' },
                { path: '/category/:id', component: Category, name: 'Category' },
                { path: '/book/', component: Book, name: 'Book' },
                { path: '/bookDetail/:id', component: BookDetail, name: 'BookDetail' },
                { path: '/bookInsert', component: BookInsert, name: 'BookInsert' },
                { path: '/refund', component: OrderRefund, name: 'OrderRefund' },
                { path: '/comment', component: Comment, name: 'Comment' },
                { path: '/statics', component: Statics, name: 'Statics' },
            ],
        }, {
            path: '/',
            name: 'index',
            component: Index,
        }, {
            path: '*',
            name: 'index',
            component: Index,
        },
    ]
})