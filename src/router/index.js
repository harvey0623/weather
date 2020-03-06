import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/plugin/i18n/index.js';
import Home from '@/views/home/index.vue';
import SiteMap from '@/views/siteMap/index.vue';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			navName: '首頁',
		},
	},
	{
		path: '/siteMap',
		name: 'siteMap',
		component: SiteMap,
		meta: {
			navName: '網站地圖',
			layout: 'NoSideBar'
		},
	},
	{
		path: '/announcement',
		name: 'announcement',
		component: Home,
		meta: {
			navName: '公告事項',
		},
		children: [
			{
				path: 'news',
				name: 'news',
				component: Home,
				meta: {
					navName: '最新公告',
				},
			},
			{
				path: 'meeting',
				name: 'meeting',
				component: Home,
				meta: {
					navName: '會議記錄',
				},
			},
		]
	},
	{
		path: '/dataset',
		name: 'dataset',
		component: Home,
		meta: {
			navName: '資料主題',
		},
		children: [
			{
				path: 'forcast',
				name: 'forcast',
				component: Home,
				meta: {
					navName: '預報',
				},
			},
			{
				path: 'observation',
				name: 'observation',
				component: Home,
				meta: {
					navName: '觀測',
				},
			},
		]
	},
	{
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	mode: 'hash',
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				selector: to.hash
			};
		} else {
			return { x: 0, y: 0 };
		}
	}
});

router.beforeEach((to, from, next) => {
	return next();
});

export default router;
