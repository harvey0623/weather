import checkFbAuth from '@/plugin/fb/checkFbAuth.js';
import FaceBook from '@/plugin/fb/index.js';
const fbInstance = new FaceBook();

const authStore = function() {
   return {
      namespaced: true,
      state: {
         fbUser: {
            isLogin: false,
            accessToken: '',
            name: '',
            email: '',
            picture: ''
         }
      },
      mutations: {
         setFbUser(state, value) {
            let { authInfo, profile } = value;
            state.fbUser = {
               isLogin: true,
               accessToken: authInfo.accessToken,
               name: profile.name,
               email: profile.email,
               picture: profile.picture.data.url
            }
         },
         resetFbUser(state) {
            state.fbUser = {
               isLogin: false,
               accessToken: '',
               name: '',
               email: '',
               picture: ''
            }
         }
      },
      actions: {
         async getFbAuth({ commit }, value) {  //確認狀態
            let result = await checkFbAuth().then(res => res);
            if (result.success) commit('setFbUser', result);
            else commit('resetFbUser');
            return result.success;
         },
         async fbLogin({ commit }) {  //登入
            let result = await fbInstance.loginHandler().then(res => res);
            if (result.success) commit('setFbUser', result);
            else commit('resetFbUser');
            return result.success;
         },
         async fbLogout({ commit }) {  //登出
            let result = await fbInstance.logOutHandler().then(res => res);
            if (result.success) commit('resetFbUser');
            return result.success;
         }
      }
   }
}

export default authStore;