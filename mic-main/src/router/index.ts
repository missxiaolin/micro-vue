import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


/** 常驻路由 */
export const constantRoutes: any = [
  {
    path: "/",
    redirect: "/dashboard",
    meta: {
      title: "首页",
      elIcon: "eleme",
    },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        hidden: false,
        meta: {
          title: "应用概览",
          elIcon: "Operation",
          keepAlive: false,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/index",
    component: () => import("@/views/index.vue"),
    hidden: false,
    meta: {
      title: "首页",
      elIcon: "Operation",
      keepAlive: false,
      affix: true,
    },
  },
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
