<template>
<header class="defaultHeader">
   <div class="mycontainer defaultCenter">
      <router-link to="/" class="logoBox">
         <img src="/img/logo.png">
      </router-link>
      <div class="navWrap">
         <div class="guideTop" :class="{ layout : !isDefault }">
            <div class="searchBox" v-if="isDefault">
               <input 
                  type="text" 
                  class="form-control" 
                  placeholder="搜尋"
                  v-model="keyword" >
               <i class="far fa-search"></i>
            </div>
            <router-link 
               to="/"
               v-if="isLogin"
               href="javascript:;" 
               :class="hoverClass"
               @click.prevent.native="loginOutHandler"
            >登出</router-link>
            <router-link to="/login" :class="hoverClass" v-else>登入/註冊</router-link>
            <router-link to="/siteMap" :class="hoverClass">網站地圖</router-link>
         </div>
         <div class="guideBottom" v-if="isDefault">
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
   </div>
</header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropDown from '@/components/DropDown/index.vue';
export default {
   props: {
      isDefault: {
         type: Boolean,
         default: true
      }
   },
   data:() => ({
      keyword: ''
   }),
   computed: {
      ...mapState('auth', { isLogin: state => state.fbUser.isLogin }),
      ...mapGetters({ navList: 'navList' }),
      hoverClass() {
         let isHomeName = this.$route.name === 'home';
         return {
            default: isHomeName,
            layout: !isHomeName
         }
      }
   },
   methods: {
      async loginOutHandler() {
         await this.$store.dispatch('auth/fbLogout').then(res => res);
         this.$router.push('/').catch(() => {});
      }
   },
   components: {
      DropDown
   }
}
</script>

<style lang="scss" src="./DefaultHeader.scss"></style>