<template>
<div class="datasetPage">
   dataset page
</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import datasetStore from '@/store/modules/dataset.js';
export default {
   data: () => ({
      storeName: 'dataset'
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      routeName() {
         return this.$route.name;
      },
      ...mapState("meta", { seo: function(state) {
         return state.metaInfo[this.routeName];
      }}),
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
   }
}
</script>