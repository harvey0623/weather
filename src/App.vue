<template>
<div id="app">
	<component :is="layout">
		<router-view/>
	</component>
   <Loading v-if="isLoading"></Loading>
</div>
</template>

<script>
import '@/assets/scss/module/index.scss';
import Loading from '@/components/Loading/index.vue';
export default {
   metaInfo() {
      return {
         title: '',
         titleTemplate: '%s | weather',
         meta: [
            { property: 'og:image', content: '' },
            { property: 'og:description', content: 'weather' },
         ]
      }
   },
   data() {
      return {
         
      }
   },
	computed: {
		layout() {
			return this.$route.meta.layout || 'DefaultLayout';
      },
      isLoading() {
			return this.$store.state.isLoading;
		}
	},
   mounted() {
      
   },
   components: {
      Loading,
   }
}
</script>

<style>
	
</style>
