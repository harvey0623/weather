import Vue from 'vue';
import Default from '@/components/Layout/Default.vue';
import HasSideBar from '@/components/Layout/HasSideBar.vue';
import PageTitle from '@/components/PageTitle/index.vue';
import BaseButton from '@/components/Button/BaseButton.vue';
import TextInput from '@/components/Form/TextInput.vue';
import SlideUpDown from 'vue-slide-up-down';

Vue.component('DefaultLayout', Default);
Vue.component('HasSideBar', HasSideBar);
Vue.component('PageTitle', PageTitle);
Vue.component('BaseButton', BaseButton);
Vue.component('TextInput', TextInput);
Vue.component('slide-up-down', SlideUpDown);