import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

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
          path: '/search/:page/:cid/:query?',
          name: 'search',
          component: () => import('./views/Search.vue')
      }
  ]
})
