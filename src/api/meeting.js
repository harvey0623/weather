import httpMethod from './http.js';

export default class Meeting {
   static getMeetingList() {
      const url = 'https://opendata.cwb.gov.tw/webapi/announcement/meetinglist';
      return httpMethod({ 
         url: process.env.VUE_APP_GASP,
         method: 'get',
         params: { url }
      });
   }
}