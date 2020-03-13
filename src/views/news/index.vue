<template>
<div class="news">
   <ul class="newsBox">
      <NewsList 
         v-for="item in newsData"
         :key="item.id"
         :id="item.id"
         :title="item.title"
         :createdate="item.createdate"
      ></NewsList>
   </ul>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import newsStore from '@/store/modules/newsStore.js';
import NewsList from '@/components/NewsList/index.vue';
export default {
   data: () =>({
      storeName: 'newsStore'
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      ...mapState("meta", { seo: state => state.metaInfo.news }),
      ...mapState('newsStore', { 
         newsData: 'newsList',
         newsTotal: 'newsTotal'
      })
   },
   methods: {
      checkStore(name) {
         return this.$checkStoreModule(name);
      },
      ...mapActions('newsStore', ['getTotalNews', 'getNewsList']),
      ...mapMutations('newsStore', ['setPageNumber']),
      gotoFirstPage() {
         this.$router.replace({ query: { page: 1 }});
      },
      getPageNumber() {
         let pageId = this.$route.query.page;
         if (pageId === undefined) {
            this.gotoFirstPage();
         } else {
            let parseNumber = parseInt(pageId);
            let obj = this.newsTotal.find(item => item.page === parseNumber);
            if (obj !== undefined) this.setPageNumber(parseNumber);
            else this.gotoFirstPage();
         }
      }
   },
   async created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, newsStore());
      }
      await this.getTotalNews();
      this.getPageNumber();
      this.getNewsList();
   },
   mounted() {
      
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   watch: {
      $route(to, from, next) {
         this.getPageNumber();
         this.getNewsList();
      }
   },
   components: {
      NewsList
   }
}
</script>

<style lang="scss">
.newsBox {
   margin-bottom: 20px;
}

</style>