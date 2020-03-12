<template>
<div class="qa">
   <div class="accordionWrap" v-if="qaData.length !== 0">
      <Accordion
         v-for="(item, index) in qaData"
         :key="index"
         :orderNumber="index + 1"
         :title="item.title"
         :content="item.content"
      ></Accordion>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Accordion from '@/components/Accordion/index.vue';
export default {
   data: () => ({
      qaData: [
         {  
            title: '請問該平台提供那些資料格式?',
            content: '本平台依各資料來源別的不同，依其更新頻率提供XML、JSON、ZIP、KML、KMZ、CAP及GRIB2等格式供民眾與系統開發業者進行資料加值運用。 並視應用情形採壓縮檔案對外提供，以利各界取用。'
         },
         {  
            title: '會員授權碼該如何取得?',
            content: '於登入會員後，進入「會員資訊」的「API授權碼」頁面，有「取得授權碼」的按鈕，或進入「開發指南」的「使用說明」頁面，也有「取得授權碼」的按鈕。按下即可取得您專屬40碼之會員驗證碼。'
         },
         {  
            title: '會員授權碼是否有時效?',
            content: '會員授權碼永久有效，無時效問題。若希望更新您的授權碼，請登入本平臺後在「資料使用說明」頁面，在二、1的部分也有「更新授權碼」的按鈕，按下即可自動更新並取得新的會員授權碼。'
         },
         {  
            title: '的瀏覽器版本?',
            content: '建議使用最新版本的Google Chrome 、Firefox 、Microsoft Edge'
         },
      ]
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta };
   },
   computed: {
      ...mapState("meta", { seo: state => state.metaInfo.qa })
   },
   components: {
      Accordion
   }
};
</script>
