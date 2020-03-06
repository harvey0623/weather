<template>
<div class="siteMap">
   <div class="siteWrap">
      <div class="siteBox" 
         v-for="item in navList"
         :key="item.name">
         <router-link
            class="mainTitle"
            :to="item.path"
         >{{ item.meta.navName }}</router-link>
         <div class="childrenBox" 
            v-if="item.children && item.children.length !== 0">
            <router-link
               v-for="child in item.children"
               :key="child.name" 
               :to="{ name: child.name }"
            >{{ child.meta.navName }}</router-link>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.siteMap }),
      ...mapGetters({ navList: 'navList' }),
   }
}
</script>

<style lang="scss" src="./index.scss"></style>