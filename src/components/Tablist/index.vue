<template>
<div 
   v-show="hasData"
   class="bookmark"
   :class="{ active: currentId === id }"
   @click="$emit('update:currentId', id)"
>{{ title }}</div>
</template>

<script>
export default {
   props: {
      id: {
         type: String,
         reuired: true
      },
      title: {
         type: String,
         reuired: true
      },
      hasData: {
         type: Boolean,
         reuired: true
      },
      currentId: {
         type: String,
         reuired: true
      }
   }
}
</script>

<style lang="scss">
$height: 40px;
$skewDeg: 20deg;
$offsetX: -10px;
$markActive: map-get($elBgColor, sideBar);

.bookmarkBox {
   display: flex;
   align-items: center;
   padding-left: 18px;
   .bookmark {
      position: relative;
      @include size(100px, $height);
      line-height: $height;
      background-color: #fff;
      margin-right: 20px;
      text-align: center;
      box-shadow: 0px 2px 15px rgba(black, 0.4);
      transition: background-color 0.25s;
      z-index: 1;
      cursor: pointer;
      &::before,
      &::after {
         content: '';
         position: absolute;
         background-color: #fff;
         @include size(20px, $height);
         transition: background-color 0.25s;
      }
      &::before {
         left: $offsetX;
         transform: skew(-$skewDeg, 0);
      }
      &::after {
         right: $offsetX;
         transform: skew($skewDeg, 0);
      }
      &.active {
         background-color: $markActive;
         color: #fff;
         z-index: 3;
         &::before,
         &::after {
            background-color: $markActive;
         } 
      }
      &:hover {
         background-color: $markActive;
         color: #fff;
         &::before,
         &::after {
            background-color: $markActive;
         }
      }
   }
}
</style>