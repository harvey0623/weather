import httpMethod from './http.js';

export default class Home {
   static getHomeData(option = {}) {
      return httpMethod({ url: '/homeData', method: 'get' }, option);
   }
}