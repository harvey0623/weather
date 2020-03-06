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
      },
      isHover: {
         type: Boolean,
         default: false
      }
   },
   data: () => ({
      isEnter: false
   }),
   methods: {
      showHandler(evt) {
         if (!this.isHover) return;
         this.$refs[this.id].show(true);
         this.isEnter = true;
      },
      leaveHandler() {
         if (!this.isHover) return;
         this.$refs[this.id].hide();
         this.isEnter = false;
      }
   },
}
</script>

<style lang="scss">
$color: map-get($fontColor, primary);

.dropdown {
   &.open {
      .dropdown-toggle {
         color: #fff;
      }
   }
}
.dropdown-toggle {
   color: $color;
   &:hover,
   &:focus {
      color: $color;
      box-shadow: none;
   }
   &::after {
      content: "\f078";
      margin-left: 0.3rem;
      font-family: 'Font Awesome 5 Pro';
      font-size: 14px;
      border: none;
      vertical-align: initial;
   }
}
.dropdown-menu {
   padding: 3px 0;
   border-radius: 0;
   top: 95% !important;
   transform: none !important;
}
.dropdown-item {
   color: $color;
   &:active {
      background-color: transparent;
      color: $color;
   }
   &:hover {
      background-color: #f8f9fa;
      color: $color;
   }
}
</style>