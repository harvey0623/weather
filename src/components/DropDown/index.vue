<template>
<b-dropdown
   :id="id"
   :text="dropdownText" 
   toggle-tag="div"
   :ref="id"
   variant="dropdown"
   :class="{ open: isEnter }"
   @mouseenter.native="showHandler"
   @mouseleave.native="leaveHandler">
   <b-dropdown-item
      v-for="child in children"
      :key="child.name"
      :to="{ name: child.name }"
      v-show="child.path !== ''"
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
      isEnter: false
   }),
   methods: {
      showHandler(evt) {
         this.$refs[this.id].show(true);
         this.isEnter = true;
      },
      leaveHandler() {
         this.$refs[this.id].hide();
         this.isEnter = false;
      }
   },
}
</script>