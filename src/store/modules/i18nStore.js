import i18n from '@/plugin/i18n/index.js';
import { langList } from '@/plugin/i18n/index.js';

let setMetaInfo = function(dispatch) {
   dispatch('meta/changeMetaLang', null, { root: true });
}

const i18nStore = function() {
   return {
      namespaced: true,
      state: {
         lang: i18n.locale,
         langList,
      },
      mutations: {
         setLang(state, value) {
            localStorage.setItem('lang', value);
            location.reload();
            return;
            // state.lang = value;
            // i18n.locale = value;
         }
      },
      actions: {
         async changeLang({ state, commit, dispatch }, payload) {
            if (state.lang === payload) return;
            if (payload in i18n.messages) {
               commit('setLang', payload);
               // setMetaInfo(dispatch);
            } else {
               try {
                  const module = await import(`@/plugin/i18n/locales/${payload}.json`);
                  i18n.setLocaleMessage(payload, module.default);
                  commit('setLang', payload);
                  // setMetaInfo(dispatch);
               } catch(err) {
                  console.log(err);
               }
            }
         }
      }
   }
}

export default i18nStore;