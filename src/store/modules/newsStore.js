import News from '@/api/news.js';

const newsStore = function() {
   return {
      namespaced: true,
      state: {
         newsTotal: [],
         newsList: []
      },
      mutations: {
         setNewsTotal(state, value) {
            state.newsTotal = value;
         },
         setNewsList(state, value) {
            state.newsList = value;
         },
      },
      actions: {
         async getTotalNews({ commit }) {
            let result = await News.getTotalNews().then(res => res.data);
         },
         async getNewsList({ commit }, { pageIndex }) {
            let result = await News.getNewsList({ params: { pageIndex }})
               .then(res => res.data);
         }
      }
   }
}

export default newsStore;