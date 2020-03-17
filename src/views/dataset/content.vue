<template>
<div class="datasetContent">
   {{ this.$route.params.id }}
</div>
</template>

<script>
export default {
   created() {
      console.log(this.$route.params.id)
   }
}
</script>