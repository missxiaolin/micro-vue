import { createRouter, createWebHistory } from "vue-router";

import r from './r.json'

export const defaultRoute = [];

r.forEach(item => {
  defaultRoute.push({
    path: item.path,
    component: () => import(`../views/${item.pageName}.vue`),
  })
})

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
