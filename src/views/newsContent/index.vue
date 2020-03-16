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
   <div class="backBox">
      <router-link 
         class="btnBack"
         :to="{ name: 'news', query: { page: pageNumber }}">
         <span>回上頁</span>
         <i class="far fa-redo-alt"></i>
      </router-link>
   </div>
</div>
</template>

<script>
import { mapState ,mapGetters, mapMutations } from 'vuex';
export default {
   computed: {
      ...mapState('newsStore', ['pageNumber']),
      ...mapGetters('newsStore', ['newsContent'])
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
.backBox {
   margin-top: 20px;
   text-align: right;
   >.btnBack {
      @include size(90px, 35px);
      line-height: 35px;
      text-align: center;
      color: white;
      background-color: #337ab7;
      font-size: 14px;
      >span {
         margin-right: 3px;
      }
   }
}

</style>