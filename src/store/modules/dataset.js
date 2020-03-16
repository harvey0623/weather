import Dataset from '@/api/dataset.js';

const mapCode = {
   forecast: 'f',
   observation: 'o'
}

const datasetStore = function() {
   return {
      namespaced: true,
      state: {
         pageCode: '',
         pageNumber: 1,
         datasetPage: [],
         datasetList: [],
      },
      mutations: {
         setPageCode(state, value) {
            state.pageCode = mapCode[value];
         },
         setPageNumber(state, value) {
            state.pageNumber = value;
         },
         setDatasetPage(state, value) {
            state.datasetPage = value;
         },
         setDatasetList(state, value) {
            state.datasetList = value;
         },
      },
      getters: {
         totalPage(state) {
            return state.datasetPage.length;
         },
         pageId(state) {
            if (state.datasetPage.length === 0) return 0;
            let obj = state.datasetPage.find(item => {
               return item.page === state.pageNumber;
            });
            if (obj !== undefined) return obj.id;
            return 0;
         }
      },
      actions: {
         async getDatasetPage({ state, commit }) {
            let url = `/datasetPage/${state.pageCode}`;
            let { success, data } = await Dataset.getDatasetPage({ url })
               .then(res => res.data);
            if (success) {
               commit('setDatasetPage', data);
            }
         },
         async getDatasetList({ state, commit, getters }) {
            let url = `/datasetList/${state.pageCode}`;
            let { success, data } = await Dataset.getDatasetList({ 
               url, params: { pageIndex: getters.pageId }})
               .then(res => res.data);
            
            if (success) {
               commit('setDatasetList', data);
            }
            
         }
      }
   }
}

export default datasetStore;