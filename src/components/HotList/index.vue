<template>
<li class="hotList">
   <router-link :to="pageUrl">{{ dataname }}</router-link>
</li>
</template>

<script>
import mapCode from '@/views/dataset/mapCode.js';
export default {
   props: {
      dataid: {
         type: String,
         required: true
      },
      dataname: {
         type: String,
         required: true
      }
   },
   computed: {
      pageUrl() {
         let pageCode = this.dataid.split('-')[0].toLowerCase();
         let pageName = '';
         for (let key in mapCode) {
            if (mapCode[key] === pageCode) {
               pageName = key;
               break;
            }
         }
         return {name: pageName + 'Content', params: { id: this.dataid }}
      }
   }
}
</script>

<style lang="scss">

</style>