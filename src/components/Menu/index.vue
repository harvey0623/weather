<template>
<div id="menu">
   <div class="mycontainer menuCenter">
      <DropDown 
         v-for="item in navList"
         :key="item.name"
         :id="item.name" 
         :dropdownText="item.meta.navName"
         :children="item.children"
         :path="item.path"
      ></DropDown>
   </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import DropDown from '@/components/DropDown/Menu.vue';
export default {
   computed: {
      ...mapGetters({ navList: 'navList' }),
   },
   components: {
      DropDown
   }
}
</script>

<style lang="scss">
#menu {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 100%;
   >.menuCenter {
      padding: 0 0;
      background-color: map-get($elBgColor, menu);
      border-radius: 5px;
      >* {
         height: 50px;
      }
   }
}
</style>