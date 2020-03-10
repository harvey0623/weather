import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/index.js';
import i18n from '@/plugin/i18n/index.js';
import Home from '@/views/home/index.vue';
import SiteMap from '@/views/siteMap/index.vue';
import Login from '@/views/login/index.vue';
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
			layout: 'HasSideBar'
		},
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		beforeEnter(to, from, next) {
			if (Store.state.auth.fbUser.isLogin) return next('/');
			else return next();
		},
		meta: {
			navName: '會員登入',
			layout: 'HasSideBar'
		},
	},
	{
		path: '/announcement',
		name: 'announcement',
		component: Home,
		meta: {
			navName: '公告事項',
			auth: true
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
		}	else if (to.hash) {
			return {
				selector: to.hash
			};
		}	else {
			return { x: 0, y: 0 };
		}
	}
});

let isFirst = false;
router.beforeEach(async (to, from, next) => {
	let isAuth = to.matched.some(item => item.meta.auth);
	if (!isFirst && isAuth === false) {
		await Store.dispatch('auth/getFbAuth');
		isFirst = true;
	}
	if (isAuth) {
		isFirst = true;
		let fbAuthStatus = await Store.dispatch('auth/getFbAuth').then(res => res);
		if (fbAuthStatus) return next();
		else return next('/login');
	}
	return next();
});

export default router;
