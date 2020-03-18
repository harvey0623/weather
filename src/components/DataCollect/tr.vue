<template>
<tr>
   <td>{{ rowData.title }}</td>
   <td>
      <p v-if="!rowData.link">{{ rowData.value }}</p>
      <a 
         v-else 
         :href="href"
         :target="target">
         <i class="fas fa-download" v-if="showIcon"></i>
         {{ setName }}
      </a>
   </td>
</tr>
</template>

<script>
export default {
   props: {
      rowData: {
         type: Object,
         required: true
      }
   },
   computed: {
      href() {
         return this.rowData.value === '' ? 'javascript:;' : this.rowData.value;
      },
      target() {
         return this.href === 'javascript:;' ? '' : '_blank';
      },
      setName() {
         if (this.rowData.id === 'licenseURL') {
            return this.rowData.value;
         } else if (this.rowData.id === 'landingPage') {
            if (this.rowData.value === '') return '無';
            else return this.rowData.linkName;
         }
      },
      showIcon() {
         return (this.rowData.id === 'landingPage') && (this.rowData.value !== ''); 
      }
   }
}
</script>

<style lang="scss"></style>