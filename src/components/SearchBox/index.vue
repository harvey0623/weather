<template>
<div class="searchBox">
   <input 
      type="text" 
      class="form-control" 
      placeholder="搜尋"
      @input="inputHandler">
   <i class="far fa-search"></i>
</div>
</template>

<script>
export default {
   data: () => ({
      keyword: ''
   }),
   methods: {
      inputHandler(evt) {
         this.$emit('changeKeyword', evt.target.value);
      }
   }
}
</script>

<style lang="scss">
.searchBox {
   position: relative;
   &.mb {
      margin-bottom: 20px;
   }
   >.form-control {
      @include size(150px, 36px);
      padding-left: 30px;
      border-radius: 100px;
      background-color: #ededed;
      transition: width 0.5s, background-color, 0.5s;
      &::placeholder {
         font-size: 16px;
      }
      &:focus {
         width: 180px;
         background-color: #fff;
      }
   }
   >i {
      position: absolute;
      left: 10px;
      top: 10px;
      color: gray;
   }
}
</style>