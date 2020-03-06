<template>
<div class="login">
   <div class="memberBox">
      <PageTitle title="氣象會員登入"></PageTitle>
   </div>
   <div class="otherBox">
      <PageTitle title="其他方式登入"></PageTitle>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.login }),
   },
}
</script>

<style lang="scss" src="./index.scss"></style>