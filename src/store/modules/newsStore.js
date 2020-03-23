import News from '@/api/news.js';

const newsStore = function() {
   return {
      namespaced: true,
      state: {
         pageNumber: 1,
         newsTotal: [],
         newsList: [],
         newsId: 0
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
         setNewsId(state, value) {
            state.newsId = value;
         }
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
         },
         newsContent(state) {
            if (state.newsList.length === 0) return null;
            let content = state.newsList.find(item => {
               return item.id === state.newsId
            });
            if (content !== undefined) return content;
            else return null;
         }
      },
      actions: {
         async getTotalNews({ commit, dispatch }) {  //取得page資料
            let { success, data } = await News.getTotalNews().then(res => res.data);
            if (success) {
               commit('setNewsTotal',data);
            }
         },
         async getNewsList({ commit, getters }) { //取得新聞資料
            let { success, data } = await News.getNewsList({ 
               pageIndex: getters.pageId }).then(res => res.data);
            if (success) commit('setNewsList', data);
         }
      }
   }
}

export default newsStore;