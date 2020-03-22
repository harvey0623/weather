<template>
<div class="categoryList">
   <router-link to="/">
      <img :src="imgUrl" alt="">
      <p class="title">{{ title }}</p>
      <small class="count">{{ count }}</small>
   </router-link>
</div>
</template>

<script>
export default {
   props: {
      id: {
         type: String,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      count: {
         type: Number,
         required: true
      },
      imgUrl: {
         type: String,
         required: true
      }
   }
}
</script>

<style lang="scss">
.categoryList {
   flex: 0 0 25%;
   margin-bottom: 25px;
   >a {
      display: block;
      @include size(165px);
      padding: 20px 15px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #fff;
      text-align: center;
      color: map-get($fontColor, primary);
      &:hover {
         border: 2px solid map-get($borderColor, primary);
      }
      >img {
         display: block;
         @include size(65px);
         margin: 0 auto;
      }
      >.title {
         font-weight: bold;
         font-size: 20px;
         margin: 5px 0;
      }
      >.count{
         font-size: 18px;
      }
   }
}
</style>