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
            let obj = state.newsTotal.find(item => {
               return item.page === state.pageNumber;
            });
            if (obj !== undefined) return obj.id;
            else return 0;
         }
      },
      actions: {
         async getTotalNews({ commit, dispatch }) {  //取得page資料
            let { success, data } = await News.getTotalNews().then(res => res.data);
            if (success) {
               commit('setNewsTotal',data);
               dispatch('getNewsList');
            }
         },
         async getNewsList({ commit, getters }) { //取得新聞資料
            let { success, data } = await News.getNewsList({ 
                  params: { pageIndex: getters.pageId }
               }).then(res => res.data);
            if (success) commit('setNewsList', data);
         }
      }
   }
}

export default newsStore;