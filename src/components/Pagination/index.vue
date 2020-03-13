<template>
<b-pagination
   v-model="currentPage"
   :total-rows="total"
   :per-page="perPage"
   align="center"
   pills
   last-number
   first-number
   :limit="5"
></b-pagination>
</template>

<script>
export default {
   props: {
      total: {
         type: Number,
         required: true
      },
      pageNumber: {
         type: Number,
         required: true
      }
   },
   data: () => ({ 
      perPage: 1
   }),
   computed: {
      currentPage: {
         get() {
            return this.pageNumber === 0 ? 1 : this.pageNumber;
         },
         set(val) {
            this.$emit('updateNumber', val);
         }
      }
   }
}
</script>

<style lang="scss">

</style>