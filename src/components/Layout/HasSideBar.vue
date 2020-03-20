<template>
<div class="hasSideBar">
	<div id="topBlock" :class="bannerClass">
		<DefaultHeader :isDefault="false"></DefaultHeader>
		<div id="menu">
			<div id="menuCenter" class="mycontainer">
				<MenuDropDown 
					v-for="item in dropDownList"
					:key="item.path"
					:id="item.path.replace('/', '')" 
					:dropdownText="item.meta.navName"
					:children="item.children"
				></MenuDropDown>
				<router-link to="/qa">常見問答</router-link>
			</div>
		</div>
	</div>
	<section class="mysection">
		<div id="breadCenter" class="mycontainer">
			<Breadcrumb 
				:matchedArr="matchedArr"
				:routeName="routeName"
			></Breadcrumb>
		</div>
		<div id="sideBarCenter" class="mycontainer">
			<SideBar v-if="showSideBar"></SideBar>
			<div id="pageContent" :class="contentClass">
				<PageTitle v-if="hidePageTitle"></PageTitle>
				<slot></slot>
			</div>
		</div>
	</section>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultHeader from '@/components/Header/index.vue';
import SideBar from '@/components/SideBar/index.vue';
import MenuDropDown from '@/components/DropDown/Menu.vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
export default {
	data: () => ({
		blockName: ['siteMap', 'qa']  //哪些頁面不要sideBar
	}),
	computed: {
		...mapGetters(['dropDownList']),
		routeName() {
			return this.$route.name;
		},
		matchedArr() {
			return this.$route.matched;
		},
		showSideBar() {  //顯示sideBar
			return !this.blockName.includes(this.routeName);
		},
		hidePageTitle() { //如果是登入夜面就隱藏頁面標題
			return this.routeName !== 'login';
		},
		contentClass() {
			return {
				hasPadding: this.showSideBar, 
				fullWidth: !this.showSideBar
			}
		},
		bannerClass() {
			let parentRoute = this.matchedArr[0];
			return parentRoute.meta.banner || 'banner1';
		}
	},
   components: {
		DefaultHeader,
		SideBar,
		MenuDropDown,
		Breadcrumb
   }
}
</script>

<style lang="scss" src="./HasSideBar.scss"></style>