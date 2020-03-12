<template>
<div class="accordionBox">
   <div class="accordionTitle" v-b-toggle="`accordion${orderNumber}`">
      <div class="orderNumber">Q{{ orderNumber }}</div>
      <p>{{ title }}</p>
   </div>
   <b-collapse
      :id="`accordion${orderNumber}`"
      accordion="my-accordion"
      role="tabpanel">
      <div class="accordionContent">
         <p>{{ content }}</p>
      </div>
   </b-collapse>
</div>
</template>

<script>
export default {
   props: {
      orderNumber: {
         type: Number,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      content: {
         type: String,
         required: true
      }
   }
}
</script>

<style lang="scss" src="./index.scss"></style>