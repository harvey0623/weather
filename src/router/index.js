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
import DatasetPage from '@/views/dataset/index.vue';
import DatasetContent from '@/views/dataset/content.vue';

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
						name: 'newsContent',
						component: NewsContent,
						meta: {
							navName: '最新消息'
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
		},
		children: [
			{
				path: '',
				name: 'defaultDataset',
				redirect: 'forecast'
			},
			{
				path: 'forecast',
				name: 'forecast',
				component: DatasetPage,
				meta: {
					navName: '預報'
				},
				children: [
					{
						path: ':id',
						name: 'forecastContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
			},
			{
				path: 'observation',
				name: 'observation',
				component: DatasetPage,
				meta: {
					navName: '觀測'
				},
				children: [
					{
						path: ':id',
						name: 'observationContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
			},
			{
				path: 'earthquake',
				name: 'earthquake',
				component: DatasetPage,
				meta: {
					navName: '地震海嘯'
				},
				children: [
					{
						path: ':id',
						name: 'earthquakeContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
			},
			{
				path: 'climate',
				name: 'climate',
				component: DatasetPage,
				meta: {
					navName: '氣候'
				},
				children: [
					{
						path: ':id',
						name: 'climateContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
			},
			{
				path: 'warning',
				name: 'warning',
				component: DatasetPage,
				meta: {
					navName: '天氣警特報'
				},
				children: [
					{
						path: ':id',
						name: 'warningContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
			},
			{
				path: 'mathematics',
				name: 'mathematics',
				component: DatasetPage,
				meta: {
					navName: '數值預報'
				},
				children: [
					{
						path: ':id',
						name: 'mathematicsContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
			},
			{
				path: 'astronomy',
				name: 'astronomy',
				component: DatasetPage,
				meta: {
					navName: '天文'
				},
				children: [
					{
						path: ':id',
						name: 'astronomyContent',
						component: DatasetContent,
						meta: {
							navName: ''
						}
					},
				]
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
