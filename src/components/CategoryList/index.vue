<template>
<div class="categoryList">
   <router-link :to="pageUrl">
      <img :src="imgUrl" alt="">
      <p class="title">{{ title }}</p>
      <small class="count">{{ count }}</small>
   </router-link>
</div>
</template>

<script>
import mapCode from '@/views/dataset/mapCode.js';
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
   },
   computed: {
      pageUrl() {
         let pageCode = this.id.toLowerCase();
         let pageName = '';
         for (let key in mapCode) {
            if (mapCode[key] === pageCode) {
               pageName = key;
               break;
            }
         }
         return { name: pageName, query: { page: 1 } };
      }
   }
}
</script>

<style lang="scss">
.categoryList {
   flex: 0 0 25%;
   margin-bottom: 25px;
   >a {
      position: relative;
      display: block;
      @include size(165px);
      padding: 20px 15px;
      margin: 0 auto;
      border-radius: 50%;
      background-color: #fff;
      transition: background 0.25s;
      text-align: center;
      color: map-get($fontColor, primary);
      z-index: 2;
      &:hover {
         background: linear-gradient(#c1edff, #fff);
         &:after {
            border-color: map-get($borderColor, primary);
         }
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
      &:after {
         content: '';
         position: absolute;
         left: 0;
         top: 0;
         @include size(100%);
         border: 2px solid transparent;
         border-radius: 50%;
         z-index: 1;
      }
   }
}
</style>