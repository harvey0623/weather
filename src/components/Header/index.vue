<template>
<header class="defaultHeader">
   <div class="mycontainer defaultCenter">
      <router-link to="/" class="logoBox">
         <img src="/img/logo.png">
      </router-link>
      <div class="navWrap">
         <div class="guideTop" :class="{ layout : !isDefault }">
            <template v-if="isDefault">
               <SearchBox></SearchBox>
            </template>
            <a
               v-if="isLogin"
               href="javascript:;" 
               :class="hoverClass"
               @click.prevent="loginOutHandler"
            >登出</a>
            <router-link to="/login" :class="hoverClass" v-else>登入/註冊</router-link>
            <router-link to="/siteMap" :class="hoverClass">網站地圖</router-link>
         </div>
         <div class="guideBottom" v-if="isDefault">
            <DropDown 
               v-for="item in dropDownList"
               :key="item.path"
               :id="item.path.replace('/', '')"
               :dropdownText="item.meta.navName"
               :children="item.children"
            ></DropDown>
            <router-link to="/qa">常見問答</router-link>
         </div>
      </div>
   </div>
</header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DropDown from '@/components/DropDown/index.vue';
import SearchBox from '@/components/SearchBox/index.vue';
export default {
   props: {
      isDefault: {
         type: Boolean,
         default: true
      }
   },
   data:() => ({
      
   }),
   computed: {
      ...mapState('auth', { isLogin: state => state.fbUser.isLogin }),
      ...mapGetters(['dropDownList']),
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
      DropDown,
      SearchBox
   }
}
</script>

<style lang="scss" src="./index.scss"></style>