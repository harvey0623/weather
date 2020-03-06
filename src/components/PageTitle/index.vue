<template>
<div class="pageTitle">
   <h1>{{ pageTitle }}</h1>
</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	computed: {
		navName() {
			return this.$route.meta.navName;
		},
		pageTitle() {
			if (this.title !== '') return this.title;
			else return this.navName;
		}
	},
}
</script>

<style lang="scss">
.pageTitle {
	position: relative;
	margin-bottom: 30px;
	&:after {
		content: '';
		position: absolute;
		left: 0;
      bottom: 0;
      @include size(100%, 2px);
		background-color: map-get($elBgColor, title);
		z-index: -1;
	}
	>h1 {
		display: inline-block;
		padding-bottom: 3px;
		font-size: 25px;
		border-bottom: 2px solid map-get($borderColor, primary);
		color: map-get($fontColor, primary);
	}
}
</style>