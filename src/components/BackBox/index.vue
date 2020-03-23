<template>
<div class="backBox">
   <router-link 
      class="btnBack"
      :to="backPath">
      <span>回上頁</span>
      <i class="far fa-redo-alt"></i>
   </router-link>
</div>
</template>

<script>
export default {
   props: {
      backPath: {
         type: Object,
         required: true
      }
   }
}
</script>

<style lang="scss">
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