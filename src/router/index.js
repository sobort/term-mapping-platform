import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: resolve => require(['views/login/login.vue'], resolve)
    }, {
        path: '/home',
        component: resolve => require(['views/home/index.vue'], resolve),
        children: [{
            name: '术语搜索',
            path: '/infoSearch/index',
            component: resolve => require(['views/infoSearch/index.vue'], resolve)
        }, {
            path: '/infoSearch/search',
            component: resolve => require(['views/infoSearch/search.vue'], resolve)
        },]
    },]
})
