import httpMethod from './http.js';

export default class Meeting {
   static getMeetingList(option = {}) {
      return httpMethod({ url: '/meetinglist', method: 'get' }, option);
   }
}