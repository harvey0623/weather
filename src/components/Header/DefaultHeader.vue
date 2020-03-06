<template>
<header class="defaultHeader">
   <div class="mycontainer defaultCenter">
      <router-link to="/" class="logoBox">
         <img src="/img/logo.png">
      </router-link>
      <div class="navWrap">
         <div class="guideTop" :class="{ layout : !isDefault }">
            <div class="searchBox" v-if="isDefault">
               <input type="text" class="form-control" placeholder="搜尋">
               <i class="far fa-search"></i>
            </div>
            <router-link to="/">登入/註冊</router-link>
            <router-link to="/siteMap">網站地圖</router-link>
         </div>
         <div class="guideBottom" v-if="isDefault">
            <DropDown 
               v-for="item in routeArr"
               :key="item.name"
               :id="item.name" 
               :dropdownText="item.meta.navName"
               :children="item.children"
               :path="item.path"
            ></DropDown>
         </div>
      </div>
   </div>
</header>
</template>

<script>
import dropDownMixin from '@/mixins/dropDown.js';
import DropDown from '@/components/DropDown/index.vue';
export default {
   mixins: [dropDownMixin],
   props: {
      isDefault: {
         type: Boolean,
         default: true
      }
   },
   data: () => ({
      
   }),
   created() {
      
   },
   mounted() {
      
   },
   components: {
      DropDown
   }
}
</script>

<style lang="scss" src="./DefaultHeader.scss"></style>