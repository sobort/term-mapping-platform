import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login'
    },
    {
      path: "/login",
      component: resolve => require(["@/views/login/login.vue"], resolve)
    },
    {
      path: "/home",
      component: resolve => require(["@/views/home/index.vue"], resolve),
      children: [
        {
          name: "术语展示",
          path: "/indexpage",
          component: resolve => require(["@/views/infoSearch/index.vue"], resolve)
        },
        {
          name: "术语搜索",
          path: "/searchpage",
          component: resolve => require(["@/views/infoSearch/search.vue"], resolve)
        }
      ]
    }
  ]
})
