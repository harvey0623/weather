import checkFbAuth from '@/plugin/fb/checkFbAuth.js';
const authStore = function() {
   return {
      namespaced: true,
      state: {
         fbUser: {
            fbLogin: false,
            accessToken: '',
            name: '',
            email: '',
            picture: ''
         }
      },
      mutations: {
         setFbUser(state, value) {
            if (value.success) {
               let { authInfo, profile } = value;
               state.fbUser = {
                  fbLogin: true,
                  accessToken: authInfo.authResponse.accessToken,
                  name: profile.name,
                  email: profile.email,
                  picture: profile.picture.data.url
               }
            } else {
               state.fbUser = {
                  fbLogin: false,
                  accessToken: '',
                  name: '',
                  email: '',
                  picture: ''
               }
            }
         }
      },
      actions: {
         async getFbAuth({ commit }, value) {
            let result = await checkFbAuth().then(res => res);
            commit('setFbUser', result);
            return result.success;
         }
      }
   }
}

export default authStore;