<template>
<div class="newsContent">
   <template v-if="newsContent !== null">
      <div class="contentTop">
         <h1>{{ newsContent.title }}</h1>
         <p class="date">{{ newsContent.createdate }}</p>
      </div>
      <div 
         class="contentBox" 
         v-html="replaceBr(newsContent.content)"
      ></div>
   </template>
   <template v-else>
      <div class="contentTop">
         <h1>找不到該最新消息!!</h1>
      </div>
   </template>
   <BackBox :backPath="backPath"></BackBox>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import BackBox from '@/components/BackBox/index.vue';
export default {
   computed: {
      ...mapState('newsStore', ['pageNumber']),
      ...mapGetters('newsStore', ['newsContent']),
      backPath() {
         return { name: 'news', query: { page: this.pageNumber }};
      }
   },
   methods: {
      ...mapMutations('newsStore',  ['setNewsId']),
      getUrlId() {
         let rule = /^[0-9\s]*$/;
         let id = this.$route.params.id;
         let isValid = rule.test(id);
         return isValid ? parseInt(id) : 0;
      },
      replaceBr(text) {
         return text.replace(/\n/g, '<br>');
      }
   },
   created() {
      this.setNewsId(this.getUrlId());
   },
   watch: {
      $route(to, from) {
         this.setNewsId(this.getUrlId());
      }
   },
   components: {
      BackBox
   }
}
</script>

<style lang="scss">
.contentTop {
   padding-left: 10px;
   margin-bottom: 25px;
   border-left: 5px solid map-get($borderColor, menu);
   >h1 {
      margin-bottom: 10px;
      font-size: 20px;
      color: map-get($fontColor, primary);
   }
   >.date {
      font-size: 14px;
   }
}
</style>