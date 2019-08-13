import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index.js';
import { sync } from 'vuex-router-sync';
import 'base/js/axios.js';
import ElementUI from 'element-ui';
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import { Sider, Steps, Step } from 'iview';
import "./base/css/base-style.scss";
import "./base/font/iconfont.css";

Vue.component('Sider', Sider);
Vue.component('Steps', Steps);
Vue.component('Step', Step);

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts

sync(store, router);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
