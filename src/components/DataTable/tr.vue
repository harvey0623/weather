<template>
<tr>
   <td>
      <router-link 
         :to="{ name: routeName, params: { id: dataid }}" 
         class="dataLink"
      >{{ dataname }}</router-link>
      <div class="formatBox">
         <span 
            v-for="item in format"
            :key="item"
         >{{ item }}</span>
      </div>
   </td>
   <td>{{ dataid }}</td>
</tr>   
</template>

<script>
export default {
   props: {
      dataid: {
         type: String,
         required: true
      },
      dataname: {
         type: String,
         required: true
      },
      format: {
         type: Array,
         required: true
      }
   },
   computed: {
      routeName() {
         return this.$route.name + 'Content';
      }
   }
}
</script>

