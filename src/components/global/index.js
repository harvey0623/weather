import Vue from 'vue';
import Default from '@/components/Layout/Default.vue';
import HasSideBar from '@/components/Layout/HasSideBar.vue';
import PageTitle from '@/components/PageTitle/index.vue';
import BaseButton from '@/components/Button/BaseButton.vue';
import ButtonBox from '@/components/ButtonBox/index.vue';
import TextInput from '@/components/Form/TextInput.vue';
import RadioInput from '@/components/Form/RadioInput.vue';
import TextArea from '@/components/Form/TextArea.vue';
import Select from '@/components/Form/Select.vue';
import CheckboxInput from '@/components/Form/CheckboxInput.vue';
import SlideUpDown from 'vue-slide-up-down';

Vue.component('DefaultLayout', Default);
Vue.component('HasSideBar', HasSideBar);
Vue.component('PageTitle', PageTitle);
Vue.component('BaseButton', BaseButton);
Vue.component('ButtonBox', ButtonBox);
Vue.component('TextInput', TextInput);
// Vue.component('RadioInput', RadioInput);
// Vue.component('TextArea', TextArea);
// Vue.component('Select', Select);
// Vue.component('CheckboxInput', CheckboxInput);
Vue.component('slide-up-down', SlideUpDown)