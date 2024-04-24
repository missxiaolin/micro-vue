import { createRouter, createWebHistory } from "vue-router";

export const defaultRoute = [
  {
    path: "/vie/index",
    name: "首页",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/index.vue"),
    meta: {
      title: "vie项目",
      elIcon: "Operation",
      keepAlive: false,
      affix: true,
    },
  }, {
    path: "/vie/vcc/detail",
    name: "首页",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/views/vcc/detail.vue"),
    meta: {
      title: "vie项目",
      elIcon: "Operation",
      keepAlive: false,
      affix: true,
    },
  }
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
