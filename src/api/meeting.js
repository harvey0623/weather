import httpMethod from './http.js';

export default class Meeting {
   static getMeetingList(option = {}) {
      return httpMethod({ 
         url: process.env.VUE_APP_GASP,
         method: 'get',
         params: {
            url: 'https://opendata.cwb.gov.tw/webapi/announcement/meetinglist'
         }
      }, option);
   }
}