import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/index.js';
import Home from '@/views/home/index.vue';
import SiteMap from '@/views/siteMap/index.vue';
import Login from '@/views/login/index.vue';
import RouterView from '@/views/routerView/index.vue';
import UserInfo from '@/views/userInfo/index.vue';
import Qa from '@/views/qa/index.vue';
import News from '@/views/news/index.vue';
import NewsContent from '@/views/newsContent/index.vue';
import Meeting from '@/views/meeting/index.vue';
import Apps from '@/views/apps/index.vue';
import Innovation from '@/views/innovation/index.vue';
import Web from '@/views/web/index.vue';
import datasetPath from '@/router/dataset.js';

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
			layout: 'HasSideBar',
			banner: 'banner1'
		},
	},
	{
		path: '/qa',
		name: 'qa',
		component: Qa,
		meta: {
			navName: '常見問答',
			layout: 'HasSideBar',
			order: 6,
			banner: 'banner5'
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
			auth: false,
			order: 5,
			banner: 'banner1'
		},
	},
	{
		path: '/user',
		component: RouterView,
		meta: {
			navName: '會員資訊',
			layout: 'HasSideBar',
			auth: true,
			order: 4,
			banner: 'banner1'
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
					navName: '會員基本資料'
				}
			}
		]
	},
	{
		path: '/announce',
		component: RouterView,
		meta: {
			navName: '公告事項',
			layout: 'HasSideBar',
			order: 1,
			banner: 'banner4'
		},
		children: [
			{
				path: '',
				name: 'defaultAnnounce',
				redirect: 'news'
			},
			{
				path: 'news',
				name: 'news',
				component: News,
				meta: {
					navName: '最新消息'
				},
				children: [
					{
						path: ':id',
						name: 'newsDetail',
						component: NewsContent,
						meta: {
							navName: ''
						},
					}
				]
			},
			{
				path: 'meeting',
				name: 'meeting',
				component: Meeting,
				meta: {
					navName: '會議記錄'
				}
			},
		]
	},
	{
		path: '/dataset',
		component: RouterView,
		meta: {
			navName: '資料主題',
			layout: 'HasSideBar',
			order: 2,
			banner: 'banner3'
		},
		children: [
			{
				path: '',
				name: 'defaultDataset',
				redirect: 'forecast'
			},
			...datasetPath,
		]
	},
	{
		path: '/application',
		component: RouterView,
		meta: {
			navName: '應用活化',
			layout: 'HasSideBar',
			order: 3,
			banner: 'banner2'
		},
		children: [
			{
				path: '',
				name: 'defaultApplication',
				redirect: 'app'
			},
			{
				path: 'app',
				name: 'app',
				component: Apps,
				meta: {
					navName: '氣象應用APP'
				},
			},
			{
				path: 'innovation',
				name: 'innovation',
				component: Innovation,
				meta: {
					navName: '氣象創意應用'
				},
			},
			{
				path: 'web',
				name: 'web',
				component: Web,
				meta: {
					navName: '氣象網頁應用服務'
				},
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
