import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


/** 常驻路由 */
export const constantRoutes: any = [
  {
    path: "/",
    // redirect: "/dashboard",
    meta: {
      title: "介绍",
      elIcon: "House",
    },
    hidden: false,
    component: () => import("@/views/dashboard/index.vue"),
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
