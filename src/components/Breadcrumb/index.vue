<template>
<ul class="breadList">
   <li>
      <router-link to="/">
         <i class="fas fa-home"></i>
      </router-link>
   </li>
   <li 
      v-for="(item,index) in matchedArr"
      :key="item.path">
      <template v-if="index !== total - 1">
         <i class="far fa-chevron-right"></i>
         <router-link 
            :to="item.path"
         >{{ item.meta.navName }}</router-link>
      </template>
      <template v-else>
         <i class="far fa-chevron-right"></i>
         <span>{{ item.meta.navName }}</span>
      </template>
   </li>
</ul>
</template>

<script>
export default {
   props: {
      matchedArr: {
         type: Array,
         required: true
      },
      routeName: {
         type: String,
         required: true
      }
   },
   computed: {
      total() {
         return this.matchedArr.length;
      },
      copyRoute() {
         return this.matchedArr.reduce((prev, current) => {
            prev.push({
               name: current.name,
               path: current.path,
               meta: current.meta
            });
            return prev;
         }, []);
      },
   },
   created() {
      console.log(this.copyRoute);
   }
   
}
</script>

<style lang="scss">
.breadList {
   display: flex;
   font-size: 15px;
   color: map-get($fontColor, table);
   >li {
      @include elGutter(margin-right, 8px);
      >i {
         margin-right: 8px;
         font-size: 12px;
      }
      >a {
         color: map-get($fontColor, table);
         &:hover {
            color: map-get($fontColor, primary);
         }
      }
   }
}
</style>