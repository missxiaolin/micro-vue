import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<any> = [
  {
    path: "/cha/index",
    redirect: "/cha/hba/index",
    children: [
      {
        path: "/cha/hba/index",
        component: () => import("../views/home.vue"),
      }, {
        path: "/cha/hba/ceshi",
        component: () => import("../views/ceshi/index.vue"),
      },
    ]
  }
  // {
  //   path: '/cha/index',
  //   name: 'home',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  // }, {
  //   path: '/cha/ceshi',
  //   name: 'ceshi',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "home" */ '../views/ceshi/index.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
