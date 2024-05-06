

import { createRouter, createWebHistory } from 'vue-router'
import microRoutes from './route'

const routes: any = [
  ...microRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
