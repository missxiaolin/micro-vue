import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<any> = [
  {
    path: "/cha/hba/index",
    component: () => import("../views/home.vue"),
  }, {
    path: "/cha/hba/ceshi",
    component: () => import("../views/ceshi/index.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
