<template>
<ul class="appList" :class="{ vertical: vertical }">
   <li 
      v-for="(item,index) in appData"
      :key="index">
      <div class="appL">
         <img :src="item.imgUrl" alt="">
         <div class="downloadBox" v-if="item.download">
            <a
               v-for="(value,key) in item.download"
               v-show="value !== ''"
               :key="key"
               :href="value">
               <i class="fab" :class="iconClass(key)"></i>
            </a>
         </div>
      </div>
      <div class="appR">
         <h3>{{ item.title }}</h3>
         <p>{{ item.content }}</p>
      </div>
   </li>
</ul>
</template>

<script>
export default {
   props: {
      appData: {
         type: Array,
         required: true
      },
      vertical: {
         type: Boolean,
         default: false
      }
   },
   methods: {
      iconClass(key) {
         return key === 'appleUrl' ? 'fa-apple' : 'fa-android';
      }
   }
}
</script>

<style lang="scss">
.appList {
   display: flex;
   flex-wrap: wrap;
   >li {
      display: flex;
      align-items: flex-start;
      width: calc(50% - 15px);
      margin-bottom: 20px;
      padding: 25px 20px;
      background-color: #eeeeee;
      &:nth-child(odd) {
         margin-right: 10px;
      }
      &:nth-child(even) {
         margin-left: 10px;
      }
   }
   &.vertical {
      display: block;
      >li {
         width: 100%;
         margin-left: 0;
         margin-right: 0;
      }
   }
}
.appL {
   flex: 0 0 90px;
   >img {
      @include size(100%, auto);
   }
   .downloadBox {
      padding-top: 8px;
      text-align: center;
      >a {
         @include size(30px);
         margin-right: 5px;
         line-height: 30px;
         border-radius: 50%;
         color: #fff;
         background-color: #666;
         font-size: 18px;
      }
   }
}
.appR {
   width: calc(100% - 90px);
   padding-left: 15px;
   >h3 {
      display: inline-block;
      padding: 3px 15px;
      background-color: #fff;
      font-size: 18px;
      border-radius: 20px;
      line-height: 25px;
   }
   >p {
      padding-left: 10px;
      padding-top: 10px;
      text-align: justify;
      font-size: 15px;
      color: map-get($fontColor, table);
   }
}
</style>