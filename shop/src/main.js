import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式
import axios from 'axios'
import depot from './axios.js'

Vue.use(iView);

let http = axios.create({
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    baseUrl: "http://122.112.244.157:8000/",
    timeout: 30000
});
Vue.prototype.$http = http;
depot();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');