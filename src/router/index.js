import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/index.js';
import Home from '@/views/home/index.vue';
import SiteMap from '@/views/siteMap/index.vue';
import Login from '@/views/login/index.vue';
import RouterView from '@/views/routerView/index.vue';
import UserInfo from '@/views/userInfo/index.vue';
import Qa from '@/views/qa/index.vue';

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
		path: '/qa',
		name: 'qa',
		component: Qa,
		meta: {
			navName: '常見問答',
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
			layout: 'HasSideBar',
			auth: false
		},
	},
	{
		path: '/user',
		component: RouterView,
		meta: {
			navName: '會員資訊',
			layout: 'HasSideBar',
			auth: true
		},
		children: [
			{
				path: '',
				name: 'defaultUser',
				redirect: 'info'
			},
			{
				path: 'info',
				name: 'info',
				component: UserInfo,
				meta: {
					navName: '會員基本資料',
					layout: 'HasSideBar'
				}
			}
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
