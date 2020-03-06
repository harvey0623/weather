<template>
<div class="otherLayout">
	<div class="topBlock">
		<DefaultHeader :isDefault="false"></DefaultHeader>
	</div>
	<slot></slot>
</div>
</template>

<script>
import DefaultHeader from '@/components/Header/DefaultHeader.vue';
export default {
	computed: {
		
	},
	mounted() {
		
	},
   components: {
      DefaultHeader
   }
}
</script>

<style lang="scss">
	.topBlock {
		min-height: 330px;
		background-image: url("/img/blockBg/bg1.jpg");
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>