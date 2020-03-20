import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router/index.js';
import metaStore from './modules/metaStore.js';
import i18nStore from './modules/i18nStore.js';
import authStore from './modules/authStore.js';

Vue.use(Vuex);
Vuex.Store.prototype.hasModule = function (module) {
	return this._modules.root._children[module] !== undefined;
};

export default new Vuex.Store({
	strict: process.NODE_ENV === 'development',
	state: {
		isLoading: false,
		blockPath: ['/', '*', '/siteMap', '/qa', '/login']
	},
	getters: {
		showDropDown(state) {  //需要dropdown的router
			return router.options.routes.filter(item => {
				return !state.blockPath.includes(item.path);
			});
		},
		showList(state, getters) {  //需要顯示的下拉清單
			let isLogin = state.auth.fbUser.isLogin;
			return getters.showDropDown.filter(item => {
				let authStatus = item.meta.auth;
				return authStatus === undefined || authStatus === isLogin; 
			});
		},
		dropDownList(state, getters) {
			let list = JSON.parse(JSON.stringify(getters.showList));
			return list.sort((a, b) => a.meta.order - b.meta.order );
		}
	},
	mutations: {
		setLoading(state, value) {
			state.isLoading = value;
		},
	},
	actions: {
		
   },
   modules: {
      i18n: i18nStore(),
		meta: metaStore(),
		auth: authStore()
   }
});