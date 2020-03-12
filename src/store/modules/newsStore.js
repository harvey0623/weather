import News from '@/api/news.js';

const newsStore = function() {
   return {
      namespaced: true,
      state: {
         pageNumber: 1,
         newsTotal: [],
         newsList: []
      },
      mutations: {
         setPageNumber(state, value) {
            state.pageNumber = value;
         },
         setNewsTotal(state, value) {
            state.newsTotal = value;
         },
         setNewsList(state, value) {
            state.newsList = value;
         },
      },
      getters: {
         totalPage(state) {
            return state.newsTotal.length;
         },
         pageId(state) {
            if (state.newsTotal.length === 0) return 0;
            return state.newsTotal.find(item => {
               return item.page === state.pageNumber;
            })['id'];
         }
      },
      actions: {
         async getTotalNews({state, commit, dispatch, getters }, value) {
            let result = await News.getTotalNews().then(res => res.data);
            if (result.success) {
               commit('setNewsTotal', result.data);
               dispatch('getNewsList', { pageIndex: getters.pageId });
            }
         },
         async getNewsList({ commit }, { pageIndex }) {
            let result = await News.getNewsList({ params: { pageIndex }})
               .then(res => res.data);
            console.log(result);
         }
      }
   }
}

export default newsStore;