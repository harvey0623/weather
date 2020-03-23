<template>
<th :width="width">{{ title }}</th>
</template>

<script>
export default {
   props: {
      title: {
         type: String,
         required: true
      },
      width: {
         type: String,
         default: ''
      }
   }
}
</script>