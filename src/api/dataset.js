import httpMethod from './http.js';

export default class Dataset {
   static getDatasetPage(option = {}) {
      return httpMethod({ method: 'get' }, option);
   }
   static getDatasetList(option = {}) {
      return httpMethod({ method: 'get' }, option);
   }
}