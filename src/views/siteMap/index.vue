<template>
<div class="siteMap">
   <div class="siteWrap">
      <div class="siteBox" 
         v-for="item in siteMapRouter"
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
            >{{ child.meta.navName }}</router-link>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
   data: () => ({
      blockList: ['/', '*', '/siteMap']
   }),
   metaInfo() {
      return { title: this.seo.title, meta: this.seo.meta }
   },
   computed: {
      ...mapState('meta', { seo: state => state.metaInfo.siteMap }),
      ...mapState('auth', { isLogin: state => state.fbUser.isLogin }),
      allRouter() {
         return this.$router.options.routes.filter(item => {
            return !this.blockList.includes(item.path);
         });
      },
      noEmptyRoute() {  //拿掉chihldren裡的path === ''
         let copyArr = JSON.parse(JSON.stringify(this.allRouter));
         for (let item of copyArr) {
            if (item.children === undefined) continue;
            let index = item.children.findIndex(child => child.path === '');
            if (index === -1) continue;
            item.children.splice(index, 1);
         }
         return copyArr;
      },
      siteMapRouter() { //依照登入狀態篩選對應route
         let noAuthRoute = this.noEmptyRoute.filter(item => item.meta.auth === undefined);
         let authRoute = this.noEmptyRoute.filter(item => item.meta.auth === this.isLogin);
         let showArr = noAuthRoute.concat(authRoute);
         return showArr.sort((a, b) => a.meta.order - b.meta.order);
      }
   },
   mounted() {
      
   }
}
</script>

<style lang="scss" src="./index.scss"></style>