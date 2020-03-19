<template>
<div class="searchBox">
   <input 
      type="text" 
      class="form-control" 
      placeholder="搜尋"
      @input="inputHandler"
      @keyup.enter="keyupHandler"
      :value="keyword">
   <i class="far fa-search"></i>
</div>
</template>

<script>
export default {
   props: {
      enterEvent: {
         type: Boolean,
         default: false
      },
      keyword: {
         type: String,
         default: ''
      }
   },
   methods: {
      inputHandler(evt) {
         this.$emit('changeKeyword', evt.target.value.trim());
      },
      keyupHandler(evt) {
         if (!this.enterEvent) return;
         this.$router.push({ 
            name: 'forecast', 
            query: { 
               page: 1,
               searchValue: evt.target.value,
            }
         });
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