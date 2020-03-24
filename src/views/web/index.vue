<template>
<div class="apps">
   <AppList 
      :appData="appData"
      vertical
   ></AppList>
</div>
</template>

<script>
import { mapState } from 'vuex';
import AppList from '@/components/AppList/index.vue';
import appData from './index.js';

export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   data: () => ({
      appData
   }),
   computed: {
      ...mapState("meta", { seo: state => state.metaInfo.web }),
   },
   components: {
      AppList
   }
}
</script>