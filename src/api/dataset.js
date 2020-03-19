import httpMethod from './http.js';

export default class Dataset {
   static getDatasetPage(option = {}) {
      return httpMethod({ method: 'get' }, option);
   }
   static getDatasetList(option = {}) {
      return httpMethod({ method: 'get' }, option);
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