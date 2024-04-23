import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


/** 常驻路由 */
export const constantRoutes: any = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: {
      title: "首页",
      elIcon: "House",
    },
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        hidden: false,
        meta: {
          title: "应用概览",
          elIcon: "House",
        },
      },
    ],
  }, {
    path: "/vcc",
    redirect: "/index",
    meta: {
      title: "项目",
      elIcon: "Operation",
    },
    children: [
      {
        path: "/vcc/index",
        component: () => import("@/views/vcc/list.vue"),
        hidden: false,
        meta: {
          title: "路由列表",
          elIcon: "Operation",
        },
      }, {
        path: "/vcc/detail",
        component: () => import("@/views/vcc/detail.vue"),
        hidden: true,
        meta: {
          title: "路由详情",
          elIcon: "Operation",
        },
      },
    ],
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  ...constantRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
