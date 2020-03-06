<template>
<div class="hasSideBar">
	<div class="topBlock">
		<DefaultHeader :isDefault="false"></DefaultHeader>
		<Menu></Menu>
	</div>
	<section class="mysection">
		<div id="sideBarCenter" class="mycontainer">
			<div id="sideBar" v-if="showSideBar"></div>
			<div id="pageContent" :class="{ hasPadding: showSideBar }">
				<PageTitle v-if="hidePageTitle"></PageTitle>
				<slot></slot>
			</div>
		</div>
	</section>
</div>
</template>

<script>
import DefaultHeader from '@/components/Header/DefaultHeader.vue';
import Menu from '@/components/Menu/index.vue';
export default {
	computed: {
		routeName() {
			return this.$route.name;
		},
		showSideBar() {  //顯示sideBar
			let blockPage = ['siteMap'];
			return !blockPage.includes(this.routeName);
		},
		hidePageTitle() {  //隱藏頁面標題
			return this.routeName !== 'login';
		}
	},
   components: {
		DefaultHeader,
		Menu
   }
}
</script>

<style lang="scss" src="./HasSideBar.scss"></style>