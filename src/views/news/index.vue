<template>
<div class="news">
   <ul>
      <NewsList></NewsList>
   </ul>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      ...mapState("meta", { seo: state => state.metaInfo.news })
   },
   methods: {
      checkStore(name) {
         return this.$checkStoreModule(name);
      },
      ...mapActions('newsStore', { getTotalNews: 'getTotalNews' })
   },
   created() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, newsStore());
      }
   },
   mounted() {
      this.getTotalNews();
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   },
   components: {
      NewsList
   }
}
</script>