import { createRouter, createWebHistory } from 'vue-router';

export const defaultRoute = [
	{
		path: '/vie/index',
		name: '首页',
		component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue'),
		meta: {
			layout: false,
		},
	},
];

let prdRoutesList = [...defaultRoute];

const router = createRouter({
	history: createWebHistory(),
	routes: prdRoutesList,
});

export default router;