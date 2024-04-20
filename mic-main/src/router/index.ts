import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Layouts = () => import("@/layouts/index.vue");

/** 常驻路由 */
export const constantRoutes: any = [
  {
    path: "/",
    component: Layouts,
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
