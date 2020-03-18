<template>
<div class="datasetPage">
   <transition name="fade" mode="out-in">
      <div 
         class="datasetList" 
         v-if="!isContentPage" 
         :key="1">
         <DatasetTitle :title="navName"></DatasetTitle>
         <DataTable
            :thTitle="thTitle"
            :datasetList="datasetList"
         ></DataTable>
         <Pagination
            :total="totalPage"
            :pageNumber="pageNumber"
            @updateNumber="changeNumber"
         ></Pagination>
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
export default {
   data: () => ({
      storeName: 'dataset',
      thTitle: [
         { title: '資料名稱', width: '75%' },
         { title: '資料編號', width: '25%' },
      ]
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      ...mapState("meta", { seo: function(state) {
         return state.metaInfo[this.routeName];
      }}),
      ...mapState('dataset', ['pageNumber', 'datasetList']),
      ...mapGetters('dataset', ['totalPage']),
      navName() {
         return this.$route.meta.navName;
      },
      routeName() {
         return this.$route.name;
      },
      isContentPage() {
         return this.routeName.includes('Content');
      }
   },
   methods: {
      ...mapMutations('dataset', ['setPageCode', 'setPageNumber']),
      ...mapActions('dataset', ['getDatasetPage', 'getDatasetList']),
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
         this.setPageCode(this.routeName);
         let isRedirect = this.getPageNumber();
         if (!isRedirect) {
            await this.getDatasetPage();
            await this.getDatasetList();
         }
      }
   },
   created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, datasetStore());
      }
      this.doing();
   },
   watch: {
      $route(to, from) {
         this.doing();
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
      Pagination
   }
}
</script>