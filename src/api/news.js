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
   static getNewsList({ pageIndex }) {
      return httpMethod({ 
         url: process.env.VUE_APP_GASP,
         method: 'get',
         params: {
            url: `https://opendata.cwb.gov.tw/webapi/announcement/newslist?pageIndex=${pageIndex}`
         }
      }, {});
   }
}