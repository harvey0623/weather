import httpMethod from './http.js';

export default class Dataset {
   static getDatasetPage({ pageCode }) {
      return httpMethod({ 
         url: process.env.VUE_APP_GASP,
         method: 'get',
         params: {
            url: `https://opendata.cwb.gov.tw/webapi/datasetPage/${pageCode}`
         }
      }, {});
   }
   static getDatasetList({ pageCode, pageIndex }) {
      return httpMethod({ 
         url: process.env.VUE_APP_GASP,
         method: 'get',
         params: {
            url: `https://opendata.cwb.gov.tw/webapi/datasetList/${pageCode}?pageIndex=${pageIndex}`
         }
      }, {});
   }
   static getDatasetMeta(option = {}) {
      return httpMethod({ method: 'get' }, option);
   }
   static getDatasetContent(option = {}) {
      return httpMethod({ method: 'get' }, option);
   }
   static getDatasetSearch(option = {}) {
      return httpMethod({ 
         url: '/datasetSearch', 
         method: 'get',
         params: { q: '_' }  
      }, option);
   }
}