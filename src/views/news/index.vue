<template>
<div class="news">
   <ul class="newsBox">
      <NewsList 
         v-for="item in newsList"
         :key="item.id"
         :id="item.id"
         :title="item.title"
         :createdate="item.createdate"
      ></NewsList>
   </ul>
   <Pagination
      :total="total"
      :pageNumber="pageNumber"
      @updateNumber="changeNumber"
   ></Pagination>
   <router-view></router-view>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import newsStore from '@/store/modules/newsStore.js';
import NewsList from '@/components/NewsList/index.vue';
import Pagination from '@/components/Pagination/index.vue';
export default {
   data: () =>({
      storeName: 'newsStore'
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      ...mapState("meta", { seo: state => state.metaInfo.news }),
      ...mapState('newsStore', ['newsList', 'newsTotal', 'pageNumber']),
      ...mapGetters('newsStore', { total: 'totalPage' }),
   },
   methods: {
      checkStore(name) {
         return this.$checkStoreModule(name);
      },
      ...mapActions('newsStore', ['getTotalNews', 'getNewsList']),
      ...mapMutations('newsStore', ['setPageNumber']),
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
         this.$store.registerModule(this.storeName, newsStore());
      }
      await this.getTotalNews();
      this.getPageNumber();
      this.getNewsList();
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   watch: {
      async $route(to, from) {
         this.getPageNumber();
         this.getNewsList();
      },
   },
   components: {
      NewsList,
      Pagination
   }
}
</script>

<style lang="scss">
.newsBox {
   margin-bottom: 30px;
}

</style>