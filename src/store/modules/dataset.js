import Dataset from '@/api/dataset.js';
import mapCode from '@/views/dataset/mapCode.js';

const datasetStore = function() {
   return {
      namespaced: true,
      state: {
         pageCode: '',
         pageNumber: 1,
         datasetPage: [],
         datasetList: [],
         searchData: []
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
         setSearchData(state, value) {
            state.searchData = value;
         }
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
         },
         pageName(state) {
            if (state.pageCode === '') return '';
            let routeName = '';
            for (let key in mapCode) {
               if (mapCode[key] === state.pageCode) {
                  routeName = key;
                  break;
               }
            }
            return routeName;
         },
         keywordData: (state) => ({keyword = ''}) => {
            if (state.searchData.length === 0) return [];
            if (keyword === '') return [];
            return state.searchData.filter(item => {
               return item.title.includes(keyword);
            });
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
         },
         async getDatasetMeta({ commit }, { id }) {
            let url = `/datasetMetadata/${ id }`;
            let { success, data } = await Dataset.getDatasetMeta({ url })
               .then(res => res.data);
            if (success) return data;
            else return null;
         },
         async getDatasetContent({ commit }, { id }) {
            let url = `/datasetContent/${ id }`;
            let { success, result, records } = await Dataset.getDatasetContent({ url })
               .then(res => res.data);
            if (success === 'true') {
               return { result, records };
            } else {
               return null;
            }
         },
         async getDatasetSearch({ commit }) {
            let { success, data } =  await Dataset.getDatasetSearch()
               .then(res => res.data);
            if (success) commit('setSearchData', data);
         }
      }
   }
}

export default datasetStore;