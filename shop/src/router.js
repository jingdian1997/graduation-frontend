import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Main from './views/Main.vue'
import Home from './views/home/Home.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
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
                { path: '/', component: Home, name: '主页', hidden: true },
                // { path: '/table', component: Table, name: 'Table' },
                // { path: '/form', component: Form, name: 'Form' },
                // { path: '/user', component: user, name: '列表' },
            ]
        },
    ]
});
