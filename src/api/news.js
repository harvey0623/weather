import httpMethod from './http.js';

export default class News {
   static getTotalNews(option = {}) {
      return httpMethod({ 
         url: process.env.VUE_APP_GASP, 
         method: 'get',
         params: {
            url: 'https://opendata.cwb.gov.tw/webapi/announcement/newspage'
         }
      }, option);
   }
   static getNewsList(option = {}) {
      return httpMethod({ 
         url: '/newsList', 
         method: 'get' 
      }, option);
   }
}