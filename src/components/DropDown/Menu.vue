<template>
<b-dropdown
   :id="id"
   :text="dropdownText" 
   :ref="id"
   :class="['dropDownOuter', { open: isOpen }]"
   variant="menu-dropdown"
   toggle-tag="div"
   @show="isOpen = true"
   @hide="isOpen = false">
   <b-dropdown-item
      v-for="child in children"
      :key="child.name"
      v-show="child.path !== ''"
      :to="{ name: child.name }"
   >{{ child.meta !== undefined ? child.meta.navName : '' }}</b-dropdown-item>
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