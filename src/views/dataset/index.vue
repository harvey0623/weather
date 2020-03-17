<template>
<div class="datasetPage">
   <div class="tableTitle">{{ navName }}</div>
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
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import datasetStore from '@/store/modules/dataset.js';
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
      routeName() {
         return this.$route.name;
      },
      navName() {
         return this.$route.meta.navName;
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
         } else {
            this.setPageNumber(parseId);
         }
      },
      changeNumber(val) {
         this.setPageNumber(val);
         this.$router.push({ query: { page: val }}).catch(() => {});
      }
   },
   async created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, datasetStore());
      }
      this.setPageCode(this.routeName);
      await this.getDatasetPage();
      this.getPageNumber();
      await this.getDatasetList();
   },
   watch: {
      async $route(to, from) {
         this.setPageCode(this.routeName);
         await this.getDatasetPage();
         this.getPageNumber();
         await this.getDatasetList();
      }
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   components: {
      DataTable,
      Pagination
   }
}
</script>

<style lang="scss">
.tableTitle {
   background-color: map-get($elBgColor, hover);
   color: #fff;
   padding: 6px 0;
   text-align: center;
}
</style>