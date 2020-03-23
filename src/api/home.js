import httpMethod from './http.js';

export default class Home {
   static getHomeData(option = {}) {
      return httpMethod({ 
         url: process.env.VUE_APP_HOMEDATA, 
         method: 'get' 
      }, option);
   }
}