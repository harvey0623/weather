<template>
<li class="newsList">
   <p class="date">2020/10/10</p>
   <p class="title">
      <router-link to="/">hello world</router-link>
   </p>
</li>
</template>

<style lang="scss">
.newsList {
   display: flex;
   align-items: center;
   padding: 15px 12px;
   border-bottom: 1px dotted #ccc;
   @include elGutter(margin-bottom, 20px);
   >.date {
      padding: 5px 8px;
      color: map-get($fontColor, primary);
      background-color: map-get($elBgColor, menu);
      font-size: 14px;
      font-weight: bold;
   }
   >.title {
      flex: 1;
      padding-left: 40px;
      >a {
         &:hover {
            text-decoration: underline;
         }
      }
   }
}
</style>