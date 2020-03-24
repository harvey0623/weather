import httpMethod from './http.js';

export default class Dataset {
   static url = process.env.VUE_APP_GASP;
   static getDatasetPage({ pageCode }) {
      const url = `https://opendata.cwb.gov.tw/webapi/datasetPage/${pageCode}`;
      return httpMethod({ 
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
   static getDatasetList({ pageCode, pageIndex }) {
      const url = `https://opendata.cwb.gov.tw/webapi/datasetList/${pageCode}?pageIndex=${pageIndex}`;
      return httpMethod({ 
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
   static getDatasetMeta({ id }) {
      const url = `https://opendata.cwb.gov.tw/webapi/datasetMetadata/${id}`;
      return httpMethod({ 
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
   static getDatasetContent({ id }) {
      const url = `https://opendata.cwb.gov.tw/webapi/datasetContent/${id}`;
      return httpMethod({
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
   static getDatasetSearch() {
      const url = `https://opendata.cwb.gov.tw/webapi/datasetSearch/?q=_`;
      return httpMethod({ 
         url: this.url,
         method: 'get',
         params: { url }
      });
   }
}