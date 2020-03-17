import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import i18n from '@/plugin/i18n/index.js';;
import validator from "@/plugin/validator";
import VueMeta from 'vue-meta';

//===global component
import '@/components/global/index.js';

//====filter
import '@/filter/index.js';

//===plugin
import '@/plugin/bootstrap/index.js';
import '@/plugin/toastr/index.js';


Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(validator);
Vue.prototype.$checkStoreModule = function(name) {
  return this.$store.hasModule(name);
}

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

export default app;