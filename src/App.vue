<template>
<div id="app">
   <Loading v-if="isLoading"></Loading>
	<component :is="layout">
		<router-view></router-view>
	</component>
</div>
</template>

<script>
import '@/assets/scss/module/index.scss';
import Loading from '@/components/Loading/index.vue';
import Footer from '@/components/Footer/index.vue';
export default {
   metaInfo() {
      return {
         title: '',
         titleTemplate: '%s',
         meta: [
            { property: 'og:image', content: '' },
            { property: 'og:description', content: 'weather' },
         ]
      }
   },
	computed: {
		layout() {
         let defaultLayout = 'DefaultLayout';
         let matchArr = this.$route.matched;
         if (matchArr.length === 0) return defaultLayout;
         let metaObj = matchArr[0].meta;
         return metaObj.layout !== undefined ? metaObj.layout : defaultLayout;
      },
      isLoading() {
			return this.$store.state.isLoading;
      }
	},
   components: {
      Loading,
   }
}
</script>

<style>
	
</style>
