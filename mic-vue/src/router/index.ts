

import { createRouter, createWebHistory } from 'vue-router'
import microRoutes from './route'

const routes: any = [
  {
    path: '/hba/index',
    component: () => import(`../views/hbaIndex.vue`),
}, {
    path: '/vsa/index',
    component: () => import(`../views/vsaIndex.vue`),
}
  // ...microRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
