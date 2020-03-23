<template>
<div class="datasetTitle">{{ title }}</div>
</template>

<script>
export default {
   props: {
      title: {
         type: String,
         default: ''
      }
   }
}
</script>

<style lang="scss">
.datasetTitle {
   background-color: map-get($elBgColor, hover);
   color: #fff;
   padding: 6px 0;
   text-align: center;
}
</style>