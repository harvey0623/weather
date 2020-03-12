<template>
<div class="news">
   
</div>
</template>

<script>
import { mapState } from 'vuex';
import newsStore from '@/store/modules/newsStore.js';
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
      }
   },
   mounted() {
      if (!this.checkStore(this.storeName)) {
         this.$store.registerModule(this.storeName, newsStore());
      }
   },
   beforeDestroy() {
      if (this.checkStore(this.storeName)) {
         this.$store.unregisterModule(this.storeName);
      }
   }
}
</script>

<style lang="scss">

</style>