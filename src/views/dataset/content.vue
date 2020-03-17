<template>
<div class="datasetContent">
   {{ this.$route.params.id }}
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   created() {
      let id = this.$route.params.id;
      console.log(id);
      this.$store.dispatch('dataset/getDatasetMeta', { id: '123654' })
         .then(res => {
            console.log(res);
         })   
   }
}
</script>