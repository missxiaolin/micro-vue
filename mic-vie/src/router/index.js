import { createRouter, createWebHistory } from "vue-router";

export const defaultRoute = [
  {
    path: "/bba/list",
    component: () => import("@/views/bba/list.vue"),
    hidden: false,
    meta: {
      title: "项目列表",
    },
  },
  {
    path: "/vie/vcc/index",
    component: () => import("@/views/vcc/index.vue"),
    hidden: false,
    meta: {
      title: "路由列表",
    },
  },
  {
    path: "/vie/vcc/detail",
    component: () => import("@/views/vcc/detail.vue"),
    hidden: true,
    meta: {
      title: "路由详情",
    },
  },
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || "/",
  history: createWebHistory(),
  routes: prdRoutesList,
});

export default router;
