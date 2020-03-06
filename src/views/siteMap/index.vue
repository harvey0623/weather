<template>
<div class="siteMap">
   siteMap
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.siteMap }),
   },
}
</script>

<style lang="scss">
   
</style>