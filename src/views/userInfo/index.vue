<template>
<div class="userInfo">
   userinfo
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.userInfo }),
   }
}
</script>

