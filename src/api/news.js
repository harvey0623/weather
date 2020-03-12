import httpMethod from './http.js';

export default class News {
   static getTotalNews(option = {}) {
      return httpMethod({ url: '/newsTotal', method: 'get' }, option);
   }
   static getNewsList(option = {}) {
      // /newsList?pageIndex=81
      return httpMethod({ url: '/newsList', method: 'get' }, option);
   }
}