<template>
<div class="noSideBar">
	<div class="topBlock">
		<DefaultHeader :isDefault="false"></DefaultHeader>
		<Menu></Menu>
	</div>
	<section class="mysection">
		<div class="mycontainer">
			<PageTitle></PageTitle>
			<slot></slot>
		</div>
	</section>
</div>
</template>

<script>
import DefaultHeader from '@/components/Header/DefaultHeader.vue';
import Menu from '@/components/Menu/index.vue';
export default {
   components: {
		DefaultHeader,
		Menu
   }
}
</script>

<style lang="scss">
.topBlock {
	position: relative;
	min-height: 380px;
	background-image: url("/img/blockBg/bg1.jpg");
	background-size: cover;
	background-repeat: no-repeat;
}
</style>