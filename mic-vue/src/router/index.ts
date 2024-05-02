import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<any> = [
  {
    path: "/hba/index",
    component: () => import("../views/home.vue"),
    hidden: false,
    meta: {
      title: "vue 首页",
    },
  }, {
    path: "/hba/ceshi",
    component: () => import("../views/ceshi/index.vue"),
    hidden: false,
    meta: {
      title: "测试页面",
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
