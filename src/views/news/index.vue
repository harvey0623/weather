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
      getPageNumber() {
         let pageId = this.$route.query.page;
         if (pageId === undefined) {
            this.$router.replace({ query: { page: 1 }});
         } else {
            this.setPageNumber(parseInt(pageId));
         }
      }
   },
   async created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, newsStore());
      }
      this.getTotalNews();
      this.getPageNumber();
   },
   mounted() {
      
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   watch: {
      async $route(to, from, next) {
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