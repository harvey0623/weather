import axios from 'axios';
import store from '@/store/index.js';
import mytoastr from '@/plugin/toastr/toastr.js';
import i18n from '@/plugin/i18n/index.js';

const errorHandle = function(statusCode) {
   switch (statusCode) {
      case 400:
         mytoastr.add({ msg: i18n.t('server.badRequest'), type: 'error' });
         break;
      case 401:
         mytoastr.add({ msg: i18n.t('server.unAuthorized') , type: 'error' });
         break;
      default:
         mytoastr.add({ msg: i18n.t('server.systemError'), type: 'error' });
   }
}

//request interceptor
axios.interceptors.request.use(function (config) {
   // store.commit('setLoading', true);
   return config;
}, function (error) {
   return Promise.reject(error);
});

//response interceptor
axios.interceptors.response.use(function (response) {
   // store.commit('setLoading', false);
   return response;
}, function (error) {
   // store.commit('setLoading', false);
   if (error.response) {
      let statusCode = error.response.status;
      errorHandle(statusCode);
   }
   return Promise.reject(error);
});

const httpMethod = function (option1, option2) {
   if (Object.prototype.toString.call(option2) !== '[object Object]') {
      return Promise.reject('option must be object');
   }
   return axios({ ...option1, ...option2 });
}

export default httpMethod;