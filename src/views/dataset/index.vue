<template>
<div class="datasetPage">
   <transition 
      @before-enter="beforeEnter" @enter="enter"
      @after-enter="afterEnter" @before-leave="beforeLeave"
      @leave="leave" @after-leave="afterLeave"
      :css="false">
      <div
         class="datasetList" 
         v-if="!isContentPage" 
         :key="1">
         <SearchBox 
            class="mb"
            :keyword="keyword" 
            @changeKeyword="setKeyword"
         ></SearchBox>
         <DatasetTitle :title="navName"></DatasetTitle>
         <template v-if="searchArr.length === 0 && keyword === ''">
            <DataTable
               :thTitle="thTitle"
               :datasetList="datasetList"
            ></DataTable>
            <Pagination
               :total="totalPage"
               :pageNumber="pageNumber"
               @updateNumber="changeNumber"
            ></Pagination>
         </template>
         <template v-else>
            <DataTable
               :thTitle="thTitle"
               :datasetList="searchArr"
            ></DataTable>
         </template>
      </div>
      <router-view v-else :key="2"></router-view>
   </transition>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import datasetStore from '@/store/modules/dataset.js';
import DatasetTitle from '@/components/DatasetTitle/index.vue';
import DataTable from '@/components/DataTable/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import SearchBox from '@/components/SearchBox/index.vue';
import mapCode from './mapCode.js';
import Dataset from '@/api/dataset.js';
const slideTime = 0.2;
const animateStartInfo = { 
   position: 'absolute', 
   left: 0,
   top: 0,
   width: '100%'
};
export default {
   data: () => ({
      storeName: 'dataset',
      keyword: '',
      searchArr: [],
      thTitle: [
         { title: '資料名稱', width: '75%' },
         { title: '資料編號', width: '25%' },
      ],
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      ...mapState("meta", { seo: function(state) {
         return state.metaInfo[this.routeName];
      }}),
      ...mapState('dataset', ['pageNumber', 'datasetList', 'pageCode']),
      ...mapGetters('dataset', ['totalPage', 'keywordData']),
      navName() {
         return this.$route.meta.navName;
      },
      routeName() {
         return this.$route.name;
      },
      currentCode() {  //頁面代碼
         return mapCode[this.routeName];
      },
      isContentPage() {  //是否為詳情夜
         return this.routeName.includes('Content');
      },
      directionIndex() { //動畫方向
         return this.isContentPage ? 1 : -1;
      }
   },
   methods: {
      ...mapMutations('dataset', ['setPageCode', 'setPageNumber']),
      ...mapActions('dataset', ['getDatasetPage', 'getDatasetList', 'getDatasetSearch']),
      checkStore(name) {
         return this.$checkStoreModule(name);
      },
      getPageNumber() {
         let pageId = this.$route.query.page;
         let parseId = parseInt(pageId);
         let rule = /^[0-9\s]*$/;
         if (pageId === undefined || !rule.test(pageId) || parseId === 0 ) {
            this.$router.replace({ query: { page: 1 }});
            return true;
         } else {
            this.setPageNumber(parseId);
            return false;
         }
      },
      changeNumber(val) {
         this.setPageNumber(val);
         this.$router.push({ query: { page: val }}).catch(() => {});
      },
      async doing() {
         if (this.isContentPage) return;
         let isSame = this.currentCode === this.pageCode;  //如果頁面帶碼不同就要取得新的頁面資料
         this.setPageCode(this.routeName);
         if (!isSame) await this.getDatasetPage();
         let isRedirect = this.getPageNumber();
         if (!isRedirect) await this.getDatasetList();
      },
      getSearchValue() {  //取得網址的關鍵字參數
         if (this.isContentPage) return;
         this.setKeyword(this.$route.query.searchValue || '');
      },
      setKeyword(text) {  //取得符合關鍵字得資料
         this.keyword = text;
         let copyData = JSON.parse(JSON.stringify(this.keywordData({ keyword: text })));
         copyData.forEach(item => {
            let dataname = item.title + '-' + item['resourceDescription-1'];
            item.dataname = dataname;
            delete item.title;
         });
         this.searchArr = copyData;
      },
      beforeEnter(el) {
         TweenMax.set(el, {
            ...animateStartInfo,
            opacity: 0,
            x: 150 * this.directionIndex,
         });
      },
      enter(el, done) {
         TweenMax.to(el, slideTime, {
            opacity: 1,
            x: 0,
            onComplete() { done() }
         });
      },
      afterEnter(el) {
         el.style = '';
      },
      beforeLeave(el) {
         TweenMax.set(el, {
            ...animateStartInfo,
            opacity: 1,
            x: 0,
         });
      },
      leave(el, done) {
         TweenMax.to(el, slideTime, {
            opacity: 0,
            x: -150 * this.directionIndex,
            onComplete() { done() }
         });
      },
      afterLeave(el) {
         el.style = '';
      },
   },
   created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, datasetStore());
      }
      this.doing();
      this.getDatasetSearch().then(res => {
         this.getSearchValue();
      });
   },
   watch: {
      $route(to, from) {
         if (this.isContentPage) this.searchArr = [];
         this.doing();
         this.getSearchValue();
      }
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   components: {
      DatasetTitle,
      DataTable,
      Pagination,
      SearchBox
   }
}
</script>

<style>
.datasetPage {
   position: relative;
}
</style>