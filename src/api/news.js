import httpMethod from './http.js';

export default class News {
   static url = process.env.VUE_APP_GASP;
   static getTotalNews() {
      const url = 'https://opendata.cwb.gov.tw/webapi/announcement/newspage';
      return httpMethod({ 
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
   static getNewsList({ pageIndex }) {
      const url = `https://opendata.cwb.gov.tw/webapi/announcement/newslist?pageIndex=${pageIndex}`;
      return httpMethod({ 
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
}