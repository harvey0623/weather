<template>
<footer class="myfooter">
   <div class="footerCenter mycontainer">
      <div class="linkBox">
         <a 
            v-for="item in linkData"
            :key="item.url"
            :href="item.url" 
            target="_blank">
            {{ item.title }}
         </a>
      </div>
      <p>
         地址:10048臺北市中正區公園路64號 總機：(02)2349-1000(代表號) 氣象查詢：(02)2349-1234 地震查詢：(02)2349-1168
      </p>
   </div>
</footer>
</template>

<script>
export default {
   data: () => ({
      linkData: [
         { title: '中央氣象局', url: 'https://www.cwb.gov.tw/V8/C/' },
         { title: '隱私權保護政策', url: 'https://www.cwb.gov.tw/V8/C/private.html' },
         { title: '資訊安全政策', url: 'https://www.cwb.gov.tw/V8/C/security.html' }
      ]
   })
}
</script>

<style lang="scss">
.myfooter {
   padding: 25px 0;
   background-color: #003567;
   >.footerCenter {
      color: #fff;
      text-align: center;
      font-size: 14px;
   }
}
.linkBox {
   margin-bottom: 20px;
   >a {
      color: #fff;
      @include elGutter(margin-right, 10px);
      position: relative;
      &:hover {
         text-decoration: underline;
      }
      &:last-child {
         &:after {
            display: none;
         }
      }
      &:after {
         content: '';
         position: absolute;
         left: 105%;
         top: 4px;
         @include size(1px, 14px);
         background-color: #fff;
      }
   }
}
</style>