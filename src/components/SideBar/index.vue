<template>
<div id="sideBar">
   <ul class="sideBarList">
      <li 
         v-for="item in childRoute" 
         :key="item.name"
         :class="{ active: routeName === item.name }">
         <router-link
            :to="{name: item.name}"
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
      parentPath() {  //取得父層路徑
         return this.$route.matched[0].path;
      },
      familyRoute() {  //取得整個指定router
         return this.$router.options.routes.filter(item => {
            return item.path === this.parentPath;
         });
      },
      childRoute() { //取得子router
         let child = this.familyRoute[0].children;
         let result = child !== undefined ? child : this.familyRoute;
         return result.filter(item => item.path !== '');
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