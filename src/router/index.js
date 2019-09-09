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
          name: "首页",
          path: "/home-page",
          component: resolve => require(["@/views/infoSearch/home/home.vue"], resolve)
        },
        {
          name: "任务管理",
          path: "/task-manager-page",
          component: resolve => require(["@/views/infoSearch/task-manager/task-manager.vue"], resolve)
        },
        {
          name: "任务分配",
          path: "/task-allocation",
          component: resolve => require(["@/components/task-allocation/task-allocation.vue"], resolve)
        },
        {
          name: "术语映射",
          path: "/map-entry",
          component: resolve => require(["@/views/infoSearch/map-entry/map-entry.vue"], resolve)
        },
        {
          name: "术语映射详情",
          path: "/map-entry-detail",
          component: resolve => require(["@/components/map-details/map-details.vue"], resolve)
        },
        {
          name: "术语审校",
          path: "/reviser-entry",
          component: resolve => require(["@/views/infoSearch/reviser-entry/reviser-entry.vue"], resolve)
        },
        {
          name: "角色管理",
          path: "/role-manager",
          component: resolve => require(["@/views/infoSearch/role-manager/role-manager.vue"], resolve)
        },
      ]
    }
  ]
})
