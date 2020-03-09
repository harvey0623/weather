export default class Fb {
   constructor() {
      this.appId = '2611139062329868',
      this.graphApi = '/me?fields=id,name,email,picture.width(100).height(100)',
      this.profileOption = {
         scope: 'email, public_profile',
         return_scopes: true
      }
   }
   loadSdk() {
      return new Promise((resolve, reject) => {
         window.fbAsyncInit = async () => {
            FB.init({
               appId: this.appId,
               cookie: true,
               xfbml: true,
               version: 'v6.0'
            });
            FB.AppEvents.logPageView();
            let result = await this.checkLoginStatus().then(res => res);
            if (!result.success) return resolve({ success: false });
            let profile = await this.getFbProfile().then(res => res);
            resolve({ 
               success: true,
               authInfo: result.authInfo,
               profile
            });
         }
      });
   }
   checkLoginStatus() {
      return new Promise((resolve, reject) => {
         FB.getLoginStatus(res => {
            if (res.status === 'connected') {
               return resolve({ success: true, authInfo: res });
            } else {
               return resolve({ success: false });
            }
         });
      });
   }
   getFbProfile() {
      return new Promise((resolve, reject) => {
         FB.api(this.graphApi, res => resolve(res));
      });
   }
   loginHandler() {
      return new Promise((resolve, reject) => {
         FB.login(async (res) => {
            if (res.status === 'connected') {
               let profile = await this.getFbProfile().then(res => res);
               return resolve({ 
                  success: true, 
                  authInfo: res.authResponse, 
                  profile
               });
            } else {
               return resolve({ success: false });
            }
         }, this.profileOption);
      });
   }
   logoutHandler() {
      return new Promise((resolve, reject) => {
         FB.logout(res => resolve({ success: true }));
      })
   }
}