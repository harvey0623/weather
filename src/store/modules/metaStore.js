import getMeta from '@/meta/index.js';

const metaStore = function() {
   return {
      namespaced: true,
      state: {
         metaInfo: getMeta(),
      },
      mutations: {
         setMeta(state, value) {
            state.metaInfo = value;
         }
      },
      actions: {
         changeMetaLang({ commit }) {
            commit('setMeta', getMeta());
         }
      }
   }
}

export default metaStore;