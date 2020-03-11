<template>
<div class="siteMap">
   <div class="siteWrap">
      <div class="siteBox" 
         v-for="item in allRouter"
         :key="item.name">
         <div class="mainTitle">
            <router-link 
               :to="item.path"
            >{{ item.meta.navName }}</router-link>
         </div>
         <div class="childrenBox" v-if="item.children !== undefined">
            <router-link
               v-for="child in item.children"
               :key="child.name"
               :to="{ name: child.name }"
               v-show="child.meta !== undefined"
            >{{ child.meta !== undefined ? child.meta.navName : '' }}</router-link>
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
      ...mapState('auth', { isLogin: state => state.fbUser.isLogin }),
      allRouter() {
         let blockList = ['/', '*', '/siteMap'];
         return this.$router.options.routes.filter(item => {
            return !blockList.includes(item.path)
         });
      },
      authRouter() {

      }
   },
   mounted() {
      
   }
}
</script>

<style lang="scss" src="./index.scss"></style>