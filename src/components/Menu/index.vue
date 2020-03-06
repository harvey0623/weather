<template>
<div id="menu">
   <div class="mycontainer menuCenter">
      <DropDown 
         v-for="item in routeArr"
         :key="item.name"
         :id="item.name" 
         :dropdownText="item.meta.navName"
         :children="item.children"
         :path="item.path"
         :isHover="true"
      ></DropDown>
   </div>
</div>
</template>

<script>
import dropDownMixin from '@/mixins/dropDown.js';
import DropDown from '@/components/DropDown/Menu.vue';
export default {
   mixins: [dropDownMixin],
   data: () => ({
      
   }),
   created() {
      
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