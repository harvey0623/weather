<template>
<b-pagination
   v-model="currentPage"
   :total-rows="total"
   :per-page="1"
   :limit="5"
   align="center"
   pills
   first-number
   last-number
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