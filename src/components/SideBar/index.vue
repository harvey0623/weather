<template>
<div id="sideBar">
   <ul class="sideBarList">
      <li 
         v-for="item in routerList" 
         :key="item.name"
         :class="{ active: item.name === routeName }">
         <router-link 
            :to="item.path"
         >{{ item.meta.navName }}</router-link>
      </li>
   </ul>
</div>
</template>

<script>
export default {
   computed: {
      routeName() {
         return this.$route.name;
      },
      routerList() {
         console.log(this.$route.matched);
         return this.$route.matched;
      }
   }
}
</script>

<style lang="scss">
.sideBarList {
   >li {
      padding: 12px;
      background-color: #eee;
      border-bottom: 1px solid #fff;
      >a {
         color: #666666;
      }
      &.active {
         background-color: #f3ba42;
         >a {
            color: #fff;
         }
      }
   }
}
</style>