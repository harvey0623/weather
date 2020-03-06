import httpMethod from './http.js';

class Member {
   static getInfo(option = {}) {
      return httpMethod({
         url: '/',
         method: 'get'
      }, option);
   }
};

export default Member;