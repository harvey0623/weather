import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import { BModal } from 'bootstrap-vue';
import { BDropdown } from 'bootstrap-vue';
import { BCollapse } from 'bootstrap-vue';
import { BPagination } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.use(BootstrapVue);
Vue.component('b-modal', BModal);
Vue.component('b-dropdown', BDropdown);
Vue.component('b-collapse', BCollapse);
Vue.component('b-pagination', BPagination);