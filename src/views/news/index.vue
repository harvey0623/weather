<template>
<div class="news">
   <template v-if="routeName === 'news'">
      <ul class="newsBox">
         <NewsList 
            v-for="item in newsList"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :createdate="item.createdate"
            :pageNumber="pageNumber"
         ></NewsList>
      </ul>
      <Pagination
         :total="total"
         :pageNumber="pageNumber"
         @updateNumber="changeNumber"
      ></Pagination>
   </template>
   <router-view v-else></router-view>
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
      routeName() {
         return this.$route.name;
      }
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
         let isRedirect = this.getPageNumber();
         if (!isRedirect) {
            if (this.newsTotal.length === 0) await this.getTotalNews();
            await this.getNewsList();
         }
      }
   },
   created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, newsStore());
      }
      this.doing();   
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   watch: {
      $route(to, from) {
         this.doing();
      }
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