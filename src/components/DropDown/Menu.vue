<template>
<b-dropdown
   :id="id"
   :text="dropdownText" 
   toggle-tag="div"
   :ref="id"
   :class="['dropDownOuter', { open: isOpen }]"
   @show="isOpen = true"
   @hide="isOpen = false"
   variant="menu-dropdown">
   <b-dropdown-item
      v-for="item in children"
      :key="item.name"
      :to="path + `/${item.path}`"
   >{{ item.meta.navName }}</b-dropdown-item>
</b-dropdown>
</template>

<script>
export default {
   props: {
      id: {
         type: String,
         required: true
      },
      dropdownText: {
         type: String,
         required: true
      },
      children: {
         type: Array,
         required: true
      },
      path: {
         type: String,
         required: true
      }
   },
   data: () => ({
      isOpen: false
   }),
}
</script>

<style lang="scss">
.dropDownOuter {
   &.open,
   &:hover {
      background-color: map-get($elBgColor, hover);
      >.dropdown-toggle {
         color: map-get($fontColor, menu);
      }
   }
   >.btn-menu-dropdown {
      line-height: 40px;
   }
}
</style>