<template>
<div class="home">
   <DefaultHeader :isDefault="true"></DefaultHeader>
</div>
</template>

<script>
import { mapState } from 'vuex';
import DefaultHeader from '@/components/Header/index.vue';
export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   data: () => ({
      
   }),
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.home }),
   },
   mounted() {
      
   },
   components: {
      DefaultHeader
   }
}
</script>

<style lang="scss">
.home {
	background-color: #c1edff;
	min-height: 100vh;
}
</style>