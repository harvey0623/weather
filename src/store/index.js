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
		blockNav: ['/', '/siteMap', '/login', '/user', '*']
	},
	getters: {
		navList(state) {  //dropdown list && site map link
			return router.options.routes.filter(item => {
            return !state.blockNav.includes(item.path);
         });
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